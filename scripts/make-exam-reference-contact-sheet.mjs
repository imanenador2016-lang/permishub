import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const root = process.cwd()
const findings = JSON.parse(fs.readFileSync(path.join(root, 'output/audit-examens/reference-labels.json'), 'utf8')).filter(({ missing }) => missing.length)
const cellW = 360
const cellH = 300
const cols = 4
const rows = Math.ceil(findings.length / cols)
const composites = []

for (const [index, item] of findings.entries()) {
  const source = path.join(root, 'public', item.image.replace(/^\//, ''))
  const picture = await sharp(source).resize(cellW - 12, 235, { fit: 'contain', background: '#efe9d8' }).png().toBuffer()
  const label = `Examen ${item.exam} · Q${item.position} · manque ${item.missing.join('/')}`
  const caption = Buffer.from(`<svg width="${cellW}" height="55"><rect width="100%" height="100%" fill="#fffaf0"/><text x="10" y="23" font-family="Arial" font-size="18" font-weight="700" fill="#1f1a14">${label}</text><text x="10" y="45" font-family="Arial" font-size="13" fill="#7a321f">${path.basename(item.image)}</text></svg>`)
  const x = (index % cols) * cellW
  const y = Math.floor(index / cols) * cellH
  composites.push({ input: picture, left: x + 6, top: y + 4 }, { input: caption, left: x, top: y + 240 })
}

const output = path.join(root, 'output/audit-examens/reference-labels-contact-sheet.jpg')
await sharp({ create: { width: cols * cellW, height: rows * cellH, channels: 3, background: '#d9d5ca' } }).composite(composites).jpeg({ quality: 88 }).toFile(output)
console.log(output)
