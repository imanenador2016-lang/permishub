import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const root = process.cwd()
const source = path.join(root, 'public', 'examen-blanc', 'examen-9')
const output = path.join(root, 'output', 'exam9-qa')
fs.mkdirSync(output, { recursive: true })

const files = Array.from({ length: 50 }, (_, index) => {
  const stem = `q${String(index + 1).padStart(2, '0')}`
  const png = path.join(source, `${stem}.png`)
  const webp = path.join(source, `${stem}.webp`)
  return { id: index + 1, file: fs.existsSync(png) ? png : webp }
})

for (let start = 0; start < files.length; start += 10) {
  const batch = files.slice(start, start + 10)
  const tiles = await Promise.all(batch.map(async ({ id, file }) => sharp(file)
    .resize(360, 270, { fit: 'cover' })
    .composite([{ input: Buffer.from(`<svg width="360" height="36"><rect width="360" height="36" fill="rgba(0,0,0,.78)"/><text x="12" y="25" fill="white" font-family="Arial" font-size="22" font-weight="700">Q${String(id).padStart(2, '0')}</text></svg>`), top: 0, left: 0 }])
    .png().toBuffer()))
  await sharp({ create: { width: 720, height: 1350, channels: 3, background: '#fff' } })
    .composite(tiles.map((input, index) => ({ input, left: (index % 2) * 360, top: Math.floor(index / 2) * 270 })))
    .png().toFile(path.join(output, `sheet-${start / 10 + 1}.png`))
}
console.log('5 planches créées')
