import { NextResponse } from 'next/server'
import { getOptionalSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { EXAMENS_ILLIMITES_OFFER, RESUME_OFFER } from '@/content/pricing-config'

/**
 * "Restaurer mon accès" (voir conversation du 2026-09-03) : une fois
 * connecté par lien magique (NextAuth, session cookie), cette route dit ce
 * que CE compte a réellement acheté (AchatPack / AchatCircuit en base,
 * peuplés par le webhook Stripe) — le client pose ensuite les mêmes flags
 * localStorage que ceux posés juste après paiement (UnlockExamensEffect,
 * UnlockCenterEffect) pour retrouver l'accès sur ce nouvel appareil, sans
 * dupliquer la logique d'affichage déjà en place.
 */
export async function GET() {
  const session = await getOptionalSession()
  const email = session?.user?.email
  if (!session?.user?.id || !email) {
    return NextResponse.json({ error: 'Non connecté' }, { status: 401 })
  }

  const [packs, circuits] = await Promise.all([
    prisma.achatPack.findMany({ where: { userId: session.user.id }, select: { offerId: true } }),
    prisma.achatCircuit.findMany({ where: { userId: session.user.id }, select: { circuitId: true } }),
  ])

  const offerIds = new Set(packs.map((p) => p.offerId))

  const examensIllimites = offerIds.has(EXAMENS_ILLIMITES_OFFER.id)
  const resume = offerIds.has(RESUME_OFFER.id)

  // Les achats "tous les circuits d'un centre" sont rangés dans AchatPack
  // avec offerId préfixé (voir webhooks/stripe/route.ts) ; on en extrait le
  // centerSlug. L'ancien achat par circuit isolé (AchatCircuit, débranché
  // côté UI mais gardé ici au cas où une vieille ligne existerait) fournit
  // directement un centerSlug approximatif via le préfixe de son id
  // (ex. "anderlecht-1" → "anderlecht").
  const centerSlugsFromBundles = [...offerIds]
    .filter((id) => id.startsWith('circuits-bundle:'))
    .map((id) => id.slice('circuits-bundle:'.length))
  const centerSlugsFromLegacyCircuits = circuits.map((c) => c.circuitId.replace(/-\d+$/, ''))
  const circuitCenters = [...new Set([...centerSlugsFromBundles, ...centerSlugsFromLegacyCircuits])]

  return NextResponse.json({ email, examensIllimites, resume, circuitCenters })
}
