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

export async function createCheckoutSession(item: PurchasableItem): Promise<{ url: string }> {
  const res = await fetch('/api/checkout/pack', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ offerId: item.id }),
  })

  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.error ?? 'Le paiement a échoué.')
  }

  return res.json()
}
