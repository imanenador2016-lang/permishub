import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'

const root = process.cwd()
const examPath = (n) => path.join(root, n === 1 ? 'data/examen-blanc.json' : `data/examens-blancs/examen-${n}.json`)
const clean = (value = '') => value
  .replace(/\[Violations[^\]]*\]/gi, '')
  .replace(/\bLEÇON\s+\d+\s*[–—-]?\s*[‘'][^’']+[’']\.?/gi, '')
  .replace(/\bLEÇON\s+\d+\s*[–—-]?/gi, '')
  .replace(/\s+/g, ' ')
  .replace(/\s+([,.!?;:])/g, '$1')
  .trim()

const sentenceCase = (s) => s ? s[0].toUpperCase() + s.slice(1) : s

function rewriteQuestion(source, type, index) {
  let q = clean(source)
  const rules = [
    [/^Qui a la priorité\s*\?$/i, "Quel usager bénéficie du passage prioritaire ?"],
    [/^Qui doit céder le passage\s*\?$/i, "Quel conducteur est tenu de laisser passer l'autre ?"],
    [/^Qui peut s'engager en premier dans ce carrefour\s*\?$/i, "Dans quel ordre les véhicules peuvent-ils franchir cette intersection ?"],
    [/^Que signifie ce signal routier\s*\?$/i, "Quelle règle ce signal impose-t-il aux usagers ?"],
    [/^Que signifie ce signal d[’']indication\s*\?$/i, "Quelle information réglementaire ce panneau communique-t-il ?"],
    [/^Que signifie ce signal de danger\s*\?$/i, "Quel danger précis ce panneau annonce-t-il ?"],
    [/^Pouvez-vous\s+(.+)\?$/i, (_, action) => `Dans cette situation, êtes-vous autorisé à ${action.replace(/^vous\s+/i, '')} ?`],
    [/^Peut-on\s+(.+)\?$/i, (_, action) => `Le Code de la route permet-il de ${action} ?`],
    [/^À quelle vitesse maximale\s+(.+)\?$/i, (_, rest) => `Quelle limitation de vitesse ${rest.replace(/peut-elle circuler/i, 'doit-elle respecter').replace(/pouvez-vous rouler/i, 'devez-vous respecter')} ?`],
    [/^Lequel de ces signaux\s+(.+)\?$/i, (_, rest) => `Parmi les signaux présentés, lequel ${rest} ?`],
    [/^Qu'est-ce qui n'est PAS autorisé\s*\?$/i, "Quelle configuration est interdite par la réglementation ?"],
    [/^Quand devez-vous obligatoirement\s+(.+)\?$/i, (_, rest) => `Dans quel cas la réglementation vous impose-t-elle de ${rest} ?`],
  ]
  for (const [pattern, replacement] of rules) {
    if (pattern.test(q)) {
      q = q.replace(pattern, replacement)
      break
    }
  }
  if (q === clean(source)) {
    const lead = index % 3 === 0 ? 'Selon la réglementation belge, ' : index % 3 === 1 ? 'Analysez le cas suivant : ' : 'Dans la situation décrite, '
    q = lead + q[0].toLowerCase() + q.slice(1)
  }
  return sentenceCase(q.replace(/\?\?+$/, '?'))
}

const phraseMap = [
  [/\bOui\.?$/i, "Oui, cette action est permise."],
  [/\bNon\.?$/i, "Non, cette action est interdite."],
  [/^Seulement\b/i, 'Uniquement'],
  [/\bAussi bien (.+) que (.+)\.?$/i, 'Les deux propositions : $1 et $2.'],
  [/\bVous pouvez\b/gi, 'Il est permis de'],
  [/\bVous devez\b/gi, 'Il faut'],
  [/\bAccès interdit\b/gi, 'Interdiction d’accès'],
  [/\bLa voiture\b/gi, 'Le véhicule'],
  [/\bSignal\b/gi, 'Panneau'],
]

function rewriteChoice(choice) {
  const match = choice.match(/^([A-D])\s*[.:/]\s*(.*)$/s)
  if (!match) return clean(choice)
  let body = clean(match[2])
  for (const [pattern, replacement] of phraseMap) body = body.replace(pattern, replacement)
  return `${match[1]}. ${sentenceCase(body)}`
}

function rewriteExplanation(source, question, response) {
  let text = clean(source)
  if (!text) return `La réponse ${response} correspond à la règle applicable à cette situation. Une validation juridique complémentaire est requise avant publication.`
  const replacements = [
    [/\bVous pouvez\b/g, 'La réglementation autorise à'],
    [/\bVous ne pouvez pas\b/g, 'La réglementation interdit de'],
    [/\bdoit être\b/g, 'est obligatoirement'],
    [/\bdoivent être\b/g, 'sont obligatoirement'],
    [/\bil est interdit de\b/gi, 'la règle interdit de'],
    [/\bil est obligatoire de\b/gi, 'la règle impose de'],
    [/\bCe panneau\b/g, 'Ce signal'],
    [/\bLe panneau\b/g, 'Le signal'],
    [/\bEn conséquence\b/g, 'Par conséquent'],
  ]
  for (const [pattern, replacement] of replacements) text = text.replace(pattern, replacement)
  return `Règle applicable : ${text}`
}

const visualPattern = /\b(ce|cet|cette|ces|ici|illustration|photo|signal|panneau|feu|marquage|ligne|flèche|carrefour|intersection|rond-point|voiture (?:bleue|brune|blanche|rouge|verte|jaune)|véhicule [AB]|signal [ABC123])\b/i
const legalReviewPattern = /\b(alcool|haleine|sang|amende|infraction|degré|permis provisoire|contrôle technique|pneus? (?:à clous|cloutés)|vitesse|maximale|km\/h|M\.M\.A|M\.E\.C|masse|enfant|siège|tram a toujours|depuis le|avant le|après le)\b/i

const knownSignals = [
  [/\bC1\b/i, 'C1'], [/\bC3\b/i, 'C3'], [/\bC43\s*[-:]?\s*(\d{2,3})/i, (_, n) => `C43-${n}`],
  [/\bB1\b/i, 'B1'], [/\bB5\b/i, 'B5'], [/\bB9\b/i, 'B9'], [/\bB17\b/i, 'B17'],
  [/\bA23\b/i, 'A23'], [/\bC24b\b/i, 'C24b'], [/\bC27\b/i, 'C27'], [/\bC29\b/i, 'C29'],
  [/\bD3\b/i, 'D3'], [/\bE1\b/i, 'E1'], [/\bF4[ab]\b/i, (m) => m.toUpperCase()], [/\bF1[ab]?\b/i, (m) => m.toUpperCase()],
]

function inferSignalRef(text) {
  for (const [pattern, value] of knownSignals) {
    const match = text.match(pattern)
    if (match) return typeof value === 'function' ? value(...match) : value
  }
  if (/sens interdit pour tout conducteur|accès interdit à tout conducteur/i.test(text)) return 'C3'
  if (/céder le passage|dents de requin/i.test(text) && /signal|panneau/i.test(text)) return 'B1'
  if (/signal d'arrêt|panneau stop/i.test(text)) return 'B5'
  return undefined
}

function imageBriefFor(q, signRef) {
  if (signRef) return `Afficher le signal belge officiel ${signRef}, isolé et parfaitement lisible. Conserver strictement sa forme, ses couleurs et son symbole réglementaires.`
  const situation = clean(q.question).replace(/\?/g, '.').slice(0, 360)
  return `Créer une illustration routière PermisHub entièrement nouvelle, sans reprendre l'ancienne composition. Montrer clairement les véhicules, usagers, panneaux, marquages et directions indispensables pour répondre à ceci : ${situation}`
}

const registry = new Map()
const report = { total: 0, oldImagesRemoved: 0, needsNewImage: 0, needsLegalReview: 0, roadIllustrations: 0, perExam: {} }

function fromCorrectionRows(rows) {
  return rows.map((row, index) => {
    const answer = String(row.bonne_reponse ?? '').trim().toUpperCase()
    let question = row.question ?? ''
    let choix = Array.isArray(row.choix) ? row.choix : []
    if (!choix.length && /\sA\s*[/:.]\s*/.test(question)) {
      const first = question.search(/\sA\s*[/:.]\s*/)
      const inline = question.slice(first).trim()
      question = question.slice(0, first).trim()
      const matches = [...inline.matchAll(/(?:^|\s)([A-D])\s*[/:.]\s*([\s\S]*?)(?=\s+[A-D]\s*[/:.]\s*|$)/g)]
      choix = matches.map((match) => `${match[1]}. ${match[2].trim()}`)
    }
    const type = /^(OUI|NON)$/.test(answer) ? 'oui_non' : /^[+-]?\d+(?:[,.]\d+)?$/.test(answer) ? 'numerique' : 'choix_multiple'
    return {
      id: Number(row.id_question ?? row.position_session ?? index + 1),
      type,
      gravite: row.faute_grave || Number(row.points) === 5 ? 'grave' : 'normale',
      question,
      choix: type === 'choix_multiple' ? choix : [],
      reponse: answer,
      explication: row.correction ?? '',
      image: row.image ?? '',
    }
  })
}

function pristineQuestions(exam) {
  if (exam <= 7) {
    const relative = exam === 1 ? 'data/examen-blanc.json' : `data/examens-blancs/examen-${exam}.json`
    return JSON.parse(execFileSync('git', ['show', `HEAD:${relative}`], { cwd: root, encoding: 'utf8' }))
  }
  const correctionSources = {
    8: 'examen-50/corrections-examen.json', 9: 'examen9/corrections-examen.json',
    10: 'examen10/corrections-examen.json', 11: 'corrections-examen.json',
    12: 'examens 12/corrections-examen.json', 13: 'examens 13/corrections-examen.json',
    14: 'examen14/corrections-examen.json', 15: 'examen15/corrections-examen.json',
  }
  return fromCorrectionRows(JSON.parse(fs.readFileSync(path.join(root, correctionSources[exam]), 'utf8')))
}

const seenQuestions = new Map()
const distinctLeads = [
  'Observez précisément la configuration.', 'Concentrez-vous sur les règles de priorité.',
  'Tenez compte de toute la signalisation.', 'Examinez les positions des usagers.',
  'Appliquez la règle belge pertinente.', 'Ne retenez que les éléments décrits.',
  'Analysez les trajectoires indiquées.', 'Repérez la prescription déterminante.',
  'Évaluez cette situation avant de répondre.', 'Identifiez d’abord la règle applicable.',
  'Prenez en compte le lieu et les usagers.', 'Vérifiez chaque élément de la scène.',
]

for (let exam = 1; exam <= 15; exam++) {
  const file = examPath(exam)
  const questions = pristineQuestions(exam)
  report.perExam[exam] = questions.length
  for (const q of questions) {
    const original = { question: q.question, explication: q.explication, image: q.image }
    const combined = `${original.question} ${original.explication}`
    const signRef = inferSignalRef(combined)
    const needsNewImage = visualPattern.test(original.question)
    q.question = rewriteQuestion(original.question, q.type, q.id + exam)
    const duplicateKey = q.question.toLocaleLowerCase('fr').replace(/[^\p{L}\p{N}]+/gu, ' ').trim()
    const duplicateIndex = seenQuestions.get(duplicateKey) ?? 0
    seenQuestions.set(duplicateKey, duplicateIndex + 1)
    if (duplicateIndex > 0) q.question = `${distinctLeads[(duplicateIndex - 1) % distinctLeads.length]} ${q.question}`
    q.choix = q.choix.map(rewriteChoice)
    q.explication = rewriteExplanation(original.explication, original.question, q.reponse)
    delete q.image
    delete q.needsNewImage
    delete q.imageBrief
    delete q.signRef
    delete q.needsLegalReview
    if (needsNewImage) {
      q.needsNewImage = true
      q.imageBrief = imageBriefFor(q, signRef)
      report.needsNewImage++
      if (!signRef) report.roadIllustrations++
    }
    if (signRef) {
      q.signRef = signRef
      if (!registry.has(signRef)) registry.set(signRef, [])
      registry.get(signRef).push({ exam, question: q.id })
    }
    if (!original.explication?.trim() || legalReviewPattern.test(combined) || (needsNewImage && !signRef && /priorité|interdit|autorisé|peut|doit/i.test(combined))) {
      q.needsLegalReview = true
      report.needsLegalReview++
    }
    report.total++
    if (original.image) report.oldImagesRemoved++
  }
  fs.writeFileSync(file, `${JSON.stringify(questions, null, 2)}\n`)
}

const signals = [...registry].sort(([a], [b]) => a.localeCompare(b, 'fr', { numeric: true }))
const inventory = [
  '# Inventaire des signaux — examens blancs 1 à 15', '',
  `Signaux uniques identifiés avec certitude dans les textes : **${signals.length}**.`, '',
  '> Les questions dont le visuel est indispensable mais dont le code ne peut pas être établi à partir du texte sont marquées `needsLegalReview`. Aucun ancien visuel n’a servi à déduire ou recréer un signal.', '',
  ...signals.flatMap(([code, uses]) => [`## ${code}`, '', ...uses.map(({ exam, question }) => `- Examen ${exam}, question ${question}`), '']),
].join('\n')
fs.mkdirSync(path.join(root, 'docs'), { recursive: true })
fs.writeFileSync(path.join(root, 'docs', 'inventaire-signaux-examens.md'), inventory)
fs.writeFileSync(path.join(root, 'docs', 'rapport-refonte-examens.json'), `${JSON.stringify({ ...report, uniqueSignals: signals.length, signals: Object.fromEntries(signals) }, null, 2)}\n`)
console.log(JSON.stringify({ ...report, uniqueSignals: signals.length }, null, 2))
