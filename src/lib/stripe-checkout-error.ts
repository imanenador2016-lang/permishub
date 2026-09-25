import { NextResponse } from 'next/server'
import type Stripe from 'stripe'
import { stripe } from '@/lib/stripe'

type StripeFailure = { type?: unknown; code?: unknown; requestId?: unknown }

/** Provider diagnostics stay in server logs; never expose keys or raw responses to the candidate. */
function failureResponse(error: unknown, context: string) {
  const failure = (error && typeof error === 'object' ? error : {}) as StripeFailure
  console.error(`[Stripe Checkout] ${context}`, {
    type: typeof failure.type === 'string' ? failure.type : undefined,
    code: typeof failure.code === 'string' ? failure.code : undefined,
    requestId: typeof failure.requestId === 'string' ? failure.requestId : undefined,
    message: error instanceof Error ? error.message : 'Unknown Stripe checkout error',
  })
  return NextResponse.json(
    { error: 'Le paiement est temporairement indisponible. Aucun paiement n’a été confirmé. Réessaie dans quelques instants.' },
    { status: 503 },
  )
}

export async function createStripeCheckoutSession(params: Stripe.Checkout.SessionCreateParams, context: string) {
  try {
    return { ok: true as const, session: await stripe.checkout.sessions.create(params) }
  } catch (error) {
    return { ok: false as const, response: failureResponse(error, context) }
  }
}
