import { NextResponse } from 'next/server'
import { getOptionalSession } from '@/lib/auth'
import { createStripeCheckoutSession } from '@/lib/stripe-checkout-error'
import { getPackOffer, LAUNCH_BUNDLE_OFFER } from '@/content/pricing-config'
import { getLaunchOfferStatus } from '@/lib/launch-offer'

/**
 * Crée une Stripe Checkout Session pour un pack (Résumé, examens
 * illimités, perception des risques) — même principe que
 * api/checkout/circuit : checkout invité, prix recalculé côté serveur
 * depuis content/pricing-config.ts, jamais fait confiance au client.
 * Accès affiché immédiatement sur /packs/succes, vérifié en direct auprès
 * de Stripe — pas de base de données nécessaire pour ce mécanisme.
 */
export async function POST(request: Request) {
  const session = await getOptionalSession()

  const body = await request.json().catch(() => null)
  const offerId = typeof body?.offerId === 'string' ? body.offerId : null
  if (!offerId) {
    return NextResponse.json({ error: 'offerId manquant' }, { status: 400 })
  }
  // Email facultatif transmis par le client (ex. quiz de qualification —
  // QualificationQuiz.tsx) pour un checkout invité : sert uniquement de
  // pré-remplissage Stripe, jamais de source de vérité — le webhook
  // (api/webhooks/stripe) revérifie toujours l'email réel via
  // `session.customer_details` avant de créer le compte/l'accès.
  const bodyEmail = typeof body?.email === 'string' && body.email.trim() ? body.email.trim() : undefined

  const offer = getPackOffer(offerId)
  if (!offer) {
    return NextResponse.json({ error: 'Offre introuvable' }, { status: 404 })
  }

  // Garde-fou serveur pour l'offre de lancement (places + date limite
  // réellement vérifiées, voir lib/launch-offer.ts) — jamais se fier au
  // seul affichage côté client pour empêcher une vente au-delà des 20
  // places ou après la date limite.
  if (offer.id === LAUNCH_BUNDLE_OFFER.id) {
    const status = await getLaunchOfferStatus()
    if (!status.available) {
      return NextResponse.json({ error: status.expired ? 'Offre terminée.' : 'Toutes les places ont été prises.' }, { status: 409 })
    }
  }

  const origin = request.headers.get('origin') ?? process.env.NEXTAUTH_URL ?? 'http://localhost:3000'

  const checkoutResult = await createStripeCheckoutSession({
    mode: 'payment',
    // Bancontact : très utilisé en Belgique, ajouté le 2026-09-03 — n'apparaît
    // vraiment au client que si Bancontact est aussi activé côté Dashboard
    // Stripe (Paramètres > Moyens de paiement).
    customer_email: session?.user?.email ?? bodyEmail,
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
  }, `pack:${offer.id}`)

  if (!checkoutResult.ok) return checkoutResult.response
  const checkoutSession = checkoutResult.session

  if (!checkoutSession.url) {
    return NextResponse.json({ error: 'Impossible de créer la session de paiement.' }, { status: 500 })
  }

  return NextResponse.json({ url: checkoutSession.url })
}
