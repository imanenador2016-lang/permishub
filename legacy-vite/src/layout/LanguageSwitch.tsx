import { usePreferencesStore } from '@/state/preferences-store'
import { LANGUAGES } from '@/domain/language'
import clsx from 'clsx'

export function LanguageSwitch() {
  const language = usePreferencesStore((s) => s.language)
  const setLanguage = usePreferencesStore((s) => s.setLanguage)

  return (
    <div className="flex items-center rounded-full border border-ink-100 p-0.5 text-xs font-semibold uppercase">
      {LANGUAGES.map((lng) => (
        <button
          key={lng}
          type="button"
          onClick={() => setLanguage(lng)}
          className={clsx(
            'rounded-full px-2.5 py-1.5 transition-colors',
            language === lng ? 'bg-brand-800 text-ivory-50' : 'text-ink-500 hover:text-ink-900',
          )}
          aria-pressed={language === lng}
        >
          {lng}
        </button>
      ))}
    </div>
  )
}
