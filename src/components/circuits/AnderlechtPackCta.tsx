'use client'

import { lazy, Suspense, useState } from 'react'
import { useEffect } from 'react'
import { Link } from '@/i18n/navigation'
import { circuitsUnlockedKey } from './CircuitUnlockCta'

const CircuitOfferModal = lazy(() => import('./CircuitOfferModal').then((module) => ({ default: module.CircuitOfferModal })))

function preloadCircuitOfferModal() {
  void import('./CircuitOfferModal').catch(() => undefined)
}

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
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        onPointerEnter={preloadCircuitOfferModal}
        onFocus={preloadCircuitOfferModal}
        onTouchStart={preloadCircuitOfferModal}
        className="btn-comic mt-6 min-h-12 w-full px-5 py-3 text-center sm:w-auto"
      >
        Débloquer les 4 circuits <span aria-hidden="true">→</span>
      </button>
      {modalOpen && (
        <Suspense fallback={null}>
          <CircuitOfferModal centerName="Anderlecht" centerSlug="anderlecht" locale="fr" onClose={() => setModalOpen(false)} />
        </Suspense>
      )}
    </>
  )
}
