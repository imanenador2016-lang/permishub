import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'

const root = process.cwd()
const dataFile = path.join(root, 'data', 'examens-blancs', 'examen-9.json')
const assetDir = path.join(root, 'public', 'examen-blanc', 'examen-9')
const questions = JSON.parse(fs.readFileSync(dataFile, 'utf8'))

const protectedFields = (rows) => rows.map(({ id, type, gravite, question, choix, reponse, explication }) => ({
  id, type, gravite, question, choix, reponse, explication,
}))
const fingerprint = (value) => crypto.createHash('sha256').update(JSON.stringify(value)).digest('hex')
const before = fingerprint(protectedFields(questions))

const visuals = new Map([
  [1, 'Fin de la limitation à 70 km/h sur une route ordinaire flamande.'],
  [2, 'Voiture arrêtée le long d’une ligne jaune continue.'],
  [4, 'Voiture ayant dépassé la sortie d’autoroute.'],
  [5, 'Signal obligatoire commun aux piétons et cyclistes.'],
  [7, 'Zone de stationnement réservée aux véhicules de 3,5 t maximum.'],
  [9, 'Agent au centre d’un carrefour, bras tendus, avec trois usagers.'],
  [10, 'Minibus identifié par le panneau jaune de transport scolaire.'],
  [14, 'Limitation ponctuelle à 30 km/h, sans signal de zone.'],
  [16, 'Signal belge B1 : céder le passage.'],
  [19, 'Compartiment moteur avec cinq repères techniques; liquide de frein n° 2.'],
  [23, 'Entrée d’une zone résidentielle belge.'],
  [25, 'Limitation à 90 km/h affectée uniquement à la sortie.'],
  [26, 'Intersection avec priorité de droite; véhicule rouge prioritaire.'],
  [30, 'Obstacle pouvant être contourné par la gauche ou par la droite.'],
  [31, 'Carrefour aménagé sur un dispositif surélevé.'],
  [33, 'Route pour automobiles en Région flamande.'],
  [34, 'Signal belge A51 de danger non défini.'],
  [36, 'Automobile engagée sur une autoroute après avoir manqué sa direction.'],
  [37, 'Limitation à 90 km/h, limite administrative et intersection suivante.'],
  [38, 'Arrêt temporaire devant un accès carrossable privé.'],
  [40, 'Signal belge C1 : sens interdit.'],
  [45, 'Deux signaux imposant tous deux de tourner à gauche.'],
  [47, 'Annonce d’un passage à niveau à 150 mètres.'],
  [49, 'Sens interdit avec exception pour cycles et speed pedelecs.'],
  [50, 'Limitation à 50 km/h affectée uniquement à une sortie autoroutière.'],
])

for (let id = 1; id <= 50; id += 1) {
  if (!visuals.has(id)) visuals.set(id, `Visuel original correspondant à la question ${id}.`)
}

for (const q of questions) {
  delete q.image
  delete q.needsNewImage
  delete q.imageBrief
  if (visuals.has(q.id)) {
    const filename = `q${String(q.id).padStart(2, '0')}.webp`
    const absolute = path.join(assetDir, filename)
    if (!fs.existsSync(absolute)) throw new Error(`Fichier manquant pour Q${q.id}: ${absolute}`)
    q.image = `/examen-blanc/examen-9/${filename}`
  }
}

const after = fingerprint(protectedFields(questions))
if (before !== after) throw new Error('Un champ protégé de question/réponse a été modifié.')
fs.writeFileSync(dataFile, `${JSON.stringify(questions, null, 2)}\n`)

const missing = []
for (const [id] of visuals) {
  const file = path.join(assetDir, `q${String(id).padStart(2, '0')}.webp`)
  if (!fs.existsSync(file) || fs.statSync(file).size === 0) missing.push(id)
}
const report = {
  exam: 9,
  totalQuestions: questions.length,
  createdImages: visuals.size,
  questionsWithoutImage: questions.length - visuals.size,
  unresolvedVisuals: [],
  protectedContentFingerprint: before,
  protectedContentUnchanged: before === after,
  missingFiles: missing,
  visuals: Object.fromEntries([...visuals].map(([id, description]) => [`Q${id}`, {
    image: `/examen-blanc/examen-9/q${String(id).padStart(2, '0')}.webp`, description,
  }])),
}
fs.writeFileSync(path.join(root, 'docs', 'rapport-visuels-examen-9.json'), `${JSON.stringify(report, null, 2)}\n`)
console.log(JSON.stringify(report, null, 2))
