import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { Container } from '@/components/ui/Container'

/** Les 6 vrais avis clients du site (voir messages/{fr,nl}.json `testimonials.reussite1..6`) — source unique réutilisée aussi par HeroProofMarquee.tsx. */
export const TESTIMONIALS = [
  { key: 'reussite1', photo: '/testimonials/reussite-3-floute.webp' },
  { key: 'reussite2', photo: '/testimonials/reussite-2-floute.webp' },
  { key: 'reussite3', photo: '/testimonials/reussite-1-floute.jpg' },
  { key: 'reussite4', photo: '/testimonials/avis-1-floute.jpg' },
  { key: 'reussite5', photo: '/testimonials/avis-2-floute.jpg' },
  { key: 'reussite6', photo: '/testimonials/avis-3-floute.jpg' },
] as const

/**
 * Avis clients — vraies photos de candidats (fournies par le client),
 * jamais des avatars génériques. Reveal au scroll, décalé par carte
 * (discret — voir docs/DESIGN_SYSTEM.md, mouvements francs et rapides).
 */
export async function TestimonialsSection() {
  const t = await getTranslations('testimonials')

  return (
    <Container className="pb-16">
      <h2
        className="mb-8 text-center font-display text-2xl tracking-tight text-ink sm:text-3xl"
      >
        {t('title')}
      </h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {TESTIMONIALS.map((item) => (
          <div
            key={item.key}
            className="panel !shadow-hard-xs overflow-hidden !p-0 transition-transform duration-200 hover:-translate-y-0.5"
          >
            <div className="relative h-48 w-full border-b-[3px] border-ink">
              <Image src={item.photo} alt={t(`${item.key}.label`)} fill className="object-cover" sizes="(max-width: 640px) 100vw, 33vw" />
              <span className="absolute right-2 top-2 border-2 border-ink bg-forest px-2 py-0.5 font-display text-[10px] text-cream">
                {t('badge')}
              </span>
            </div>
            <div className="flex flex-col p-4 sm:p-5">
              <div className="mb-2.5 tracking-widest" style={{ color: '#C79200' }}>
                ★★★★★
              </div>
              <p className="mb-3 flex-1 text-sm font-medium leading-relaxed text-ink">“{t(`${item.key}.quote`)}”</p>
              <p className="text-xs font-bold text-ink/70">{t(`${item.key}.label`)}</p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  )
}
