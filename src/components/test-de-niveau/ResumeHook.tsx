'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { formatPrice } from '@/domain/centers'
import { createCheckoutSession } from '@/lib/payment'
import { RESUME_OFFER, EXAMENS_ILLIMITES_OFFER, RESUME_FREE_FOR_TESTING, RESUME_PDF_URL } from '@/content/pricing-config'
import { RESUME_HOOK_MESSAGES } from '@/content/resume-hook-messages'
import { RadarChart, type RadarDatum } from './RadarChart'

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
  radarData,
  onSkip,
}: {
  score10: number
  weakThemeLabels: string[]
  /** Un point par thème testé (0-100) — voir RadarChart.tsx. Vide = pas de radar affiché (ancien appelant). */
  radarData: RadarDatum[]
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

  // ⚠️ TEMPORAIRE — voir RESUME_FREE_FOR_TESTING (pricing-config.ts) : ouvre
  // le PDF directement au lieu de Stripe pour le pack Résumé.
  function offerPriceLabel(offer: { id: string; priceCents: number }) {
    if (RESUME_FREE_FOR_TESTING && offer.id === RESUME_OFFER.id) return to('resumeFreeTemp')
    return formatPrice(offer.priceCents, locale)
  }

  async function unlock(offer: { id: string; priceCents: number }, setMsg: (m: string | null) => void) {
    if (RESUME_FREE_FOR_TESTING && offer.id === RESUME_OFFER.id) {
      window.open(RESUME_PDF_URL, '_blank', 'noopener,noreferrer')
      return
    }
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

      {/* Le radar (voir RadarChart.tsx) est le vrai "accroche visuelle" —
          avant, cet écran de résultat n'était que du texte (score en
          chiffres + liste de badges), signalé comme peu convaincant par
          l'utilisateur le 2026-09-08. Le score reste affiché, mais
          superposé au centre du radar plutôt qu'en paragraphe séparé —
          un seul repère visuel fort plutôt que deux stats qui se
          concurrencent. */}
      {radarData.length > 0 ? (
        <div className="relative mx-auto mb-4 w-full max-w-[300px]">
          <RadarChart data={radarData} size={220} />
          {/* Plaque opaque derrière le score : sans ça, un score faible (le
              polygone s'approche alors du centre) traverse visuellement le
              texte et le rend illisible — trouvé en testant sur mobile le
              2026-09-08. */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <div className="flex h-16 w-16 flex-col items-center justify-center rounded-full border-2 border-ink/15 bg-cream">
              <span className="font-display text-2xl leading-none text-ink">{clampedScore}</span>
              <span className="font-display text-[10px] text-ink/60">/ 10</span>
            </div>
          </div>
        </div>
      ) : (
        // Repli si jamais radarData est vide (pas assez de thèmes couverts) —
        // garde l'ancien affichage texte plutôt que de ne rien montrer.
        <p className="mb-3 font-display text-4xl text-ink">{t('scoreOutOf10', { score: clampedScore })}</p>
      )}

      <h3 className="mb-3 font-display text-2xl leading-snug">{copy.accroche[locale]}</h3>

      {weakThemeLabels.length > 0 && (
        <ul className="mb-4 flex flex-wrap justify-center gap-2">
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
        {copy.ctaLabel[locale]} — {offerPriceLabel(primaryOffer)} →
      </button>
      {!examensIsPrimary && <p className="mt-2 text-center font-hand text-sm text-forest">{to('resumeRefund')}</p>}
      {primaryMessage && <p className="mt-1.5 text-center text-xs text-ink/60">{primaryMessage}</p>}

      <button
        onClick={() => unlock(secondaryOffer, setSecondaryMessage)}
        className="mt-5 block w-full text-center text-xs font-semibold text-ink/70 underline decoration-2 underline-offset-4 hover:text-brick"
      >
        {secondaryPrefix} {secondaryTitle} — {offerPriceLabel(secondaryOffer)} →
      </button>
      {examensIsPrimary && <p className="mt-1.5 text-center font-hand text-sm text-forest">{to('resumeRefund')}</p>}
      {secondaryMessage && <p className="mt-1.5 text-center text-xs text-ink/60">{secondaryMessage}</p>}

      <button onClick={onSkip} className="mt-4 block w-full text-center text-[11px] text-ink/40 underline-offset-2 hover:underline">
        {t('skipLink')}
      </button>
    </div>
  )
}
