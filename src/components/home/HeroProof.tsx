import Image from 'next/image'
import { useTranslations } from 'next-intl'

const PROOFS = [
  { key: 'reussite1', photo: '/testimonials/reussite-3.webp' },
  { key: 'reussite2', photo: '/testimonials/reussite-2.webp' },
  { key: 'reussite3', photo: '/testimonials/reussite-1.jpg' },
] as const

/**
 * Vraies photos de candidats — à la place de l'illustration du hero
 * (retirée à la demande du client). Met la preuve sociale directement au
 * même niveau que le CTA principal, pas seulement en bas de page.
 */
export function HeroProof() {
  const t = useTranslations('testimonials')

  return (
    <div className="panel flex flex-col gap-3 !p-4 sm:!p-5">
      <span className="w-fit -rotate-2 border-[3px] border-ink bg-yellow px-3 py-1.5 font-display text-xs">
        {t('heroEyebrow')}
      </span>
      {PROOFS.map((item, i) => (
        <div key={item.key} className="flex items-center gap-3 border-2 border-ink bg-cream p-2">
          <div className="relative h-14 w-14 flex-none overflow-hidden border-2 border-ink">
            {/* priority uniquement sur la 1ère — au-dessus de la ligne de
                flottaison, jamais de lazy loading dessus (voir audit SEO). */}
            <Image src={item.photo} alt={t(`${item.key}.label`)} fill priority={i === 0} className="object-cover" sizes="56px" />
          </div>
          <div className="min-w-0">
            <p className="mb-0.5 tracking-widest" style={{ color: '#C79200', fontSize: '10px' }}>
              ★★★★★
            </p>
            <p className="truncate text-xs font-semibold text-ink">{t(`${item.key}.quote`)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
