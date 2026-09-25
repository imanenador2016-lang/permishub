'use client'

import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from '@/i18n/navigation'
import { CircuitOfferModal } from './CircuitOfferModal'
import { circuitsUnlockedKey } from './CircuitUnlockCta'

export function AnderlechtPackCta() {
  const [unlockedHint, setUnlockedHint] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    try {
      setUnlockedHint(localStorage.getItem(circuitsUnlockedKey('anderlecht')) === '1')
    } catch {
      setUnlockedHint(false)
    }
  }, [])

  if (unlockedHint) {
    return <Link href="/circuits/anderlecht" className="btn-comic mt-6 inline-flex min-h-12 px-5 py-3">Voir mes circuits →</Link>
  }

  return (
    <>
      <button type="button" onClick={() => setModalOpen(true)} className="btn-comic mt-6 min-h-12 w-full px-5 py-3 text-center sm:w-auto">
        Débloquer les 4 circuits <span aria-hidden="true">→</span>
      </button>
      {modalOpen && <CircuitOfferModal centerName="Anderlecht" centerSlug="anderlecht" locale="fr" onClose={() => setModalOpen(false)} />}
    </>
  )
}
