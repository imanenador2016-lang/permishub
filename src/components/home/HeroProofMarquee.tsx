import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { TESTIMONIALS } from './TestimonialsSection'

/**
 * Remplit l'espace resté vide sous le panneau "Ils ont réussi" (HeroProof)
 * dans la colonne droite du hero — voir Hero.tsx. Bande d'avis qui défile
 * horizontalement en continu (piste dupliquée 2x + keyframe `marquee` de
 * tailwind.config.ts, translateX(-50%) = boucle invisible), pause au survol
 * desktop (`hover:[animation-play-state:paused]`), scrollable au doigt sur
 * mobile (overflow-x natif, l'animation continue en fond sans gêner le
 * swipe), et statique-mais-scrollable si `prefers-reduced-motion`
 * (`motion-reduce:animate-none`). Réutilise les vrais avis déjà présents
 * ailleurs sur le site (TestimonialsSection.tsx) — jamais de témoignage
 * inventé. N'affiche QUE ceux pas déjà montrés juste au-dessus dans
 * HeroProof (reussite1-3) : sinon les mêmes avis se répètent à l'identique
 * juste en dessous, ce qui a l'air d'un bug plutôt que d'une preuve
 * sociale (voir conversation du 2026-08-30).
 */
const HERO_PROOF_KEYS: string[] = ['reussite1', 'reussite2', 'reussite3']

export function HeroProofMarquee() {
  const t = useTranslations('testimonials')
  const marqueeTestimonials = TESTIMONIALS.filter((item) => !HERO_PROOF_KEYS.includes(item.key))
  const items = [...marqueeTestimonials, ...marqueeTestimonials]

  return (
    <div className="mt-3 min-w-0">
      <p className="mb-2 px-1 font-hand text-base text-forest">{t('marqueeHook')}</p>

      <div className="overflow-x-auto [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex w-max animate-marquee gap-2.5 hover:[animation-play-state:paused] motion-reduce:animate-none">
          {items.map((item, i) => (
            <div
              key={`${item.key}-${i}`}
              className="flex w-[210px] flex-none items-start gap-2 border-[3px] border-ink bg-cream p-2.5 shadow-hard-xs"
            >
              <div className="relative h-10 w-10 flex-none overflow-hidden border-2 border-ink">
                <Image src={item.photo} alt={t(`${item.key}.label`)} fill className="object-cover" sizes="40px" />
              </div>
              <div className="min-w-0">
                <p className="tracking-widest" style={{ color: '#C79200', fontSize: '9px' }}>
                  ★★★★★
                </p>
                <p className="line-clamp-2 text-[11px] font-medium leading-snug text-ink">{t(`${item.key}.quote`)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
