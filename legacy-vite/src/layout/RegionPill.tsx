import { useTranslation } from 'react-i18next'
import { usePreferencesStore } from '@/state/preferences-store'
import { REGIONS, REGION_LABELS, isRegion } from '@/domain/region'
import { Icon } from '../ui/Icon'

export function RegionPill() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'nl' ? 'nl' : 'fr'
  const region = usePreferencesStore((s) => s.region)
  const setRegion = usePreferencesStore((s) => s.setRegion)

  return (
    <label className="relative flex items-center gap-1.5 rounded-full border border-ink-100 py-1.5 pl-3 pr-7 text-xs font-semibold text-ink-700">
      <Icon name="MapPin" size={14} className="text-brand-600" />
      <select
        value={region}
        onChange={(e) => {
          if (isRegion(e.target.value)) setRegion(e.target.value)
        }}
        className="appearance-none bg-transparent pr-1 outline-none"
        aria-label="Région"
      >
        {REGIONS.map((r) => (
          <option key={r} value={r}>
            {REGION_LABELS[r][lang]}
          </option>
        ))}
      </select>
      <Icon name="ChevronDown" size={12} className="pointer-events-none absolute right-2.5 text-ink-500" />
    </label>
  )
}
