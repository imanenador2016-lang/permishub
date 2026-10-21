import { NextRequest, NextResponse } from 'next/server'
import { createStripeCheckoutSession } from '@/lib/stripe-checkout-error'
import { getCheckoutOrigin } from '@/lib/checkout-origin'
import { getOptionalSession } from '@/lib/auth'
import { LEARNING_SUBSCRIPTION } from '@/lib/learning-subscription'

export async function GET(request: NextRequest) {
  const locale = request.nextUrl.searchParams.get('locale') === 'nl' ? 'nl' : 'fr'
  const session = await getOptionalSession()
  const origin = getCheckoutOrigin(request)
  const result = await createStripeCheckoutSession({
    mode: 'subscription',
    ...(session?.user?.email ? { customer_email: session.user.email } : {}),
    line_items: [{
      quantity: 1,
      price_data: {
        currency: LEARNING_SUBSCRIPTION.currency,
        unit_amount: LEARNING_SUBSCRIPTION.priceCents,
        recurring: { interval: LEARNING_SUBSCRIPTION.interval },
        product_data: { name: LEARNING_SUBSCRIPTION.name },
      },
    }],
    metadata: {
      kind: 'learning-subscription',
      ...(session?.user?.id ? { userId: session.user.id } : {}),
    },
    subscription_data: { metadata: { kind: 'learning-subscription' } },
    success_url: `${origin}/api/access/learning/confirm?locale=${locale}&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/${locale}/apprendre?abonnement=annule`,
    allow_promotion_codes: true,
  }, 'learning-subscription')

  if (!result.ok) return NextResponse.redirect(new URL(`/${locale}/apprendre?abonnement=erreur`, origin))
  return NextResponse.redirect(result.session.url!)
}
