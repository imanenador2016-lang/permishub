'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { formatPrice } from '@/domain/centers'
import { createCheckoutSession, type PurchasableItem } from '@/lib/payment'

/**
 * Carte de pack réutilisable — "Nos packs" (home) et ResumeHook (test de
 * niveau). Pensée pour convertir : prix massif, bullets concrets, garantie
 * remboursement mise en avant comme un vrai argument (pas une petite
 * mention en bas de page). Jamais de faux achat : même
 * `createCheckoutSession` partout, jamais de fausse urgence/rareté.
 */
export function OfferCard({
  eyebrow,
  title,
  bullets,
  offer,
  priceLabel,
  ctaLabel,
  ctaHref,
  ctaHrefNewTab,
  refundNote,
  highlight,
  comingSoon,
}: {
  eyebrow: string
  title: string
  bullets: string[]
  /** Achat direct via Stripe — omis si `ctaHref` est fourni à la place (ex. lien vers les circuits). */
  offer?: PurchasableItem
  /** Libellé de prix personnalisé (ex. "à partir de 24,99€") — sinon calculé depuis `offer.priceCents`. */
  priceLabel?: string
  ctaLabel: string
  ctaHref?: string
  /** `ctaHref` pointe hors du site (ex. un PDF) — ouvre un nouvel onglet plutôt que de naviguer sur place. */
  ctaHrefNewTab?: boolean
  refundNote?: string
  /** Met la carte en avant (bordure/ombre plus marquées) — un seul pack par ligne, jamais tous. */
  highlight?: boolean
  /** Pas encore vendable : bouton désactivé, ni `offer` ni `ctaHref` ne sont utilisés. */
  comingSoon?: boolean
}) {
  const locale = useLocale() as 'fr' | 'nl'
  const [message, setMessage] = useState<string | null>(null)

  async function handleClick() {
    if (!offer) return
    try {
      const { url } = await createCheckoutSession(offer)
      window.location.href = url
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Une erreur est survenue.')
    }
  }

  const price = priceLabel ?? (offer ? formatPrice(offer.priceCents, locale) : '')

  return (
    <div
      className={`flex flex-col border-[3px] border-ink bg-cream p-4 sm:p-5 ${
        highlight ? 'shadow-hard-sm sm:shadow-hard' : 'shadow-hard-xs'
      }`}
    >
      <span className="mb-2.5 inline-block w-fit -rotate-2 border-2 border-ink bg-yellow px-2.5 py-1 font-display text-[10px]">
        {eyebrow}
      </span>
      <p className="mb-2.5 font-display text-xl leading-tight">{title}</p>

      <ul className="mb-4 flex flex-1 flex-col gap-1.5">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-1.5 text-[13px] font-medium text-ink/80">
            <span className="mt-0.5 flex h-4 w-4 flex-none items-center justify-center rounded-full border-2 border-ink bg-forest text-[9px] font-extrabold text-cream">
              ✓
            </span>
            {b}
          </li>
        ))}
      </ul>

      {!comingSoon && <p className="mb-2 font-display text-3xl">{price}</p>}

      {comingSoon ? (
        <span className="block w-full cursor-not-allowed border-[3px] border-ink/25 px-4 py-3 text-center text-sm font-bold text-ink/40">
          {ctaLabel}
        </span>
      ) : ctaHref ? (
        <a
          href={ctaHref}
          {...(ctaHrefNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className="btn-comic block w-full px-4 py-3 text-center text-sm"
        >
          {ctaLabel} →
        </a>
      ) : (
        <button onClick={handleClick} className="btn-comic block w-full px-4 py-3 text-sm">
          {ctaLabel} →
        </button>
      )}

      {/* Slot toujours rendu (invisible si pas de refundNote) : sinon son absence
          change la hauteur "fixe" du bas de carte selon les offres, et le
          `flex-1` des bullets ci-dessus compense en désalignant les boutons
          "Débloquer" entre les cartes d'une même rangée. */}
      <p
        className={`mt-2.5 flex items-center justify-center gap-1.5 border-2 border-forest bg-forest/10 px-2 py-1.5 text-center text-[11px] font-bold text-forest ${
          refundNote ? '' : 'invisible'
        }`}
      >
        <span aria-hidden>✓</span> {refundNote || ' '}
      </p>
      {message && <p className="mt-1.5 text-center text-[11px] text-ink/60">{message}</p>}
    </div>
  )
}
