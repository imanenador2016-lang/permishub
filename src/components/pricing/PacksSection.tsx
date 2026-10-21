'use client'

import { useId, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { ArrowRight, CalendarDays, ChartNoAxesColumnIncreasing, Check, Crosshair, Eye, Map, MapPin, Play, ShieldCheck, Sparkles, TriangleAlert } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { OfferCard } from './OfferCard'
import { EXAMENS_ILLIMITES_OFFER, PACK_THEORIE_ILLIMITE_OFFER, RESUME_OFFER, RESUME_FREE_FOR_TESTING, RESUME_PDF_URL } from '@/content/pricing-config'

type Tab = 'theorique' | 'pratique'

/**
 * "Nos packs" — bascule Théorique/Pratique sur une seule ligne (pas deux
 * blocs empilés) pour rester compact et pousser vers l'achat sans diluer
 * l'attention entre 4 offres à la fois.
 */
export function PacksSection() {
  const t = useTranslations('packs')
  const to = useTranslations('offers')
  const locale = useLocale() as 'fr' | 'nl'
  const [tab, setTab] = useState<Tab>('theorique')

  return (
    <div>
      <h2 className="mb-3 font-display text-2xl tracking-tight text-ink sm:text-3xl">{t('title')}</h2>
      <p className="mb-6 max-w-2xl text-ink/70">{t('lead')}</p>

      <div className="mb-6 flex w-fit overflow-hidden border-[3px] border-ink">
        <button
          onClick={() => setTab('theorique')}
          className={`px-5 py-2.5 font-display text-sm transition-colors ${tab === 'theorique' ? 'bg-ink text-cream' : 'bg-cream text-ink hover:bg-creamdim'}`}
        >
          {t('theoriqueLabel')}
        </button>
        <button
          onClick={() => setTab('pratique')}
          className={`border-l-[3px] border-ink px-5 py-2.5 font-display text-sm transition-colors ${tab === 'pratique' ? 'bg-brick text-cream' : 'bg-cream text-ink hover:bg-creamdim'}`}
        >
          {t('pratiqueLabel')}
        </button>
      </div>

      {tab === 'theorique' ? (
          <div
            key="theorique"
            className="pack-panel-enter grid gap-4 lg:grid-cols-2 lg:items-stretch"
          >
            <div className="lg:col-span-2">
              <OfferCard
                eyebrow={locale === 'nl' ? 'AANBEVOLEN PACK' : 'PACK RECOMMANDÉ'}
                title={locale === 'nl' ? 'Samenvatting zonder blabla + oefenexamens' : 'Résumé sans blabla + séries d’examens'}
                description={locale === 'nl' ? 'Leer de essentiële regels en oefen met vragen die elke week worden bijgewerkt.' : 'Révise les règles essentielles, puis entraîne-toi avec des questions mises à jour chaque semaine.'}
                bullets={locale === 'nl'
                  ? ['Vragen elke week bijgewerkt', 'Onbeperkte toegang', 'Geen abonnement']
                  : ['Questions mises à jour chaque semaine', 'Accès illimité', 'Sans abonnement']}
                offer={PACK_THEORIE_ILLIMITE_OFFER}
                imageSrc="/images/offers/pack-resume-examens.webp"
                imageAlt={locale === 'nl' ? 'PermisHub theoriepakket' : 'Pack théorie PermisHub avec résumé et examens'}
                ctaLabel={locale === 'nl' ? 'Ontgrendel het pakket' : 'Débloquer le pack'}
                tone="forest"
                highlight
              />
            </div>
            <div>
              <OfferCard
                eyebrow={to('resumeEyebrow')}
                title={to('resumeTitle')}
                bullets={[t('resumeBullet1'), t('resumeBullet2'), t('resumeBullet3')]}
                offer={RESUME_OFFER}
                imageSrc="/images/offers/resume-study-guide.webp"
                imageAlt={t('resumeImageAlt')}
                {...(RESUME_FREE_FOR_TESTING
                  ? { ctaHref: RESUME_PDF_URL, ctaHrefNewTab: true, ctaLabel: t('ctaFree') }
                  : { ctaLabel: t('cta') })}
                refundNote={to('resumeRefund')}
              />
            </div>
            <div>
              <OfferCard
                eyebrow={locale === 'nl' ? 'OEFENEXAMENS' : 'EXAMENS SEULS'}
                title={locale === 'nl' ? 'Reeks oefenexamens' : 'Séries d’examens'}
                description={locale === 'nl' ? 'Oefen onbeperkt met vragen die regelmatig worden vernieuwd.' : 'Entraîne-toi en illimité avec des questions régulièrement renouvelées.'}
                bullets={locale === 'nl'
                  ? ['Vragen elke week bijgewerkt', 'Onbeperkte toegang', 'Geen abonnement']
                  : ['Questions mises à jour chaque semaine', 'Accès illimité', 'Sans abonnement']}
                offer={EXAMENS_ILLIMITES_OFFER}
                ctaLabel={locale === 'nl' ? 'Ontgrendel de examens' : 'Débloquer les examens'}
              />
            </div>
          </div>
        ) : (
          <div
            key="pratique"
            className="pack-panel-enter w-full"
          >
            <PracticalOfferCards />
          </div>
        )}
    </div>
  )
}

function PracticalOfferCards() {
  const t = useTranslations('packs')
  const locale = useLocale() as 'fr' | 'nl'
  const priceLabel = t('circuitPriceLabel')
  const [circuitPrice, accessLabel] = priceLabel.split(' — ')

  return (
    <div className="grid items-stretch gap-4 lg:grid-cols-2 lg:gap-6">
      <article className="group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-forest/20 bg-cream shadow-[0_12px_36px_rgba(31,26,20,0.08)] transition-shadow duration-200 hover:shadow-[0_18px_44px_rgba(31,26,20,0.13)] motion-safe:hover:-translate-y-0.5">
        <div className="relative flex-1 overflow-hidden p-5 sm:p-7">
          <div className="pointer-events-none absolute right-0 top-0 hidden h-[300px] w-[45%] lg:block" aria-hidden="true">
            <CircuitRouteVisual label={t('circuitVisualLabel')} className="absolute inset-0 [mask-image:linear-gradient(to_right,transparent_0%,black_22%)]" />
          </div>
          <div className="relative z-10 lg:w-[61%]">
            <span className="inline-flex items-center gap-2 rounded-full bg-yellow px-3.5 py-2 font-display text-xs text-ink sm:text-sm"><MapPin size={16} fill="currentColor" aria-hidden="true" />{t('circuitEyebrow')}</span>
            <h3 className="mt-4 max-w-[15ch] font-display text-3xl leading-[1.02] tracking-tight text-ink sm:mt-5 sm:text-4xl">{t('circuitTitle')}</h3>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-ink/65 sm:text-base">{t('circuitSubtitle')}</p>
          </div>

          <CircuitRouteVisual label={t('circuitVisualLabel')} className="relative mt-4 aspect-[16/7] overflow-hidden rounded-xl border border-forest/10 lg:hidden" />

          <ul className="relative z-10 mt-5 space-y-2.5 sm:mt-6 sm:space-y-3 lg:w-[61%]">
            {[t('circuitBenefit1'), t('circuitBullet2'), t('circuitBullet3'), t('circuitBenefit4')].map((benefit) => <li key={benefit} className="flex items-start gap-3 text-sm leading-snug text-ink sm:text-[15px]"><span className="mt-0.5 flex size-5 flex-none items-center justify-center rounded-full bg-forest text-cream"><Check size={13} strokeWidth={3} aria-hidden="true" /></span><span>{benefit}</span></li>)}
          </ul>

          <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-7">
            <p className="font-display text-4xl leading-none tracking-tight text-ink sm:text-5xl">{circuitPrice}</p>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-forest/10 px-3 py-2 text-xs font-bold text-forest sm:text-sm"><Sparkles size={15} aria-hidden="true" />{accessLabel}</span>
          </div>

          <Link href="#circuits" className="mt-5 flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-yellow px-5 py-3.5 font-display text-base text-ink shadow-[0_4px_0_#1f1a14] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_0_#1f1a14] active:translate-y-0.5 active:shadow-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest sm:mt-6 sm:min-h-16 sm:text-lg">
            {t('circuitCta')} <ArrowRight size={20} aria-hidden="true" />
          </Link>

          <div className="mt-4 grid grid-cols-3 gap-2 sm:mt-5 sm:gap-3">
            {[
              { icon: Map, label: t('circuitAdvantageMaps') },
              { icon: Crosshair, label: t('circuitAdvantagePoints') },
              { icon: Check, label: t('circuitAdvantageTips') },
            ].map(({ icon: Icon, label }) => <span key={label} className="flex min-h-[58px] flex-col items-start justify-center gap-1.5 rounded-xl bg-white/75 px-2.5 py-2 text-[10px] font-semibold leading-tight text-ink/75 sm:min-h-[64px] sm:flex-row sm:items-center sm:gap-2 sm:px-3 sm:text-xs"><Icon size={17} className="text-forest" aria-hidden="true" />{label}</span>)}
          </div>
        </div>
        <div className="flex items-center gap-3 border-t border-forest/10 bg-forest/[0.06] px-5 py-3.5 text-xs font-semibold leading-snug text-forest sm:px-7 sm:text-sm"><ShieldCheck size={22} className="flex-none" aria-hidden="true" /><span>{t('circuitRefund')}</span></div>
      </article>

      <article className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-[0_8px_28px_rgba(31,26,20,0.06)]">
        <div className="bg-forest p-5 text-cream sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-yellow px-3.5 py-2 font-display text-xs text-ink sm:text-sm"><Sparkles size={16} fill="currentColor" aria-hidden="true" />{t('perceptionEyebrow')}</span>
            <span className="inline-flex items-center gap-2 rounded-full bg-ink/35 px-3 py-2 text-[11px] font-bold text-cream sm:text-xs"><CalendarDays size={16} aria-hidden="true" />{t('comingSoonCta')}</span>
          </div>
          <div className="mt-4 grid grid-cols-[1fr_92px] items-center gap-3 sm:mt-5 sm:grid-cols-[1fr_150px] sm:gap-5">
            <div><h3 className="font-display text-[27px] leading-[1.04] tracking-tight sm:text-4xl">{t('perceptionTitle')}</h3><p className="mt-2 text-sm text-cream/75 sm:text-base">{locale === 'fr' ? 'Entraîne-toi comme à l’examen' : 'Train zoals op het examen'}</p></div>
            <div aria-hidden="true" className="relative aspect-square overflow-hidden rounded-xl border border-white/15 bg-ink/35 p-2 sm:p-3">
              <div className="absolute inset-x-2 bottom-2 top-[43%] rounded-t-[50%] bg-ink/80 sm:inset-x-3 sm:bottom-3" />
              <div className="absolute inset-x-3 bottom-2 top-[54%] border-x border-dashed border-white/50 sm:inset-x-4 sm:bottom-3" />
              <div className="absolute left-1/2 top-[43%] size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow shadow-[0_0_0_5px_rgba(255,255,255,.15)] sm:size-2.5" />
              <div className="absolute left-1/2 top-1/2 flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cream text-forest shadow-md sm:size-10"><Play size={16} fill="currentColor" aria-hidden="true" /></div>
              <span className="absolute bottom-1.5 left-2 inline-flex items-center gap-1 text-[8px] font-medium text-cream/75 sm:bottom-2 sm:left-3 sm:text-[9px]"><Eye size={11} aria-hidden="true" />{t('perceptionVideoPreview')}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col p-5 sm:p-7">
          <ul className="grid gap-3 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-4">
            {[t('perceptionBullet1'), t('perceptionBullet2'), t('perceptionBullet3'), t('perceptionBullet4')].map((benefit) => <li key={benefit} className="flex items-start gap-3 text-sm leading-snug text-ink/80 sm:text-[14px]"><span className="mt-0.5 flex size-5 flex-none items-center justify-center rounded-full bg-forest text-cream"><Check size={13} strokeWidth={3} aria-hidden="true" /></span><span>{benefit}</span></li>)}
          </ul>
          <button type="button" disabled aria-disabled="true" className="mt-5 flex min-h-14 w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-ink/15 bg-ink/[0.06] px-4 py-3 font-display text-sm text-ink/55 sm:mt-6 sm:min-h-16 sm:text-base"><CalendarDays size={18} aria-hidden="true" />{t('comingSoonCta')}</button>
          <div className="mt-auto grid grid-cols-3 gap-2 pt-4 sm:gap-3 sm:pt-5">
            {[
              { icon: Play, label: t('perceptionMiniVideo') },
              { icon: TriangleAlert, label: t('perceptionMiniFamilies') },
              { icon: ChartNoAxesColumnIncreasing, label: t('perceptionMiniProgress') },
            ].map(({ icon: Icon, label }) => <span key={label} className="flex min-h-[58px] flex-col items-start justify-center gap-1.5 rounded-xl bg-creamdim/70 px-2.5 py-2 text-[10px] font-semibold leading-tight text-ink/70 sm:min-h-[64px] sm:flex-row sm:items-center sm:gap-2 sm:px-3 sm:text-xs"><Icon size={17} className="text-forest" aria-hidden="true" />{label}</span>)}
          </div>
        </div>
      </article>
    </div>
  )
}

function CircuitRouteVisual({ label, className = '' }: { label: string; className?: string }) {
  const id = useId().replace(/:/g, '')
  return (
    <div className={className} aria-hidden="true">
      <svg viewBox="0 0 720 320" preserveAspectRatio="xMidYMid slice" className="h-full w-full" fill="none">
        <defs>
          <linearGradient id={`${id}-sky`} x1="360" y1="0" x2="360" y2="250" gradientUnits="userSpaceOnUse"><stop stopColor="#b9dce6" /><stop offset="1" stopColor="#e8e5d7" /></linearGradient>
          <linearGradient id={`${id}-road`} x1="360" y1="146" x2="360" y2="320" gradientUnits="userSpaceOnUse"><stop stopColor="#777f7e" /><stop offset="1" stopColor="#333d3d" /></linearGradient>
          <linearGradient id={`${id}-window`} x1="360" y1="0" x2="360" y2="320" gradientUnits="userSpaceOnUse"><stop stopColor="#fff" stopOpacity="0" /><stop offset="1" stopColor="#1c201c" stopOpacity=".18" /></linearGradient>
        </defs>
        <rect width="720" height="320" fill={`url(#${id}-sky)`} />
        <circle cx="585" cy="58" r="39" fill="#f6df9c" opacity=".62" />
        <path d="M0 149 83 106l61 32 49-55 75 66 44-30 55 31v31H0v-32Z" fill="#6e8770" opacity=".8" />
        <path d="M0 169h720v41H0z" fill="#d3d0be" />
        <g fill="#d8c9b4" stroke="#8a8c81" strokeWidth="2">
          <path d="M31 91h85v79H31z"/><path d="M42 72h64v23H42z" fill="#bdc8c2"/><path d="M128 117h74v53h-74z" fill="#e1d7c4"/>
          <path d="M516 104h74v66h-74z" fill="#e7d9c7"/><path d="M600 78h87v92h-87z"/><path d="M614 61h58v19h-58z" fill="#aebfbd"/>
        </g>
        <g fill="#667b62"><circle cx="20" cy="139" r="29"/><circle cx="225" cy="143" r="27"/><circle cx="480" cy="144" r="24"/><circle cx="700" cy="145" r="34"/></g>
        <g fill="#eff0dc" opacity=".9"><rect x="47" y="106" width="11" height="13"/><rect x="72" y="106" width="11" height="13"/><rect x="47" y="132" width="11" height="13"/><rect x="72" y="132" width="11" height="13"/><rect x="617" y="99" width="12" height="14"/><rect x="646" y="99" width="12" height="14"/><rect x="617" y="127" width="12" height="14"/><rect x="646" y="127" width="12" height="14"/></g>
        <path d="M252 168h216l252 152H0l252-152Z" fill={`url(#${id}-road)`} />
        <path d="M348 178h24l36 142h-47l-13-142Z" fill="#f5f0df" opacity=".88" />
        <path d="m270 190-63 130h21l72-130h-30Zm180 0 64 130h-23l-70-130h29Z" fill="#e6e1d3" opacity=".78" />
        <path d="M358 204c-12-19-28-20-39-10-10 9-8 24 5 28l18 6c9 3 14 11 13 21l-4 30c-1 12 8 18 19 15s17-10 13-22l-9-25c-4-11 4-20 17-24l17-6c15-5 16-21 5-30-13-10-31-2-40 17" stroke="#1677ed" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m381 266 19-2-8 18-11-16Z" fill="#1677ed" />
        <ellipse cx="357" cy="190" rx="31" ry="9" fill="#17201f" opacity=".25" />
        <g transform="translate(322 151)"><path d="m6 18 11-13h34l12 13 5 25H1l5-25Z" fill="#d44832" stroke="#27241f" strokeWidth="3"/><path d="m20 9-7 11h34L37 9H20Z" fill="#dcecf0"/><circle cx="15" cy="43" r="6" fill="#202523"/><circle cx="54" cy="43" r="6" fill="#202523"/></g>
        <g transform="translate(422 136)"><path d="M20 0v39" stroke="#4d5149" strokeWidth="5"/><path d="m20 4 21 37H-1L20 4Z" fill="#fffdf7" stroke="#c63e2c" strokeWidth="6" strokeLinejoin="round"/></g>
        <g transform="translate(456 40)"><path d="M20 0c-15 0-26 11-26 25 0 19 26 45 26 45s26-26 26-45C46 11 35 0 20 0Z" fill="#1677ed" stroke="white" strokeWidth="4"/><circle cx="20" cy="25" r="8" fill="white"/><rect x="-127" y="-7" width="112" height="27" rx="13.5" fill="#fffdf7" stroke="#1e2724" strokeOpacity=".1"/><text x="-117" y="11" fill="#1e2724" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="700">{label}</text></g>
        <path d="M0 0h720v320H0z" fill={`url(#${id}-window)`} />
        <path d="M0 300c123-25 241-28 360-9 126 20 252 17 360-8v37H0v-20Z" fill="#1c2928" opacity=".76" />
      </svg>
    </div>
  )
}
