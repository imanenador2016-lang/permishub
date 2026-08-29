import { NextResponse } from 'next/server'
import { getOptionalSession } from '@/lib/auth'
import { stripe } from '@/lib/stripe'
import { getCenter, CIRCUITS_BUNDLE_PRICE_CENTS } from '@/content/centers/registry'

/**
 * Crée une Stripe Checkout Session pour débloquer TOUS les circuits d'un
 * centre en un seul paiement (voir CircuitOfferModal.tsx) — remplace l'achat
 * par circuit (api/checkout/circuit, conservé mais débranché). Prix jamais
 * envoyé par le client, toujours recalculé côté serveur depuis
 * CIRCUITS_BUNDLE_PRICE_CENTS. L'accès n'est débloqué qu'après vérification
 * du paiement sur la page de succès (jamais ici) — voir circuits/succes.
 *
 * Checkout invité (même pattern que api/checkout/circuit) : pas de connexion
 * obligatoire avant d'acheter.
 */
export async function POST(request: Request) {
  const session = await getOptionalSession()

  const body = await request.json().catch(() => null)
  const centerSlug = typeof body?.centerSlug === 'string' ? body.centerSlug : null
  if (!centerSlug) {
    return NextResponse.json({ error: 'centerSlug manquant' }, { status: 400 })
  }

  const center = getCenter(centerSlug)
  if (!center || center.comingSoon) {
    return NextResponse.json({ error: 'Centre introuvable' }, { status: 404 })
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
          unit_amount: CIRCUITS_BUNDLE_PRICE_CENTS,
          product_data: {
            name: `Tous les circuits — ${center.name}`,
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      kind: 'circuits-bundle',
      centerSlug: center.slug,
      userId: session?.user?.id ?? '',
    },
    success_url: `${origin}/fr/circuits/succes?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/fr/circuits/${center.slug}?achat=annule`,
  })

  if (!checkoutSession.url) {
    return NextResponse.json({ error: 'Impossible de créer la session de paiement.' }, { status: 500 })
  }

  return NextResponse.json({ url: checkoutSession.url })
}
