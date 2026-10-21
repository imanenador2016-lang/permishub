import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { LEARNING_ACCESS_COOKIE, signLearningAccess, verifyLearningAccess } from '@/lib/learning-access-token'

export async function GET(request: NextRequest) {
  const locale = request.nextUrl.searchParams.get('locale') === 'nl' ? 'nl' : 'fr'
  const returnTo = request.nextUrl.searchParams.get('returnTo')
  const safeReturn = returnTo?.startsWith(`/${locale}/apprendre`) ? returnTo : `/${locale}/apprendre`
  const token = request.cookies.get(LEARNING_ACCESS_COOKIE)?.value
  const payload = await verifyLearningAccess(token, true)
  if (!payload) return NextResponse.redirect(new URL(`/${locale}/apprendre?abonnement=requis`, request.url))

  try {
    const subscription = await stripe.subscriptions.retrieve(payload.subscriptionId)
    if (!['active', 'trialing'].includes(subscription.status)) throw new Error('Inactive subscription')
    const currentPeriodEnd = (subscription as unknown as { current_period_end?: number }).current_period_end
    const expiresAt = typeof currentPeriodEnd === 'number' ? currentPeriodEnd * 1000 : Date.now() + 8 * 24 * 60 * 60 * 1000
    const response = NextResponse.redirect(new URL(safeReturn, request.url))
    response.cookies.set(LEARNING_ACCESS_COOKIE, await signLearningAccess({ subscriptionId: subscription.id, expiresAt }), {
      httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 365 * 24 * 60 * 60,
    })
    return response
  } catch {
    const response = NextResponse.redirect(new URL(`/${locale}/apprendre?abonnement=inactif`, request.url))
    response.cookies.delete(LEARNING_ACCESS_COOKIE)
    return response
  }
}
