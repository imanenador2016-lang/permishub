import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const examsDirectory = path.join(root, 'data', 'examens-blancs')
const files = [
  path.join(root, 'data', 'examen-blanc.json'),
  ...fs
    .readdirSync(examsDirectory)
    .filter((name) => /^examen-\d+\.json$/.test(name))
    .sort((a, b) => Number(a.match(/\d+/)[0]) - Number(b.match(/\d+/)[0]))
    .map((name) => path.join(examsDirectory, name)),
]

const lessonLabel = /\bLE(?:Ç|C)ON\s*(?:N(?:[°ºO]\s*)?)?\d+(?:\s*\+\s*\d+)?(?:\s*[–—-]\s*)?/giu
const remainingLessonLabel = /\bLE(?:Ç|C)ON\s*(?:N(?:[°ºO]\s*)?)?\d+(?:\s*\+\s*\d+)?/iu
let totalQuestions = 0
let changedCorrections = 0
let changedQuestionTexts = 0
let removedLabels = 0

for (const file of files) {
  const questions = JSON.parse(fs.readFileSync(file, 'utf8'))
  if (!Array.isArray(questions)) throw new Error(`Format inattendu: ${file}`)

  let fileChanged = 0
  let fileQuestionTextsChanged = 0
  let fileRemoved = 0

  const cleaned = questions.map((question) => {
    const explanation = typeof question.explication === 'string' ? question.explication : ''
    const questionText = typeof question.question === 'string' ? question.question : ''
    const explanationMatches = explanation.match(lessonLabel) ?? []
    const questionMatches = questionText.match(lessonLabel) ?? []
    if (explanationMatches.length === 0 && questionMatches.length === 0) return question

    const updatedExplanation = explanation.replace(lessonLabel, '')
    const updatedQuestionText = questionText.replace(lessonLabel, '')
    if (explanationMatches.length > 0) fileChanged += 1
    if (questionMatches.length > 0) fileQuestionTextsChanged += 1
    fileRemoved += explanationMatches.length + questionMatches.length
    return { ...question, question: updatedQuestionText, explication: updatedExplanation }
  })

  totalQuestions += questions.length
  changedCorrections += fileChanged
  changedQuestionTexts += fileQuestionTextsChanged
  removedLabels += fileRemoved

  if (fileChanged > 0 || fileQuestionTextsChanged > 0) {
    fs.writeFileSync(file, `${JSON.stringify(cleaned, null, 2)}\n`, 'utf8')
  }

  console.log(
    `${path.basename(file)}: ${fileChanged} correction(s), ${fileQuestionTextsChanged} question(s), ${fileRemoved} libellé(s) supprimé(s)`,
  )
}

for (const file of files) {
  const questions = JSON.parse(fs.readFileSync(file, 'utf8'))
  const remaining = questions.filter(
    (question) =>
      (typeof question.explication === 'string' && remainingLessonLabel.test(question.explication)) ||
      (typeof question.question === 'string' && remainingLessonLabel.test(question.question)),
  )
  if (remaining.length > 0) {
    throw new Error(`Libellés restants dans ${file}: ${remaining.map((question) => question.id).join(', ')}`)
  }
}

console.log(`${files.length} examens vérifiés`)
console.log(`${totalQuestions} questions vérifiées`)
console.log(`${changedCorrections} corrections nettoyées`)
console.log(`${changedQuestionTexts} textes de question nettoyés`)
console.log(`${removedLabels} libellés de leçon supprimés`)
