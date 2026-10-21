import type { VerifiedFact } from './anderlecht-seo'

const OFFICIAL_CENTER_URL = 'https://www.autosecurite.be/fr/permis-de-conduire/centre-examen/centre-dexamen-de-liege-1009/'
const BOOKING_URL = 'https://rendezvous.permisconduire.be/home/'
const OFFICIAL_CIRCUITS_URL = 'https://www.autosecurite.be/uploads/2025/07/2500611-Circuits-permis-de-conduire-1009.pdf'

export const WANDRE_SEO_DATA = {
  officialName: { value: 'Centre d’examen de Liège', verifiedAt: '2026-10-03', sourceUrl: OFFICIAL_CENTER_URL } satisfies VerifiedFact<string>,
  address: { value: "Avenue de l’Indépendance 103, 4020 Liège Wandre", verifiedAt: '2026-10-03', sourceUrl: OFFICIAL_CENTER_URL } satisfies VerifiedFact<string>,
  centerNumber: { value: '1009', verifiedAt: '2026-10-03', sourceUrl: OFFICIAL_CENTER_URL } satisfies VerifiedFact<string>,
  operator: { value: 'AutoSécurité', verifiedAt: '2026-10-03', sourceUrl: OFFICIAL_CENTER_URL } satisfies VerifiedFact<string>,
  permitPhone: { value: '087 57 20 30', verifiedAt: '2026-10-03', sourceUrl: OFFICIAL_CENTER_URL } satisfies VerifiedFact<string>,
  openingHours: { value: 'Du lundi au vendredi, de 7 h à 17 h sans interruption.', verifiedAt: '2026-10-03', sourceUrl: OFFICIAL_CENTER_URL } satisfies VerifiedFact<string>,
  practicalExam: { value: 'Pour la catégorie B, l’examen pratique se déroule sur rendez-vous via le Portail RDV.', verifiedAt: '2026-10-03', sourceUrl: OFFICIAL_CENTER_URL } satisfies VerifiedFact<string>,
  bookingUrl: { value: BOOKING_URL, verifiedAt: '2026-10-03', sourceUrl: OFFICIAL_CENTER_URL } satisfies VerifiedFact<string>,
  localPreparation: { value: 'Les points de passage publiés par AutoSécurité couvrent des contextes variés autour de Wandre, notamment des ronds-points, des ponts et des accès à l’E25. Le circuit réel peut varier selon le trafic, les travaux et les impératifs locaux.', verifiedAt: '2026-10-03', sourceUrl: OFFICIAL_CIRCUITS_URL } satisfies VerifiedFact<string>,
  photo: { src: '/images/centers/wandre.webp', alt: 'Centre d’examen AutoSécurité de Liège - Wandre' },
} as const
