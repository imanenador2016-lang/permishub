/**
 * Stockage des leads du tunnel de qualification — un Google Sheet via un
 * Google Apps Script Web App (voir SETUP_LEADS.md pour le déploiement),
 * pas de base de données pour l'instant (voir conversation du 2026-09-08).
 * Tout passe par `saveLead()` : pour migrer vers une vraie base plus tard,
 * seule cette fonction change, rien côté appelant (api/lead/route.ts).
 */
export interface LeadData {
  email: string
  locale: string
  /** Wallonie/Bruxelles/Flandre — ajouté le 2026-09-08, voir SETUP_LEADS.md pour l'ajout de la colonne dans le Sheet existant. */
  region: string
  examenVise: string
  echeance: string
  tentatives: string
  segment: string
  consentement: boolean
  utmSource: string
  utmCampaign: string
  userAgent: string
}

/** Une ligne brute envoyée au script — mêmes clés que les en-têtes de colonnes du Sheet (voir SETUP_LEADS.md). */
async function postRow(row: Record<string, string>): Promise<void> {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL
  if (!webhookUrl) {
    throw new Error('GOOGLE_SHEET_WEBHOOK_URL manquant')
  }

  const res = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(row),
  })

  if (!res.ok) {
    throw new Error(`Google Sheet webhook: HTTP ${res.status}`)
  }
}

/** Lance une erreur si l'enregistrement échoue — à l'appelant de décider quoi en faire (voir api/lead : jamais bloquant pour le visiteur). */
export async function saveLead(data: LeadData): Promise<void> {
  // Colonnes dans l'ordre exact demandé (voir SETUP_LEADS.md pour le Sheet).
  await postRow({
    date: new Date().toISOString(),
    email: data.email,
    locale: data.locale,
    region: data.region,
    examen_vise: data.examenVise,
    echeance: data.echeance,
    tentatives: data.tentatives,
    segment: data.segment,
    consentement: data.consentement ? 'oui' : 'non',
    utm_source: data.utmSource,
    utm_campaign: data.utmCampaign,
    user_agent: data.userAgent,
    a_achete: '',
  })
}

/**
 * Réponses complètes du quiz de qualification (pack de lancement à 49 €,
 * voir QualificationQuiz.tsx) — une ligne SÉPARÉE du lead email initial
 * (même principe que `saveTestScore` ci-dessous : plus simple et fiable
 * côté Apps Script qu'une recherche/mise à jour par email), ajoutée une
 * fois les 4 questions répondues (région, niveau théorie, échec examen,
 * motivation) et le résultat d'éligibilité connu. Colonnes `niveau_theorie`/
 * `echec_examen`/`motivation`/`eligible` à ajouter au Sheet et au script,
 * voir SETUP_LEADS.md — `region` réutilise la colonne déjà utilisée par
 * QuizFunnel (mêmes 3 valeurs Wallonie/Bruxelles/Flandre).
 */
export async function saveQuizAnswers(data: {
  email: string
  region: string
  niveauTheorie: string
  echecExamen: string
  motivation: string
  eligible: boolean
}): Promise<void> {
  await postRow({
    date: new Date().toISOString(),
    email: data.email,
    region: data.region,
    niveau_theorie: data.niveauTheorie,
    echec_examen: data.echecExamen,
    motivation: data.motivation,
    eligible: data.eligible ? 'oui' : 'non',
  })
}

/**
 * Note obtenue au test de niveau — envoyée en plus de `saveLead` (appelée
 * plus tôt, avant le test, quand le score n'existe pas encore), voir
 * conversation du 2026-09-12 ("j'ai pas leur note dans le Sheet"). Ajoute
 * une NOUVELLE ligne plutôt que de retrouver/modifier la ligne du lead
 * existant : beaucoup plus simple et fiable côté Apps Script (pas de
 * recherche par email, pas de risque d'écrire dans la mauvaise ligne) —
 * les deux lignes se retrouvent facilement en triant/filtrant par email
 * dans le Sheet. Colonnes `score10`/`points_faibles` à ajouter au Sheet et
 * au script, voir SETUP_LEADS.md.
 */
export async function saveTestScore(data: { email: string; score10: number; weakThemeLabels: string[] }): Promise<void> {
  await postRow({
    date: new Date().toISOString(),
    email: data.email,
    score10: String(data.score10),
    points_faibles: data.weakThemeLabels.join(', '),
  })
}
