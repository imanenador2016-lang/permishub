import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

/**
 * Traite les 11 photos du nouveau "Teste ton niveau" (extraites de
 * test-evaluation-.docx, voir conversation du 2026-08-28) : déjà en bonne
 * résolution (600-1024px de large), donc pas d'upscale — juste
 * redimensionnement à la largeur d'affichage réelle, badge PermisHub, export
 * JPEG + WebP. Sortie : public/test-de-niveau/qNN.{jpg,webp}.
 */

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const SRC_DIR = process.env.SRC_DIR
const OUT_DIR = path.join(ROOT, 'public', 'test-de-niveau')
const FONT_PATH = path.join(ROOT, 'scripts', 'assets', 'ArchivoBlack.ttf')

if (!SRC_DIR) {
  console.error('SRC_DIR manquant')
  process.exit(1)
}
fs.mkdirSync(OUT_DIR, { recursive: true })

const INK = '#1F1A14'
const CREAM = '#F7F1E4'
const BRICK = '#C1432E'
const MAX_W = 700
const JPEG_QUALITY = 82
const WEBP_QUALITY = 80

function pillSvg(badgeW, badgeH, borderW) {
  const radius = badgeH / 2
  return Buffer.from(`
  <svg width="${badgeW}" height="${badgeH}" xmlns="http://www.w3.org/2000/svg">
    <rect x="${borderW / 2}" y="${borderW / 2}" width="${badgeW - borderW}" height="${badgeH - borderW}"
          rx="${radius}" ry="${radius}" fill="${CREAM}" fill-opacity="0.94" stroke="${INK}" stroke-width="${borderW}" />
  </svg>`)
}

async function makeBadge(targetW, targetH) {
  const badgeH = Math.round(targetH * 0.1)
  const borderW = Math.max(3, Math.round(badgeH * 0.09))
  const fontPx = Math.round(badgeH * 0.46)

  const textBuf = await sharp({
    text: {
      text: `<span foreground="${INK}">Permis</span><span foreground="${BRICK}">Hub</span>`,
      font: `Archivo Black ${fontPx}px`,
      fontfile: FONT_PATH,
      rgba: true,
    },
  })
    .png()
    .toBuffer()
  const textMeta = await sharp(textBuf).metadata()

  const paddingX = Math.round(badgeH * 0.55)
  const badgeW = textMeta.width + paddingX * 2
  const pill = pillSvg(badgeW, badgeH, borderW)

  const badge = await sharp(pill)
    .composite([{ input: textBuf, left: Math.round((badgeW - textMeta.width) / 2), top: Math.round((badgeH - textMeta.height) / 2) }])
    .png()
    .toBuffer()

  const margin = Math.round(targetW * 0.02)
  return { badge, left: targetW - badgeW - margin, top: targetH - badgeH - margin }
}

async function processOne(srcFilename, outName) {
  const srcPath = path.join(SRC_DIR, srcFilename)
  const meta = await sharp(srcPath).metadata()
  const resize = meta.width > MAX_W ? { width: MAX_W } : {}

  const resizedBuf = await sharp(srcPath).resize(resize).sharpen({ sigma: 0.6 }).toBuffer()
  const resizedMeta = await sharp(resizedBuf).metadata()
  const { badge, left, top } = await makeBadge(resizedMeta.width, resizedMeta.height)
  const composited = await sharp(resizedBuf).composite([{ input: badge, left, top }]).toBuffer()

  const jpegBuf = await sharp(composited).jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer()
  const webpBuf = await sharp(composited).webp({ quality: WEBP_QUALITY }).toBuffer()

  fs.writeFileSync(path.join(OUT_DIR, outName), jpegBuf)
  fs.writeFileSync(path.join(OUT_DIR, outName.replace(/\.jpg$/, '.webp')), webpBuf)
  return { outName, from: `${meta.width}x${meta.height}`, jpegKB: (jpegBuf.length / 1024).toFixed(1), webpKB: (webpBuf.length / 1024).toFixed(1) }
}

for (let i = 1; i <= 11; i++) {
  const files = fs.readdirSync(SRC_DIR)
  const src = files.find((f) => f.startsWith(`image${i}.`))
  const outName = `q${String(i).padStart(2, '0')}.jpg`
  const r = await processOne(src, outName)
  console.log(r.outName, r.from, `— ${r.jpegKB}KB jpg / ${r.webpKB}KB webp`)
}
