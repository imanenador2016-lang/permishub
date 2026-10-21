import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const root = process.cwd()
const outputDir = path.join(root, 'output/audit-examens/vitesse')
fs.mkdirSync(outputDir, { recursive: true })
const candidates = []

for (let exam = 3; exam <= 14; exam++) {
  const rows = JSON.parse(fs.readFileSync(path.join(root, `data/examens-blancs/examen-${exam}.json`), 'utf8'))
  for (const question of rows) {
    const text = [question.question, ...(question.choix ?? []), question.explication].join(' ')
    if (/vitesse|km\s*\/\s*h|km\/heure|kilom[eè]tres?\s+(?:à|a)\s+l.heures?/i.test(text)) candidates.push({ exam, ...question })
  }
}

const escape = (value) => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
const wrap = (value, max = 43) => {
  const words = String(value).split(/\s+/)
  const lines = []
  let line = ''
  for (const word of words) {
    if (`${line} ${word}`.trim().length > max && line) { lines.push(line); line = word } else line = `${line} ${word}`.trim()
  }
  if (line) lines.push(line)
  return lines.slice(0, 3)
}

const cellW = 360
const cellH = 350
const cols = 4
const perSheet = 20
for (let start = 0; start < candidates.length; start += perSheet) {
  const page = candidates.slice(start, start + perSheet)
  const rows = Math.ceil(page.length / cols)
  const composites = []
  for (const [index, item] of page.entries()) {
    const source = path.join(root, 'public', item.image.replace(/^\//, ''))
    const picture = await sharp(source).resize(cellW - 12, 230, { fit: 'contain', background: '#e5e2d8' }).png().toBuffer()
    const lines = wrap(item.question)
    const lineSvg = lines.map((line, lineIndex) => `<text x="10" y="${48 + lineIndex * 18}" font-family="Arial" font-size="13" fill="#1f1a14">${escape(line)}</text>`).join('')
    const caption = Buffer.from(`<svg width="${cellW}" height="112"><rect width="100%" height="100%" fill="#fffaf0"/><text x="10" y="24" font-family="Arial" font-size="17" font-weight="700" fill="#1f5d46">E${item.exam} Q${item.id} · réponse ${escape(item.reponse)}</text>${lineSvg}</svg>`)
    const x = (index % cols) * cellW
    const y = Math.floor(index / cols) * cellH
    composites.push({ input: picture, left: x + 6, top: y + 4 }, { input: caption, left: x, top: y + 234 })
  }
  const output = path.join(outputDir, `vitesse-${String(start / perSheet + 1).padStart(2, '0')}.jpg`)
  await sharp({ create: { width: cols * cellW, height: rows * cellH, channels: 3, background: '#d9d5ca' } }).composite(composites).jpeg({ quality: 90 }).toFile(output)
}

fs.writeFileSync(path.join(outputDir, 'questions.json'), `${JSON.stringify(candidates.map(({ exam, id, question, choix, reponse, explication, image, needsLegalReview }) => ({ exam, id, question, choix, reponse, explication, image, needsLegalReview })), null, 2)}\n`)
console.log(JSON.stringify({ candidates: candidates.length, sheets: Math.ceil(candidates.length / perSheet), outputDir }))
