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
    const metadataUserId = session.metadata?.userId
    const email = session.customer_details?.email ?? session.customer_email

    if (!circuitId) {
      console.error('checkout.session.completed sans circuitId dans les metadata', session.id)
      return NextResponse.json({ error: 'metadata manquantes' }, { status: 400 })
    }

    // Checkout invité : pas de userId transmis (client pas connecté au
    // moment de l'achat) — on retrouve ou crée le compte à partir de
    // l'email collecté par Stripe pendant le paiement. Un utilisateur qui
    // se connecte plus tard avec le même email (NextAuth Email provider)
    // retombe automatiquement sur ce même compte et son achat.
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

    await prisma.achatCircuit.create({
      data: {
        userId,
        circuitId,
        montant: session.amount_total ?? 0,
        stripePaymentIntentId:
          typeof session.payment_intent === 'string' ? session.payment_intent : (session.payment_intent?.id ?? null),
      },
    })
  }

  return NextResponse.json({ received: true })
}
