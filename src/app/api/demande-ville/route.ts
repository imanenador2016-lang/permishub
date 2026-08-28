import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * Carte "Ta ville n'est pas là ?" du carrousel circuits (brief v2) — sert à
 * prioriser les prochains centres à ajouter. Nécessite DATABASE_URL (voir
 * SETUP.md) ; échoue proprement (500) tant que la base n'est pas branchée,
 * plutôt que de prétendre avoir enregistré la demande.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const email = typeof body?.email === 'string' ? body.email.trim() : ''
  const ville = typeof body?.ville === 'string' ? body.ville.trim() : undefined

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'email invalide' }, { status: 400 })
  }

  const demande = await prisma.demandeVilleCircuit.create({
    data: { email, ville: ville || null },
  })

  return NextResponse.json({ id: demande.id }, { status: 201 })
}
