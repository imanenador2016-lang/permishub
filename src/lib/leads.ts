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

/** Lance une erreur si l'enregistrement échoue — à l'appelant de décider quoi en faire (voir api/lead : jamais bloquant pour le visiteur). */
export async function saveLead(data: LeadData): Promise<void> {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL
  if (!webhookUrl) {
    throw new Error('GOOGLE_SHEET_WEBHOOK_URL manquant')
  }

  // Colonnes dans l'ordre exact demandé (voir SETUP_LEADS.md pour le Sheet).
  const row = {
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
