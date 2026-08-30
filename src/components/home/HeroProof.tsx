import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

// 5 avis (au lieu de 3) pour occuper toute la hauteur du panneau, à la
// même hauteur que le bloc de gauche — plus d'espace vide en dessous sans
// ajouter de bloc séparé (voir conversation du 2026-08-30 : la bande
// défilante en dessous du panneau n'était pas le bon format, remplacée par
// une extension directe de cette liste, même style de ligne).
const PROOFS = [
  { key: 'reussite1', photo: '/testimonials/reussite-3.webp' },
  { key: 'reussite2', photo: '/testimonials/reussite-2.webp' },
  { key: 'reussite3', photo: '/testimonials/reussite-1.jpg' },
  { key: 'reussite4', photo: '/testimonials/avis-1.jpg' },
  { key: 'reussite5', photo: '/testimonials/avis-2.jpg' },
] as const

/**
 * Vraies photos de candidats — à la place de l'illustration du hero
 * (retirée à la demande du client). Met la preuve sociale directement au
 * même niveau que le CTA principal, pas seulement en bas de page. Chaque
 * ligne apparaît en cascade (léger décalage par ligne) plutôt que d'un
 * bloc, pour une entrée plus vivante sans animation continue qui
 * distrairait du CTA principal à côté.
 */
export function HeroProof() {
  const t = useTranslations('testimonials')

  return (
    <div className="panel flex flex-col gap-3 !p-4 sm:!p-5">
      <span className="w-fit -rotate-2 border-[3px] border-ink bg-yellow px-3 py-1.5 font-display text-xs">
        {t('heroEyebrow')}
      </span>
      {PROOFS.map((item, i) => (
        <motion.div
          key={item.key}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, delay: 0.15 + i * 0.08 }}
          className="flex items-center gap-3 border-2 border-ink bg-cream p-2"
        >
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
        </motion.div>
      ))}
    </div>
  )
}
