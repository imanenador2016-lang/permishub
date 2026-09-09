'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { getCenters, getFeaturedCircuit } from '@/content/centers/registry'
import { REGION_LABELS } from '@/domain/region'
import { CircuitIllustrationAnderlecht, CircuitIllustrationSchaerbeek, CircuitIllustrationGeneric } from './CircuitIllustration'
import { CircuitUnlockCta } from './CircuitUnlockCta'

const ILLUSTRATIONS: Record<string, () => React.JSX.Element> = {
  anderlecht: CircuitIllustrationAnderlecht,
  schaerbeek: CircuitIllustrationSchaerbeek,
}

/** Vraie photo du centre — remplace l'illustration dessinée quand elle est disponible (fournie par le client). */
const PHOTOS: Record<string, string> = {
  anderlecht: '/images/centers/anderlecht.jpg',
  schaerbeek: '/images/centers/schaerbeek.jpg',
  couillet: '/images/centers/couillet.webp',
  'louvain-la-neuve': '/images/centers/louvain-la-neuve.jpg',
}

const DIFFICULTY_STYLES: Record<string, string> = {
  facile: 'bg-forest text-cream',
  moyen: 'bg-yellow text-ink',
  difficile: 'bg-brick text-cream',
}

/**
 * Carrousel horizontal en scroll-snap — reproduit apercu-circuits-swipe.html
 * (brief v2 §Section circuits). Données réelles uniquement : voir
 * content/centers/registry.ts. La dernière carte collecte un email pour
 * prioriser les prochaines villes.
 *
 * Chaque carte débloque directement (CircuitUnlockCta → CircuitOfferModal →
 * Stripe) au lieu de renvoyer d'abord vers la liste des circuits du centre
 * (circuits/[centerSlug]/page.tsx) — voir conversation du 2026-09-09 :
 * l'étape intermédiaire "Voir les circuits" faisait perdre des clients avant
 * même qu'ils voient le prix. La page de liste reste accessible (SEO,
 * utilisateurs déjà débloqués qui veulent un circuit précis) mais n'est plus
 * le chemin d'achat principal.
 */
export function CircuitsCarousel() {
  const t = useTranslations('circuits')
  const locale = useLocale() as 'fr' | 'nl'
  const trackRef = useRef<HTMLDivElement>(null)
  const centers = getCenters()
  const availableCount = centers.filter((c) => !c.comingSoon).length
  const cardCount = centers.length + 1 // + carte "ta ville n'est pas là"
  const [activeIndex, setActiveIndex] = useState(0)

  function handleScroll() {
    const track = trackRef.current
    if (!track || !track.firstElementChild) return
    const cardWidth = (track.firstElementChild as HTMLElement).offsetWidth + 14
    setActiveIndex(Math.round(track.scrollLeft / cardWidth))
  }

  return (
    <div>
      <span className="mb-3 inline-flex w-fit -rotate-2 items-center gap-2 border-[3px] border-ink bg-cream px-3 py-1.5 text-xs font-bold">
        <span className="h-2 w-2 rounded-full bg-forest" />
        {t('availableBadge', { count: availableCount })}
      </span>

      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex gap-3.5 overflow-x-auto pb-2.5 [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [scroll-snap-type:x_mandatory] [&::-webkit-scrollbar]:hidden"
      >
        {centers.map((center, i) => {
          const circuit = getFeaturedCircuit(center.slug)
          const Illustration = ILLUSTRATIONS[center.slug]
          const photo = PHOTOS[center.slug]
          return (
            <div key={center.id} className="panel w-[84%] flex-none !p-0 [scroll-snap-align:center] sm:w-[320px]">
              <div className="relative h-[150px] border-b-[3px] border-ink sm:border-b-4">
                {photo ? (
                  <Image src={photo} alt={center.name} fill className="object-cover" sizes="(min-width: 640px) 320px, 84vw" />
                ) : Illustration ? (
                  <Illustration />
                ) : (
                  <CircuitIllustrationGeneric seed={i} />
                )}
              </div>
              <div className="p-4">
                <p className="font-display text-lg">
                  {REGION_LABELS[center.region][locale]} — {center.name}
                </p>
                {circuit?.durationMinutes != null && (
                  <p className="mb-2.5 text-xs font-semibold text-ink/70">{t('durationLabel', { min: circuit.durationMinutes })}</p>
                )}
                {circuit?.difficulty && (
                  <span className={`mb-3 inline-block border-2 border-ink px-2.5 py-1 text-[10.5px] font-extrabold ${DIFFICULTY_STYLES[circuit.difficulty]}`}>
                    {t(`difficulty.${circuit.difficulty}`)}
                  </span>
                )}
                {!center.comingSoon && (
                  <p className="mb-2.5 inline-block border-2 border-ink bg-sky px-2 py-1 text-xs font-bold">{t('realMapsBadge')}</p>
                )}
                {center.comingSoon ? (
                  // Vrai <Link href> (pas un <span>) avec preventDefault : même
                  // comportement clic qu'avant (rien ne se passe), mais l'URL
                  // du centre redevient crawlable — voir audit SEO du
                  // 2026-09-01, ces 6 pages n'avaient aucun lien réel les
                  // pointant, seulement le sitemap.
                  <Link
                    href={`/circuits/${center.slug}`}
                    onClick={(e) => e.preventDefault()}
                    className="block w-full cursor-not-allowed border-[3px] border-ink/25 px-4 py-2.5 text-center text-sm font-bold text-ink/40"
                  >
                    {t('circuitComingSoon')}
                  </Link>
                ) : circuit?.mapsUrl ? (
                  <CircuitUnlockCta
                    mapsUrl={circuit.mapsUrl}
                    centerSlug={center.slug}
                    centerName={center.name}
                    locale={locale}
                    unlockLabel={t('ctaUnlock')}
                  />
                ) : null}
              </div>
            </div>
          )
        })}

        <OtherCityCard />
      </div>

      <Dots count={cardCount} active={activeIndex} />
      <p className="mt-2 text-center font-hand text-sm text-forest">{t('swipeHint')}</p>
    </div>
  )
}

function OtherCityCard() {
  const t = useTranslations('circuits')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/demande-ville', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="panel flex w-[84%] flex-none flex-col !p-0 [scroll-snap-align:center] sm:w-[320px]">
      <div className="flex h-[150px] items-center justify-center border-b-[3px] border-ink bg-ink text-center sm:border-b-4">
        <p className="px-5 font-display text-base leading-snug text-cream">{t('otherCityTitle')}</p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-1 flex-col p-4">
        <p className="mb-2.5 text-xs font-semibold text-ink/70">{t('otherCityBody')}</p>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('emailPlaceholder')}
          className="mb-2.5 border-[3px] border-ink bg-cream px-2.5 py-2 text-sm"
        />
        <button type="submit" disabled={status === 'sending'} className="btn-comic mt-auto px-4 py-2.5 text-sm disabled:opacity-60">
          {status === 'sent' ? t('notifySent') : `${t('notifyCta')} →`}
        </button>
      </form>
    </div>
  )
}

function Dots({ count, active }: { count: number; active: number }) {
  return (
    <div className="mt-3.5 flex justify-center gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className={`h-2.5 w-2.5 rounded-full border-2 border-ink ${i === active ? 'bg-brick' : 'bg-cream'}`} />
      ))}
    </div>
  )
}
