import { NextRequest, NextResponse } from 'next/server'
import { getCenter, getCircuitById } from '@/content/centers/registry'
import { stripe } from '@/lib/stripe'
import {
  circuitAccessCookieName,
  circuitAccessCookieOptions,
  createCircuitAccessToken,
} from '@/lib/circuit-access-token'

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get('session_id')
  const locale = request.nextUrl.searchParams.get('locale') === 'nl' ? 'nl' : 'fr'
  const fallback = new URL(`/${locale}/circuits/succes`, request.url)
  if (!sessionId) return NextResponse.redirect(fallback)

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    if (session.payment_status !== 'paid') return NextResponse.redirect(fallback)

    let centerSlug: string | undefined
    if (session.metadata?.kind === 'circuits-bundle') {
      const requestedCenter = session.metadata.centerSlug
      centerSlug = requestedCenter && getCenter(requestedCenter) ? requestedCenter : undefined
    } else {
      const circuitId = session.metadata?.circuitId
      centerSlug = circuitId ? getCircuitById(circuitId)?.centerSlug : undefined
    }

    if (!centerSlug) return NextResponse.redirect(fallback)

    const destination = new URL(`/${locale}/circuits/${centerSlug}`, request.url)
    destination.searchParams.set('achat', 'confirme')

    const response = NextResponse.redirect(destination)
    response.cookies.set(
      circuitAccessCookieName(centerSlug),
      createCircuitAccessToken(centerSlug),
      circuitAccessCookieOptions,
    )
    return response
  } catch {
    return NextResponse.redirect(fallback)
  }
}
