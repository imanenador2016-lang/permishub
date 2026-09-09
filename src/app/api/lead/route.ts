import { NextResponse } from 'next/server'
import { saveLead } from '@/lib/leads'
import { isRateLimited } from '@/lib/rate-limit'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000 // 10 min

/** Ne jamais logger un email en clair en prod (voir brief) — ne garde que le domaine. */
function maskEmail(email: string): string {
  const at = email.indexOf('@')
  return at === -1 ? '***' : `***${email.slice(at)}`
}

function getClientIp(request: Request): string {
  // Netlify Functions transmettent l'IP réelle via x-nf-client-connection-ip ;
  // x-forwarded-for en repli (proxy générique), sinon regroupe tout le monde
  // sous une même clé plutôt que de désactiver le rate limiting.
  return request.headers.get('x-nf-client-connection-ip') ?? request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
}

/**
 * Enregistre un lead du tunnel de qualification (voir lib/leads.ts) —
 * jamais bloquant pour le visiteur : le client (QuizFunnel.tsx) avance vers
 * le test quel que soit le résultat de cet appel, cette route ne fait que
 * refléter honnêtement ce qui s'est passé (pour du monitoring, pas pour
 * conditionner l'UX).
 */
export async function POST(request: Request) {
  const ip = getClientIp(request)
  // Clé préfixée par route — sans ça, isRateLimited() (Map partagée par IP
  // seule, voir rate-limit.ts) mélange les compteurs de /api/lead et
  // /api/test-result-email : un visiteur qui teste plusieurs fois peut se
  // faire bloquer silencieusement sur l'une à cause de l'autre (trouvé le
  // 2026-09-09 : aucun email reçu après un vrai test complet, alors que
  // l'envoi fonctionnait — c'était juste rate-limité sans le signaler).
  if (isRateLimited(`lead:${ip}`, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS)) {
    return NextResponse.json({ error: 'Trop de requêtes, réessaie dans quelques minutes.' }, { status: 429 })
  }

  const body = await request.json().catch(() => null)
  const email = typeof body?.email === 'string' ? body.email.trim() : ''
  const consentement = body?.consentement === true

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: 'Email invalide.' }, { status: 400 })
  }
  if (!consentement) {
    return NextResponse.json({ error: 'Consentement requis.' }, { status: 400 })
  }

  try {
    await saveLead({
      email,
      locale: typeof body?.locale === 'string' ? body.locale : '',
      region: typeof body?.region === 'string' ? body.region : '',
      examenVise: typeof body?.examenVise === 'string' ? body.examenVise : '',
      echeance: typeof body?.echeance === 'string' ? body.echeance : '',
      tentatives: typeof body?.tentatives === 'string' ? body.tentatives : '',
      segment: typeof body?.segment === 'string' ? body.segment : '',
      consentement,
      utmSource: typeof body?.utmSource === 'string' ? body.utmSource : '',
      utmCampaign: typeof body?.utmCampaign === 'string' ? body.utmCampaign : '',
      userAgent: request.headers.get('user-agent') ?? '',
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Échec saveLead pour', maskEmail(email), ':', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Échec de l’enregistrement.' }, { status: 500 })
  }
}
