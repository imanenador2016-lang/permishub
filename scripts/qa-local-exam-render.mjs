import fs from 'node:fs'

const debugPort = process.env.CHROME_DEBUG_PORT ?? '9223'
const targetUrl = process.argv[2] ?? 'http://localhost:3001/fr/examen-blanc/examen-7'
const output = process.argv[3] ?? 'output/audit-examens/mobile-question.png'
const viewportWidth = Number(process.env.VIEWPORT_WIDTH ?? 390)
const viewportHeight = Number(process.env.VIEWPORT_HEIGHT ?? 844)
const questionNumber = Number(process.env.QUESTION_NUMBER ?? 1)
const finishExam = process.env.FINISH_EXAM === '1'

const target = await fetch(`http://127.0.0.1:${debugPort}/json/new?${encodeURIComponent(targetUrl)}`, {
  method: 'PUT',
}).then((response) => response.json())

const socket = new WebSocket(target.webSocketDebuggerUrl)
await new Promise((resolve, reject) => {
  socket.addEventListener('open', resolve, { once: true })
  socket.addEventListener('error', reject, { once: true })
})

let sequence = 0
const pending = new Map()
socket.addEventListener('message', ({ data }) => {
  const message = JSON.parse(data)
  if (!message.id || !pending.has(message.id)) return
  const { resolve, reject } = pending.get(message.id)
  pending.delete(message.id)
  if (message.error) reject(new Error(message.error.message))
  else resolve(message.result)
})

function send(method, params = {}) {
  const id = ++sequence
  socket.send(JSON.stringify({ id, method, params }))
  return new Promise((resolve, reject) => pending.set(id, { resolve, reject }))
}

await send('Page.enable')
await send('Runtime.enable')
await send('Emulation.setDeviceMetricsOverride', {
  width: viewportWidth,
  height: viewportHeight,
  deviceScaleFactor: 1,
  mobile: true,
})
await send('Page.navigate', { url: targetUrl })
await new Promise((resolve) => setTimeout(resolve, 4000))

await send('Runtime.evaluate', {
  expression: `Array.from(document.querySelectorAll('button')).find((button) => button.textContent.includes('Commencer'))?.click()`,
})
await new Promise((resolve) => setTimeout(resolve, 1200))

for (let current = 1; current < questionNumber; current += 1) {
  await send('Runtime.evaluate', {
    expression: `Array.from(document.querySelectorAll('button')).find((button) => button.textContent.includes('Suivante'))?.click()`,
  })
  await new Promise((resolve) => setTimeout(resolve, 120))
}

if (finishExam) {
  await send('Runtime.evaluate', {
    expression: `Array.from(document.querySelectorAll('button')).find((button) => /Voir (ma correction|mon résultat)/i.test(button.textContent))?.click()`,
  })
  await new Promise((resolve) => setTimeout(resolve, 1000))
}

const inspection = await send('Runtime.evaluate', {
  returnByValue: true,
  expression: `(() => {
    const image = document.querySelector('img[src*="/examen-blanc/"]');
    const rect = image?.getBoundingClientRect();
    const parent = image?.parentElement?.parentElement?.getBoundingClientRect();
    return {
      viewport: { width: innerWidth, height: innerHeight },
      body: { clientWidth: document.body.clientWidth, scrollWidth: document.body.scrollWidth },
      question: (() => {
        const text = document.body.innerText;
        const start = text.toLowerCase().indexOf('question 1 /');
        return start >= 0 ? text.slice(start, start + 180) : null;
      })(),
      image: image ? {
        src: image.currentSrc,
        naturalWidth: image.naturalWidth,
        naturalHeight: image.naturalHeight,
        renderedWidth: Math.round(rect.width),
        renderedHeight: Math.round(rect.height),
        containerWidth: Math.round(parent.width),
        containerHeight: Math.round(parent.height),
      } : null,
    };
  })()`,
})

const screenshot = await send('Page.captureScreenshot', { format: 'png', fromSurface: true })
fs.writeFileSync(output, Buffer.from(screenshot.data, 'base64'))
if (!inspection.result?.value) {
  throw new Error(`Inspection DOM impossible: ${JSON.stringify(inspection)}`)
}
console.log(JSON.stringify({ output, ...inspection.result.value }, null, 2))
socket.close()
