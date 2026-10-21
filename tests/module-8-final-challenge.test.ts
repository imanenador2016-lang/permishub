import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import test from 'node:test'
import { LEARNING_LESSONS } from '../src/content/learning/lesson-1'
import { MODULE_EIGHT_FINAL_CHALLENGE } from '../src/content/learning/module-8-final-challenge'
import { MODULE_8 } from '../src/content/learning/module-8'
import { getLearningScene } from '../src/content/learning/scenes'

test('le module 8 contient 7 leçons complètes', () => {
  const lessons = LEARNING_LESSONS.filter((lesson) => lesson.moduleId === MODULE_8.id)
  assert.equal(MODULE_8.lessons.length, 7)
  assert.equal(lessons.length, 7)
  assert.deepEqual(lessons.map((lesson) => lesson.id), MODULE_8.lessons.map((lesson) => lesson.id))
  for (const lesson of lessons) {
    assert.ok(lesson.steps.length >= 7, `${lesson.id} doit comporter au moins 7 étapes`)
    assert.equal(lesson.quiz.length, 5, `${lesson.id} doit comporter 5 questions de quiz`)
  }
})

test('tous les visuels du module 8 existent réellement', () => {
  const lessons = LEARNING_LESSONS.filter((lesson) => lesson.moduleId === MODULE_8.id)
  const visualIds = lessons.flatMap((lesson) => [...lesson.steps.map((step) => step.visualId), ...lesson.quiz.map((question) => question.visualId)]).filter((id): id is string => Boolean(id))
  for (const visualId of visualIds) {
    const scene = getLearningScene(visualId)
    assert.ok(scene, `Scène introuvable : ${visualId}`)
    assert.ok(scene.image, `Image absente pour : ${visualId}`)
    assert.ok(existsSync(join(process.cwd(), 'public', scene.image.replace(/^\//, ''))), `Fichier absent : ${scene.image}`)
  }
})

test('le défi final du module 8 contient 15 questions valides et illustrées', () => {
  assert.equal(MODULE_EIGHT_FINAL_CHALLENGE.length, 15)
  assert.equal(new Set(MODULE_EIGHT_FINAL_CHALLENGE.map((question) => question.id)).size, 15)
  for (const question of MODULE_EIGHT_FINAL_CHALLENGE) {
    assert.ok(question.options.length >= 2)
    assert.ok(question.correct >= 0 && question.correct < question.options.length)
    assert.ok(question.explanation.length > 0)
    const scene = getLearningScene(question.visualId)
    assert.ok(scene, `Scène introuvable : ${question.visualId}`)
    assert.ok(scene.image, `Image absente pour : ${question.visualId}`)
    assert.ok(existsSync(join(process.cwd(), 'public', scene.image.replace(/^\//, ''))), `Fichier absent : ${scene.image}`)
  }
})
