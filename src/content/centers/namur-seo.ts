import type { VerifiedFact } from './anderlecht-seo'

const OFFICIAL_CENTER_URL = 'https://www.autosecurite.be/fr/permis-de-conduire/centre-examen/centre-dexamen-de-namur-suarlee-1007/'
const BOOKING_URL = 'https://rendezvous.permisconduire.be/home/'
const OFFICIAL_STATS_URL = 'https://www.parlement-wallonie.be/content/print.php?iddoc=141389&print=interp-questions-voir.php&type=28'
const OFFICIAL_CIRCUITS_URL = 'https://www.autosecurite.be/wp-content/uploads/2021/07/FM2099-Liste-des-circuits-1007.pdf'

export const NAMUR_SEO_DATA = {
  officialName: { value: 'Centre d’examen de Namur / Suarlée', verifiedAt: '2026-10-03', sourceUrl: OFFICIAL_CENTER_URL } satisfies VerifiedFact<string>,
  address: { value: 'Nouvelle Route de Suarlée 23, 5020 Namur Suarlée', verifiedAt: '2026-10-03', sourceUrl: OFFICIAL_CENTER_URL } satisfies VerifiedFact<string>,
  centerNumber: { value: '1007', verifiedAt: '2026-10-03', sourceUrl: OFFICIAL_CENTER_URL } satisfies VerifiedFact<string>,
  operator: { value: 'AutoSécurité', verifiedAt: '2026-10-03', sourceUrl: OFFICIAL_CENTER_URL } satisfies VerifiedFact<string>,
  permitPhone: { value: '087 57 20 30', verifiedAt: '2026-10-03', sourceUrl: OFFICIAL_CENTER_URL } satisfies VerifiedFact<string>,
  openingHours: { value: 'Du lundi au vendredi, de 7 h à 17 h sans interruption.', verifiedAt: '2026-10-03', sourceUrl: OFFICIAL_CENTER_URL } satisfies VerifiedFact<string>,
  practicalExam: { value: 'Pour la catégorie B, l’examen pratique se déroule sur rendez-vous via le Portail RDV.', verifiedAt: '2026-10-03', sourceUrl: OFFICIAL_CENTER_URL } satisfies VerifiedFact<string>,
  bookingUrl: { value: BOOKING_URL, verifiedAt: '2026-10-03', sourceUrl: OFFICIAL_CENTER_URL } satisfies VerifiedFact<string>,
  statistics: { value: 'En 2025, Suarlée affiche 35,0 % de réussite en filière libre et 46,4 % en filière auto-école : les taux les plus faibles parmi les centres wallons repris dans les données publiées.', verifiedAt: '2026-10-03', sourceUrl: OFFICIAL_STATS_URL } satisfies VerifiedFact<string>,
  localPreparation: { value: 'AutoSécurité publie des points de passage pour le centre 1007. Ils servent à reconnaître les contextes du secteur, mais le trajet d’examen peut être adapté aux conditions locales.', verifiedAt: '2026-10-03', sourceUrl: OFFICIAL_CIRCUITS_URL } satisfies VerifiedFact<string>,
  photo: { src: '/images/centers/namur.webp', alt: 'Citadelle de Namur et lettres NAMUR au bord de la Sambre' },
} as const
