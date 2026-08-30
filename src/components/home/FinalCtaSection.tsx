'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import type { Question } from '@/domain/quiz'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { TestDeNiveau } from '@/components/test-de-niveau/TestDeNiveau'

/**
 * Bandeau CTA final, juste après la FAQ (voir conversation du 2026-08-31) —
 * remplace l'ancienne section témoignages. Ouvre le même test de niveau que
 * le CTA principal du hero (Hero.tsx) : il n'y a plus d'"examen blanc
 * gratuit" à proposer depuis le 2026-08-30 (tous payants), donc c'est la
 * vraie destination gratuite équivalente la plus proche du site.
 */
export function FinalCtaSection({
  questions,
  themeLabels,
}: {
  questions: Question[]
  themeLabels: { slug: string; label: string }[]
}) {
  const t = useTranslations('finalCta')
  const [open, setOpen] = useState(false)

  return (
    <Container className="pb-16">
      <div className="panel flex flex-col items-center gap-4 bg-forest p-6 text-center text-cream sm:p-10">
        <h2 className="font-display text-2xl tracking-tight sm:text-3xl">{t('title')}</h2>
        <p className="text-sm text-cream/80 sm:text-base">{t('subtitle')}</p>
        <Button size="lg" onClick={() => setOpen(true)}>
          {t('cta')} →
        </Button>
      </div>

      {open && <TestDeNiveau questions={questions} themeLabels={themeLabels} onClose={() => setOpen(false)} />}
    </Container>
  )
}
