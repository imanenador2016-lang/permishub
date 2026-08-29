import { getTranslations } from 'next-intl/server'
import type { ExamCenter } from '@/domain/centers'
import { DEFAULT_EXAMINER_STRICTNESS, getStrictnessLevel } from '@/domain/centers'
import type { AppLocale } from '@/i18n/request'

/**
 * Bloc d'infos sur le centre d'examen lui-même (résumé, exigence des
 * examinateurs, pièges, compétences à maîtriser), affiché en tête de
 * circuits/[centerSlug]/page.tsx au-dessus de la grille des circuits.
 *
 * Toutes les données viennent d'`ExamCenter` (content/centers/registry.ts) —
 * un seul objet par centre, rien de dupliqué ici. Les champs sont optionnels
 * et jamais complétés avec du contenu inventé : résumé absent → placeholder
 * visible ; pièges/tags absents ou vides → section masquée ; exigence
 * absente → valeur neutre par défaut (voir DEFAULT_EXAMINER_STRICTNESS).
 */
export async function CenterInfoBlock({ center, locale }: { center: ExamCenter; locale: AppLocale }) {
  const t = await getTranslations('circuits')

  const summary = center.summary?.[locale] ?? t('summaryPlaceholder')
  const strictnessValue = center.examinerStrictness ?? DEFAULT_EXAMINER_STRICTNESS
  const strictnessPct = Math.min(100, Math.max(0, strictnessValue))
  const strictnessLevel = getStrictnessLevel(strictnessPct)
  // Le label suit le curseur mais reste lisible même en bord de barre.
  const labelPct = Math.min(92, Math.max(8, strictnessPct))
  const pitfalls = center.pitfalls ?? []
  const masteryTags = center.masteryTags ?? []

  return (
    <div className="panel mb-8 flex flex-col gap-6 p-5 sm:p-6">
      <p className="line-clamp-2 text-sm font-medium text-ink/80 sm:text-base">{summary}</p>

      <div>
        <p className="mb-4 font-display text-xs uppercase tracking-wide text-ink/60 sm:text-sm">{t('strictnessTitle')}</p>
        <div className="relative pt-7">
          <div
            className="absolute top-0 -translate-x-1/2 whitespace-nowrap border-2 border-ink bg-cream px-2 py-0.5 font-display text-[10px] sm:text-[11px]"
            style={{ left: `${labelPct}%` }}
          >
            {t(`strictness.${strictnessLevel}`)}
          </div>
          <div
            className="h-3 border-2 border-ink sm:h-3.5"
            style={{ background: 'linear-gradient(to right, #2B5E44, #AFCFDA, #C1432E)' }}
          >
            <div
              aria-hidden
              className="relative h-full w-[3px] -translate-x-1/2 bg-ink sm:w-1"
              style={{ left: `${strictnessPct}%` }}
            />
          </div>
        </div>
      </div>

      {pitfalls.length > 0 && (
        <div>
          <p className="mb-2.5 font-display text-xs uppercase tracking-wide text-ink/60 sm:text-sm">{t('pitfallsTitle')}</p>
          <ul className="flex flex-col gap-1.5">
            {pitfalls.map((pitfall, i) => (
              <li key={i} className="flex items-start gap-1.5 text-[13px] font-medium text-ink/80 sm:text-sm">
                <span className="mt-0.5 flex h-4 w-4 flex-none items-center justify-center rounded-full border-2 border-ink bg-brick text-[9px] font-extrabold text-cream">
                  !
                </span>
                {pitfall[locale]}
              </li>
            ))}
          </ul>
        </div>
      )}

      {masteryTags.length > 0 && (
        <div>
          <p className="mb-2.5 font-display text-xs uppercase tracking-wide text-ink/60 sm:text-sm">{t('masteryTitle')}</p>
          <div className="flex flex-wrap gap-2">
            {masteryTags.map((tag, i) => (
              <span key={i} className="border-2 border-ink bg-sky px-2.5 py-1 text-[10.5px] font-extrabold text-ink">
                {tag[locale]}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
