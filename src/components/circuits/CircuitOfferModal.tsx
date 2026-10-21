'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useTranslations } from 'next-intl'
import { formatPrice } from '@/domain/centers'
import { CIRCUITS_BUNDLE_PRICE_CENTS } from '@/content/centers/registry'
import { createCircuitsBundleCheckoutSession } from '@/lib/circuit-payment'
import { Link } from '@/i18n/navigation'
import { LoaderCircle } from 'lucide-react'
import { StripeRedirectOverlay } from '@/components/payment/StripeRedirectOverlay'

/** Offre des circuits du centre ouverte depuis CircuitUnlockCta. */
export function CircuitOfferModal({
  centerName,
  centerSlug,
  locale,
  onClose,
}: {
  centerName: string
  centerSlug: string
  locale: 'fr' | 'nl'
  onClose: () => void
}) {
  const t = useTranslations('circuitOffer')
  const tc = useTranslations('common')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoMessage, setPromoMessage] = useState<string | null>(null)
  const closeRef = useRef(onClose)
  closeRef.current = onClose

  useEffect(() => {
    // iOS Safari can reset the document's scroll when body overflow is toggled.
    // Fix body in place, then restore its exact coordinates when the sheet closes.
    const scrollX = window.scrollX
    const scrollY = window.scrollY
    const html = document.documentElement
    const body = document.body
    const previous = {
      htmlOverflow: html.style.overflow,
      htmlScrollBehavior: html.style.scrollBehavior,
      bodyOverflow: body.style.overflow,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyLeft: body.style.left,
      bodyRight: body.style.right,
      bodyWidth: body.style.width,
    }

    html.style.overflow = 'hidden'
    html.style.scrollBehavior = 'auto'
    body.style.overflow = 'hidden'
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.left = `-${scrollX}px`
    body.style.right = '0'
    body.style.width = '100%'

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') closeRef.current()
    }
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      html.style.overflow = previous.htmlOverflow
      html.style.scrollBehavior = previous.htmlScrollBehavior
      body.style.overflow = previous.bodyOverflow
      body.style.position = previous.bodyPosition
      body.style.top = previous.bodyTop
      body.style.left = previous.bodyLeft
      body.style.right = previous.bodyRight
      body.style.width = previous.bodyWidth
      window.scrollTo(scrollX, scrollY)
    }
  }, [])

  async function handleUnlock() {
    setLoading(true)
    setError(null)
    try {
      const { url } = await createCircuitsBundleCheckoutSession(centerSlug, promoApplied ? promoCode : undefined)
      window.location.replace(url)
    } catch (err) {
      setError(err instanceof Error ? err.message : t('errorFallback'))
      setLoading(false)
    }
  }

  function applyPromoCode() {
    const valid = promoCode.trim().toLowerCase() === 'tiktok'
    setPromoApplied(valid)
    setPromoMessage(valid ? t('promoSuccess') : t('promoInvalid'))
  }

  const checkoutPrice = promoApplied ? Math.round(CIRCUITS_BUNDLE_PRICE_CENTS * 0.8) : CIRCUITS_BUNDLE_PRICE_CENTS

  if (typeof document === 'undefined') return null

  return createPortal(
    <>
    <div
      role="presentation"
      className="fixed inset-0 z-[100] flex h-screen h-dvh items-end justify-center overflow-hidden overscroll-none bg-ink/65 sm:items-center sm:p-4"
      onClick={onClose}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="circuit-offer-title"
        className="panel !shadow-hard fixed inset-x-0 bottom-0 mx-auto flex max-h-[88dvh] w-full max-w-md flex-col overflow-hidden !p-0 sm:relative sm:inset-auto sm:max-h-[calc(100dvh-2rem)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-3 pt-3 [-webkit-overflow-scrolling:touch] sm:px-6 sm:pb-5 sm:pt-6"
        >
          <div className="flex items-start justify-between gap-3">
            <span className="mt-1 inline-block w-fit -rotate-2 border-2 border-ink bg-yellow px-2.5 py-1 font-display text-[10px] sm:text-xs">
              {t('eyebrow')}
            </span>
            <button
              onClick={onClose}
              aria-label={t('close')}
              className="-mr-1 -mt-1 flex size-11 flex-none items-center justify-center border-2 border-ink bg-cream font-display text-2xl leading-none hover:bg-creamdim focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brick"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <h2 id="circuit-offer-title" className="mb-1.5 mt-2.5 pr-1 font-display text-xl leading-tight sm:mb-2 sm:mt-3 sm:text-2xl">
            {t('title', { center: centerName })}
          </h2>
          <p className="mb-3 max-w-prose text-[13px] font-medium leading-snug text-ink/70 sm:mb-4 sm:text-sm sm:leading-relaxed">
            {t('subtitle')}
          </p>

          <div className="mb-3 flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5 border-y-2 border-ink/15 py-2.5 sm:mb-4 sm:py-3">
            <p className="font-display text-4xl leading-none sm:text-5xl">{formatPrice(checkoutPrice, locale)}</p>
            <p className="text-xs font-semibold text-ink/50 line-through">{t('priceNote')}</p>
          </div>

          <ul className="flex flex-col gap-2 sm:gap-2.5">
            {[t('bullet1', { center: centerName }), t('bullet2'), t('bullet3'), t('bullet4')].map((bullet) => (
              <li key={bullet} className="flex items-start gap-2 text-[13px] font-medium leading-snug text-ink/85 sm:gap-2.5 sm:text-sm">
                <span className="mt-0.5 flex size-5 flex-none items-center justify-center rounded-full border-2 border-ink bg-forest text-xs font-extrabold text-cream">
                  ✓
                </span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        <footer className="sticky bottom-0 z-10 border-t-2 border-ink/15 bg-cream px-4 pt-2.5 pb-[calc(0.5rem+env(safe-area-inset-bottom))] sm:px-6 sm:pt-3 sm:pb-4">
          <div className="mb-3">
            <label htmlFor="circuit-promo-code" className="mb-1.5 block text-xs font-bold text-ink/75">
              {t('promoLabel')}
            </label>
            <div className="flex gap-2">
              <input
                id="circuit-promo-code"
                value={promoCode}
                onChange={(event) => {
                  setPromoCode(event.target.value)
                  setPromoApplied(false)
                  setPromoMessage(null)
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault()
                    applyPromoCode()
                  }
                }}
                autoComplete="off"
                placeholder={t('promoPlaceholder')}
                className="min-w-0 flex-1 border-2 border-ink bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-forest/30"
              />
              <button type="button" onClick={applyPromoCode} className="border-2 border-ink bg-yellow px-3 py-2 font-display text-xs shadow-hard-xs">
                {t('promoApply')}
              </button>
            </div>
            {promoMessage && (
              <p className={`mt-1.5 text-xs font-bold ${promoApplied ? 'text-forest' : 'text-brick'}`} role="status">
                {promoMessage}
              </p>
            )}
          </div>
          {error && <p role="alert" className="mb-2 text-center text-sm text-brick">{error}</p>}
          <button
            onClick={handleUnlock}
            disabled={loading}
            className="btn-comic block min-h-12 w-full px-4 py-3 text-base disabled:opacity-60 sm:min-h-14 sm:py-3.5 sm:text-lg"
          >
            {loading ? (
              <span className="inline-flex items-center justify-center gap-2">
                <LoaderCircle size={18} className="animate-spin" aria-hidden="true" />
                {tc('redirecting')}
              </span>
            ) : (
              `${t('cta')} — ${formatPrice(checkoutPrice, locale)} →`
            )}
          </button>
          <p className="mt-1.5 text-center text-[10px] font-semibold text-ink/50 sm:mt-2.5 sm:text-[11px]">{t('trustLine')}</p>
          <Link href="/restaurer-acces" className="mt-1 block min-h-9 text-center text-[10px] font-semibold text-ink/60 hover:text-brick sm:mt-3 sm:min-h-11 sm:text-[11px]">
            {tc('restoreAccessLink')}
          </Link>
        </footer>
      </section>
    </div>
    <StripeRedirectOverlay visible={loading} />
    </>,
    document.body,
  )
}
