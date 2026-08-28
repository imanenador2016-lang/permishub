import { NextResponse } from 'next/server'
import { getOptionalSession } from '@/lib/auth'
import { stripe } from '@/lib/stripe'
import { getFeaturedCircuit, getCenters } from '@/content/centers/registry'

/**
 * Crée une Stripe Checkout Session pour un circuit — jamais de prix envoyé
 * par le client, toujours recalculé côté serveur depuis le catalogue (voir
 * content/centers/registry.ts). L'accès n'est débloqué qu'au webhook
 * `checkout.session.completed` (route /api/webhooks/stripe), jamais ici.
 *
 * Checkout invité (2026-08-21) : pas de connexion obligatoire avant
 * d'acheter, pour ne pas perdre de conversion. Stripe collecte l'email
 * pendant le paiement ; le webhook crée le compte automatiquement à partir
 * de cet email (pattern "guest checkout" standard) — voir
 * api/webhooks/stripe. Si l'acheteur est déjà connecté, son userId est
 * transmis directement, pas besoin de repasser par l'email.
 */
export async function POST(request: Request) {
  const session = await getOptionalSession()

  const body = await request.json().catch(() => null)
  const circuitId = typeof body?.circuitId === 'string' ? body.circuitId : null
  if (!circuitId) {
    return NextResponse.json({ error: 'circuitId manquant' }, { status: 400 })
  }

  // Retrouve le circuit dans le catalogue (source de vérité pour le prix —
  // voir content/centers/registry.ts) plutôt que de faire confiance au client.
  const circuit = getCenters()
    .map((center) => getFeaturedCircuit(center.slug))
    .find((c) => c?.id === circuitId)

  if (!circuit || !circuit.priceCents) {
    return NextResponse.json({ error: 'Circuit introuvable' }, { status: 404 })
  }

  const origin = request.headers.get('origin') ?? process.env.NEXTAUTH_URL ?? 'http://localhost:3000'

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    // Pas de customer_email forcé si invité : Stripe Checkout demande
    // l'email lui-même pendant le paiement (obligatoire en mode "payment").
    customer_email: session?.user?.email ?? undefined,
    line_items: [
      {
        price_data: {
          currency: 'eur',
          unit_amount: circuit.priceCents,
          product_data: {
            name: `Circuit d'examen — ${circuit.title.fr}`,
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      circuitId: circuit.id,
      // Vide si invité — le webhook retrouve/crée l'utilisateur via l'email
      // Stripe (session.customer_details.email) dans ce cas.
      userId: session?.user?.id ?? '',
    },
    // {CHECKOUT_SESSION_ID} est substitué par Stripe lui-même dans l'URL de
    // redirection — la page de succès vérifie ce session_id en direct
    // auprès de Stripe (jamais fait confiance à l'URL seule) avant de
    // débloquer quoi que ce soit. Accès instantané, pas d'email à attendre.
    success_url: `${origin}/fr/circuits/succes?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/fr/circuits?achat=annule`,
  })

  if (!checkoutSession.url) {
    return NextResponse.json({ error: 'Impossible de créer la session de paiement.' }, { status: 500 })
  }

  return NextResponse.json({ url: checkoutSession.url })
}
