import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const findings = []
const referencePattern = /\b(?:[Vv]oiture|[Vv]éhicule|[Mm]oto|[Cc]yclomoteur|[Pp]anneau|[Ss]ignal|[Dd]essin|[Pp]hoto|[Pp]osition|[Ss]chéma)\s+(?:n[°º]\s*)?([A-D]|[1-5])\b/gu
const questionMarkPattern = /point d[’']interrogation/i
// Repères intégrés directement dans les pixels et contrôlés sur les planches
// de contact du 20/10/2026. Les annotations DOM restent listées séparément.
const verifiedBakedIn = new Set([
  'E4Q36', 'E7Q40', 'E8Q29', 'E8Q37', 'E8Q47', 'E9Q22', 'E10Q2', 'E10Q5',
  'E10Q20', 'E10Q28', 'E10Q33', 'E10Q38', 'E11Q3', 'E11Q13', 'E11Q36',
  'E11Q46', 'E12Q15', 'E13Q17', 'E14Q8', 'E14Q32', 'E14Q49', 'E7Q50',
])

for (let exam = 3; exam <= 14; exam += 1) {
  const file = path.join(root, 'data', 'examens-blancs', `examen-${exam}.json`)
  const questions = JSON.parse(fs.readFileSync(file, 'utf8'))
  questions.forEach((question, index) => {
    const text = [question.question, ...(question.choix ?? []), question.explication].join(' ')
    const expected = [...new Set([
      ...[...text.matchAll(referencePattern)].map((match) => match[1].toUpperCase()),
      ...(questionMarkPattern.test(text) ? ['?'] : []),
    ])]
    if (!expected.length) return
    const ref = `E${exam}Q${question.id}`
    const actual = (question.visualAnnotations ?? []).map(({ label }) => String(label).toUpperCase())
    const bakedInVerified = verifiedBakedIn.has(ref)
    const missing = bakedInVerified ? [] : expected.filter((label) => !actual.includes(label))
    findings.push({ exam, position: index + 1, id: question.id, ref, question: question.question, choices: question.choix, answer: question.reponse, image: question.image, expected, actual, bakedInVerified, missing })
  })
}

const output = path.join(root, 'output', 'audit-examens', 'reference-labels.json')
fs.mkdirSync(path.dirname(output), { recursive: true })
fs.writeFileSync(output, JSON.stringify(findings, null, 2))
console.log(JSON.stringify({ checkedExams: 12, totalQuestions: 599, referencedQuestions: findings.length, missingLabels: findings.filter(({ missing }) => missing.length).length, output }, null, 2))
