import { chromium } from 'playwright'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 900, height: 1200 } })
page.on('console', (msg) => console.log('CONSOLE', msg.type(), msg.text()))
page.on('pageerror', (err) => console.log('PAGEERROR', err.message))

await page.goto('http://localhost:3000/fr/examen-blanc', { waitUntil: 'load' })
await page.waitForTimeout(1000)
await page.getByRole('button', { name: /Commencer l'examen/ }).click()
await page.waitForTimeout(1500)
console.log('BODY TEXT:', (await page.locator('body').innerText()).slice(0, 800))
await page.screenshot({ path: process.env.TEMP + '/examen2_check/screenshots/debug1.png' })
await browser.close()
