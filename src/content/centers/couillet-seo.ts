import type { VerifiedFact } from './anderlecht-seo'

const AIBV_CENTER_URL = 'https://www.aibv.be/fr/centre-de-couillet'
const AIBV_BOOKING_URL = 'https://www.aibv.be/fr/prendre-rendez-vous-permis-de-conduire'
const WALLEX_CENTER_NUMBER_URL = 'https://wallex.wallonie.be/eli/arrete/2018/10/01/2018014899/2026/05/11'
const CHARLEROI_CYCLING_URL = 'https://www.charleroi.be/vivre/mobilite/a-velo'

export const COUILLET_SEO_DATA = {
  officialName: { value: 'Centre d’examen de Couillet', verifiedAt: '2026-09-24', sourceUrl: AIBV_CENTER_URL } satisfies VerifiedFact<string>,
  address: { value: 'Rue du Lion Belge 7, 6010 Couillet', verifiedAt: '2026-09-24', sourceUrl: AIBV_CENTER_URL } satisfies VerifiedFact<string>,
  centerNumber: { value: '1006', verifiedAt: '2026-09-24', sourceUrl: WALLEX_CENTER_NUMBER_URL } satisfies VerifiedFact<string>,
  operator: { value: 'AIBV SA', verifiedAt: '2026-09-24', sourceUrl: AIBV_CENTER_URL } satisfies VerifiedFact<string>,
  permitPhone: { value: '071 47 65 35', verifiedAt: '2026-09-24', sourceUrl: AIBV_CENTER_URL } satisfies VerifiedFact<string>,
  openingHours: { value: 'Du lundi au vendredi : 07:30–17:00. Fermé le week-end et les jours fériés.', verifiedAt: '2026-09-24', sourceUrl: AIBV_CENTER_URL } satisfies VerifiedFact<string>,
  practicalExam: { value: 'Les examens pratiques se passent sur rendez-vous. AIBV indique que la prise de rendez-vous pour les catégories A et B se fait en ligne.', verifiedAt: '2026-09-24', sourceUrl: AIBV_BOOKING_URL } satisfies VerifiedFact<string>,
  bookingUrl: { value: AIBV_BOOKING_URL, verifiedAt: '2026-09-24', sourceUrl: AIBV_BOOKING_URL } satisfies VerifiedFact<string>,
  localPreparation: { value: 'La Ville de Charleroi développe le Ring Vélo, dont la partie sud relie notamment Couillet à d’autres sections de la ville. Entraîne-toi à repérer les cyclistes, les aménagements et les changements de signalisation, sans supposer que l’examen suit un itinéraire précis.', verifiedAt: '2026-09-24', sourceUrl: CHARLEROI_CYCLING_URL } satisfies VerifiedFact<string>,
  photo: { src: '/images/centers/couillet.webp', alt: 'Centre d’examen AIBV de Couillet' },
} as const
