/**
 * Appelle la vraie route Stripe pour l'achat d'un pack (Résumé, examens
 * illimités, perception des risques) — voir api/checkout/pack. Checkout
 * invité, comme lib/circuit-payment.ts : pas de connexion requise, accès
 * confirmé instantanément sur /packs/succes, jamais de faux succès simulé
 * côté client.
 */
export interface PurchasableItem {
  id: string
  priceCents: number
}

export function createCheckoutPath(item: PurchasableItem) {
  return `/api/checkout/pack?offerId=${encodeURIComponent(item.id)}`
}

export async function createCheckoutSession(item: PurchasableItem, options?: { email?: string }): Promise<{ url: string }> {
  const res = await fetch('/api/checkout/pack', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
    body: JSON.stringify({ offerId: item.id, email: options?.email }),
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.error ?? 'Le paiement a échoué.')
  }
  if (typeof data.url !== 'string' || !data.url.startsWith('https://checkout.stripe.com/')) {
    throw new Error('La page de paiement Stripe n’est pas disponible. Réessaie dans quelques instants.')
  }

  return { url: data.url }
}
