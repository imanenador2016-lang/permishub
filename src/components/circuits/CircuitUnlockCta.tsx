'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { CircuitOfferModal } from './CircuitOfferModal'

/** Clé localStorage marquant un centre comme débloqué — posée par circuits/succes après paiement vérifié. */
export function circuitsUnlockedKey(centerSlug: string) {
  return `circuits-unlocked:${centerSlug}`
}

/**
 * CTA d'un circuit dans circuits/[centerSlug]/page.tsx : ouvre directement
 * le tracé si le centre est débloqué (localStorage, posé après paiement
 * vérifié côté serveur — voir circuits/succes/page.tsx), sinon ouvre
 * l'offre de déblocage (CircuitOfferModal) au lieu d'aller sur Google Maps.
 * Pas de base de données : le seul "vrai" état est Stripe (vérifié une fois
 * sur la page de succès) ; localStorage n'est qu'un confort pour ne pas
 * repayer à chaque visite sur ce même navigateur.
 */
export function CircuitUnlockCta({
  mapsUrl,
  centerSlug,
  centerName,
  locale,
  unlockLabel,
}: {
  mapsUrl: string
  centerSlug: string
  centerName: string
  locale: 'fr' | 'nl'
  /** Libellé du bouton verrouillé — "Voir l'itinéraire" par défaut (page centre), "Débloquer" sur la carte home (voir CircuitsCarousel.tsx). */
  unlockLabel?: string
}) {
  const t = useTranslations('circuits')
  const [unlocked, setUnlocked] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    try {
      setUnlocked(localStorage.getItem(circuitsUnlockedKey(centerSlug)) === '1')
    } catch {
      // localStorage indisponible (navigation privée, etc.) — reste verrouillé, jamais bloquant.
    }
  }, [centerSlug])

  if (unlocked) {
    return (
      <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-comic block w-full px-4 py-3 text-center text-sm">
        {t('openInGoogleMaps')} →
      </a>
    )
  }

  return (
    <>
      <button onClick={() => setModalOpen(true)} className="btn-comic block w-full px-4 py-3 text-center text-sm">
        {unlockLabel ?? t('viewItinerary')} →
      </button>
      {modalOpen && (
        <CircuitOfferModal centerName={centerName} centerSlug={centerSlug} locale={locale} onClose={() => setModalOpen(false)} />
      )}
    </>
  )
}
