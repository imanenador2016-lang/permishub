'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { ExamOfferModal } from './ExamOfferModal'
import type { ExamenBlancSummary } from '@/lib/examens-blancs'

/**
 * Liste des examens blancs — tous réservés au pack "Examens illimités"
 * (voir conversation du 2026-08-30 : plus aucun examen gratuit). Clic
 * ouvre l'offre (ExamOfferModal, même stratégie de conversion que
 * CircuitOfferModal pour les circuits) plutôt qu'un achat instantané — le
 * prix n'apparaît que dans le modal, jamais répété sur chaque carte.
 * Verrou "à l'affichage" ici + "à l'entrée" sur la page de l'examen
 * (ExamAccessGate.tsx) — voir src/lib/examens-blancs.ts pour la réserve
 * sur le contrôle d'accès réel. La branche `exam.free` est gardée pour
 * pouvoir réintroduire un teaser gratuit facilement plus tard.
 *
 * La carte verrouillée est un vrai `<Link href>` (pas un `<button>`) avec
 * `preventDefault` — comportement clic strictement identique pour
 * l'utilisateur (ouvre toujours le modal, ne navigue jamais), mais l'URL
 * de l'examen redevient crawlable/trouvable par un moteur de recherche —
 * avant l'audit SEO du 2026-09-01, aucun lien réel ne pointait vers ces 7
 * pages, qui dépendaient uniquement du sitemap pour être découvertes.
 */
export function ExamenBlancPicker({ exams }: { exams: ExamenBlancSummary[] }) {
  const t = useTranslations('examenBlanc')
  const to = useTranslations('offers')
  const locale = useLocale() as 'fr' | 'nl'
  const [offerOpen, setOfferOpen] = useState(false)

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-3">
        {exams.map((exam) =>
          exam.free ? (
            <Link
              key={exam.slug}
              href={`/examen-blanc/${exam.slug}`}
              className="panel flex flex-col gap-3 p-5 shadow-hard-xs transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-sm"
            >
              <span className="w-fit -rotate-2 border-[3px] border-ink bg-forest px-2.5 py-1 font-display text-[10px] text-cream">
                {t('badge')}
              </span>
              <p className="font-display text-xl leading-tight">{exam.title}</p>
              <p className="flex-1 text-sm text-ink/70">{t('pickerQuestionCount', { count: exam.questionCount })}</p>
              <span className="btn-comic block px-4 py-3 text-center text-sm">{t('pickerPlay')} →</span>
            </Link>
          ) : (
            <Link
              key={exam.slug}
              href={`/examen-blanc/${exam.slug}`}
              onClick={(e) => {
                e.preventDefault()
                setOfferOpen(true)
              }}
              className="panel flex flex-col gap-3 p-5 text-left shadow-hard-xs transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-sm"
            >
              <span className="w-fit -rotate-2 border-[3px] border-ink bg-cream px-2.5 py-1 font-display text-[10px] text-ink/70">
                🔒 {to('examensTitle')}
              </span>
              <p className="font-display text-xl leading-tight">{exam.title}</p>
              <p className="flex-1 text-sm text-ink/70">{t('pickerQuestionCount', { count: exam.questionCount })}</p>
              <span className="btn-comic block px-4 py-3 text-center text-sm">{to('cta')} →</span>
            </Link>
          ),
        )}
      </div>
      {offerOpen && <ExamOfferModal locale={locale} onClose={() => setOfferOpen(false)} />}
    </div>
  )
}
