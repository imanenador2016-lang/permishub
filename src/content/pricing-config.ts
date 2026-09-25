/**
 * Offres présentées juste après le résultat du test de niveau (moment de
 * conversion le plus fort — voir brief) et dans la section "Nos packs" de
 * la home. Prix en centimes, comme ExamCenter/PracticeCircuit
 * (domain/centers.ts). `title` sert de nom de produit Stripe et de libellé
 * sur la page de confirmation (api/checkout/pack, packs/succes).
 */
export const RESUME_OFFER = {
  id: 'offer-resume-sans-blabla',
  // Passé de 9,99 € à 15,99 € le 2026-09-12 (décision de l'utilisateur).
  priceCents: 1599,
  title: { fr: 'Résumé sans blabla', nl: 'Samenvatting zonder blabla' },
}

/**
 * Le vrai PDF du résumé (public/documents/resume-permishub.pdf) — vendu à
 * 9,99 € (RESUME_OFFER.priceCents), livré instantanément sur packs/succes
 * une fois le paiement vérifié auprès de Stripe (voir décision du
 * 2026-08-30 : accès gratuit temporaire terminé, vente définitive active).
 */
export const RESUME_FREE_FOR_TESTING = false
export const RESUME_PDF_URL = '/documents/resume-permishub.pdf'

export const EXAMENS_ILLIMITES_OFFER = {
  id: 'offer-examens-illimites',
  priceCents: 1999,
  title: { fr: 'Série d’examens d’entraînement', nl: 'Reeks oefenexamens' },
}

/**
 * Masqué du site le 2026-09-12 (contenu pas encore terminé, voir
 * l'utilisateur) — retiré de PacksSection.tsx et de la recommandation
 * post-test (ResumeHook.tsx bascule tout le monde sur RESUME_OFFER tant que
 * ce flag est actif). L'offre et son achat restent fonctionnels
 * techniquement (packs/succes sait toujours la livrer) : seule la vitrine
 * est coupée, pour ne pas casser une session déjà en cours qui l'aurait
 * choisie. Repasser à `false` une fois le contenu prêt.
 */
export const EXAMENS_ILLIMITES_HIDDEN = true

/**
 * Le vrai PDF perception des risques (public/documents/perception-risques-permishub.pdf,
 * fourni par l'utilisateur le 2026-09-11) — même principe de livraison que
 * RESUME_PDF_URL : instantanée sur packs/succes une fois le paiement vérifié
 * auprès de Stripe. Prix réel confirmé le 2026-09-12 : 9,99 € (remplace le
 * prix de test à 0,50 € et l'ancien prix envisagé de 19,99 €).
 */
export const PERCEPTION_RISQUE_PDF_URL = '/documents/perception-risques-permishub.pdf'
export const PERCEPTION_RISQUE_OFFER = {
  id: 'offer-perception-risque',
  priceCents: 999,
  title: { fr: 'Perception des risques', nl: 'Gevaarherkenning' },
}

/**
 * Offre de lancement "Pack complet" (Hero, 2026-09-12) — Résumé + Perception
 * des risques + accès à tous les circuits + groupe WhatsApp (coaching hebdo,
 * conseils quotidiens), en un seul paiement à 49 €. Limitée aux 20 premiers
 * acheteurs (voir LAUNCH_BUNDLE_MAX_SLOTS) ET à une semaine (voir
 * LAUNCH_BUNDLE_DEADLINE) — les deux limites sont réellement appliquées côté
 * serveur (api/checkout/pack refuse la vente au-delà, jamais une rareté
 * juste affichée à l'écran) : voir api/launch-offer/status pour le compteur
 * en temps réel utilisé par le Hero.
 *
 * "Accès pour 1 an" annoncé au client : le contenu livré (PDF, circuits,
 * groupe WhatsApp) n'a techniquement pas de date d'expiration ailleurs sur
 * le site (aucun mécanisme d'expiration n'existe nulle part dans le code) —
 * en pratique l'accès livré ne sera donc jamais révoqué après 1 an, ce qui
 * respecte la promesse (accès au moins 1 an) sans construire un système
 * d'expiration dédié pour l'instant.
 */
export const LAUNCH_BUNDLE_OFFER = {
  id: 'offer-pack-complet-lancement',
  priceCents: 4900,
  title: { fr: 'Pack complet — Offre de lancement', nl: 'Volledig pakket — Lanceringsaanbieding' },
}
export const LAUNCH_BUNDLE_MAX_SLOTS = 20
/**
 * Places déjà vendues EN DEHORS de Stripe (manuellement, WhatsApp, virement,
 * etc. — décision de l'utilisateur du 2026-09-14 : "j'ai déjà 6 places
 * prises"). Le compteur réel (`getLaunchOfferStatus`, voir lib/launch-offer.ts)
 * compte les vraies ventes Stripe (table `AchatPack`) ET ce nombre, jamais un
 * chiffre affiché sans vérité derrière. À REMETTRE À JOUR À LA MAIN à chaque
 * nouvelle vente faite hors du site — sinon le compteur affiché sera trop
 * optimiste.
 */
export const LAUNCH_BUNDLE_MANUAL_SALES = 6
/** Fin de l'offre : 7 jours à partir du 2026-09-12 (décision de l'utilisateur), fuseau Bruxelles. */
export const LAUNCH_BUNDLE_DEADLINE = '2026-09-19T23:59:59+02:00'
/** Numéro WhatsApp pro du client — même numéro que CoachingWhatsAppSection.tsx. */
export const LAUNCH_BUNDLE_WHATSAPP_NUMBER = '32456374648'

/**
 * Repère de comparaison "auto-école classique" pour l'ancrage du prix du
 * pack de lancement (Hero) — remplace l'ancienne référence (somme des prix
 * des 3 autres offres du site, 97,94 €, peu parlante puisque l'acheteur ne
 * les connaît pas) par le vrai coût du parcours classique en auto-école,
 * bien plus parlant pour l'acheteur (décision de l'utilisateur, 2026-09-13).
 * Chiffres donnés par l'utilisateur : ~1600 € pour 20h de conduite (le gros
 * du budget en auto-école) + ~150 € pour 12h de cours théoriques.
 */
export const DRIVING_SCHOOL_DRIVING_HOURS = 20
export const DRIVING_SCHOOL_DRIVING_CENTS = 160000
export const DRIVING_SCHOOL_THEORY_HOURS = 12
export const DRIVING_SCHOOL_THEORY_CENTS = 15000
export const DRIVING_SCHOOL_TOTAL_CENTS = DRIVING_SCHOOL_DRIVING_CENTS + DRIVING_SCHOOL_THEORY_CENTS

export const PACK_OFFERS = [RESUME_OFFER, EXAMENS_ILLIMITES_OFFER, PERCEPTION_RISQUE_OFFER, LAUNCH_BUNDLE_OFFER]

export function getPackOffer(id: string) {
  return PACK_OFFERS.find((o) => o.id === id)
}
