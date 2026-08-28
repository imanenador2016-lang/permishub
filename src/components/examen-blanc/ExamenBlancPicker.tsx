'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { createCheckoutSession } from '@/lib/payment'
import { formatPrice } from '@/domain/centers'
import { EXAMENS_ILLIMITES_OFFER } from '@/content/pricing-config'
import type { ExamenBlancSummary } from '@/lib/examens-blancs'

/**
 * Liste des examens blancs — 1 gratuit (lien direct), les suivants
 * réservés au pack "Examens illimités" : clic = achat direct (même
 * `createCheckoutSession` que partout ailleurs sur le site), pas de lien
 * vers l'examen tant qu'il n'est pas acheté. Verrou "à l'affichage"
 * uniquement — voir src/lib/examens-blancs.ts pour la réserve sur le
 * contrôle d'accès réel.
 */
export function ExamenBlancPicker({ exams }: { exams: ExamenBlancSummary[] }) {
  const t = useTranslations('examenBlanc')
  const to = useTranslations('offers')
  const locale = useLocale() as 'fr' | 'nl'
  const [message, setMessage] = useState<string | null>(null)

  async function unlock() {
    try {
      const { url } = await createCheckoutSession(EXAMENS_ILLIMITES_OFFER)
      window.location.href = url
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Une erreur est survenue.')
    }
  }

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
            <button
              key={exam.slug}
              onClick={unlock}
              className="panel flex flex-col gap-3 p-5 text-left shadow-hard-xs transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-sm"
            >
              <span className="w-fit -rotate-2 border-[3px] border-ink bg-cream px-2.5 py-1 font-display text-[10px] text-ink/70">
                🔒 {to('examensTitle')}
              </span>
              <p className="font-display text-xl leading-tight">{exam.title}</p>
              <p className="flex-1 text-sm text-ink/70">{t('pickerQuestionCount', { count: exam.questionCount })}</p>
              <span className="btn-comic block px-4 py-3 text-center text-sm">
                {to('cta')} — {formatPrice(EXAMENS_ILLIMITES_OFFER.priceCents, locale)} →
              </span>
            </button>
          ),
        )}
      </div>
      {message && <p className="mt-3 text-center text-xs text-ink/60">{message}</p>}
    </div>
  )
}
