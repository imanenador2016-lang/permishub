import { prisma } from './prisma'
import { LAUNCH_BUNDLE_OFFER, LAUNCH_BUNDLE_MAX_SLOTS, LAUNCH_BUNDLE_MANUAL_SALES, LAUNCH_BUNDLE_DEADLINE } from '@/content/pricing-config'

export interface LaunchOfferStatus {
  remaining: number
  soldOut: boolean
  expired: boolean
  /** Vendable maintenant : ni épuisée, ni la date limite dépassée. */
  available: boolean
  deadline: string
}

/**
 * Compte réel des ventes de LAUNCH_BUNDLE_OFFER — jamais un chiffre affiché
 * sans vérité derrière (voir pricing-config.ts). Ventes Stripe (table
 * `AchatPack`) + ventes manuelles hors Stripe (`LAUNCH_BUNDLE_MANUAL_SALES`,
 * à remettre à jour à la main) : les deux sont réelles, juste suivies par
 * des systèmes différents. Utilisée à la fois par l'API publique
 * (api/launch-offer/status, pour l'affichage du Hero) et par le garde-fou
 * d'achat (api/checkout/pack) : les deux lisent exactement le même calcul,
 * impossible qu'ils se désynchronisent.
 */
export async function getLaunchOfferStatus(): Promise<LaunchOfferStatus> {
  const stripeCount = await prisma.achatPack.count({ where: { offerId: LAUNCH_BUNDLE_OFFER.id } })
  const count = stripeCount + LAUNCH_BUNDLE_MANUAL_SALES
  const remaining = Math.max(0, LAUNCH_BUNDLE_MAX_SLOTS - count)
  const expired = Date.now() > new Date(LAUNCH_BUNDLE_DEADLINE).getTime()
  const soldOut = remaining <= 0

  return {
    remaining,
    soldOut,
    expired,
    available: !soldOut && !expired,
    deadline: LAUNCH_BUNDLE_DEADLINE,
  }
}
