'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'

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

export function HeroProof() {
  const t = useTranslations('testimonials')
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return
    const id = setInterval(() => setOffset((current) => (current + 1) % ALL_PROOFS.length), ROTATE_MS)
    return () => clearInterval(id)
  }, [])

  const visible = Array.from(
    { length: VISIBLE_COUNT },
    (_, index) => ALL_PROOFS[(offset + index) % ALL_PROOFS.length],
  )

  return (
    <div className="panel flex flex-col gap-3 overflow-hidden !p-4 sm:!p-5">
      <span className="w-fit -rotate-2 border-[3px] border-ink bg-yellow px-3 py-1.5 font-display text-xs">
        {t('heroEyebrow')}
      </span>
      <AnimatePresence mode="popLayout" initial={false}>
        {visible.map((item, index) => (
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
              <Image
                src={item.photo}
                alt={t(`${item.key}.label`)}
                width={56}
                height={56}
                priority={index === 0}
                className="block h-14 w-14 object-cover"
                sizes="56px"
              />
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
