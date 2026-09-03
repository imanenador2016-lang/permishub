import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'

/**
 * Confirmation de paiement Stripe — la SEULE porte d'entrée qui débloque
 * l'accès à un circuit. Ne jamais débloquer au clic ou à la redirection
 * (voir api/checkout/circuit) : uniquement ici, une fois la signature
 * vérifiée et le paiement réellement confirmé par Stripe.
 */
export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: 'Signature ou secret webhook manquant.' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error('Signature Stripe invalide :', err)
    return NextResponse.json({ error: 'Signature invalide' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const circuitId = session.metadata?.circuitId
    const centerSlug = session.metadata?.kind === 'circuits-bundle' ? session.metadata?.centerSlug : undefined
    // Le déblocage "tous les circuits d'un centre" (api/checkout/circuits-bundle)
    // n'a pas de circuitId unique — on le range dans AchatPack avec un offerId
    // préfixé plutôt que d'ajouter un modèle dédié (voir AchatPack, ajouté le
    // 2026-09-03 en corrigeant au passage ce cas jamais géré par ce webhook :
    // avant, une session "circuits-bundle" tombait dans la branche d'erreur
    // ci-dessous et n'était jamais enregistrée en base).
    const offerId = session.metadata?.offerId ?? (centerSlug ? `circuits-bundle:${centerSlug}` : undefined)
    const metadataUserId = session.metadata?.userId
    const email = session.customer_details?.email ?? session.customer_email

    if (!circuitId && !offerId) {
      console.error('checkout.session.completed sans circuitId ni offerId dans les metadata', session.id)
      return NextResponse.json({ error: 'metadata manquantes' }, { status: 400 })
    }

    // Checkout invité : pas de userId transmis (client pas connecté au
    // moment de l'achat) — on retrouve ou crée le compte à partir de
    // l'email collecté par Stripe pendant le paiement. Un utilisateur qui
    // se connecte plus tard avec le même email (NextAuth Email provider,
    // voir "Restaurer mon accès" — src/app/[locale]/restaurer-acces)
    // retombe automatiquement sur ce même compte et retrouve ses achats.
    let userId = metadataUserId
    if (!userId) {
      if (!email) {
        console.error('checkout.session.completed sans userId ni email', session.id)
        return NextResponse.json({ error: 'ni userId ni email' }, { status: 400 })
      }
      const user = await prisma.user.upsert({
        where: { email },
        update: {},
        create: { email },
      })
      userId = user.id
    }

    const paymentIntentId =
      typeof session.payment_intent === 'string' ? session.payment_intent : (session.payment_intent?.id ?? null)

    if (circuitId) {
      await prisma.achatCircuit.create({
        data: {
          userId,
          circuitId,
          montant: session.amount_total ?? 0,
          stripePaymentIntentId: paymentIntentId,
        },
      })
    } else if (offerId) {
      await prisma.achatPack.create({
        data: {
          userId,
          offerId,
          montant: session.amount_total ?? 0,
          stripePaymentIntentId: paymentIntentId,
        },
      })
    }
  }

  return NextResponse.json({ received: true })
}
