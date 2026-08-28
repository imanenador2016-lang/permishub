import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { stripe } from '@/lib/stripe'
import { getPackOffer } from '@/content/pricing-config'

/**
 * Crée une Stripe Checkout Session pour un pack (Résumé, examens
 * illimités, perception des risques) — même principe que
 * api/checkout/circuit : checkout invité, prix recalculé côté serveur
 * depuis content/pricing-config.ts, jamais fait confiance au client.
 * Accès affiché immédiatement sur /packs/succes, vérifié en direct auprès
 * de Stripe — pas de base de données nécessaire pour ce mécanisme.
 */
export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  const body = await request.json().catch(() => null)
  const offerId = typeof body?.offerId === 'string' ? body.offerId : null
  if (!offerId) {
    return NextResponse.json({ error: 'offerId manquant' }, { status: 400 })
  }

  const offer = getPackOffer(offerId)
  if (!offer) {
    return NextResponse.json({ error: 'Offre introuvable' }, { status: 404 })
  }

  const origin = request.headers.get('origin') ?? process.env.NEXTAUTH_URL ?? 'http://localhost:3000'

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    customer_email: session?.user?.email ?? undefined,
    line_items: [
      {
        price_data: {
          currency: 'eur',
          unit_amount: offer.priceCents,
          product_data: { name: offer.title.fr },
        },
        quantity: 1,
      },
    ],
    metadata: {
      offerId: offer.id,
      userId: session?.user?.id ?? '',
    },
    success_url: `${origin}/fr/packs/succes?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/fr/?achat=annule#packs`,
  })

  if (!checkoutSession.url) {
    return NextResponse.json({ error: 'Impossible de créer la session de paiement.' }, { status: 500 })
  }

  return NextResponse.json({ url: checkoutSession.url })
}
