import fs from 'node:fs'
import path from 'node:path'
import { LEARNING_LESSONS } from '../src/content/learning/lesson-1'
import { LEARNING_SCENES } from '../src/content/learning/scenes'

const root = process.cwd()
const scenes = new Map(LEARNING_SCENES.map((scene) => [scene.id, scene]))
const errors: string[] = []
const warnings: string[] = []
const interactiveWithoutVisualId: string[] = []
const interactivePendingValidation: string[] = []
let references = 0

for (const lesson of LEARNING_LESSONS) {
  const entries = [...lesson.steps.map((entry, index) => ({ entry, label: `step ${index + 1}` })), ...lesson.quiz.map((entry, index) => ({ entry, label: `quiz ${index + 1}` }))]
  for (const { entry, label } of entries) {
    const visualId = entry.visualId
    if (!visualId) {
      warnings.push(`${lesson.id} — ${label}: aucun visualId explicite`)
      if ('question' in entry) interactiveWithoutVisualId.push(`${lesson.id} — ${label}: ${entry.question}`)
      continue
    }
    references += 1
    const scene = scenes.get(visualId)
    if (!scene) {
      errors.push(`${lesson.id} — ${label}: visualId inconnu ${visualId}`)
      continue
    }
    if (scene.image) {
      const imagePath = path.join(root, 'public', scene.image.replace(/^\//, ''))
      if (!fs.existsSync(imagePath)) errors.push(`${lesson.id} — ${label}: image absente ${scene.image}`)
    } else if (scene.status !== 'needs-validation') {
      errors.push(`${lesson.id} — ${label}: scène ${visualId} sans image ni statut de validation`)
    } else if ('question' in entry) {
      interactivePendingValidation.push(`${lesson.id} — ${label}: ${visualId}`)
    }
  }
}

console.log(JSON.stringify({ lessons: LEARNING_LESSONS.length, references, errors, warnings, interactiveWithoutVisualId, interactivePendingValidation }, null, 2))
if (errors.length) process.exitCode = 1
