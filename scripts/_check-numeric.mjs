import { chromium } from 'playwright'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 900, height: 1200 } })
page.on('pageerror', (err) => console.log('PAGEERROR', err.message))

await page.goto('http://localhost:3000/fr/examen-blanc', { waitUntil: 'load' })
await page.waitForTimeout(800)
await page.getByRole('button', { name: /Commencer l'examen/ }).click({ force: true })
await page.waitForSelector('text=Question 1 / 49')

for (let i = 0; i < 6; i++) {
  await page.waitForTimeout(400)
  await page.getByRole('button', { name: /Suivante/ }).click({ force: true })
  await page.waitForSelector(`text=Question ${i + 2} / 49`)
}

await page.waitForTimeout(500)
const numericCount = await page.locator('input[type="number"]').count()
console.log('Sur Question 7, input numérique présent :', numericCount > 0)
console.log('Texte question:', await page.locator('h2').innerText())

await page.locator('input[type="number"]').fill('120', { force: true })
await page.screenshot({ path: process.env.TEMP + '/examen2_check/screenshots2/numeric-check.png' })

await browser.close()
