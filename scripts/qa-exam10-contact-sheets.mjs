import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const root = process.cwd()
const source = path.join(root, 'public', 'examen-blanc', 'examen-10')
const output = path.join(root, 'output', 'exam10-qa')
fs.mkdirSync(output, { recursive: true })

const files = fs.readdirSync(source)
  .filter((name) => /^q\d{2}\.png$/.test(name))
  .sort((a, b) => a.localeCompare(b))

for (let start = 0; start < files.length; start += 10) {
  const batch = files.slice(start, start + 10)
  const tiles = await Promise.all(batch.map(async (name) => {
    const label = name.slice(0, 3).toUpperCase()
    const image = await sharp(path.join(source, name))
      .resize(360, 270, { fit: 'cover' })
      .composite([{ input: Buffer.from(`<svg width="360" height="36"><rect width="360" height="36" fill="rgba(0,0,0,.78)"/><text x="12" y="25" fill="white" font-family="Arial" font-size="22" font-weight="700">${label}</text></svg>`), top: 0, left: 0 }])
      .png()
      .toBuffer()
    return image
  }))
  const canvas = sharp({ create: { width: 720, height: Math.ceil(batch.length / 2) * 270, channels: 3, background: '#ffffff' } })
  await canvas.composite(tiles.map((input, index) => ({ input, left: (index % 2) * 360, top: Math.floor(index / 2) * 270 })))
    .png()
    .toFile(path.join(output, `sheet-${start / 10 + 1}.png`))
}

console.log(`${files.length} visuels répartis dans ${Math.ceil(files.length / 10)} planches.`)
