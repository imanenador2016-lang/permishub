'use client'

import { useEffect } from 'react'
import { circuitsUnlockedKey } from './CircuitUnlockCta'

/**
 * Pose le flag localStorage "centre débloqué" une fois le paiement vérifié
 * côté serveur (circuits/succes/page.tsx) — rien d'affiché, juste l'effet.
 * Voir CircuitUnlockCta.tsx pour la lecture de ce flag.
 */
export function UnlockCenterEffect({ centerSlug }: { centerSlug: string }) {
  useEffect(() => {
    try {
      localStorage.setItem(circuitsUnlockedKey(centerSlug), '1')
    } catch {
      // localStorage indisponible — tant pis, jamais bloquant pour l'accès déjà payé.
    }
  }, [centerSlug])

  return null
}
