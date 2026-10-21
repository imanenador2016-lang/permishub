import { NextRequest, NextResponse } from 'next/server'
import { EXAMENS_ILLIMITES_OFFER, PACK_THEORIE_ILLIMITE_OFFER } from '@/content/pricing-config'
import { stripe } from '@/lib/stripe'
import { createExamAccessToken, EXAM_ACCESS_COOKIE, examAccessCookieOptions } from '@/lib/exam-access-token'

const ELIGIBLE_OFFERS = new Set([EXAMENS_ILLIMITES_OFFER.id, PACK_THEORIE_ILLIMITE_OFFER.id])

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get('session_id')
  const locale = request.nextUrl.searchParams.get('locale') === 'nl' ? 'nl' : 'fr'
  if (!sessionId) return NextResponse.redirect(new URL(`/${locale}/packs/succes`, request.url))

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    const offerId = session.metadata?.offerId
    if (session.payment_status !== 'paid' || !offerId || !ELIGIBLE_OFFERS.has(offerId)) {
      return NextResponse.redirect(new URL(`/${locale}/packs/succes`, request.url))
    }

    const destination = new URL(`/${locale}/packs/succes`, request.url)
    destination.searchParams.set('session_id', sessionId)
    destination.searchParams.set('access', 'confirmed')
    const response = NextResponse.redirect(destination)
    response.cookies.set(EXAM_ACCESS_COOKIE, createExamAccessToken(), examAccessCookieOptions)
    return response
  } catch {
    return NextResponse.redirect(new URL(`/${locale}/packs/succes`, request.url))
  }
}
