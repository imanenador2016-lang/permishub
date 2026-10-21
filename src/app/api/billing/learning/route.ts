import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { getCheckoutOrigin } from '@/lib/checkout-origin'
import { LEARNING_ACCESS_COOKIE, verifyLearningAccess } from '@/lib/learning-access-token'

export async function GET(request: NextRequest) {
  const locale = request.nextUrl.searchParams.get('locale') === 'nl' ? 'nl' : 'fr'
  const payload = await verifyLearningAccess(request.cookies.get(LEARNING_ACCESS_COOKIE)?.value, true)
  if (!payload) return NextResponse.redirect(new URL(`/${locale}/apprendre?abonnement=requis`, request.url))

  try {
    const subscription = await stripe.subscriptions.retrieve(payload.subscriptionId)
    const customer = typeof subscription.customer === 'string' ? subscription.customer : subscription.customer.id
    const portal = await stripe.billingPortal.sessions.create({
      customer,
      return_url: `${getCheckoutOrigin(request)}/${locale}/apprendre`,
    })
    return NextResponse.redirect(portal.url)
  } catch (error) {
    console.error('[Learning billing portal] failed', error)
    return NextResponse.redirect(new URL(`/${locale}/apprendre?abonnement=erreur`, request.url))
  }
}
