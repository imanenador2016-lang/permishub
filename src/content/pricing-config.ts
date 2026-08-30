/**
 * Offres présentées juste après le résultat du test de niveau (moment de
 * conversion le plus fort — voir brief) et dans la section "Nos packs" de
 * la home. Prix en centimes, comme ExamCenter/PracticeCircuit
 * (domain/centers.ts). `title` sert de nom de produit Stripe et de libellé
 * sur la page de confirmation (api/checkout/pack, packs/succes).
 */
export const RESUME_OFFER = {
  id: 'offer-resume-sans-blabla',
  priceCents: 999,
  title: { fr: 'Résumé sans blabla', nl: 'Samenvatting zonder blabla' },
}

/**
 * ⚠️ TEMPORAIRE (2026-08-30) : le vrai PDF du résumé est arrivé
 * (public/documents/resume-permishub.pdf) mais pas encore intégré à la
 * vente définitive — le client veut d'abord le voir/valider en accès
 * libre. Tant que ce flag est `true`, les boutons Résumé (PacksSection,
 * ResumeHook) ouvrent le PDF directement au lieu de lancer Stripe. Remettre
 * à `false` (et brancher packs/succes dessus) une fois la vente prête —
 * voir conversation du 2026-08-30.
 */
export const RESUME_FREE_FOR_TESTING = true
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
