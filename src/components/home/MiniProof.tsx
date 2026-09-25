'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { TESTIMONIALS } from './TestimonialsSection'

const PROOF_ROTATE_MS = 4200

/**
 * Preuve sociale compacte — vraies photos/avis (même source que
 * TestimonialsSection, jamais des avatars ou un chiffre inventés) plutôt
 * qu'un chiffre non vérifié. Extrait de Hero.tsx (2026-09-13) pour être
 * réutilisé aussi dans QualificationQuiz.tsx (écran "éligible") : lever le
 * dernier doute au moment exact de la décision d'achat, où qu'elle ait lieu.
 * Citation qui tourne, photos fixes. Coupé sous prefers-reduced-motion (la
 * 1ère citation reste affichée, statique).
 */
export function MiniProof() {
  const t = useTranslations('testimonials')
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return
    const id = setInterval(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), PROOF_ROTATE_MS)
    return () => clearInterval(id)
  }, [])

  const current = TESTIMONIALS[index]

  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-none -space-x-2.5" aria-hidden>
        {TESTIMONIALS.slice(0, 3).map((item) => (
          <div key={item.key} className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-cream ring-2 ring-ink">
            <Image src={item.photo} alt="" fill className="object-cover" sizes="36px" />
          </div>
        ))}
      </div>
      <div className="min-w-0">
        <p className="text-[11px] leading-none tracking-widest" style={{ color: '#C79200' }}>
          ★★★★★
        </p>
        <AnimatePresence mode="wait">
          <motion.p
            key={current.key}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="mt-0.5 truncate text-xs font-semibold text-ink/80"
          >
            “{t(`${current.key}.quote`)}”
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  )
}
