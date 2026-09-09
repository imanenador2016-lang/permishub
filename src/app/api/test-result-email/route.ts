import { NextResponse } from 'next/server'
import { sendTestResultEmail } from '@/lib/test-result-email'
import { isRateLimited } from '@/lib/rate-limit'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000 // 10 min

/** Ne jamais logger un email en clair en prod (voir api/lead) — ne garde que le domaine. */
function maskEmail(email: string): string {
  const at = email.indexOf('@')
  return at === -1 ? '***' : `***${email.slice(at)}`
}

function getClientIp(request: Request): string {
  return request.headers.get('x-nf-client-connection-ip') ?? request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
}

/**
 * Envoie le résultat du test de niveau par email — voir
 * lib/test-result-email.ts et TestDeNiveau.tsx (déclenché une fois le
 * résultat calculé). Jamais bloquant pour le visiteur : le résultat reste
 * affiché à l'écran quel que soit l'issue de cet appel (voir api/lead pour
 * le même principe).
 */
export async function POST(request: Request) {
  const ip = getClientIp(request)
  // Clé préfixée par route — voir api/lead/route.ts pour le pourquoi.
  if (isRateLimited(`result-email:${ip}`, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS)) {
    return NextResponse.json({ error: 'Trop de requêtes, réessaie dans quelques minutes.' }, { status: 429 })
  }

  const body = await request.json().catch(() => null)
  const email = typeof body?.email === 'string' ? body.email.trim() : ''
  const locale = body?.locale === 'nl' ? 'nl' : 'fr'
  const score10 = typeof body?.score10 === 'number' ? body.score10 : NaN
  const weakThemeLabels = Array.isArray(body?.weakThemeLabels)
    ? body.weakThemeLabels.filter((w: unknown): w is string => typeof w === 'string')
    : []

  if (!EMAIL_REGEX.test(email) || Number.isNaN(score10)) {
    return NextResponse.json({ error: 'Paramètres invalides.' }, { status: 400 })
  }

  try {
    await sendTestResultEmail({ email, locale, score10, weakThemeLabels })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Échec envoi email résultat pour', maskEmail(email), ':', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Échec de l’envoi.' }, { status: 500 })
  }
}
