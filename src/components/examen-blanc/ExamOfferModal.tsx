'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { formatPrice } from '@/domain/centers'
import { EXAMENS_ILLIMITES_OFFER } from '@/content/pricing-config'
import { createCheckoutSession } from '@/lib/payment'
import { Link } from '@/i18n/navigation'

/**
 * Offre "tous les examens blancs" présentée avant tout achat (picker
 * verrouillé ET page d'un examen verrouillé, voir ExamenBlancPicker.tsx et
 * ExamAccessGate.tsx) — au lieu d'envoyer direct sur Stripe, une étape qui
 * insiste sur la valeur pour mieux convertir (même principe que
 * CircuitOfferModal.tsx pour les circuits, voir conversation du 2026-08-30).
 */
export function ExamOfferModal({ locale, onClose }: { locale: 'fr' | 'nl'; onClose: () => void }) {
  const t = useTranslations('examOffer')
  const tc = useTranslations('common')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  async function handleUnlock() {
    setLoading(true)
    setError(null)
    try {
      const { url } = await createCheckoutSession(EXAMENS_ILLIMITES_OFFER)
      window.location.href = url
    } catch (err) {
      setError(err instanceof Error ? err.message : t('errorFallback'))
      setLoading(false)
    }
  }

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4" onClick={onClose}>
      <div className="panel !shadow-hard relative w-full max-w-sm p-5 sm:max-w-md sm:p-6" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          aria-label={t('close')}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center border-2 border-ink bg-cream font-display text-sm hover:bg-creamdim"
        >
          ×
        </button>

        <span className="mb-3 inline-block w-fit -rotate-2 border-2 border-ink bg-yellow px-2.5 py-1 font-display text-[10px]">
          {t('eyebrow')}
        </span>

        <h2 className="mb-2 font-display text-xl leading-tight sm:text-2xl">{t('title')}</h2>
        <p className="mb-4 text-sm font-medium text-ink/70">{t('subtitle')}</p>

        <p className="mb-4 font-display text-4xl sm:text-5xl">{formatPrice(EXAMENS_ILLIMITES_OFFER.priceCents, locale)}</p>

        <ul className="mb-5 flex flex-col gap-1.5">
          {[t('bullet1'), t('bullet2'), t('bullet3')].map((b) => (
            <li key={b} className="flex items-start gap-1.5 text-[13px] font-medium text-ink/80 sm:text-sm">
              <span className="mt-0.5 flex h-4 w-4 flex-none items-center justify-center rounded-full border-2 border-ink bg-forest text-[9px] font-extrabold text-cream">
                ✓
              </span>
              {b}
            </li>
          ))}
        </ul>

        <button onClick={handleUnlock} disabled={loading} className="btn-comic block w-full px-4 py-3.5 text-base disabled:opacity-60">
          {t('cta')} — {formatPrice(EXAMENS_ILLIMITES_OFFER.priceCents, locale)} →
        </button>
        <p className="mt-2.5 text-center text-[11px] font-semibold text-ink/50">{t('trustLine')}</p>
        <Link href="/restaurer-acces" className="mt-3 block text-center text-[11px] font-semibold text-ink/50 hover:text-brick">
          {tc('restoreAccessLink')}
        </Link>

        {error && <p className="mt-2 text-center text-[11px] text-brick">{error}</p>}
      </div>
    </div>
  )
}
