import 'server-only'

import { prisma } from '@/lib/prisma'

/**
 * Reads premium route links only from Neon after the server access check.
 * These values never belong to the public repository or anonymous responses.
 */
export async function getCircuitMapsByCenter(centerSlug: string): Promise<Array<{ circuitId: string; mapsUrl: string }>> {
  try {
    return await prisma.circuitPremiumLink.findMany({
      where: { circuitId: { startsWith: `${centerSlug}-` } },
      select: { circuitId: true, mapsUrl: true },
      orderBy: { circuitId: 'asc' },
    })
  } catch {
    // Fail closed: an unavailable database must not reveal a premium link.
    return []
  }
}
