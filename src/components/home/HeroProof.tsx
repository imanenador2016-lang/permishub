'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'

// Les 6 vrais avis du site (voir TestimonialsSection.tsx pour la version
// complète plus bas sur la page) — ici, une fenêtre glissante de 5 lignes
// visibles qui tourne en continu (voir ROTATE_MS) : à chaque tour, la plus
// ancienne ligne sort et la suivante entre, une seule à la fois. Boucle
// désactivée si `prefers-reduced-motion` — les 5 premières restent alors
// affichées, statiques (voir conversation du 2026-08-30).
const ALL_PROOFS = [
  { key: 'reussite1', photo: '/testimonials/reussite-3.webp' },
  { key: 'reussite2', photo: '/testimonials/reussite-2.webp' },
  { key: 'reussite3', photo: '/testimonials/reussite-1.jpg' },
  { key: 'reussite4', photo: '/testimonials/avis-1.jpg' },
  { key: 'reussite5', photo: '/testimonials/avis-2.jpg' },
  { key: 'reussite6', photo: '/testimonials/avis-3.jpg' },
] as const

const VISIBLE_COUNT = 5
const ROTATE_MS = 4200

/**
 * Vraies photos de candidats — à la place de l'illustration du hero
 * (retirée à la demande du client). Met la preuve sociale directement au
 * même niveau que le CTA principal, pas seulement en bas de page.
 */
export function HeroProof() {
  const t = useTranslations('testimonials')
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return
    const id = setInterval(() => setOffset((o) => (o + 1) % ALL_PROOFS.length), ROTATE_MS)
    return () => clearInterval(id)
  }, [])

  const visible = Array.from({ length: VISIBLE_COUNT }, (_, i) => ALL_PROOFS[(offset + i) % ALL_PROOFS.length])

  return (
    <div className="panel flex flex-col gap-3 overflow-hidden !p-4 sm:!p-5">
      <span className="w-fit -rotate-2 border-[3px] border-ink bg-yellow px-3 py-1.5 font-display text-xs">
        {t('heroEyebrow')}
      </span>
      <AnimatePresence mode="popLayout" initial={false}>
        {visible.map((item, i) => (
          <motion.div
            key={item.key}
            layout
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
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
      </AnimatePresence>
    </div>
  )
}
