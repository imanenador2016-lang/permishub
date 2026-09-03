/**
 * Offres présentées juste après le résultat du test de niveau (moment de
 * conversion le plus fort — voir brief) et dans la section "Nos packs" de
 * la home. Prix en centimes, comme ExamCenter/PracticeCircuit
 * (domain/centers.ts). `title` sert de nom de produit Stripe et de libellé
 * sur la page de confirmation (api/checkout/pack, packs/succes).
 */
// PRIX TEMPORAIRE (25 centimes) pour valider le tout premier vrai paiement
// live + webhook — voir conversation du 2026-09-03. À remettre à 999 juste
// après ce test, ne JAMAIS laisser ce prix en prod au-delà du test.
export const RESUME_OFFER = {
  id: 'offer-resume-sans-blabla',
  priceCents: 25,
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
 * Perception des dangers — feature pas encore construite (voir
 * docs/ARCHITECTURE.md § Prochaines étapes : "prévoir un
 * domain/hazard-perception.ts distinct"). Le pack est vendable dès
 * maintenant (prix confirmé par l'utilisateur le 2026-08-20), le contenu
 * suit derrière.
 */
export const PERCEPTION_RISQUE_OFFER = {
  id: 'offer-perception-risque',
  priceCents: 1999,
  title: { fr: 'Perception des risques', nl: 'Gevaarherkenning' },
}

export const PACK_OFFERS = [RESUME_OFFER, EXAMENS_ILLIMITES_OFFER, PERCEPTION_RISQUE_OFFER]

export function getPackOffer(id: string) {
  return PACK_OFFERS.find((o) => o.id === id)
}
