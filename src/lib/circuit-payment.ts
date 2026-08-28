/**
 * Appelle la vraie route Stripe pour l'achat d'un circuit — voir
 * api/checkout/circuit. Checkout invité : pas de connexion requise (voir
 * décision du 2026-08-21 — la rendre obligatoire coûtait trop de
 * conversion). Distinct de `createCheckoutSession` (lib/payment.ts), qui
 * reste un stub pour les autres packs tant qu'ils n'ont pas leur propre
 * intégration Stripe.
 */
export async function createCircuitCheckoutSession(circuitId: string): Promise<{ url: string }> {
  const res = await fetch('/api/checkout/circuit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ circuitId }),
  })

  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.error ?? 'Le paiement a échoué.')
  }

  return res.json()
}
