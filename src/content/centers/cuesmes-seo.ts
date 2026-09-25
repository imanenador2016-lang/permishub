import type { VerifiedFact } from './anderlecht-seo'

const OFFICIAL_CENTER_URL = 'https://www.autosecurite.be/fr/permis-de-conduire/centre-examen/centre-dexamen-de-cuesmes-1031/'
const OFFICIAL_POINTS_URL = 'https://www.autosecurite.be/uploads/2025/07/2500611-Circuits-permis-de-conduire-1031.pdf'
const OFFICIAL_BOOKING_URL = 'https://rendezvous.permisconduire.be/public/start'

export const CUESMES_SEO_DATA = {
  officialName: {
    value: 'Centre d’examen de Cuesmes',
    verifiedAt: '2026-09-24',
    sourceUrl: OFFICIAL_CENTER_URL,
  } satisfies VerifiedFact<string>,
  address: {
    value: 'Rue du Grand Courant 18, 7033 Cuesmes (Mons)',
    verifiedAt: '2026-09-24',
    sourceUrl: OFFICIAL_CENTER_URL,
  } satisfies VerifiedFact<string>,
  centerNumber: {
    value: '1031',
    verifiedAt: '2026-09-24',
    sourceUrl: OFFICIAL_POINTS_URL,
  } satisfies VerifiedFact<string>,
  operator: {
    value: 'Autosécurité',
    verifiedAt: '2026-09-24',
    sourceUrl: OFFICIAL_CENTER_URL,
  } satisfies VerifiedFact<string>,
  permitPhone: {
    value: '087 57 20 30',
    verifiedAt: '2026-09-24',
    sourceUrl: OFFICIAL_CENTER_URL,
  } satisfies VerifiedFact<string>,
  openingHours: {
    value: 'Du lundi au vendredi, de 07:00 à 17:00',
    verifiedAt: '2026-09-24',
    sourceUrl: OFFICIAL_CENTER_URL,
  } satisfies VerifiedFact<string>,
  practicalExam: {
    value: 'Permis B : sur rendez-vous via le Portail RDV officiel',
    verifiedAt: '2026-09-24',
    sourceUrl: OFFICIAL_CENTER_URL,
  } satisfies VerifiedFact<string>,
  theoryAndRiskHours: {
    value: 'Du mardi au vendredi, de 08:00 à 16:00, sur rendez-vous',
    verifiedAt: '2026-09-24',
    sourceUrl: OFFICIAL_CENTER_URL,
  } satisfies VerifiedFact<string>,
  appointmentUrl: {
    value: OFFICIAL_BOOKING_URL,
    verifiedAt: '2026-09-24',
    sourceUrl: OFFICIAL_CENTER_URL,
  } satisfies VerifiedFact<string>,
  categoryBPassagePoints: {
    value: ['R5'],
    verifiedAt: '2026-09-24',
    sourceUrl: OFFICIAL_POINTS_URL,
  } satisfies VerifiedFact<string[]>,
  passagePointsAdaptation: {
    value: 'L’ordre des points peut varier et le circuit peut être adapté aux conditions locales.',
    verifiedAt: '2026-09-24',
    sourceUrl: OFFICIAL_POINTS_URL,
  } satisfies VerifiedFact<string>,
  photo: {
    src: '/images/centers/cuesmes.png',
    alt: 'Entrée du centre d’examen de Cuesmes',
  },
} as const
