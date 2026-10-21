import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'

const root = process.cwd()
const dataFile = path.join(root, 'data', 'examens-blancs', 'examen-10.json')
const assetDir = path.join(root, 'public', 'examen-blanc', 'examen-10')
const questions = JSON.parse(fs.readFileSync(dataFile, 'utf8'))

const visualIds = Array.from({ length: 50 }, (_, index) => index + 1)
const protectedFields = (rows) => rows.map(({ id, type, gravite, question, choix, reponse, explication }) => ({
  id, type, gravite, question, choix, reponse, explication,
}))
const fingerprint = (value) => crypto.createHash('sha256').update(JSON.stringify(value)).digest('hex')
const before = fingerprint(protectedFields(questions))

for (const question of questions) {
  delete question.image
  delete question.needsNewImage
  delete question.imageBrief
  if (visualIds.includes(question.id)) {
    const filename = `q${String(question.id).padStart(2, '0')}.webp`
    const absolute = path.join(assetDir, filename)
    if (!fs.existsSync(absolute) || fs.statSync(absolute).size === 0) {
      throw new Error(`Fichier manquant pour Q${question.id}: ${absolute}`)
    }
    question.image = `/examen-blanc/examen-10/${filename}`
  }
}

const after = fingerprint(protectedFields(questions))
if (before !== after) throw new Error('Un champ protégé de question/réponse a été modifié.')
fs.writeFileSync(dataFile, `${JSON.stringify(questions, null, 2)}\n`)

const missingFiles = visualIds.filter((id) => {
  const file = path.join(assetDir, `q${String(id).padStart(2, '0')}.webp`)
  return !fs.existsSync(file) || fs.statSync(file).size === 0
})
const staleReferences = questions.filter((q) => q.image && !q.image.startsWith('/examen-blanc/examen-10/q')).map((q) => q.id)
const report = {
  exam: 10,
  totalQuestions: questions.length,
  createdImages: visualIds.length,
  questionsWithImage: questions.filter((q) => q.image).map((q) => q.id),
  questionsWithoutImage: questions.filter((q) => !q.image).map((q) => q.id),
  protectedContentFingerprint: before,
  protectedContentUnchanged: before === after,
  missingFiles,
  staleReferences,
}
fs.writeFileSync(path.join(root, 'docs', 'rapport-visuels-examen-10.json'), `${JSON.stringify(report, null, 2)}\n`)
console.log(JSON.stringify(report, null, 2))
