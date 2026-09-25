import type { VerifiedFact } from './anderlecht-seo'

const OFFICIAL_CENTER_URL = 'https://www.autocontrole.be/fr/permis-de-conduire/le-centre-dexamens/schaarbeek'
const OFFICIAL_BOOKING_URL = 'https://www.autocontrole.be/fr/rendez-vous-permis-de-conduire'
const OFFICIAL_CENTER_NUMBER_URL = 'https://www.autocontrole.be/sites/default/files/2025-03/FMACT-351-IB%20%28b%29%20%2803.02.25%29%20-%20pub.pdf'
const OFFICIAL_LOCAL_CONTEXT_URL = 'https://www.1030.be/fr/contrat-local-mobilite-good-move'

export const SCHAERBEEK_SEO_DATA = {
  officialName: {
    value: "Centre d'examen de Schaerbeek",
    verifiedAt: '2026-09-24',
    sourceUrl: OFFICIAL_CENTER_URL,
  } satisfies VerifiedFact<string>,
  address: {
    value: 'Rue Colonel Bourg 118, 1140 Schaerbeek',
    verifiedAt: '2026-09-24',
    sourceUrl: OFFICIAL_CENTER_URL,
  } satisfies VerifiedFact<string>,
  centerNumber: {
    value: '1001',
    verifiedAt: '2026-09-24',
    sourceUrl: OFFICIAL_CENTER_NUMBER_URL,
  } satisfies VerifiedFact<string>,
  operator: {
    value: 'Auto Contrôle Technique (ACT)',
    verifiedAt: '2026-09-24',
    sourceUrl: OFFICIAL_CENTER_URL,
  } satisfies VerifiedFact<string>,
  permitPhone: {
    value: '02 726 91 52',
    verifiedAt: '2026-09-24',
    sourceUrl: OFFICIAL_CENTER_NUMBER_URL,
  } satisfies VerifiedFact<string>,
  practicalExam: {
    value: 'Examen pratique sur rendez-vous. La demande de rendez-vous se fait en personne au centre ; les réservations par téléphone ou e-mail ne sont pas possibles.',
    verifiedAt: '2026-09-24',
    sourceUrl: OFFICIAL_BOOKING_URL,
  } satisfies VerifiedFact<string>,
  practicalAppointmentHours: {
    value: 'Du lundi au vendredi, de 07:30 à 12:00 et de 13:30 à 16:00',
    verifiedAt: '2026-09-24',
    sourceUrl: OFFICIAL_BOOKING_URL,
  } satisfies VerifiedFact<string>,
  theoryHours: {
    value: 'Du lundi au jeudi : sessions standards de 09:30 à 16:00. Vendredi : de 07:30 à 16:00. Sessions spéciales en matinée sur rendez-vous.',
    verifiedAt: '2026-09-24',
    sourceUrl: OFFICIAL_CENTER_URL,
  } satisfies VerifiedFact<string>,
  bookingUrl: {
    value: OFFICIAL_BOOKING_URL,
    verifiedAt: '2026-09-24',
    sourceUrl: OFFICIAL_CENTER_URL,
  } satisfies VerifiedFact<string>,
  localMobilityContext: {
    value: 'Dans le périmètre Colignon-Josaphat, la commune décrit des quartiers apaisés bordés par des axes structurants, notamment les avenues Lambermont et Rogier. Les catégories de voiries et la signalisation impliquent des environnements de conduite différents.',
    verifiedAt: '2026-09-24',
    sourceUrl: OFFICIAL_LOCAL_CONTEXT_URL,
  } satisfies VerifiedFact<string>,
  photo: {
    src: '/images/centers/schaerbeek.jpg',
    alt: "Entrée du centre d'examen de Schaerbeek, rue Colonel Bourg",
  },
} as const
