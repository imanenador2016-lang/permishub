import Stripe from 'stripe'

/**
 * Client Stripe serveur uniquement — ne jamais importer ce fichier depuis
 * un composant client (la clé secrète ne doit jamais atteindre le
 * navigateur). Voir SETUP.md pour STRIPE_SECRET_KEY.
 */
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  // Un Checkout normal répond en quelques secondes. Évite de laisser le
  // visiteur bloqué si Stripe ou le réseau est momentanément indisponible.
  timeout: 10_000,
  maxNetworkRetries: 0,
})
