import type { VerifiedFact } from './anderlecht-seo'

const AUTOSÉCURITÉ_CENTER_URL = 'https://www.autosecurite.be/fr/permis-de-conduire/centre-examen/centre-dexamen-dottignies-louvain-la-neuve-1025/'
const AUTOSÉCURITÉ_BOOKING_URL = 'https://rendezvous.permisconduire.be/'
const WALLEX_CENTER_NUMBER_URL = 'https://wallex.wallonie.be/eli/arrete/2018/10/01/2018014899/2026/05/11'
const UCL_ACCESS_MOBILITY_URL = 'https://uclouvain.be/fr/sites/louvain-la-neuve/acces-et-mobilite'

export const LOUVAIN_LA_NEUVE_SEO_DATA = {
  officialName: { value: 'Centre d’examen de Louvain-la-Neuve', verifiedAt: '2026-09-24', sourceUrl: AUTOSÉCURITÉ_CENTER_URL } satisfies VerifiedFact<string>,
  address: { value: 'Avenue Albert Einstein 1, 1348 Ottignies-Louvain-la-Neuve', verifiedAt: '2026-09-24', sourceUrl: AUTOSÉCURITÉ_CENTER_URL } satisfies VerifiedFact<string>,
  centerNumber: { value: '1025', verifiedAt: '2026-09-24', sourceUrl: WALLEX_CENTER_NUMBER_URL } satisfies VerifiedFact<string>,
  operator: { value: 'AutoSécurité SA', verifiedAt: '2026-09-24', sourceUrl: AUTOSÉCURITÉ_CENTER_URL } satisfies VerifiedFact<string>,
  permitPhone: { value: '087 57 20 30', verifiedAt: '2026-09-24', sourceUrl: AUTOSÉCURITÉ_CENTER_URL } satisfies VerifiedFact<string>,
  openingHours: { value: 'Du lundi au vendredi : 07:00–12:00 et 12:45–17:00.', verifiedAt: '2026-09-24', sourceUrl: AUTOSÉCURITÉ_CENTER_URL } satisfies VerifiedFact<string>,
  practicalExam: { value: 'Pour la catégorie B, l’examen pratique se passe sur rendez-vous via le Portail RDV officiel.', verifiedAt: '2026-09-24', sourceUrl: AUTOSÉCURITÉ_CENTER_URL } satisfies VerifiedFact<string>,
  bookingUrl: { value: AUTOSÉCURITÉ_BOOKING_URL, verifiedAt: '2026-09-24', sourceUrl: AUTOSÉCURITÉ_CENTER_URL } satisfies VerifiedFact<string>,
  localPreparation: { value: 'L’UCLouvain décrit Louvain-la-Neuve comme une ville conçue pour les piétons ; ses accès automobiles rejoignent notamment l’E411, la N4 et la N25. Prépare les changements de contexte et garde ton observation active envers piétons et cyclistes, sans présumer du trajet qui sera emprunté le jour de l’examen.', verifiedAt: '2026-09-24', sourceUrl: UCL_ACCESS_MOBILITY_URL },
  photo: { src: '/images/centers/louvain-la-neuve.jpg', alt: 'Centre d’examen AutoSécurité de Louvain-la-Neuve' },
} as const
