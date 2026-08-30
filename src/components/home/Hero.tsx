'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import type { Question } from '@/domain/quiz'
import { Button } from '@/components/ui/Button'
import { TestDeNiveau } from '@/components/test-de-niveau/TestDeNiveau'
import { HeroProof } from './HeroProof'

export function Hero({
  questions,
  themeLabels,
}: {
  questions: Question[]
  themeLabels: { slug: string; label: string }[]
}) {
  const t = useTranslations('home')
  const [open, setOpen] = useState(false)

  return (
    <section className="px-4 pt-4 sm:px-6 sm:pt-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[1.15fr_0.85fr] md:items-stretch">
          {/* Panneau de contenu — grid-cols-1 explicite nécessaire en dessous
              de md : sans colonnes définies, la piste implicite grandit selon
              le contenu (titre non wrappé) au lieu de rester bornée à la
              largeur de l'écran, ce qui faisait déborder le titre à
              l'horizontale sur mobile au lieu de passer à la ligne — voir
              conversation du 2026-08-28 (titre coupé, besoin de défiler). */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="panel flex min-w-0 flex-col justify-center p-6 sm:p-8"
          >
            <span className="mb-4 inline-block w-fit -rotate-2 border-[3px] border-ink bg-yellow px-3.5 py-1.5 font-display text-xs sm:text-sm">
              {t('heroEyebrow')}
            </span>

            <h1 className="mb-3.5 font-display text-[34px] leading-[1.08] tracking-tight sm:text-[42px]">
              {t('heroTitleLine')} <span className="text-brick">{t('heroTitleAccent')}</span>
            </h1>

            <p className="mb-5 max-w-md text-[15px] leading-relaxed text-ink sm:text-base">{t('heroLead')}</p>

            <ul className="mb-6 flex flex-col gap-2.5">
              {[t('benefit1'), t('benefit2'), t('benefit3')].map((benefit) => (
                <li key={benefit} className="flex items-center gap-2.5 text-sm font-semibold sm:text-[14.5px]">
                  <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full border-[3px] border-ink bg-forest text-xs font-extrabold text-cream">
                    ✓
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>

            <div>
              <Button size="lg" onClick={() => setOpen(true)}>
                {t('ctaPrimary')} →
              </Button>
            </div>
          </motion.div>

          {/* Preuve sociale : vraies photos de candidats, à la place de
              l'illustration retirée — mise en avant des avis dès le hero. */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="min-w-0"
          >
            <HeroProof />
          </motion.div>
        </div>
      </div>

      {open && <TestDeNiveau questions={questions} themeLabels={themeLabels} onClose={() => setOpen(false)} />}
    </section>
  )
}
