import { cn } from '@/lib/cn'
import { REGION_LABELS, type Region } from '@/domain/region'
import type { RegionComparisonTable } from '@/domain/content'
import type { Language } from '@/domain/language'

const COLUMNS: Region[] = ['WALLONIE', 'BRUXELLES', 'FLANDRE']

/** Tableau comparatif régional — colonne de l'utilisateur mise en évidence quand elle est connue. */
export function RegionTable({ table, lang, currentRegion }: { table: RegionComparisonTable; lang: Language; currentRegion: Region }) {
  return (
    <div className="mt-4 overflow-x-auto rounded-xl border border-ink-100">
      <table className="w-full table-fixed text-sm">
        <colgroup>
          <col className="w-[38%]" />
          {COLUMNS.map((r) => (
            <col key={r} />
          ))}
        </colgroup>
        <thead>
          <tr className="bg-ivory-200">
            <th className="px-2 py-2.5 text-left font-semibold text-ink-500 sm:px-3" scope="col" />
            {COLUMNS.map((r) => (
              <th
                key={r}
                scope="col"
                className={cn('px-1.5 py-2.5 text-center text-[11px] font-semibold sm:px-3 sm:text-xs', r === currentRegion ? 'text-brand-800' : 'text-ink-600')}
              >
                {REGION_LABELS[r][lang]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, i) => (
            <tr key={i} className="border-t border-ink-100">
              <th scope="row" className="px-2 py-2.5 text-left text-xs font-medium leading-snug text-ink-700 sm:px-3 sm:text-sm">
                {row.label[lang]}
              </th>
              {COLUMNS.map((r) => (
                <td
                  key={r}
                  className={cn(
                    'px-1.5 py-2.5 text-center text-xs font-semibold sm:px-3 sm:text-sm',
                    r === currentRegion ? 'bg-brand-50 text-brand-800' : 'text-ink-900',
                  )}
                >
                  {row.valuesByRegion[r]?.[lang] ?? '—'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="border-t border-ink-100 bg-ivory-100 px-2 py-2 text-xs text-ink-500 sm:px-3">{table.caption[lang]}</p>
    </div>
  )
}
