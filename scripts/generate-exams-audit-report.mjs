import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const outputDirectory = path.join(root, 'output', 'audit-examens')
fs.mkdirSync(outputDirectory, { recursive: true })

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')

const questions = []
for (let exam = 3; exam <= 14; exam += 1) {
  const file = path.join(root, 'data', 'examens-blancs', `examen-${exam}.json`)
  const data = JSON.parse(fs.readFileSync(file, 'utf8'))
  data.forEach((question, index) => questions.push({ ...question, exam, number: index + 1 }))
}

const imageUsage = new Map()
for (const question of questions) {
  const list = imageUsage.get(question.image) ?? []
  list.push(question)
  imageUsage.set(question.image, list)
}

function issuesFor(question) {
  const issues = []
  const localImage = path.join(root, 'public', question.image.replace(/^\//, ''))
  if (!fs.existsSync(localImage)) issues.push('IMAGE ABSENTE')
  if (question.type === 'choix_multiple' && !question.choix.some((choice) => choice.trim().startsWith(`${question.reponse}.`))) {
    issues.push('RÉPONSE ABSENTE DES CHOIX')
  }
  if (question.needsLegalReview) issues.push('VALIDATION JURIDIQUE DEMANDÉE')
  if (/validation juridique complémentaire/i.test(question.explication ?? '')) issues.push('EXPLICATION GÉNÉRIQUE')
  const reused = imageUsage.get(question.image) ?? []
  const differentQuestions = new Set(reused.map(({ question: wording }) => wording.trim().toLocaleLowerCase('fr')))
  if (differentQuestions.size > 1) issues.push(`IMAGE PARTAGÉE PAR ${reused.length} QUESTIONS DIFFÉRENTES`)
  return issues
}

const audited = questions.map((question) => ({ ...question, issues: issuesFor(question) }))
const issueCount = audited.filter(({ issues }) => issues.length > 0).length
const missingImages = audited.filter(({ issues }) => issues.includes('IMAGE ABSENTE')).length

const cards = audited.map((question) => {
  const issues = question.issues.length
    ? `<ul class="issues">${question.issues.map((issue) => `<li>${escapeHtml(issue)}</li>`).join('')}</ul>`
    : '<p class="ok">Contrôles automatiques réussis</p>'
  const choices = question.choix.length
    ? `<ol type="A">${question.choix.map((choice) => `<li>${escapeHtml(choice.replace(/^[A-D][.:]\s*/, ''))}</li>`).join('')}</ol>`
    : '<p class="muted">Réponse libre / oui-non</p>'
  return `<article class="card" data-exam="${question.exam}" data-issues="${question.issues.length ? 'yes' : 'no'}">
    <header><strong>Examen ${question.exam} · Q${question.number}</strong><span>${escapeHtml(question.type)} · ${escapeHtml(question.gravite)}</span></header>
    <img src="http://localhost:3001${escapeHtml(question.image)}" alt="Visuel Examen ${question.exam} question ${question.number}" loading="lazy">
    <h2>${escapeHtml(question.question)}</h2>
    ${choices}
    <p class="answer">Bonne réponse enregistrée : <strong>${escapeHtml(question.reponse)}</strong></p>
    <p class="explanation">${escapeHtml(question.explication)}</p>
    ${issues}
  </article>`
}).join('\n')

const html = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Audit complet des examens PermisHub</title><style>
*{box-sizing:border-box}body{margin:0;background:#f5efe3;color:#1f1a14;font-family:Arial,sans-serif}.top{position:sticky;top:0;z-index:2;padding:16px;background:#1f5d46;color:white;border-bottom:4px solid #1f1a14}.top h1{margin:0 0 8px;font-size:22px}.filters{display:flex;gap:8px;flex-wrap:wrap}select,label{font-weight:700}.summary{padding:16px;font-weight:700}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(360px,1fr));gap:18px;padding:0 16px 40px}.card{background:#fffaf0;border:3px solid #1f1a14;padding:12px;box-shadow:5px 5px 0 #1f1a14}.card header{display:flex;justify-content:space-between;gap:10px;border-bottom:2px solid #1f1a14;padding-bottom:8px}.card header span{font-size:12px;color:#665f55}.card img{display:block;width:100%;aspect-ratio:4/3;object-fit:contain;background:#e7e2d8;border:2px solid #1f1a14;margin-top:10px}.card h2{font-size:18px;line-height:1.3}.card li{margin:6px 0}.answer{padding:9px;background:#f8b800;border:2px solid #1f1a14}.explanation{font-size:14px;line-height:1.4}.issues{padding:10px 10px 10px 30px;background:#ffe2dc;border:2px solid #b83c2e;color:#8b2419;font-weight:700}.ok{padding:8px;background:#dcecdf;color:#1f5d46;font-weight:700}.muted{color:#665f55;font-style:italic}@media(max-width:500px){.grid{grid-template-columns:1fr;padding:0 8px 30px}.card{box-shadow:3px 3px 0 #1f1a14}}
</style></head><body><div class="top"><h1>Audit des examens blancs PermisHub</h1><div class="filters"><label>Examen <select id="exam"><option value="all">Tous</option>${Array.from({ length: 12 }, (_, index) => `<option value="${index + 3}">${index + 3}</option>`).join('')}</select></label><label><input id="issues" type="checkbox"> Afficher seulement les alertes</label></div></div>
<p class="summary">${questions.length} questions affichées · ${issueCount} avec alerte automatique · ${missingImages} image absente</p><main class="grid">${cards}</main>
<script>const exam=document.querySelector('#exam'),issues=document.querySelector('#issues'),cards=[...document.querySelectorAll('.card')];function filter(){cards.forEach(card=>card.hidden=(exam.value!=='all'&&card.dataset.exam!==exam.value)||(issues.checked&&card.dataset.issues!=='yes'))}exam.addEventListener('change',filter);issues.addEventListener('change',filter)</script></body></html>`

fs.writeFileSync(path.join(outputDirectory, 'index.html'), html)
fs.writeFileSync(path.join(outputDirectory, 'summary.json'), JSON.stringify({ total: questions.length, issueCount, missingImages }, null, 2))
console.log(JSON.stringify({ total: questions.length, issueCount, missingImages, output: path.join(outputDirectory, 'index.html') }))
