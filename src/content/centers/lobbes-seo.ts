import type { VerifiedFact } from './anderlecht-seo'

const OFFICIAL_CENTER_URL = 'https://www.autosecurite.be/fr/permis-de-conduire/centre-examen/centre-dexamen-de-lobbes-1030/'
const OFFICIAL_BOOKING_URL = 'https://rendezvous.permisconduire.be/'
const OFFICIAL_BOOKING_INFO_URL = 'https://www.autosecurite.be/fr/portail-de-rendez-vous/'
const OFFICIAL_LOCAL_CONTEXT_URL = 'https://www.lobbes.be/vie-communale/vie-politique/college-communal/publications/pst/plan-strategique-transversal-2024-2030/pst_complet_lobbes_2024_2030-finalise-v4aprescc.pdf/@@download/file/PST_COMPLET_LOBBES_2024_2030-FINALISE-V4apresCC.pdf'

export const LOBBES_SEO_DATA = {
  officialName: {
    value: 'Centre d’examen de Lobbes',
    verifiedAt: '2026-09-24',
    sourceUrl: OFFICIAL_CENTER_URL,
  } satisfies VerifiedFact<string>,
  address: {
    value: 'Rue de Binche 9, 6540 Lobbes',
    verifiedAt: '2026-09-24',
    sourceUrl: OFFICIAL_CENTER_URL,
  } satisfies VerifiedFact<string>,
  centerNumber: {
    value: '1030',
    verifiedAt: '2026-09-24',
    sourceUrl: OFFICIAL_CENTER_URL,
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
    value: 'Lundi, mardi, mercredi et vendredi : 07:00–12:15 et 13:00–16:45. Fermé le jeudi.',
    verifiedAt: '2026-09-24',
    sourceUrl: OFFICIAL_CENTER_URL,
  } satisfies VerifiedFact<string>,
  practicalExam: {
    value: 'Permis B : sur rendez-vous via le Portail RDV officiel. Autosécurité recommande de prendre rendez-vous au moins 6 semaines à l’avance.',
    verifiedAt: '2026-09-24',
    sourceUrl: OFFICIAL_CENTER_URL,
  } satisfies VerifiedFact<string>,
  theoryAndRisk: {
    value: 'Examens théoriques et test de perception des risques sur rendez-vous ; consulter les plannings du Portail RDV.',
    verifiedAt: '2026-09-24',
    sourceUrl: OFFICIAL_CENTER_URL,
  } satisfies VerifiedFact<string>,
  bookingUrl: {
    value: OFFICIAL_BOOKING_URL,
    verifiedAt: '2026-09-24',
    sourceUrl: OFFICIAL_BOOKING_INFO_URL,
  } satisfies VerifiedFact<string>,
  localMobilityContext: {
    value: 'Le plan stratégique communal évoque le trafic de transit sur les nationales qui traversent l’entité et des axes de faible gabarit dans les petites agglomérations.',
    verifiedAt: '2026-09-24',
    sourceUrl: OFFICIAL_LOCAL_CONTEXT_URL,
  } satisfies VerifiedFact<string>,
  photo: {
    src: '/images/centers/lobbes.webp',
    alt: 'Centre d’examen de Lobbes, rue de Binche',
  },
} as const
