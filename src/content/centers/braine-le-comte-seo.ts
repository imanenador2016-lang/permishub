import type { VerifiedFact } from './anderlecht-seo'

const OFFICIAL_CENTER_URL = 'https://www.aibv.be/fr/centre-de-braine-le-comte'
const OFFICIAL_DIRECTORY_URL = 'https://www.aibv.be/fr/permis-de-conduire'
const OFFICIAL_CENTER_NUMBER_URL = 'https://wallex.wallonie.be/eli/arrete/2018/10/01/2018014899/2026/05/11'
const OFFICIAL_BOOKING_URL = 'https://www.aibv.be/fr/prendre-rendez-vous-permis-de-conduire'
const LOCAL_MOBILITY_URL = 'https://www.braine-le-comte.be/territoire/urbanisme/pdf-schema-de-structure/12-rapport-doptions.pdf'

export const BRAINE_LE_COMTE_SEO_DATA = {
  officialName: {
    value: 'Centre d’examen de Braine-le-Comte',
    verifiedAt: '2026-09-24',
    sourceUrl: OFFICIAL_CENTER_URL,
  } satisfies VerifiedFact<string>,
  address: {
    value: 'Avenue du Marouset 103, 7090 Braine-le-Comte',
    verifiedAt: '2026-09-24',
    sourceUrl: OFFICIAL_CENTER_URL,
  } satisfies VerifiedFact<string>,
  centerNumber: {
    value: '1019',
    verifiedAt: '2026-09-24',
    sourceUrl: OFFICIAL_CENTER_NUMBER_URL,
  } satisfies VerifiedFact<string>,
  operator: {
    value: 'AIBV SA',
    verifiedAt: '2026-09-24',
    sourceUrl: OFFICIAL_CENTER_URL,
  } satisfies VerifiedFact<string>,
  permitPhone: {
    value: '067 55 55 62',
    verifiedAt: '2026-09-24',
    sourceUrl: OFFICIAL_CENTER_URL,
  } satisfies VerifiedFact<string>,
  openingHours: {
    value: 'Du lundi au vendredi : 07:30–12:00 et 12:30–17:00. Fermé le week-end et les jours fériés.',
    verifiedAt: '2026-09-24',
    sourceUrl: OFFICIAL_CENTER_URL,
  } satisfies VerifiedFact<string>,
  practicalExam: {
    value: 'L’examen pratique se présente sur rendez-vous. Consulte les modalités officielles d’AIBV pour la catégorie B.',
    verifiedAt: '2026-09-24',
    sourceUrl: OFFICIAL_BOOKING_URL,
  } satisfies VerifiedFact<string>,
  bookingUrl: {
    value: OFFICIAL_BOOKING_URL,
    verifiedAt: '2026-09-24',
    sourceUrl: OFFICIAL_BOOKING_URL,
  } satisfies VerifiedFact<string>,
  localPreparation: {
    value: 'La commune documente les déplacements entre le centre-ville et les villages, ainsi que les aménagements cyclables. Entraîne-toi à adapter ton attention aux indications présentes et aux autres usagers, sans mémoriser un trajet supposé.',
    verifiedAt: '2026-09-24',
    sourceUrl: LOCAL_MOBILITY_URL,
  } satisfies VerifiedFact<string>,
  photo: {
    src: '/images/centers/braine-le-comte.png',
    alt: 'Vue du centre d’examen de Braine-le-Comte et de son aire de circulation',
  },
  officialDirectoryUrl: OFFICIAL_DIRECTORY_URL,
} as const
