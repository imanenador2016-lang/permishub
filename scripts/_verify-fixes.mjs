import { chromium } from 'playwright'
import fs from 'fs'

const OUT_DIR = process.env.TEMP + '/examen2_check/screenshots2'
fs.mkdirSync(OUT_DIR, { recursive: true })

const consoleErrors = []
const imageTimings = [] // { url, startedAt, finishedAt } via CDP-ish tracking through response events

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 900, height: 1200 } })
page.on('console', (msg) => {
  if (msg.type() === 'error') consoleErrors.push(msg.text())
})
page.on('pageerror', (err) => consoleErrors.push('PAGE ERROR: ' + err.message))

const imageRequestTimes = new Map()
page.on('request', (req) => {
  if (/\/examen-blanc\/q\d+\.(webp|jpg)/.test(req.url())) imageRequestTimes.set(req.url(), Date.now())
})
page.on('requestfinished', (req) => {
  if (/\/examen-blanc\/q\d+\.(webp|jpg)/.test(req.url())) {
    const start = imageRequestTimes.get(req.url())
    if (start) imageTimings.push({ url: req.url(), ms: Date.now() - start })
  }
})

await page.goto('http://localhost:3000/fr/examen-blanc', { waitUntil: 'load' })
await page.waitForTimeout(1200) // laisse le préchargement d'intro se déclencher

const preloadedBeforeStart = imageTimings.length
console.log('Images déjà en vol/chargées AVANT de cliquer "Commencer" (préchargement intro) :', preloadedBeforeStart)

await page.getByRole('button', { name: /Commencer l'examen/ }).click({ force: true })
await page.waitForSelector('text=Question 1 / 49')

// --- Vérif 1 : texte + photo simultanés sur la question 1 ---
const q1PhotoVisible = await page.locator('picture img').first().evaluate((img) => img.complete && img.naturalWidth > 0)
console.log('Q1 — photo déjà chargée au moment où le texte est affiché :', q1PhotoVisible)
await page.screenshot({ path: `${OUT_DIR}/01-question1.png` })

async function answerCurrentAndNext(isLast, stepLabel, i) {
  const numericInput = page.locator('input[type="number"]')
  const choixBtn = page.locator('button', { hasText: /^A[.:]/ })
  const ouiBtn = page.getByRole('button', { name: 'Oui', exact: true })

  // Attend que l'animation d'entrée (framer-motion, mode="wait") ait fini de
  // monter le contenu de la nouvelle question avant de vérifier quoi que ce soit.
  let nCount = 0,
    cCount = 0,
    oCount = 0
  for (let attempt = 0; attempt < 30; attempt++) {
    nCount = await numericInput.count()
    cCount = await choixBtn.count()
    oCount = await ouiBtn.count()
    if (nCount || cCount || oCount) break
    await page.waitForTimeout(100)
  }
  console.log(`Q${i + 1}: numeric=${nCount} choix=${cCount} oui=${oCount}`)
  if (nCount === 0 && cCount === 0 && oCount === 0) {
    console.log('BODY:', (await page.locator('body').innerText()).slice(0, 500))
  }
  // Laisse le temps à l'ancienne question (animation de sortie framer-motion,
  // ~200ms) de disparaître complètement — sinon deux boutons "Oui"/lettre
  // peuvent coexister brièvement (l'ancien en sortie + le nouveau qui entre).
  await page.waitForTimeout(350)
  if (nCount) {
    await numericInput.fill('120', { force: true })
  } else if (await choixBtn.count()) {
    await choixBtn.first().click({ force: true })
  } else if (await ouiBtn.count()) {
    await ouiBtn.click({ force: true })
  }

  if (stepLabel) await page.screenshot({ path: `${OUT_DIR}/${stepLabel}` })

  if (isLast) {
    await page.getByRole('button', { name: /Voir ma correction/ }).click({ force: true })
  } else {
    await page.getByRole('button', { name: /Suivante/ }).click({ force: true })
  }
}

// --- Vérif 2 : compteur "bonnes réponses / 49" présent et qui évolue ---
const counterAfterQ1 = await page.locator('text=/bonne\\(s\\) réponse\\(s\\) \\/ 49/').innerText()
console.log('Compteur après Q1 :', counterAfterQ1)

for (let i = 0; i < 49; i++) {
  const isLast = i === 48
  await answerCurrentAndNext(isLast, i === 4 ? '02-question5-counter.png' : null, i)
  if (!isLast) await page.waitForSelector(`text=Question ${i + 2} / 49`, { timeout: 10000 })
}

await page.waitForSelector('text=Ton résultat')

// --- Vérif 3 : écran d'échec avec offre ---
const scoreText = await page.locator('text=/\\d+ \\/ 49 points/').first().innerText()
const badgeText = await page.locator('text=/Réussi|Raté/').first().innerText()
console.log('Score final (parcours "premier choix partout") :', scoreText, badgeText)
await page.screenshot({ path: `${OUT_DIR}/03-result-fail.png` })

const unlimitedCta = await page.locator('button:has-text("Examens")').count()
const resumeSecondary = await page.locator('button:has-text("Résumé")').count()
console.log('CTA "Examens illimités" présent :', unlimitedCta > 0)
console.log('CTA secondaire "Résumé" présent :', resumeSecondary > 0)

// Clique le CTA principal pour vérifier qu'il tente bien un checkout (on ne va pas jusqu'à Stripe, on vérifie juste l'appel réseau / message d'erreur).
await page.locator('button:has-text("Examens")').first().click({ force: true })
await page.waitForTimeout(1500)
await page.screenshot({ path: `${OUT_DIR}/04-after-cta-click.png` })
const bodyAfterClick = await page.locator('body').innerText()
console.log('Message après clic CTA (extrait) :', bodyAfterClick.match(/[^\n]*(erreur|Erreur|non disponible|Stripe)[^\n]*/)?.[0] ?? '(rien trouvé)')

console.log('\nconsoleErrors:', JSON.stringify(consoleErrors, null, 2))
console.log('\nTemps de chargement des photos (ms) — count:', imageTimings.length)
console.log('Moyenne (ms):', (imageTimings.reduce((a, b) => a + b.ms, 0) / (imageTimings.length || 1)).toFixed(0))

await browser.close()
