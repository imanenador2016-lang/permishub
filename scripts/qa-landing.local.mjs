import { spawn } from 'node:child_process'
import { mkdir, writeFile, mkdtemp } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const target = process.env.LANDING_QA_URL || 'http://127.0.0.1:3003/fr'
const output = join(process.cwd(), 'mockups', 'base-landing-qa')
await mkdir(output, { recursive: true })
const profile = await mkdtemp(join(tmpdir(), 'permishub-base-qa-'))
const chrome = spawn(
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  ['--headless=new', '--no-first-run', '--no-default-browser-check', '--disable-gpu', '--remote-debugging-port=0', '--user-data-dir=' + profile, 'about:blank'],
  { windowsHide: true, stdio: ['ignore', 'ignore', 'pipe'] },
)

const endpoint = await new Promise((resolve, reject) => {
  const timeout = setTimeout(() => reject(new Error('Chrome startup timeout')), 20000)
  chrome.on('error', reject)
  chrome.stderr.on('data', (data) => {
    const match = data.toString().match(/DevTools listening on (ws:\/\/[^\s]+)/)
    if (match) {
      clearTimeout(timeout)
      resolve(match[1])
    }
  })
})

const socket = new WebSocket(endpoint)
await new Promise((resolve, reject) => {
  socket.onopen = resolve
  socket.onerror = reject
})

let sequence = 0
const pending = new Map()
socket.onmessage = ({ data }) => {
  const message = JSON.parse(data)
  if (!message.id) return
  const item = pending.get(message.id)
  if (!item) return
  clearTimeout(item.timeout)
  pending.delete(message.id)
  message.error ? item.reject(new Error(JSON.stringify(message.error))) : item.resolve(message.result)
}

function command(method, params = {}, sessionId) {
  return new Promise((resolve, reject) => {
    const id = ++sequence
    const timeout = setTimeout(() => reject(new Error('Timeout: ' + method)), 60000)
    pending.set(id, { resolve, reject, timeout })
    socket.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }))
  })
}

let session
const run = (method, params) => command(method, params, session)
const evaluate = async (expression) => (await run('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })).result.value
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

try {
  const { targetId } = await command('Target.createTarget', { url: 'about:blank' })
  session = (await command('Target.attachToTarget', { targetId, flatten: true })).sessionId
  await run('Page.enable')
  await run('Runtime.enable')

  const results = []
  for (const width of [390, 1440]) {
    await run('Emulation.setDeviceMetricsOverride', { width, height: width === 390 ? 844 : 1000, deviceScaleFactor: 1, mobile: width === 390 })
    await run('Page.navigate', { url: target })
    for (let attempt = 0; attempt < 120; attempt += 1) {
      if (await evaluate("document.readyState === 'complete' && !!document.querySelector('h1')")) break
      await pause(250)
    }
    await evaluate('document.fonts.ready')
    await pause(1000)
    const data = await evaluate(`(() => {
      const image = document.querySelector('main img[src*="testimonials"]')
      const wrapper = image?.parentElement
      return {
        width: innerWidth,
        documentWidth: document.documentElement.scrollWidth,
        title: document.querySelector('h1')?.innerText,
        imageRect: image?.getBoundingClientRect().toJSON(),
        imagePosition: image ? getComputedStyle(image).position : null,
        wrapperRect: wrapper?.getBoundingClientRect().toJSON(),
        wrapperPosition: wrapper ? getComputedStyle(wrapper).position : null,
      }
    })()`)
    results.push(data)
    const shot = await run('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false })
    await writeFile(join(output, `base-${width}.png`), Buffer.from(shot.data, 'base64'))
  }
  await writeFile(join(output, 'report.json'), JSON.stringify(results, null, 2))
  console.log(JSON.stringify(results, null, 2))
} finally {
  socket.close()
  chrome.kill()
}
