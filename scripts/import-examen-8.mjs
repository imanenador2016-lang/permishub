import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const EXAM_NUMBER = process.argv[2] ?? '8'
const SOURCE_DIRECTORY = process.argv[3] ?? 'examen-50'
assertExamNumber(EXAM_NUMBER)
const SOURCE_JSON = path.join(ROOT, SOURCE_DIRECTORY, 'corrections-examen.json')
const SOURCE_IMAGES = path.join(ROOT, SOURCE_DIRECTORY, 'images')
const TARGET_JSON = path.join(ROOT, 'data', 'examens-blancs', `examen-${EXAM_NUMBER}.json`)
const TARGET_IMAGES = path.join(ROOT, 'public', 'examen-blanc', `examen-${EXAM_NUMBER}`)
const EXPECTED_COUNT = 50

function assertExamNumber(value) {
  if (!/^\d+$/.test(value)) throw new Error(`Numéro d'examen invalide: ${value}`)
}

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

function extractEmbeddedChoices(question) {
  const marker = /\s([A-D])\s*(?:\/|:)\s*/g
  const matches = [...question.matchAll(marker)]

  if (matches.length < 2) return null

  const prompt = question.slice(0, matches[0].index).trim()
  const choices = matches.map((match, index) => {
    const start = match.index + match[0].length
    const end = matches[index + 1]?.index ?? question.length
    return `${match[1]}. ${question.slice(start, end).trim()}`
  })

  return { prompt, choices }
}

function questionType(answer) {
  if (/^-?\d+(?:[,.]\d+)?$/.test(answer)) return 'numerique'
  if (answer === 'OUI' || answer === 'NON') return 'oui_non'
  return 'choix_multiple'
}

const source = JSON.parse(fs.readFileSync(SOURCE_JSON, 'utf8'))

assert(source.length === EXPECTED_COUNT, `Le JSON source contient ${source.length} questions au lieu de ${EXPECTED_COUNT}.`)
assert(new Set(source.map((item) => String(item.id_question))).size === EXPECTED_COUNT, 'Les ID de question source ne sont pas uniques.')
assert(new Set(source.map((item) => item.position_session)).size === EXPECTED_COUNT, 'Les positions de session source ne sont pas uniques.')

const converted = source.map((item, index) => {
  assert(item.position_session === index + 1, `Position inattendue pour la question ${item.id_question}: ${item.position_session}.`)
  assert(typeof item.question === 'string' && item.question.trim(), `Texte manquant pour la question ${item.id_question}.`)
  assert(typeof item.bonne_reponse === 'string' && item.bonne_reponse.trim(), `Bonne réponse manquante pour la question ${item.id_question}.`)
  assert(typeof item.image === 'string' && item.image.startsWith('images/'), `Chemin image invalide pour la question ${item.id_question}: ${item.image}.`)
  assert(item.points === null || item.points === 5, `Valeur de points non prise en charge pour la question ${item.id_question}: ${item.points}.`)

  const sourceImage = path.join(ROOT, SOURCE_DIRECTORY, item.image)
  assert(fs.existsSync(sourceImage), `Image introuvable pour la question ${item.id_question}: ${item.image}.`)

  const answer = item.bonne_reponse.trim().toUpperCase()
  const type = questionType(answer)
  let question = item.question.trim()
  let choices = Array.isArray(item.choix) ? item.choix.map((choice) => String(choice).trim()).filter(Boolean) : []

  if (type === 'choix_multiple' && choices.length === 0) {
    const embedded = extractEmbeddedChoices(question)
    assert(embedded, `Choix multiples absents et non extractibles pour la question ${item.id_question}.`)
    question = embedded.prompt
    choices = embedded.choices
  }

  if (type !== 'choix_multiple') choices = []

  if (type === 'choix_multiple') {
    const availableAnswers = new Set(choices.map((choice) => choice.match(/^([A-D])[.:]/)?.[1]).filter(Boolean))
    assert(availableAnswers.has(answer), `La bonne réponse ${answer} n'existe pas dans les choix de la question ${item.id_question}.`)
  }

  const id = Number(item.id_question)
  assert(Number.isSafeInteger(id), `ID non numérique incompatible avec le format actuel: ${item.id_question}.`)

  return {
    id,
    type,
    gravite: item.points === 5 || item.faute_grave === true ? 'grave' : 'normale',
    question,
    choix: choices,
    reponse: answer,
    explication: item.correction == null ? '' : String(item.correction),
    image: `/examen-blanc/examen-${EXAM_NUMBER}/${path.basename(item.image)}`,
  }
})

assert(converted.length === EXPECTED_COUNT, 'La conversion a perdu des questions.')
assert(new Set(converted.map((item) => item.id)).size === EXPECTED_COUNT, 'La conversion a créé des ID en double.')
assert(converted.filter((item) => item.gravite === 'grave').length === source.filter((item) => item.points === 5).length, 'Le nombre de questions à 5 points a changé.')

fs.mkdirSync(TARGET_IMAGES, { recursive: true })
fs.writeFileSync(TARGET_JSON, `${JSON.stringify(converted, null, 2)}\n`, 'utf8')

for (const item of source) {
  const filename = path.basename(item.image)
  const sourceImage = path.join(SOURCE_IMAGES, filename)
  const targetJpeg = path.join(TARGET_IMAGES, filename)
  const targetWebp = path.join(TARGET_IMAGES, filename.replace(/\.jpg$/i, '.webp'))

  fs.copyFileSync(sourceImage, targetJpeg)
  await sharp(sourceImage).webp({ quality: 80 }).toFile(targetWebp)
}

const imported = JSON.parse(fs.readFileSync(TARGET_JSON, 'utf8'))
const missingImages = imported.filter((item) => !fs.existsSync(path.join(ROOT, 'public', item.image.replace(/^\//, ''))))
const associationErrors = source.filter((item, index) => path.basename(item.image) !== path.basename(imported[index].image))

assert(imported.length === EXPECTED_COUNT, `Validation: ${imported.length}/${EXPECTED_COUNT} questions.`)
assert(missingImages.length === 0, `Validation: images JPG manquantes pour les ID ${missingImages.map((item) => item.id).join(', ')}.`)
assert(associationErrors.length === 0, `Validation: associations image incorrectes pour les ID ${associationErrors.map((item) => item.id_question).join(', ')}.`)

console.log(`${imported.length}/${EXPECTED_COUNT} questions importées`)
console.log(`${EXPECTED_COUNT - missingImages.length}/${EXPECTED_COUNT} images JPG trouvées`)
console.log(`${imported.filter((item) => item.gravite === 'grave').length} questions à 5 points`)
console.log(`${imported.filter((item) => item.type === 'oui_non').length} questions OUI/NON`)
console.log(`${imported.filter((item) => item.type === 'numerique').length} questions numériques`)
console.log(`Corrections vides conservées: ${source.filter((item) => item.correction == null || item.correction === '').map((item) => item.id_question).join(', ') || 'aucune'}`)
