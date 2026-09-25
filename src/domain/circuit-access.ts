import { LAUNCH_BUNDLE_OFFER } from '@/content/pricing-config'

/** Achat pack du centre, pack complet ou ancien achat individuel. */
export function hasCircuitCenterEntitlement(centerSlug: string, packOfferIds: string[], circuitIds: string[]) {
  return (
    packOfferIds.includes(`circuits-bundle:${centerSlug}`) ||
    packOfferIds.includes(LAUNCH_BUNDLE_OFFER.id) ||
    circuitIds.some((circuitId) => circuitId.startsWith(`${centerSlug}-`))
  )
}
