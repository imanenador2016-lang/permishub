import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const publicRoot = path.join(root, 'public')
const expected = { 1: 49, 2: 50, 3: 49, ...Object.fromEntries(Array.from({ length: 12 }, (_, i) => [i + 4, 50])) }
const activeExams = new Set(Array.from({ length: 12 }, (_, i) => i + 3))
const allowedTypes = new Set(['choix_multiple', 'oui_non', 'numerique'])
const allowedGravity = new Set(['normale', 'grave'])
// Visuels contrôlés manuellement le 20/10/2026 : les repères cités sont intégrés à l'image.
// Toute nouvelle référence alphanumérique doit être revue visuellement avant d'entrer dans cette liste.
const verifiedVisualReferences = new Set([
  'E3Q14', 'E3Q18', 'E4Q36', 'E5Q10', 'E7Q40', 'E8Q29', 'E8Q37', 'E8Q47',
  'E9Q22', 'E10Q2', 'E10Q5', 'E10Q20', 'E10Q28', 'E10Q33', 'E10Q38',
  'E11Q3', 'E11Q13', 'E11Q36', 'E11Q46', 'E12Q15', 'E13Q17', 'E14Q8', 'E14Q32', 'E14Q49',
])
// Le point d’interrogation est déjà intégré aux pixels de ce visuel.
const verifiedQuestionMarkReferences = new Set(['E7Q50'])
// Régressions pédagogiques déjà confirmées par une source officielle ou par
// la géométrie non ambiguë du visuel. Une modification involontaire bloque l'audit.
const criticalAnswers = new Map([
  ['E1Q13', 'A'],
  ['E4Q30', 'B'],
  ['E5Q4', 'A'],
  ['E5Q14', 'OUI'],
  ['E5Q45', 'C'],
  ['E7Q31', '120'],
  ['E7Q41', 'A'],
  ['E8Q37', 'B'],
  ['E9Q9', 'C'],
  ['E10Q1', 'OUI'],
  ['E10Q2', 'B'],
  ['E10Q6', 'C'],
  ['E11Q3', 'B'],
  ['E11Q18', 'B'],
  ['E13Q16', 'A'],
  ['E13Q14', 'A'],
  ['E11Q29', 'B'],
  ['E14Q40', 'B'],
  ['E14Q24', 'B'],
  ['E14Q47', 'A'],
  ['E14Q26', 'C'],
])
const criticalImages = new Map([
  ['E8Q37', '/examen-blanc/examen-11/q03-b17-fixed.png'],
  ['E11Q3', '/examen-blanc/examen-11/q03-b17-fixed.png'],
  ['E11Q18', '/examen-blanc/examen-11/q18-simple.png'],
  ['E11Q31', '/examen-blanc/examen-11/q31-fixed.png'],
  ['E11Q43', '/examen-blanc/examen-10/q07.webp'],
  ['E14Q47', '/examen-blanc/examen-13/q16.webp'],
])
const forbiddenQuestionText = new Map([
  ['E7Q6', /jaune/i],
  ['E7Q17', /jaune/i],
])
const numberedVisualReferencePattern = /(?:panneau|signal|dessin|sch[eé]ma|voiture|v[eé]hicule|moto|cyclomoteur)\s*(?:routier\s*)?[1-4]\b/i
const letteredVisualReferencePattern = /(?:Panneau|Signal|Dessin|Sch[eé]ma|Voiture|V[eé]hicule|Moto|Cyclomoteur)\s*(?:routier\s*)?[A-D]\b/
const questionMarkReferencePattern = /point d[’']interrogation/i
const invalidVehicleAgreementPattern = /\b(?:Le|le) véhicule (?:bleue|brune|verte|blanche|grise)\b/
const errors = []
const warnings = []
const normalizedQuestions = new Map()
const inventory = []
let total = 0

function add(map, key, ref) {
  if (!map.has(key)) map.set(key, [])
  map.get(key).push(ref)
}

function publicFileExists(url) {
  if (!url?.startsWith('/')) return false
  const clean = decodeURIComponent(url.split(/[?#]/)[0]).replace(/^\/+/, '')
  return fs.existsSync(path.join(publicRoot, clean))
}

for (let exam = 1; exam <= 15; exam++) {
  const file = path.join(root, exam === 1 ? 'data/examen-blanc.json' : `data/examens-blancs/examen-${exam}.json`)
  const rows = JSON.parse(fs.readFileSync(file, 'utf8'))
  const ids = new Set()
  let imageCount = 0
  let legalReviewCount = 0
  let newImageCount = 0

  if (rows.length !== expected[exam]) errors.push(`Examen ${exam}: ${rows.length} questions au lieu de ${expected[exam]}`)

  for (const q of rows) {
    total++
    const ref = `E${exam}Q${q.id}`
    if (!Number.isInteger(q.id) || q.id < 1) errors.push(`${ref}: identifiant invalide`)
    if (ids.has(q.id)) errors.push(`${ref}: identifiant duplique`)
    ids.add(q.id)
    if (!allowedTypes.has(q.type)) errors.push(`${ref}: type invalide (${q.type})`)
    if (!allowedGravity.has(q.gravite)) errors.push(`${ref}: gravite invalide (${q.gravite})`)
    for (const field of ['question', 'explication', 'reponse']) if (!String(q[field] ?? '').trim()) errors.push(`${ref}: ${field} vide`)
    if (!Array.isArray(q.choix)) errors.push(`${ref}: choix invalide`)
    else if (q.type === 'choix_multiple') {
      if (q.choix.length < 2 || q.choix.length > 4) errors.push(`${ref}: nombre de choix invalide (${q.choix.length})`)
      const letters = q.choix.map((choice) => String(choice).match(/^\s*([A-D])[.:)]\s+/)?.[1]).filter(Boolean)
      if (letters.length !== q.choix.length) errors.push(`${ref}: un choix ne commence pas par A, B, C ou D`)
      if (new Set(letters).size !== letters.length) errors.push(`${ref}: lettres de choix dupliquees`)
      if (!letters.includes(String(q.reponse).trim().toUpperCase())) errors.push(`${ref}: reponse ${q.reponse} absente des choix`)
    } else if (q.type === 'oui_non') {
      if (!['OUI', 'NON'].includes(String(q.reponse).trim().toUpperCase())) errors.push(`${ref}: reponse oui/non invalide (${q.reponse})`)
    } else if (q.type === 'numerique' && !/^-?\d+(?:[.,]\d+)?$/.test(String(q.reponse).trim())) errors.push(`${ref}: reponse numerique invalide (${q.reponse})`)

    if (q.image) {
      imageCount++
      if (!publicFileExists(q.image)) errors.push(`${ref}: image introuvable (${q.image})`)
    } else if (activeExams.has(exam)) errors.push(`${ref}: aucune image pour une serie active`)
    if (q.needsNewImage) {
      newImageCount++
      if (!String(q.imageBrief ?? '').trim()) errors.push(`${ref}: imageBrief manquant`)
    }
    if (q.needsLegalReview) legalReviewCount++
    if (q.visualAnnotations) {
      if (!Array.isArray(q.visualAnnotations)) errors.push(`${ref}: visualAnnotations invalide`)
      else for (const annotation of q.visualAnnotations) {
        if (!/^(?:[A-D1-4]|\?)$/.test(String(annotation.label))) errors.push(`${ref}: libelle d'annotation invalide`)
        if (![annotation.x, annotation.y].every((value) => Number.isFinite(value) && value >= 0 && value <= 100)) errors.push(`${ref}: coordonnees d'annotation invalides`)
      }
    }

    const visualReferenceText = [q.question, ...(q.choix ?? [])].join(' ')
    if (invalidVehicleAgreementPattern.test([q.question, ...(q.choix ?? []), q.explication].join(' '))) {
      errors.push(`${ref}: accord incorrect après « véhicule »`)
    }
    const hasVisualReference = numberedVisualReferencePattern.test(visualReferenceText) || letteredVisualReferencePattern.test(visualReferenceText)
    if (activeExams.has(exam) && hasVisualReference && !verifiedVisualReferences.has(ref)) {
      errors.push(`${ref}: reference visuelle alphanumerique non validee`)
    }
    if (activeExams.has(exam) && questionMarkReferencePattern.test(q.question)) {
      const hasQuestionMark = q.visualAnnotations?.some(({ label }) => label === '?') || verifiedQuestionMarkReferences.has(ref)
      if (!hasQuestionMark) errors.push(`${ref}: point d'interrogation cite mais absent du visuel`)
    }
    if (criticalAnswers.has(ref) && String(q.reponse).trim().toUpperCase() !== criticalAnswers.get(ref)) {
      errors.push(`${ref}: regression de reponse critique (attendu ${criticalAnswers.get(ref)}, trouve ${q.reponse})`)
    }
    if (criticalImages.has(ref) && q.image !== criticalImages.get(ref)) {
      errors.push(`${ref}: regression de visuel critique (attendu ${criticalImages.get(ref)}, trouve ${q.image})`)
    }
    if (forbiddenQuestionText.has(ref) && forbiddenQuestionText.get(ref).test([q.question, ...q.choix, q.explication].join(' '))) {
      errors.push(`${ref}: le texte mentionne encore un element absent du visuel`)
    }

    const key = String(q.question).toLocaleLowerCase('fr').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, ' ').trim()
    add(normalizedQuestions, key, ref)
  }

  if (ids.size && (Math.min(...ids) !== 1 || Math.max(...ids) !== rows.length)) errors.push(`Examen ${exam}: plage d'identifiants non continue`)
  inventory.push({ exam, active: activeExams.has(exam), questions: rows.length, images: imageCount, needsLegalReview: legalReviewCount, needsNewImage: newImageCount, file: path.relative(root, file).replaceAll('\\', '/') })
}

const duplicates = [...normalizedQuestions.entries()].filter(([, refs]) => refs.length > 1).map(([, refs]) => refs)
if (duplicates.length) warnings.push(`${duplicates.length} textes de question reutilises; une verification semantique croisee est requise`)
const report = { ok: errors.length === 0, generatedAt: new Date().toISOString(), series: inventory.length, totalQuestions: total, activeSeries: inventory.filter((item) => item.active).length, activeQuestions: inventory.filter((item) => item.active).reduce((sum, item) => sum + item.questions, 0), inventory, duplicateQuestionGroups: duplicates, errors, warnings }
console.log(JSON.stringify(report, null, 2))
if (process.argv.includes('--write')) {
  const output = path.join(root, 'output/audit-examens/structure.json')
  fs.mkdirSync(path.dirname(output), { recursive: true })
  fs.writeFileSync(output, `${JSON.stringify(report, null, 2)}\n`)
}
if (errors.length) process.exitCode = 1
