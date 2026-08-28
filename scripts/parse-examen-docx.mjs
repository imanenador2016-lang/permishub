import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'

/**
 * Extrait un examen blanc "photo" (questions + choix + bonne réponse +
 * explication + photo) depuis un .docx exporté d'un site de préparation au
 * permis (format vu avec examens 2/3/4.docx — voir conversation du
 * 2026-08-24/26). Usage :
 *
 *   node scripts/parse-examen-docx.mjs <fichier.docx> <nom-sortie>
 *
 * Sort dans un dossier de travail (par défaut le dossier TEMP) :
 *   <nom-sortie>-questions.json   — questions structurées, prêtes à relire
 *   <nom-sortie>-source-map.json  — id -> nom de fichier image source (pour
 *                                    scripts/process-exam-blanc-images.mjs)
 * et affiche les vérifications (comptes par type/gravité, anomalies).
 *
 * Ne touche PAS data/ ni public/ — c'est une étape d'inspection/extraction
 * intermédiaire, à relire avant de finaliser (voir docs/CONTENT_PIPELINE.md).
 */

const [, , docxPath, outName] = process.argv
if (!docxPath || !outName) {
  console.error('Usage: node scripts/parse-examen-docx.mjs <fichier.docx> <nom-sortie>')
  process.exit(1)
}

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const WORK_DIR = path.join(process.env.TEMP ?? '/tmp', 'examen-parse-' + outName)
const EXTRACT_DIR = path.join(WORK_DIR, 'extracted')

fs.rmSync(WORK_DIR, { recursive: true, force: true })
fs.mkdirSync(EXTRACT_DIR, { recursive: true })
execSync(`unzip -o -q "${docxPath}" -d "${EXTRACT_DIR}"`)

const xml = fs.readFileSync(path.join(EXTRACT_DIR, 'word/document.xml'), 'utf8')
const relsXml = fs.readFileSync(path.join(EXTRACT_DIR, 'word/_rels/document.xml.rels'), 'utf8')

const relMap = {}
for (const m of relsXml.matchAll(/<Relationship Id="(rId\d+)"[^>]*Target="media\/([^"]+)"/g)) {
  relMap[m[1]] = m[2]
}

const paragraphs = xml.match(/<w:p\b[\s\S]*?<\/w:p>/g) || []
const NBSP = String.fromCharCode(160)

