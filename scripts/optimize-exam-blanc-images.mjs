import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

/**
 * Passe web-optimisation sur les photos déjà générées par
 * process-exam-blanc-images.mjs (déjà upscalées, nettes, badgées) :
 * redimensionne à la largeur réelle d'affichage sur la page (voir
 * ExamenBlanc.tsx, conteneur ~700px max) et exporte JPEG (fallback) +
 * WebP (source principale, voir <picture> dans le composant). Écrase les
 * .jpg en place, ajoute les .webp à côté — voir conversation du
 * 2026-08-24 (photos qui arrivaient en retard sur le texte).
 */

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const DIR = path.join(ROOT, 'public', 'examen-blanc')

const TARGET_WIDTH = 700 // ~ largeur max réelle du conteneur photo sur la page
const JPEG_QUALITY = 82
const WEBP_QUALITY = 80

const files = fs.readdirSync(DIR).filter((f) => f.endsWith('.jpg'))

let beforeTotal = 0
let afterJpegTotal = 0
let afterWebpTotal = 0

for (const file of files) {
  const filePath = path.join(DIR, file)
  const before = fs.statSync(filePath).size
  beforeTotal += before

  const meta = await sharp(filePath).metadata()
  const resize = meta.width > TARGET_WIDTH ? { width: TARGET_WIDTH } : {}

  const jpegBuf = await sharp(filePath).resize(resize).jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer()
  const webpBuf = await sharp(filePath).resize(resize).webp({ quality: WEBP_QUALITY }).toBuffer()

  // Écrit sur un fichier temporaire puis renomme — écraser directement le
  // fichier qu'on vient de lire via sharp plante sous Windows (handle encore
  // tenu par libvips).
  const tmpPath = filePath + '.tmp'
  fs.writeFileSync(tmpPath, jpegBuf)
  fs.renameSync(tmpPath, filePath)
  afterJpegTotal += jpegBuf.length

  const webpPath = filePath.replace(/\.jpg$/, '.webp')
  fs.writeFileSync(webpPath, webpBuf)
  afterWebpTotal += webpBuf.length
}

console.log(`${files.length} images`)
console.log('Poids moyen AVANT :', (beforeTotal / files.length / 1024).toFixed(1), 'KB')
console.log('Poids moyen APRÈS (jpg) :', (afterJpegTotal / files.length / 1024).toFixed(1), 'KB')
console.log('Poids moyen APRÈS (webp) :', (afterWebpTotal / files.length / 1024).toFixed(1), 'KB')
console.log('Total avant :', (beforeTotal / 1024).toFixed(0), 'KB — total après (jpg+webp) :', ((afterJpegTotal + afterWebpTotal) / 1024).toFixed(0), 'KB')
