import { NextResponse } from 'next/server'
import { createStripeCheckoutSession } from '@/lib/stripe-checkout-error'
import { getCoachingIntensifSession } from '@/content/coaching-intensif'
export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const sessionId = typeof body?.sessionId === 'string' ? body.sessionId : ''
  const email = typeof body?.email === 'string' ? body.email.trim() : ''
  if (!/^\S+@\S+\.\S+$/.test(email)) return NextResponse.json({ error: 'Adresse e-mail invalide.' }, { status: 400 })
  const coaching = getCoachingIntensifSession(sessionId)
  if (!coaching) return NextResponse.json({ error: 'Créneau introuvable.' }, { status: 404 })
  const origin = request.headers.get('origin') ?? process.env.NEXTAUTH_URL ?? 'http://localhost:3000'
  const checkoutResult = await createStripeCheckoutSession({ mode: 'payment', customer_email: email, line_items: [{ price_data: { currency: 'eur', unit_amount: coaching.priceCents, product_data: { name: `Coaching intensif Zoom — ${coaching.label} ${coaching.time}` } }, quantity: 1 }], metadata: { offerId: coaching.id, coachingDate: coaching.date, coachingTime: coaching.time }, success_url: `${origin}/fr/coaching/succes?session_id={CHECKOUT_SESSION_ID}`, cancel_url: `${origin}/fr/coaching?achat=annule` }, `coaching:${coaching.id}`)
  if (!checkoutResult.ok) return checkoutResult.response
  const checkout = checkoutResult.session
  if (!checkout.url) return NextResponse.json({ error: 'Impossible de créer le paiement.' }, { status: 500 })
  return NextResponse.json({ url: checkout.url })
}
