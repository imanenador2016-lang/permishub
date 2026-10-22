'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { formatPrice } from '@/domain/centers'
import { createCheckoutPath, type PurchasableItem } from '@/lib/payment'
import { ClipboardList, FileText, Flame, Infinity as InfinityIcon, LoaderCircle, ShoppingCart } from 'lucide-react'
import { StripeRedirectOverlay } from '@/components/payment/StripeRedirectOverlay'

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
  compact,
  tone = 'default',
  description,
  context,
  imageSrc,
  imageAlt,
  imageLayout = 'default',
  mobileSpotlight,
  hideSpotlightImageOnMobile,
  campaignSpotlight,
  compareAtPriceCents,
  scoreLabel,
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
  /** Variante dense pour les trois offres visibles dès le résultat du test. */
  compact?: boolean
  /** Variante forte, utilisée pour l’offre prioritaire du résultat de test. */
  tone?: 'default' | 'forest'
  description?: string
  context?: string
  imageSrc?: string
  imageAlt?: string
  imageLayout?: 'default' | 'strip'
  /** Offre prioritaire compacte, conçue pour tenir avec le résultat dans le premier viewport mobile. */
  mobileSpotlight?: boolean
  /** Cache l’illustration dans le résultat mobile si elle retarde l’accès au CTA. */
  hideSpotlightImageOnMobile?: boolean
  /** Présentation campagne pour l’offre principale du résultat du test. */
  campaignSpotlight?: boolean
  /** Prix cumulé réel des produits vendus séparément. */
  compareAtPriceCents?: number
  scoreLabel?: string
}) {
  const locale = useLocale() as 'fr' | 'nl'
  const tc = useTranslations('common')
  const [message, setMessage] = useState<string | null>(null)
  // Sans ça, le bouton restait identique pendant les 2-3s d'appel à Stripe —
  // certains clients recliquaient en pensant que rien ne se passait (doublons
  // vus dans Stripe le 2026-09-07), d'où ce retour visuel immédiat.
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!offer) return
    void fetch('/api/checkout/pack', { method: 'HEAD', cache: 'no-store' }).catch(() => undefined)
  }, [offer])

  async function handleClick() {
    if (!offer) return
    setLoading(true)
    setMessage(null)
    window.location.assign(createCheckoutPath(offer))
  }

  const price = priceLabel ?? (offer ? formatPrice(offer.priceCents, locale) : '')

  return (
    <>
    <div
      className={`flex flex-col border-[3px] border-ink ${tone === 'forest' ? 'bg-forest text-cream' : 'bg-cream text-ink'} ${mobileSpotlight ? 'p-2.5 sm:p-5' : compact ? 'p-3' : 'p-4 sm:p-5'} ${
        highlight ? 'shadow-hard-sm sm:shadow-hard' : 'shadow-hard-xs'
      }`}
    >
      {campaignSpotlight && <div className="mb-2 flex flex-wrap items-center gap-1.5 sm:mb-3">
        <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-yellow px-3 py-1 font-display text-[10px] uppercase sm:text-xs"><Flame size={15} fill="currentColor" aria-hidden="true" />{eyebrow}</span>
        {scoreLabel && <span className="rounded-full bg-cream/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wide sm:text-xs">{scoreLabel}</span>}
      </div>}
      {imageSrc && <div className={`${hideSpotlightImageOnMobile && mobileSpotlight ? 'hidden sm:block' : ''} relative overflow-hidden bg-cream ${campaignSpotlight ? '-mx-2.5 mb-2 aspect-[4.2/1] sm:-mx-5 sm:mb-4 sm:aspect-[16/9]' : mobileSpotlight ? '-mx-2.5 -mt-2.5 mb-2 aspect-[4.4/1] sm:-mx-5 sm:-mt-5 sm:mb-4 sm:aspect-[16/9]' : imageLayout === 'strip' ? '-mx-3 -mt-3 mb-2.5 aspect-[2.4/1]' : compact ? '-mx-3 -mt-3 mb-3 aspect-[16/8]' : '-mx-4 -mt-4 mb-4 aspect-[16/9] sm:-mx-5 sm:-mt-5'} `}>
        <Image
          src={imageSrc}
          alt={imageAlt ?? ''}
          fill
          sizes={mobileSpotlight ? '(max-width: 639px) 100vw, 560px' : compact ? '(max-width: 640px) 50vw, 320px' : '(max-width: 1024px) 100vw, 560px'}
          priority={campaignSpotlight || (!compact && highlight)}
          className="object-cover transition-transform duration-500 motion-safe:hover:scale-[1.035]"
        />
      </div>}
      {!campaignSpotlight && <span className={`${mobileSpotlight ? 'mb-1 px-2 py-0.5 text-[8px] sm:mb-2.5 sm:px-2.5 sm:py-1 sm:text-[10px]' : compact ? 'mb-1.5 px-2 py-0.5 text-[9px]' : 'mb-2.5 px-2.5 py-1 text-[10px]'} inline-block w-fit -rotate-2 border-2 border-ink bg-yellow font-display`}>
        {eyebrow}
      </span>}
      <p className={`${campaignSpotlight ? 'mb-1 text-xl sm:mb-2.5 sm:text-4xl' : mobileSpotlight ? 'mb-1 text-[15px] sm:mb-2.5 sm:text-xl' : compact ? 'mb-2 text-base' : 'mb-2.5 text-xl'} font-display leading-tight`}>{title}</p>
      {description && <p className={`${mobileSpotlight ? 'mb-1.5 text-[10px] leading-snug sm:mb-3 sm:text-sm sm:leading-relaxed' : `mb-3 leading-relaxed ${compact ? 'text-xs' : 'text-sm'}`} ${tone === 'forest' ? 'text-cream/85' : 'text-ink/75'}`}>{description}</p>}
      {context && <p className={`mb-4 border-l-4 px-3 py-2 text-xs font-semibold leading-relaxed ${tone === 'forest' ? 'border-yellow bg-cream/10 text-cream' : 'border-forest bg-forest/10 text-ink'}`}>{context}</p>}

      <ul className={`${campaignSpotlight ? 'mb-2 flex gap-1.5 sm:mb-4' : mobileSpotlight ? 'mb-1.5 grid grid-cols-3 gap-1 sm:mb-4 sm:flex sm:gap-1.5 sm:flex-col' : compact ? 'mb-2 hidden gap-1 sm:flex' : 'mb-4 flex gap-1.5 flex-col'} flex-1 flex-col`}>
        {bullets.map((b) => (
          <li key={b} className={`flex items-start gap-2 font-medium ${tone === 'forest' ? 'text-cream/90' : 'text-ink/80'} ${campaignSpotlight ? 'text-[11px] leading-snug sm:text-[14px]' : mobileSpotlight ? 'text-[9px] leading-tight sm:text-[13px] sm:leading-normal' : compact ? 'text-[10px] leading-snug' : 'text-[13px]'}`}>
            {campaignSpotlight ? <span className="mt-0.5 inline-flex flex-none items-center justify-center text-yellow" aria-hidden="true">{bullets.indexOf(b) === 0 ? <FileText size={18} /> : bullets.indexOf(b) === 1 ? <ClipboardList size={18} /> : <InfinityIcon size={18} />}</span> : <span className={`${mobileSpotlight ? 'hidden sm:flex' : 'flex'} mt-0.5 h-4 w-4 flex-none items-center justify-center rounded-full border-2 text-[9px] font-extrabold ${tone === 'forest' ? 'border-cream bg-yellow text-ink' : 'border-ink bg-forest text-cream'}`}>
              ✓
            </span>}
            <span>{b}</span>
          </li>
        ))}
      </ul>

      {compareAtPriceCents && offer && <div className="mb-0.5 flex items-center gap-2">
        <span className="text-sm font-bold text-cream/60 line-through">{formatPrice(compareAtPriceCents, locale)}</span>
        <span className="rounded-full bg-brick px-2.5 py-0.5 text-xs font-display text-cream">−{formatPrice(compareAtPriceCents - offer.priceCents, locale)}</span>
      </div>}
      {!comingSoon && <p className={`${campaignSpotlight ? 'mb-1 text-4xl sm:mb-2 sm:text-6xl' : mobileSpotlight ? 'mb-1 text-2xl sm:mb-2 sm:text-3xl' : compact ? 'mb-1.5 text-2xl' : 'mb-2 text-3xl'} font-display`}>{price}</p>}

      {comingSoon ? (
        <span className="block w-full cursor-not-allowed border-[3px] border-ink/25 px-4 py-3 text-center text-sm font-bold text-ink/40">
          {ctaLabel}
        </span>
      ) : ctaHref ? (
        <a
          href={ctaHref}
          {...(ctaHrefNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className={`btn-comic block w-full text-center ${compact ? 'px-3 py-3 text-sm' : 'px-4 py-3 text-sm'}`}
        >
          {ctaLabel} →
        </a>
      ) : (
        <button
          onClick={handleClick}
          disabled={loading}
          className={`btn-comic block w-full disabled:opacity-60 ${campaignSpotlight ? 'min-h-14 px-3 py-3 text-base sm:text-xl' : mobileSpotlight ? 'min-h-11 px-3 py-2 text-sm sm:py-3' : compact ? 'px-3 py-3 text-sm' : 'px-4 py-3 text-sm'}`}
        >
          {loading ? <span className="inline-flex items-center justify-center gap-2"><LoaderCircle size={18} className="animate-spin" aria-hidden="true" />{tc('redirecting')}</span> : campaignSpotlight ? <span className="inline-flex items-center justify-center gap-2"><ShoppingCart size={22} aria-hidden="true" />{ctaLabel}<span aria-hidden="true">→</span></span> : `${ctaLabel} →`}
        </button>
      )}

      {/* Slot toujours rendu (invisible si pas de refundNote) : sinon son absence
          change la hauteur "fixe" du bas de carte selon les offres, et le
          `flex-1` des bullets ci-dessus compense en désalignant les boutons
          "Débloquer" entre les cartes d'une même rangée. */}
      {(!compact || refundNote) && <p
        className={`mt-2.5 flex items-center justify-center gap-1.5 border-2 border-forest bg-forest/10 px-2 py-1.5 text-center text-[11px] font-bold text-forest ${
          refundNote ? '' : 'invisible'
        }`}
      >
        <span aria-hidden>✓</span> {refundNote || ' '}
      </p>}
      {message && <p className="mt-1.5 text-center text-[11px] text-ink/60">{message}</p>}
    </div>
    <StripeRedirectOverlay visible={loading} />
    </>
  )
}
