'use client'

import { lazy, Suspense, useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

const CircuitOfferModal = lazy(() => import('./CircuitOfferModal').then((module) => ({ default: module.CircuitOfferModal })))

function preloadCircuitOfferModal() {
  void import('./CircuitOfferModal').catch(() => undefined)
}

/** Clé localStorage marquant un centre comme débloqué — posée par circuits/succes après paiement vérifié. */
export function circuitsUnlockedKey(centerSlug: string) {
  return `circuits-unlocked:${centerSlug}`
}

/**
 * localStorage ne sert qu'à proposer la navigation vers la page circuits.
 * Les URLs ne sont rendues que par le serveur après vérification Prisma.
 */
export function CircuitUnlockCta({
  centerSlug,
  centerName,
  locale,
  unlockLabel,
}: {
  centerSlug: string
  centerName: string
  locale: 'fr' | 'nl'
  /** Libellé du bouton verrouillé — "Voir l'itinéraire" par défaut (page centre), "Débloquer" sur la carte home (voir CircuitsCarousel.tsx). */
  unlockLabel?: string
}) {
  const t = useTranslations('circuits')
  const [unlockedHint, setUnlockedHint] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    try {
      setUnlockedHint(localStorage.getItem(circuitsUnlockedKey(centerSlug)) === '1')
    } catch {
      setUnlockedHint(false)
    }
  }, [centerSlug])

  if (unlockedHint) {
    return (
      <Link href={`/circuits/${centerSlug}` as never} className="btn-comic block w-full px-4 py-3 text-center text-sm">
        {t('viewCircuits')} →
      </Link>
    )
  }

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        onPointerEnter={preloadCircuitOfferModal}
        onFocus={preloadCircuitOfferModal}
        onTouchStart={preloadCircuitOfferModal}
        className="btn-comic block w-full px-4 py-3 text-center text-sm"
      >
        {unlockLabel ?? t('viewItinerary')} →
      </button>
      {modalOpen && (
        <Suspense fallback={null}>
          <CircuitOfferModal centerName={centerName} centerSlug={centerSlug} locale={locale} onClose={() => setModalOpen(false)} />
        </Suspense>
      )}
    </>
  )
}
