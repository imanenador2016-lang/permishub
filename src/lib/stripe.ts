import Stripe from 'stripe'

/**
 * Client Stripe serveur uniquement — ne jamais importer ce fichier depuis
 * un composant client (la clé secrète ne doit jamais atteindre le
 * navigateur). Voir SETUP.md pour STRIPE_SECRET_KEY.
 */
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '')
