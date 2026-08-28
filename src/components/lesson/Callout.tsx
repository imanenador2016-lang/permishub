import { useTranslations } from 'next-intl'
import { cn } from '@/lib/cn'
import { Icon } from '@/components/ui/Icon'
import type { LessonCallout } from '@/domain/content'
import type { Language } from '@/domain/language'

export function Callout({ callout, lang }: { callout: LessonCallout; lang: Language }) {
  // TODO: ajouter le namespace `lesson` à messages/{fr,nl}.json en branchant /cours.
  const t = useTranslations()
  const isRetenir = callout.kind === 'retenir'

  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-xl border px-4 py-3.5 text-sm',
        isRetenir ? 'border-brand-200 bg-brand-50 text-brand-800' : 'border-[#e3c98a] bg-[#fbf3df] text-[#7a5620]',
      )}
    >
      <Icon name={isRetenir ? 'BookmarkCheck' : 'TriangleAlert'} size={18} className="mt-0.5 shrink-0" />
      <div>
        <p className="text-xs font-bold uppercase tracking-wide">{isRetenir ? t('lesson.retenir') : t('lesson.attention')}</p>
        <p className="mt-0.5 leading-relaxed">{callout.text[lang]}</p>
      </div>
    </div>
  )
}
