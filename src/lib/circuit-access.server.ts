import 'server-only'

import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { LAUNCH_BUNDLE_OFFER } from '@/content/pricing-config'
import { hasCircuitCenterEntitlement } from '@/domain/circuit-access'

/** Vérifie le droit réel au pack depuis l'identité de session et les achats Stripe enregistrés. */
export async function getCircuitCenterAccess(centerSlug: string): Promise<boolean> {
  if (!process.env.DATABASE_URL) return false

  try {
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id
    if (!userId) return false

    const [bundles, legacyCircuits] = await Promise.all([
      prisma.achatPack.findMany({
        where: { userId, offerId: { in: [`circuits-bundle:${centerSlug}`, LAUNCH_BUNDLE_OFFER.id] } },
        select: { offerId: true },
      }),
      prisma.achatCircuit.findMany({
        where: { userId, circuitId: { startsWith: `${centerSlug}-` } },
        select: { circuitId: true },
      }),
    ])

    return hasCircuitCenterEntitlement(
      centerSlug,
      bundles.map((purchase) => purchase.offerId),
      legacyCircuits.map((purchase) => purchase.circuitId),
    )
  } catch {
    // En cas d'indisponibilité de la session ou de la base, l'accès est refusé.
    return false
  }
}
