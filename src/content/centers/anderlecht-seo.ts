export type VerifiedFact<T> = {
  value: T
  verifiedAt: string
  sourceUrl?: string
}

const OFFICIAL_SOURCE_URL = 'https://www.securiteautomobile.be/PC'
const OFFICIAL_BOOKING_URL = 'https://www.securiteautomobile.be/Rdv_pc'

/** Sources currently recorded in the project for the Anderlecht center page. */
export const ANDERLECHT_SEO_DATA = {
  address: {
    value: 'Rue du Labeur 3/9, 1070 Anderlecht',
    verifiedAt: '2026-09-24',
    sourceUrl: OFFICIAL_SOURCE_URL,
  } satisfies VerifiedFact<string>,
  officialName: {
    value: 'Centre d’examen d’Anderlecht',
    verifiedAt: '2026-09-24',
    sourceUrl: OFFICIAL_SOURCE_URL,
  } satisfies VerifiedFact<string>,
  centerNumber: {
    value: '1021',
    verifiedAt: '2026-09-24',
    sourceUrl: OFFICIAL_SOURCE_URL,
  } satisfies VerifiedFact<string>,
  operator: {
    value: 'La Sécurité Automobile',
    verifiedAt: '2026-09-24',
    sourceUrl: OFFICIAL_SOURCE_URL,
  } satisfies VerifiedFact<string>,
  permitPhone: {
    value: '02 529 07 74',
    verifiedAt: '2026-09-24',
    sourceUrl: OFFICIAL_SOURCE_URL,
  } satisfies VerifiedFact<string>,
  practicalExamHours: {
    value: { days: 'Lundi au vendredi', hours: '08:00–17:00' },
    verifiedAt: '2026-09-24',
    sourceUrl: OFFICIAL_SOURCE_URL,
  } satisfies VerifiedFact<{ days: string; hours: string }>,
  theoryAndRiskHours: {
    value: { days: 'Lundi au jeudi', hours: '07:15–16:00', friday: 'Séances spéciales' },
    verifiedAt: '2026-09-24',
    sourceUrl: OFFICIAL_SOURCE_URL,
  } satisfies VerifiedFact<{ days: string; hours: string; friday: string }>,
  appointmentUrl: {
    value: OFFICIAL_BOOKING_URL,
    verifiedAt: '2026-09-24',
    sourceUrl: OFFICIAL_SOURCE_URL,
  } satisfies VerifiedFact<string>,
  coordinates: {
    value: { latitude: 50.8201738, longitude: 4.3100693 },
    verifiedAt: '2026-08-29',
  } satisfies VerifiedFact<{ latitude: number; longitude: number }>,
  photo: {
    value: {
      src: '/images/centers/anderlecht.jpg',
      alt: 'Entrée du centre d’examen d’Anderlecht, rue du Labeur',
    },
  },
} as const
