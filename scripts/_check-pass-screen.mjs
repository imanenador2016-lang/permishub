import { chromium } from 'playwright'
import fs from 'fs'
import questions from '../data/examen-blanc.json' with { type: 'json' }

const OUT_DIR = process.env.TEMP + '/examen2_check/screenshots2'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 900, height: 1200 } })
page.on('pageerror', (err) => console.log('PAGEERROR', err.message))

await page.goto('http://localhost:3000/fr/examen-blanc', { waitUntil: 'load' })
await page.waitForTimeout(800)
await page.getByRole('button', { name: /Commencer l'examen/ }).click({ force: true })
await page.waitForSelector('text=Question 1 / 49')

for (let i = 0; i < 49; i++) {
  const q = questions[i]

  // Attend que le contenu de la question soit stable (voir animation
  // framer-motion mode="wait" — sinon on peut cliquer un bouton de la
  // question précédente en cours de sortie).
  for (let attempt = 0; attempt < 30; attempt++) {
    const ready =
      (q.type === 'numerique' && (await page.locator('input[type="number"]').count())) ||
      (q.type === 'oui_non' && (await page.getByRole('button', { name: 'Oui', exact: true }).count())) ||
      (q.type === 'choix_multiple' && (await page.locator('button', { hasText: /^[A-D][.:]/ }).count()))
    if (ready) break
    await page.waitForTimeout(100)
  }
  await page.waitForTimeout(350)

  console.log(`i=${i} id=${q.id} type=${q.type} reponse=${q.reponse}`)
  if (q.type === 'numerique') {
    await page.locator('input[type="number"]').fill(q.reponse, { force: true })
  } else if (q.type === 'oui_non') {
    await page.getByRole('button', { name: q.reponse === 'OUI' ? 'Oui' : 'Non', exact: true }).click({ force: true })
  } else {
    await page.locator('button', { hasText: new RegExp(`^${q.reponse}\\s?[.:]`) }).click({ force: true, timeout: 5000 })
  }

  if (i === 48) {
    await page.getByRole('button', { name: /Voir ma correction/ }).click({ force: true })
  } else {
    await page.getByRole('button', { name: /Suivante/ }).click({ force: true })
    await page.waitForSelector(`text=Question ${i + 2} / 49`)
  }
}

await page.waitForSelector('text=Ton résultat')
const scoreText = await page.locator('text=/\\d+ \\/ 49 points/').first().innerText()
const badgeText = await page.locator('text=/Réussi|Raté/').first().innerText()
console.log('Score avec toutes les bonnes réponses :', scoreText, badgeText)
await page.screenshot({ path: `${OUT_DIR}/05-result-pass.png` })

await browser.close()
