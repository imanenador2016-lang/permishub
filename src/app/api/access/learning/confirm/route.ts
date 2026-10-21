import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { LEARNING_ACCESS_COOKIE, signLearningAccess } from '@/lib/learning-access-token'

function periodEnd(subscription: unknown) {
  const value = (subscription as { current_period_end?: number }).current_period_end
  return typeof value === 'number' ? value * 1000 : Date.now() + 8 * 24 * 60 * 60 * 1000
}

export async function GET(request: NextRequest) {
  const locale = request.nextUrl.searchParams.get('locale') === 'nl' ? 'nl' : 'fr'
  const sessionId = request.nextUrl.searchParams.get('session_id')
  const destination = new URL(`/${locale}/apprendre`, request.url)
  if (!sessionId) return NextResponse.redirect(destination)

  try {
    const checkout = await stripe.checkout.sessions.retrieve(sessionId, { expand: ['subscription'] })
    if (checkout.metadata?.kind !== 'learning-subscription') throw new Error('Invalid checkout kind')
    const subscription = checkout.subscription
    if (!subscription || typeof subscription === 'string') throw new Error('Subscription missing')
    if (!['active', 'trialing'].includes(subscription.status)) throw new Error('Subscription inactive')
    const expiresAt = periodEnd(subscription)
    const response = NextResponse.redirect(new URL(`/${locale}/apprendre?abonnement=actif`, request.url))
    response.cookies.set(LEARNING_ACCESS_COOKIE, await signLearningAccess({ subscriptionId: subscription.id, expiresAt }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 365 * 24 * 60 * 60,
    })
    return response
  } catch (error) {
    console.error('[Learning access] confirmation failed', error)
    destination.searchParams.set('abonnement', 'erreur')
    return NextResponse.redirect(destination)
  }
}
