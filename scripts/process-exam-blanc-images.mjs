import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

/**
 * Traite les photos d'un examen blanc extrait via parse-examen-docx.mjs :
 * upscale x2 (Lanczos3), léger rehaussement contraste/netteté, badge
 * PermisHub composité en bas à droite, puis export web-optimisé (JPEG
 * mozjpeg q82 + WebP q80, plafonné à 700px de large — voir conversation du
 * 2026-08-25 sur la vitesse de chargement).
 *
 * Usage :
 *   EXAM_IMAGES_SRC_DIR=<dossier word/media extrait> \
 *   EXAM_SOURCE_MAP_JSON=<source-map.json généré par parse-examen-docx.mjs> \
 *   EXAM_OUT_SUBDIR=examen-3 \
 *   node scripts/process-exam-blanc-images.mjs
 *
 * Sortie : public/examen-blanc/<EXAM_OUT_SUBDIR>/qNN.{jpg,webp}.
 *
 * Script one-off documenté ici (voir docs/CONTENT_PIPELINE.md) plutôt que
 * relancé automatiquement — les photos une fois générées sont commitées.
 */

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

const SRC_DIR = process.env.EXAM_IMAGES_SRC_DIR
// { id, image: "imageN.jpeg" }[] — mapping id -> nom de fichier source dans
// word/media/ (généré lors de l'extraction, pas commité).
const SOURCE_MAP_JSON = process.env.EXAM_SOURCE_MAP_JSON
// Sous-dossier de public/examen-blanc/ (ex. "examen-3") — vide pour
// l'examen historique (public/examen-blanc/qNN.jpg directement).
const OUT_SUBDIR = process.env.EXAM_OUT_SUBDIR ?? ''
const FONT_PATH = path.join(ROOT, 'scripts', 'assets', 'ArchivoBlack.ttf')
const OUT_DIR = path.join(ROOT, 'public', 'examen-blanc', OUT_SUBDIR)

if (!SRC_DIR || !SOURCE_MAP_JSON) {
  console.error('EXAM_IMAGES_SRC_DIR et/ou EXAM_SOURCE_MAP_JSON manquant(s)')
  process.exit(1)
}

fs.mkdirSync(OUT_DIR, { recursive: true })

const INK = '#1F1A14'
const CREAM = '#F7F1E4'
const BRICK = '#C1432E'

function pillSvg(badgeW, badgeH, borderW) {
  const radius = badgeH / 2
  return Buffer.from(`
  <svg width="${badgeW}" height="${badgeH}" xmlns="http://www.w3.org/2000/svg">
    <rect x="${borderW / 2}" y="${borderW / 2}" width="${badgeW - borderW}" height="${badgeH - borderW}"
          rx="${radius}" ry="${radius}" fill="${CREAM}" fill-opacity="0.94" stroke="${INK}" stroke-width="${borderW}" />
  </svg>`)
}

async function makeBadge(targetW, targetH) {
  const badgeH = Math.round(targetH * 0.13)
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

  const margin = Math.round(targetW * 0.025)
  return { badge, left: targetW - badgeW - margin, top: targetH - badgeH - margin }
}

async function processOne(srcFilename, outName) {
  const srcPath = path.join(SRC_DIR, srcFilename)
  const meta = await sharp(srcPath).metadata()

  const scale = 2
  const targetW = meta.width * scale
  const targetH = meta.height * scale

  let pipeline = sharp(srcPath).resize(targetW, targetH, { kernel: sharp.kernel.lanczos3 })

  const stats = await sharp(srcPath).stats()
  const meanLuma = stats.channels.slice(0, 3).reduce((s, c) => s + c.mean, 0) / 3
  if (meanLuma < 110) {
    pipeline = pipeline.modulate({ brightness: 1.08, saturation: 1.05 }).linear(1.06, -6)
  } else {
    pipeline = pipeline.modulate({ brightness: 1.02, saturation: 1.03 })
  }
  pipeline = pipeline.sharpen({ sigma: 1.1, m1: 0.6, m2: 0.4 })

  const { badge, left, top } = await makeBadge(targetW, targetH)
  const composited = await pipeline.composite([{ input: badge, left, top }]).toBuffer()

  // Plafonne à la largeur réelle d'affichage sur la page (voir
  // ExamenBlanc.tsx, conteneur ~700px max) — pas la peine d'envoyer plus
  // lourd que ce qui est montré à l'écran (voir conversation du 2026-08-25,
  // photos en retard sur le texte).
  const MAX_W = 700
  const finalResize = targetW > MAX_W ? { width: MAX_W } : {}

  const jpegBuf = await sharp(composited).resize(finalResize).jpeg({ quality: 82, mozjpeg: true }).toBuffer()
  const webpBuf = await sharp(composited).resize(finalResize).webp({ quality: 80 }).toBuffer()

  const jpgOutPath = path.join(OUT_DIR, outName)
  const webpOutPath = jpgOutPath.replace(/\.jpg$/, '.webp')
  fs.writeFileSync(jpgOutPath, jpegBuf)
  fs.writeFileSync(webpOutPath, webpBuf)

  return {
    outName,
    from: `${meta.width}x${meta.height}`,
    to: `${targetW}x${targetH}`,
    jpegKB: (jpegBuf.length / 1024).toFixed(1),
    webpKB: (webpBuf.length / 1024).toFixed(1),
  }
}

const sourceMap = JSON.parse(fs.readFileSync(SOURCE_MAP_JSON, 'utf8'))

const results = []
for (const { id, image } of sourceMap) {
  const outName = `q${String(id).padStart(2, '0')}.jpg`
  const r = await processOne(image, outName)
  results.push(r)
  console.log(r.outName, r.from, '->', r.to, `— ${r.jpegKB}KB jpg / ${r.webpKB}KB webp`)
}

console.log(`\n${results.length}/${sourceMap.length} images traitées -> ${OUT_DIR}`)
