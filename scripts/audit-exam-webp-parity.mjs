import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const root = process.cwd()
const refs = []
for (let exam = 3; exam <= 14; exam += 1) {
  const questions = JSON.parse(fs.readFileSync(path.join(root, 'data/examens-blancs', `examen-${exam}.json`), 'utf8'))
  questions.forEach((question, index) => {
    if (question.image && /\.jpg$/i.test(question.image)) refs.push({ exam, position: index + 1, id: question.id, image: question.image, question: question.question })
  })
}

const findings = []
for (const ref of refs) {
  const original = path.join(root, 'public', ref.image.replace(/^\//, ''))
  const sibling = original.replace(/\.(png|jpe?g)$/i, '.webp')
  if (!fs.existsSync(sibling)) {
    findings.push({ ...ref, issue: 'missing-webp', sibling: path.relative(root, sibling) })
    continue
  }
  const options = { width: 48, height: 36, fit: 'fill' }
  const a = await sharp(original).resize(options).removeAlpha().raw().toBuffer()
  const b = await sharp(sibling).resize(options).removeAlpha().raw().toBuffer()
  let sum = 0
  for (let i = 0; i < a.length; i += 1) sum += Math.abs(a[i] - b[i])
  const meanDifference = sum / a.length
  findings.push({ ...ref, issue: meanDifference > 12 ? 'different-content' : 'matching-content', meanDifference: Number(meanDifference.toFixed(2)), sibling: path.relative(root, sibling) })
}

const output = path.join(root, 'output/audit-examens/webp-parity.json')
fs.writeFileSync(output, JSON.stringify(findings, null, 2))
const counts = Object.fromEntries(['different-content', 'matching-content', 'missing-webp'].map((issue) => [issue, findings.filter((entry) => entry.issue === issue).length]))
console.log(JSON.stringify({ checked: refs.length, counts, output }, null, 2))
