'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { formatPrice } from '@/domain/centers'
import { createCheckoutSession } from '@/lib/payment'
import { RESUME_OFFER, EXAMENS_ILLIMITES_OFFER } from '@/content/pricing-config'
import { RESUME_HOOK_MESSAGES } from '@/content/resume-hook-messages'

/**
 * Le vrai hook de conversion après le test de niveau. Message (accroche +
 * corps) personnalisé selon le score exact obtenu (0 à 10) — voir
 * content/resume-hook-messages.ts et le brief CRO fourni par l'utilisateur
 * (conversation du 2026-08-28). L'offre mise en avant en gros bouton change
 * aussi selon le score : Pack Résumé pour 0-3 (poser les bases d'abord),
 * Examens blancs illimités pour 4-10 (badge "Recommandé"), conformément à
 * la table de recommandation du brief. Les thèmes faibles restent affichés
 * en complément concret, sous l'accroche.
 */
export function ResumeHook({
  score10,
  weakThemeLabels,
  onSkip,
}: {
  score10: number
  weakThemeLabels: string[]
  onSkip: () => void
}) {
  const t = useTranslations('testDeNiveau')
  const to = useTranslations('offers')
  const locale = useLocale() as 'fr' | 'nl'
  const [primaryMessage, setPrimaryMessage] = useState<string | null>(null)
  const [secondaryMessage, setSecondaryMessage] = useState<string | null>(null)

  const clampedScore = Math.min(10, Math.max(0, Math.round(score10)))
  const copy = RESUME_HOOK_MESSAGES[clampedScore]
  const examensIsPrimary = copy.primaryOffer === 'examens'

  async function unlock(offer: { id: string; priceCents: number }, setMsg: (m: string | null) => void) {
    try {
      const { url } = await createCheckoutSession(offer)
      window.location.href = url
    } catch (err) {
      setMsg(err instanceof Error ? err.message : 'Une erreur est survenue.')
    }
  }

  const primaryOffer = examensIsPrimary ? EXAMENS_ILLIMITES_OFFER : RESUME_OFFER
  const secondaryOffer = examensIsPrimary ? RESUME_OFFER : EXAMENS_ILLIMITES_OFFER
  const secondaryTitle = examensIsPrimary ? to('resumeTitle') : to('examensTitle')
  const secondaryPrefix = examensIsPrimary ? t('secondaryOfferPrefixResume') : t('secondaryOfferPrefix')

  return (
    <div>
      <span className="mb-4 inline-block w-fit -rotate-2 border-[3px] border-ink bg-yellow px-3 py-1.5 font-display text-xs">
        {t('hookEyebrow')}
      </span>

      <p className="mb-3 font-display text-4xl text-ink">{t('scoreOutOf10', { score: clampedScore })}</p>

      <h3 className="mb-3 font-display text-2xl leading-snug">{copy.accroche[locale]}</h3>

      {weakThemeLabels.length > 0 && (
        <ul className="mb-4 flex flex-wrap gap-2">
          {weakThemeLabels.map((label) => (
            <li key={label} className="border-2 border-brick px-3 py-1 text-xs font-semibold text-brick">
              {label}
            </li>
          ))}
        </ul>
      )}

      <p className="mb-5 text-sm leading-relaxed text-ink/80">{copy.message[locale]}</p>

      {examensIsPrimary && (
        <span className="mb-2 inline-block w-fit -rotate-1 border-2 border-forest bg-forest/10 px-2.5 py-1 font-display text-[11px] uppercase tracking-wide text-forest">
          🔥 {t('recommendedBadge')}
        </span>
      )}
      <button onClick={() => unlock(primaryOffer, setPrimaryMessage)} className="btn-comic block w-full px-5 py-4 text-base">
        {copy.ctaLabel[locale]} — {formatPrice(primaryOffer.priceCents, locale)} →
      </button>
      {!examensIsPrimary && <p className="mt-2 text-center font-hand text-sm text-forest">{to('resumeRefund')}</p>}
      {primaryMessage && <p className="mt-1.5 text-center text-xs text-ink/60">{primaryMessage}</p>}

      <button
        onClick={() => unlock(secondaryOffer, setSecondaryMessage)}
        className="mt-5 block w-full text-center text-xs font-semibold text-ink/70 underline decoration-2 underline-offset-4 hover:text-brick"
      >
        {secondaryPrefix} {secondaryTitle} — {formatPrice(secondaryOffer.priceCents, locale)} →
      </button>
      {examensIsPrimary && <p className="mt-1.5 text-center font-hand text-sm text-forest">{to('resumeRefund')}</p>}
      {secondaryMessage && <p className="mt-1.5 text-center text-xs text-ink/60">{secondaryMessage}</p>}

      <button onClick={onSkip} className="mt-4 block w-full text-center text-[11px] text-ink/40 underline-offset-2 hover:underline">
        {t('skipLink')}
      </button>
    </div>
  )
}
