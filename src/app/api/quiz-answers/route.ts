import { NextResponse } from 'next/server'
import { saveQuizAnswers } from '@/lib/leads'
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
 * Enregistre les réponses complètes du quiz de qualification (pack de
 * lancement à 49 €, voir QualificationQuiz.tsx) — appelé une fois la
 * question 4 répondue, en arrière-plan côté client (jamais attendu, jamais
 * bloquant pour l'affichage du résultat éligible/non éligible, même
 * principe que api/lead et api/test-result-email).
 */
export async function POST(request: Request) {
  const ip = getClientIp(request)
  // Clé préfixée par route — voir api/lead/route.ts pour le pourquoi.
  if (isRateLimited(`quiz-answers:${ip}`, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS)) {
    return NextResponse.json({ error: 'Trop de requêtes, réessaie dans quelques minutes.' }, { status: 429 })
  }

  const body = await request.json().catch(() => null)
  const email = typeof body?.email === 'string' ? body.email.trim() : ''

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: 'Email invalide.' }, { status: 400 })
  }

  try {
    await saveQuizAnswers({
      email,
      region: typeof body?.region === 'string' ? body.region : '',
      niveauTheorie: typeof body?.niveauTheorie === 'string' ? body.niveauTheorie : '',
      echecExamen: typeof body?.echecExamen === 'string' ? body.echecExamen : '',
      motivation: typeof body?.motivation === 'string' ? body.motivation : '',
      eligible: body?.eligible === true,
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Échec saveQuizAnswers pour', maskEmail(email), ':', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Échec de l’enregistrement.' }, { status: 500 })
  }
}
