'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import type { Question } from '@/domain/quiz'
import { Button } from '@/components/ui/Button'
import { TestDeNiveau } from '@/components/test-de-niveau/TestDeNiveau'
import { StatCounter } from './StatCounter'
import { HeroProof } from './HeroProof'

const AVATAR_INITIALS = [
  { letter: 'L', bg: '#C1432E' },
  { letter: 'A', bg: '#2B5E44' },
  { letter: 'M', bg: '#1F1A14' },
]

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
        <div className="grid gap-4 md:grid-cols-[1.15fr_0.85fr] md:items-stretch">
          {/* Panneau de contenu */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="panel flex flex-col justify-center p-6 sm:p-8"
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
            <p className="mb-1 mt-2.5 text-xs font-medium text-ink/65">{t('microcopy')}</p>
            <p className="mb-5 text-[11px] italic text-ink/50">{t('delayNote')}</p>

            <div className="flex items-center gap-3">
              <div className="flex">
                {AVATAR_INITIALS.map((a, i) => (
                  <span
                    key={a.letter}
                    style={{ background: a.bg, marginLeft: i === 0 ? 0 : -10 }}
                    className="flex h-8 w-8 items-center justify-center rounded-full border-[3px] border-cream text-[11px] font-extrabold text-cream outline outline-2 outline-ink"
                  >
                    {a.letter}
                  </span>
                ))}
              </div>
              <div className="text-[13px] font-semibold leading-tight">
                <div className="tracking-widest text-yellow-600" style={{ color: '#C79200' }}>
                  ★★★★★
                </div>
                <div>
                  <StatCounter to={1284} /> {t('socialProofLabel')}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Preuve sociale : vraies photos de candidats, à la place de
              l'illustration retirée — mise en avant des avis dès le hero. */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <HeroProof />
          </motion.div>
        </div>
      </div>

      {open && <TestDeNiveau questions={questions} themeLabels={themeLabels} onClose={() => setOpen(false)} />}
    </section>
  )
}
