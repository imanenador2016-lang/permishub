'use client'

import { useEffect } from 'react'
import { EXAMENS_UNLOCKED_KEY } from './ExamAccessGate'

/**
 * Pose le flag localStorage "Examens illimités débloqué" une fois le
 * paiement vérifié côté serveur (packs/succes/page.tsx) — rien d'affiché,
 * juste l'effet. Voir ExamAccessGate.tsx pour la lecture de ce flag.
 */
export function UnlockExamensEffect() {
  useEffect(() => {
    try {
      localStorage.setItem(EXAMENS_UNLOCKED_KEY, '1')
    } catch {
      // localStorage indisponible — tant pis, jamais bloquant pour l'accès déjà payé.
    }
  }, [])

  return null
}
