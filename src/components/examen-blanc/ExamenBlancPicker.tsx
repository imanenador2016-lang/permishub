'use client'

import { useEffect, useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { ExamOfferModal } from './ExamOfferModal'
import { EXAMENS_UNLOCKED_KEY } from './ExamAccessGate'
import type { ExamenBlancSummary } from '@/lib/examens-blancs'

/**
 * Liste des examens blancs — tous réservés au pack "Examens illimités"
 * (voir conversation du 2026-08-30 : plus aucun examen gratuit). Clic
 * ouvre l'offre (ExamOfferModal, même stratégie de conversion que
 * CircuitOfferModal pour les circuits) plutôt qu'un achat instantané — le
 * prix n'apparaît que dans le modal, jamais répété sur chaque carte.
 * Verrou "à l'affichage" ici + "à l'entrée" sur la page de l'examen
 * (ExamAccessGate.tsx) — voir src/lib/examens-blancs.ts pour la réserve
 * sur le contrôle d'accès réel.
 *
 * Avant achat (voir conversation du 2026-09-02) : la grille numérotée
 * (Examen 1, 2, 3...) n'est PLUS affichée telle quelle — elle révèle le
 * nombre exact d'examens, ce qui peut donner l'impression d'une offre
 * limitée et freiner l'achat. À la place, un seul panneau "Examens
 * illimités" (même contenu que ExamOfferModal, sans jamais citer de
 * nombre). La grille réelle (avec le vrai décompte) ne redevient visible
 * qu'une fois le pack débloqué — le client doit alors pouvoir choisir
 * lequel jouer, ce n'est plus un enjeu de conversion à ce stade.
 */
export function ExamenBlancPicker({ exams }: { exams: ExamenBlancSummary[] }) {
  const t = useTranslations('examenBlanc')
  const tu = useTranslations('examOffer')
  const tc = useTranslations('common')
  const locale = useLocale() as 'fr' | 'nl'
  const [offerOpen, setOfferOpen] = useState(false)
  const [unlocked, setUnlocked] = useState(false)

  useEffect(() => {
    try {
      if (localStorage.getItem(EXAMENS_UNLOCKED_KEY) === '1') setUnlocked(true)
    } catch {
      // localStorage indisponible — reste sur le panneau "illimité", jamais bloquant.
    }
  }, [])

  if (!unlocked) {
    return (
      <>
        {/* Liens réels vers chaque examen, visuellement masqués (sr-only,
            PAS aria-hidden) — le nombre exact n'est plus montré à l'œil
            pour ne pas donner l'impression d'une offre limitée (voir
            conversation du 2026-09-02), mais ces pages restent
            crawlables/accessibles au clavier, comme corrigé lors de
            l'audit SEO du 2026-09-01. */}
        <nav className="sr-only">
          {exams.map((exam) => (
            <Link key={exam.slug} href={`/examen-blanc/${exam.slug}`}>
              {exam.title}
            </Link>
          ))}
        </nav>
        <div className="panel mx-auto flex max-w-md flex-col items-center gap-3 p-6 text-center sm:p-8">
          <span className="w-fit -rotate-2 border-[3px] border-ink bg-yellow px-3 py-1.5 font-display text-xs">
            {tu('eyebrow')}
          </span>
          <p className="font-display text-2xl leading-tight sm:text-3xl">{tu('title')}</p>
          <p className="text-sm text-ink/70">{tu('subtitle')}</p>
          <ul className="mb-1 flex flex-col gap-1.5 self-stretch">
            {[tu('bullet1'), tu('bullet2'), tu('bullet3')].map((b) => (
              <li key={b} className="flex items-start gap-1.5 text-sm font-medium text-ink/80">
                <span className="mt-0.5 flex h-4 w-4 flex-none items-center justify-center rounded-full border-2 border-ink bg-forest text-[9px] font-extrabold text-cream">
                  ✓
                </span>
                {b}
              </li>
            ))}
          </ul>
          <button onClick={() => setOfferOpen(true)} className="btn-comic w-full px-5 py-3.5 text-base">
            {tu('cta')} →
          </button>
          <p className="text-[11px] font-semibold text-ink/50">{tu('trustLine')}</p>
          <Link href="/restaurer-acces" className="text-[11px] font-semibold text-ink/50 hover:text-brick">
            {tc('restoreAccessLink')}
          </Link>
        </div>
        {offerOpen && <ExamOfferModal locale={locale} onClose={() => setOfferOpen(false)} />}
      </>
    )
  }

  // Pack débloqué (vérifié en localStorage ci-dessus) : tous les examens
  // sont jouables, `exam.free` n'a plus d'importance ici — plus de branche
  // verrouillée/modal à ce stade.
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-3">
        {exams.map((exam) => (
          <Link
            key={exam.slug}
            href={`/examen-blanc/${exam.slug}`}
            className="panel flex flex-col gap-3 p-5 shadow-hard-xs transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-sm"
          >
            <span className="w-fit -rotate-2 border-[3px] border-ink bg-forest px-2.5 py-1 font-display text-[10px] text-cream">
              {t('unlockedBadge')}
            </span>
            <p className="font-display text-xl leading-tight">{exam.title}</p>
            <p className="flex-1 text-sm text-ink/70">{t('pickerQuestionCount', { count: exam.questionCount })}</p>
            <span className="btn-comic block px-4 py-3 text-center text-sm">{t('pickerPlay')} →</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
