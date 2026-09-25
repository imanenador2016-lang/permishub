import type { VerifiedFact } from './anderlecht-seo'

const OFFICIAL_CENTER_URL = 'https://www.aibv.be/fr/centre-de-mariembourg'
const OFFICIAL_CENTERS_URL = 'https://www.aibv.be/fr/permis-de-conduire'
const OFFICIAL_POINTS_URL = 'https://www.aibv.be/sites/default/files/uploads/Points%20de%20passage%202026-2027%20-%20Mariembourg.pdf'
const OFFICIAL_BOOKING_URL = 'https://candidate.aibv.be/'
const OFFICIAL_BOOKING_INFO_URL = 'https://www.aibv.be/fr/prendre-rendez-vous-permis-de-conduire'

export const MARIEMBOURG_SEO_DATA = {
  officialName: {
    value: 'Centre d’examen de Mariembourg',
    verifiedAt: '2026-09-24',
    sourceUrl: OFFICIAL_CENTER_URL,
  } satisfies VerifiedFact<string>,
  address: {
    value: 'Rue Duc Saint Simon 17, 5660 Mariembourg',
    verifiedAt: '2026-09-24',
    sourceUrl: OFFICIAL_CENTER_URL,
  } satisfies VerifiedFact<string>,
  centerNumber: {
    value: '1020',
    verifiedAt: '2026-09-24',
    sourceUrl: OFFICIAL_POINTS_URL,
  } satisfies VerifiedFact<string>,
  operator: {
    value: 'AIBV SA',
    verifiedAt: '2026-09-24',
    sourceUrl: OFFICIAL_CENTER_URL,
  } satisfies VerifiedFact<string>,
  permitPhone: {
    value: '060 31 13 34',
    verifiedAt: '2026-09-24',
    sourceUrl: OFFICIAL_CENTER_URL,
  } satisfies VerifiedFact<string>,
  openingHours: {
    value: 'Du lundi au vendredi : 07:30–12:00 et 12:30–17:00. Fermé le week-end et les jours fériés.',
    verifiedAt: '2026-09-24',
    sourceUrl: OFFICIAL_CENTER_URL,
  } satisfies VerifiedFact<string>,
  practicalExam: {
    value: 'Permis B : rendez-vous obligatoire, à prendre via le portail officiel AIBV.',
    verifiedAt: '2026-09-24',
    sourceUrl: OFFICIAL_BOOKING_INFO_URL,
  } satisfies VerifiedFact<string>,
  bookingUrl: {
    value: OFFICIAL_BOOKING_URL,
    verifiedAt: '2026-09-24',
    sourceUrl: OFFICIAL_BOOKING_INFO_URL,
  } satisfies VerifiedFact<string>,
  bookingNote: {
    value: 'Le rendez-vous est nominatif et un seul rendez-vous peut être pris à la fois.',
    verifiedAt: '2026-09-24',
    sourceUrl: OFFICIAL_BOOKING_INFO_URL,
  } satisfies VerifiedFact<string>,
  officialLocalAnchor: {
    value: 'La liste des points de passage catégorie B 2026–2027 mentionne Mariembourg et plusieurs localités voisines, ainsi qu’une sortie vers la N5.',
    verifiedAt: '2026-09-24',
    sourceUrl: OFFICIAL_POINTS_URL,
  } satisfies VerifiedFact<string>,
  passagePointsMayChange: {
    value: 'Les points de passage peuvent ne pas être suivis dans certaines circonstances, comme le trafic ou des travaux.',
    verifiedAt: '2026-09-24',
    sourceUrl: OFFICIAL_POINTS_URL,
  } satisfies VerifiedFact<string>,
  photo: {
    src: '/images/centers/mariembourg.png',
    alt: 'Centre d’examen de Mariembourg',
  },
  officialDirectoryUrl: OFFICIAL_CENTERS_URL,
} as const
