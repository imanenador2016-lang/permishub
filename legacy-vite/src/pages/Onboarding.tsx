import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { usePreferencesStore } from '@/state/preferences-store'
import { REGIONS, REGION_LABELS, isRegion } from '@/domain/region'
import { LANGUAGES, LANGUAGE_LABELS, isLanguage } from '@/domain/language'
import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import clsx from 'clsx'

export function Onboarding() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const lang = i18n.language === 'nl' ? 'nl' : 'fr'

  const region = usePreferencesStore((s) => s.region)
  const setRegion = usePreferencesStore((s) => s.setRegion)
  const language = usePreferencesStore((s) => s.language)
  const setLanguage = usePreferencesStore((s) => s.setLanguage)
  const completeOnboarding = usePreferencesStore((s) => s.completeOnboarding)

  return (
    <Container className="flex min-h-[70vh] items-center py-16">
      <Card className="mx-auto w-full max-w-lg">
        <h1 className="font-display text-2xl font-semibold text-ink-950">{t('onboarding.title')}</h1>
        <p className="mt-2 text-sm text-ink-500">{t('onboarding.subtitle')}</p>

        <div className="mt-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-500">{t('onboarding.regionLabel')}</p>
          <div className="grid grid-cols-2 gap-2">
            {REGIONS.filter((r) => r !== 'BE').map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => isRegion(r) && setRegion(r)}
                className={clsx(
                  'rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors',
                  region === r ? 'border-brand-600 bg-brand-50 text-brand-800' : 'border-ink-100 text-ink-700 hover:border-brand-300',
                )}
              >
                {REGION_LABELS[r][lang]}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-500">{t('onboarding.languageLabel')}</p>
          <div className="grid grid-cols-2 gap-2">
            {LANGUAGES.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => isLanguage(l) && setLanguage(l)}
                className={clsx(
                  'rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors',
                  language === l ? 'border-brand-600 bg-brand-50 text-brand-800' : 'border-ink-100 text-ink-700 hover:border-brand-300',
                )}
              >
                {LANGUAGE_LABELS[l]}
              </button>
            ))}
          </div>
        </div>

        <Button
          className="mt-8 w-full"
          size="lg"
          onClick={() => {
            completeOnboarding()
            navigate('/apprendre')
          }}
        >
          {t('onboarding.confirm')}
        </Button>
      </Card>
    </Container>
  )
}
