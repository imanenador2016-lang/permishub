import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const findings = []
const patterns = {
  vehicleLetters: /(?:voiture|véhicule|usager|moto|cyclomoteur)\s+[A-D]\b/i,
  numberedElements: /(?:panneau|signal|photo|position|numéro)\s*(?:routier\s*)?[1-5]\b|quel numéro/i,
  colors: /(?:voiture|véhicule|moto|cyclomoteur)\s+(?:blanc(?:he)?|noir(?:e)?|bleu(?:e)?|vert(?:e)?|gris(?:e)?|brun(?:e)?|rouge)/i,
  directions: /flèche\s*[A-D1-5]|direction\s*[A-D1-5]/i,
}

for (let exam = 3; exam <= 14; exam += 1) {
  const questions = JSON.parse(fs.readFileSync(path.join(root, 'data', 'examens-blancs', `examen-${exam}.json`), 'utf8'))
  questions.forEach((question, index) => {
    const searchable = [question.question, ...(question.choix ?? []), question.explication].join(' ')
    const matches = Object.entries(patterns).filter(([, pattern]) => pattern.test(searchable)).map(([name]) => name)
    if (matches.length) findings.push({
      exam,
      question: index + 1,
      matches,
      wording: question.question,
      choices: question.choix,
      answer: question.reponse,
      image: question.image,
      annotations: question.visualAnnotations ?? [],
    })
  })
}

const output = path.join(root, 'output', 'audit-examens', 'visual-references.json')
fs.writeFileSync(output, JSON.stringify(findings, null, 2))
const counts = Object.fromEntries(Object.keys(patterns).map((name) => [name, findings.filter(({ matches }) => matches.includes(name)).length]))
console.log(JSON.stringify({ totalCandidates: findings.length, counts, output }))
