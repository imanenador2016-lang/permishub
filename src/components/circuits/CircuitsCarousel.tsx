'use client'

import { useRef, useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { getCenters, getFeaturedCircuit } from '@/content/centers/registry'
import { REGION_LABELS } from '@/domain/region'
import { CircuitIllustrationAnderlecht, CircuitIllustrationSchaerbeek, CircuitIllustrationGeneric } from './CircuitIllustration'

const ILLUSTRATIONS: Record<string, () => React.JSX.Element> = {
  anderlecht: CircuitIllustrationAnderlecht,
  schaerbeek: CircuitIllustrationSchaerbeek,
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
 * Chaque carte mène vers la liste des circuits du centre
 * (circuits/[centerSlug]/page.tsx) plutôt que directement vers l'achat —
 * voir conversation du 2026-08-29 : les circuits sont temporairement
 * gratuits (CIRCUITS_FREE_FOR_TESTING dans content/centers/registry.ts)
 * pendant que le client crée plusieurs parcours par centre. L'ancien
 * bouton "Débloquer" → Stripe (UnlockButton/createCircuitCheckoutSession)
 * reste disponible dans lib/circuit-payment.ts pour être réactivé plus
 * tard sur la page de liste.
 */
export function CircuitsCarousel() {
  const t = useTranslations('circuits')
  const locale = useLocale() as 'fr' | 'nl'
  const trackRef = useRef<HTMLDivElement>(null)
  const centers = getCenters()
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
        {t('availableBadge', { count: centers.length })}
      </span>

      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex gap-3.5 overflow-x-auto pb-2.5 [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [scroll-snap-type:x_mandatory] [&::-webkit-scrollbar]:hidden"
      >
        {centers.map((center, i) => {
          const circuit = getFeaturedCircuit(center.slug)
          const Illustration = ILLUSTRATIONS[center.slug]
          return (
            <div key={center.id} className="panel w-[84%] flex-none !p-0 [scroll-snap-align:center] sm:w-[320px]">
              <div className="h-[150px] border-b-[3px] border-ink sm:border-b-4">
                {Illustration ? <Illustration /> : <CircuitIllustrationGeneric seed={i} />}
              </div>
              <div className="p-4">
                <p className="font-display text-lg">
                  {REGION_LABELS[center.region][locale]} — {center.name}
                </p>
                {circuit?.distanceKm != null && circuit.attentionPointsCount != null && (
                  <p className="mb-2.5 text-xs font-semibold text-ink/70">
                    {t('kmPoints', { km: circuit.distanceKm.toLocaleString(locale === 'nl' ? 'nl-BE' : 'fr-BE'), points: circuit.attentionPointsCount })}
                  </p>
                )}
                {circuit?.difficulty && (
                  <span className={`mb-3 inline-block border-2 border-ink px-2.5 py-1 text-[10.5px] font-extrabold ${DIFFICULTY_STYLES[circuit.difficulty]}`}>
                    {t(`difficulty.${circuit.difficulty}`)}
                  </span>
                )}
                <p className="mb-2.5 inline-block border-2 border-ink bg-sky px-2 py-1 text-xs font-bold">{t('realMapsBadge')}</p>
                <Link href={`/circuits/${center.slug}`} className="btn-comic block w-full px-4 py-2.5 text-center text-sm">
                  {t('ctaViewCircuits')} →
                </Link>
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
