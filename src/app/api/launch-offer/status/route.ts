import { NextResponse } from 'next/server'
import { getLaunchOfferStatus } from '@/lib/launch-offer'

/**
 * Statut public de l'offre de lancement (Hero) — nombre réel de places
 * restantes et si la date limite est dépassée, voir lib/launch-offer.ts.
 * Jamais caché derrière une session : n'importe quel visiteur doit pouvoir
 * voir ce compteur avant même de commencer à acheter.
 */
export async function GET() {
  try {
    const status = await getLaunchOfferStatus()
    return NextResponse.json(status)
  } catch (err) {
    console.error('Échec lecture statut offre de lancement :', err instanceof Error ? err.message : err)
    // Repli honnête : ne jamais afficher "encore plein de places" par
    // défaut si la base est injoignable — le Hero traite `available: false`
    // comme "achat momentanément indisponible", jamais comme "épuisée".
    return NextResponse.json({ error: 'Statut indisponible' }, { status: 503 })
  }
}