function paragraphText(p) {
  const parts = []
  for (const m of p.matchAll(/<w:t(?:\s[^>]*)?>([\s\S]*?)<\/w:t>/g)) parts.push(m[1])
  return parts
    .join('')
    .split(NBSP)
    .join(' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
}
function paragraphImages(p) {
  const ids = []
  for (const m of p.matchAll(/r:embed="(rId\d+)"/g)) ids.push(m[1])
  return ids.map((id) => relMap[id]).filter(Boolean)
}

const rows = paragraphs
  .map((p) => ({ text: paragraphText(p).trim(), images: paragraphImages(p) }))
  .filter((r) => r.text || r.images.length)

const GRAVE_MARK = '*** Question de 5 points ***'
const LABELS = new Set(['Fautif', 'Correct'])
const isBigIdMarker = (t) => /^Question \d+$/.test(t)
const isCorrectLine = (t) => t.startsWith('Correct =')

const boundaries = []
for (let k = 0; k < rows.length; k++) {
  const m = rows[k].text.match(/^Question (\d+)$/)
  if (!m) continue
  const next = rows[k + 1]
  if (next && next.images.length && !next.text) boundaries.push({ row: k, n: Number(m[1]) })
}

const questions = []
const orphans = []

for (let b = 0; b < boundaries.length; b++) {
  const start = boundaries[b].row
  const end = b + 1 < boundaries.length ? boundaries[b + 1].row : rows.length
  const block = rows.slice(start, end)
  let i = 1

  const image = block[i] && block[i].images[0] ? block[i].images[0] : null
  if (block[i]) i++

  let bigId = null
  if (block[i] && isBigIdMarker(block[i].text)) {
    bigId = block[i].text.replace('Question ', '')
    i++
  }

  let gravite = 'normale'
  if (block[i] && block[i].text === GRAVE_MARK) {
    gravite = 'grave'
    i++
  }

  let contentText = ''
  if (block[i] && block[i].text && !LABELS.has(block[i].text) && !isCorrectLine(block[i].text)) {
    contentText = block[i].text
    i++
  }
  if (block[i] && LABELS.has(block[i].text)) i++

  let reponse = null
  if (block[i] && isCorrectLine(block[i].text)) {
    reponse = block[i].text.replace('Correct =', '').trim()
    i++
  }
  if (block[i] && block[i].images.length && !block[i].text) i++

  // Explication : tout texte non vide jusqu'au premier repère de "chrome"
  // du site source (bandeau de navigation / récap de score qui se répète
  // après chaque question dans certains exports) — pas seulement les
  // paragraphes qui commencent littéralement par "LEÇON"/"Explication :".
  const CHROME_RE = /^(Permis De Conduire Online|Home|Theorie|Examens|Reactions|Pratique|Forum|Gagnez|Code|Divers|Examen [A-Z]|\d+\/\d+\s*»)/i
  const explicationParts = []
  while (block[i] && block[i].text && !CHROME_RE.test(block[i].text) && !isBigIdMarker(block[i].text)) {
    explicationParts.push(block[i].text)
    i++
  }
  const explication = explicationParts.join(' ')

  const leftover = block.slice(i)
  if (leftover.some((r) => r.text || r.images.length)) {
    orphans.push({ afterQuestion: boundaries[b].n, leftover })
  }

  const hasLetteredChoices = contentText.search(/A\s?[./:]\s/) !== -1

  let type
  if (/^(Entrez|Introduisez) un nombre[.:]/i.test(contentText)) type = 'numerique'
  else if (reponse === 'OUI' || reponse === 'NON') type = 'oui_non'
  // Certaines questions numériques n'ont pas le préfixe "Entrez/Introduisez
  // un nombre" littéral (ex. "... à une vitesse maximale de (...) km/h.") —
  // détectées par élimination : pas de choix A/B/C/D et réponse numérique.
  else if (!hasLetteredChoices && reponse != null && /^\d+$/.test(reponse)) type = 'numerique'
  else type = 'choix_multiple'

  let prompt = contentText
  let choix = []
  if (type === 'choix_multiple' && contentText) {
    const aPos = contentText.search(/A\s?[./:]\s/)
    if (aPos !== -1) {
      prompt = contentText.slice(0, aPos).trim()
      choix = contentText
        .slice(aPos)
        .split(/(?=[A-D]\s?[./:]\s)/g)
        .map((s) => s.trim())
        .filter(Boolean)
    }
  }

  // Anomalies : question sans texte/photo, sans réponse, ou choix multiple
  // avec moins de 2 options — signalées, jamais devinées.
  const problems = []
  if (!image) problems.push('image manquante')
  if (!prompt) problems.push('texte manquant')
  if (!reponse) problems.push('réponse manquante')
  if (type === 'choix_multiple' && choix.length < 2) problems.push('moins de 2 choix détectés')

  questions.push({ label: boundaries[b].n, bigId, type, gravite, question: prompt, choix, reponse, explication, image, problems })
}

const usableWithDupes = questions.filter((q) => q.problems.length === 0)
const dropped = questions.filter((q) => q.problems.length > 0)

// Dédoublonne les questions identiques (même texte + même réponse) — vu au
// moins une fois dans le document source (deux blocs "Question N" avec le
// même contenu mot pour mot, voir conversation).
const seen = new Set()
const duplicates = []
const usable = usableWithDupes.filter((q) => {
  const key = q.question + '|' + q.reponse
  if (seen.has(key)) {
    duplicates.push(q)
    return false
  }
  seen.add(key)
  return true
})

const final = usable.map((q, idx) => ({
  id: idx + 1,
  type: q.type,
  gravite: q.gravite,
  question: q.question,
  choix: q.choix,
  reponse: q.reponse,
  explication: q.explication,
  image: `/examen-blanc/${outName}/q${String(idx + 1).padStart(2, '0')}.jpg`,
}))
const sourceMap = usable.map((q, idx) => ({ id: idx + 1, image: q.image }))

fs.writeFileSync(path.join(WORK_DIR, 'questions.json'), JSON.stringify(final, null, 2))
fs.writeFileSync(path.join(WORK_DIR, 'source-map.json'), JSON.stringify(sourceMap, null, 2))

console.log(`\n=== ${outName} ===`)
console.log('Dossier de travail :', WORK_DIR)
console.log('Boundaries (questions numérotées trouvées) :', boundaries.length, '—', boundaries.map((b) => b.n).join(','))
console.log('Questions utilisables :', usable.length, duplicates.length ? `(${duplicates.length} doublon(s) exact(s) retiré(s), label(s) ${duplicates.map((d) => d.label).join(',')})` : '')
console.log('Par type :', usable.reduce((a, q) => ((a[q.type] = (a[q.type] || 0) + 1), a), {}))
console.log('Par gravité :', usable.reduce((a, q) => ((a[q.gravite] = (a[q.gravite] || 0) + 1), a), {}))
if (dropped.length) {
  console.log('\n⚠ Questions écartées (incomplètes) :')
  for (const q of dropped) {
    console.log(`  - label ${q.label} (bigId ${q.bigId}) : ${q.problems.join(', ')}`)
    console.log(`    question="${q.question}"`)
    console.log(`    choix=${JSON.stringify(q.choix)}`)
    console.log(`    reponse=${q.reponse}`)
  }
}
const substantiveOrphans = orphans.filter((o) =>
  o.leftover.some((r) => r.text && !['Examen B', 'Examen C', 'Examen D'].includes(r.text) && !/^(Home|Theorie|Examens|Reactions|Pratique|Forum|Gagnez|Code|Divers|Permis De Conduire Online)/.test(r.text)),
)
if (substantiveOrphans.length) {
  console.log('\n⚠ Segments orphelins substantiels (à relire) :')
  for (const o of substantiveOrphans) {
    console.log(`  -- après Question ${o.afterQuestion} --`)
    console.log('    ', o.leftover.map((r) => r.text || `[image:${r.images.join(',')}]`).filter(Boolean).join(' | '))
  }
}
