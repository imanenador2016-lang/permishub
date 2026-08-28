import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { EXAMENS_BLANCS } from '@/lib/examens-blancs'

/**
 * Teaser home pour la série d'examens blancs "photo" (voir /examen-blanc)
 * — un gratuit, le reste réservé au pack "Examens illimités" (Nos packs,
 * section #packs ; voir aussi le hook d'offre sur l'écran de résultat de
 * chaque examen). Copie déjà prévue dans messages/{fr,nl}.json
 * (`home.sectionExamTitle` / `sectionExamBody`), restée inutilisée tant
 * que le contenu n'existait pas. Passé en série multi-examens le
 * 2026-08-26 (voir conversation — examens 2 et 3 ajoutés).
 */
export async function ExamenBlancTeaser() {
  const t = await getTranslations('home')
  const freeExam = EXAMENS_BLANCS.find((e) => e.free) ?? EXAMENS_BLANCS[0]

  return (
    <div className="panel flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
      <div>
        <span className="mb-3 inline-block w-fit -rotate-2 border-[3px] border-ink bg-forest px-3 py-1.5 font-display text-xs text-cream">
          {t('sectionExamBadge')}
        </span>
        <h2 className="mb-2 font-display text-xl tracking-tight text-ink sm:text-2xl">{t('sectionExamTitle')}</h2>
        <p className="max-w-xl text-sm text-ink/70 sm:text-base">
          {t('sectionExamBody', { count: freeExam.questions.length })}
        </p>
      </div>
      <Link href="/examen-blanc" className="btn-comic flex-none px-6 py-3.5 text-sm sm:text-base">
        {t('sectionExamCta')} →
      </Link>
    </div>
  )
}
