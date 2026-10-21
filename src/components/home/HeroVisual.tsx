import Image from 'next/image'
import type { CSSProperties } from 'react'
import { BookOpen, ScanEye, MapPin, MessageCircle, Check, type LucideIcon } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { HERO_CANDIDATE, heroCopy } from '@/content/hero'

export const HERO_SERVICE_ICONS: Record<string, LucideIcon> = {
  theory: BookOpen, perception: ScanEye, circuits: MapPin, coaching: MessageCircle,
}

/** Decorative road, not a map or a promised examination route. */
function HeroRoad() {
  const route = 'M-90 665 C70 550 215 640 169 493 C148 423 49 379 92 293 C153 169 344 144 537 16'
  return (
    <svg className="hero-road" viewBox="0 0 600 700" fill="none" aria-hidden="true">
      <path d={route} stroke="var(--hero-forest)" strokeOpacity=".07" strokeWidth="98" />
      <path d={route} stroke="var(--hero-paper)" strokeWidth="79" />
      <path d={route} stroke="var(--hero-forest)" strokeWidth="63" strokeOpacity=".67" />
      <path className="hero-road-reveal" d={route} pathLength="1" stroke="var(--hero-forest)" strokeWidth="63" />
      <path className="hero-road-dashes" d={route} stroke="var(--hero-cream)" strokeWidth="3" strokeDasharray="12 15" />
      <g className="hero-road-pin">
        <circle cx="92" cy="293" r="25" fill="var(--hero-paper)" />
        <path d="M92 274c-9 0-15 6-15 15 0 11 15 23 15 23s15-12 15-23c0-9-6-15-15-15Z" fill="var(--hero-orange)" />
        <circle cx="92" cy="289" r="5" fill="var(--hero-paper)" />
      </g>
    </svg>
  )
}

export function HeroVisual() {
  const copy = heroCopy(useLocale())
  const reviews = useTranslations('testimonials')
  return (
    <div className="hero-scene">
      <div className="hero-scene-halo" aria-hidden="true" />
      <HeroRoad />
      <figure className="hero-candidate">
        <Image src={HERO_CANDIDATE.src} alt={copy.photoAlt} fill priority
          sizes="(min-width: 1200px) 420px, (min-width: 900px) 360px, (min-width: 640px) 400px, 75vw"
          className="hero-candidate-image" style={{ objectPosition: HERO_CANDIDATE.objectPosition }} />
        <figcaption><Check size={16} aria-hidden="true" /><span>{reviews(`${HERO_CANDIDATE.testimonialKey}.quote`)}</span></figcaption>
      </figure>
      <p className="hero-handwritten" aria-hidden="true">{copy.photoNote}<svg viewBox="0 0 140 18" fill="none"><path d="M3 13C40 2 93 1 136 7M90 14l46-7-13-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></p>
      <div className="hero-floating-services" aria-label={copy.journeyLabel}>
        {copy.services.map((service, index) => {
          const Icon = HERO_SERVICE_ICONS[service.id]
          return <div key={service.id} className={`hero-float-slot hero-float-${service.id}`} style={{ '--card-order': index } as CSSProperties}>
            <Link href={service.href} className="hero-service-card">
              <span className="hero-service-icon"><Icon size={25} strokeWidth={2.1} aria-hidden="true" /></span>
              <span><strong>{service.title}</strong><span>{service.short}</span></span>
            </Link>
          </div>
        })}
      </div>
    </div>
  )
}

export function HeroJourney() {
  const copy = heroCopy(useLocale())
  return <nav id="parcours" className="hero-journey" aria-label={copy.journeyLabel}>
    <p className="hero-journey-label">{copy.journeyLabel}</p>
    <ol>{copy.services.map(service => {
      const Icon = HERO_SERVICE_ICONS[service.id]
      return <li key={service.id}><Link href={service.href}>
        <span className="journey-step-icon"><Icon size={26} aria-hidden="true" /></span>
        <strong>{service.title}</strong><span>{service.detail}</span>
      </Link></li>
    })}</ol>
  </nav>
}
