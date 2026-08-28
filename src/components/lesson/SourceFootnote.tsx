import { useTranslations } from 'next-intl'
import { Icon } from '@/components/ui/Icon'
import { getFacts, getSourceDocument } from '@/content/repository'

function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y}`
}

/** Cite la/les page(s) du PDF source qui justifient un chapitre — jamais un chapitre sans cette traçabilité. */
export function SourceFootnote({ factIds }: { factIds: string[] }) {
  // TODO: ajouter le namespace `lesson` à messages/{fr,nl}.json en branchant /cours.
  const t = useTranslations()
  const facts = getFacts(factIds)
  if (facts.length === 0) return null

  const doc = getSourceDocument(facts[0].reference.sourceId)
  const pages = [...new Set(facts.map((f) => f.reference.page))].sort((a, b) => a - b)
  const verifiedAt = facts[0].reference.verifiedAt

  return (
    <p className="mt-5 flex items-start gap-1.5 border-t border-ink-100 pt-4 text-xs text-ink-400">
      <Icon name="FileText" size={13} className="mt-0.5 shrink-0" />
      <span>
        {t('lesson.source')} : {doc?.title ?? facts[0].reference.sourceId} (PDF), p. {pages.join(', ')} · {t('lesson.verifiedOn')}{' '}
        {formatDate(verifiedAt)}
      </span>
    </p>
  )
}
