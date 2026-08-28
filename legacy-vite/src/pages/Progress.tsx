import { useTranslation } from 'react-i18next'
import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Icon } from '@/components/ui/Icon'
import { useProgressStore } from '@/state/progress-store'
import { getTheme } from '@/content/repository'

export function Progress() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'nl' ? 'nl' : 'fr'
  const history = useProgressStore((s) => s.history)
  const getWeakThemes = useProgressStore((s) => s.getWeakThemes)
  const reset = useProgressStore((s) => s.reset)

  const totalAttempts = history.length
  const successRate = totalAttempts > 0 ? history.filter((h) => h.correct).length / totalAttempts : 0
  const weakThemes = getWeakThemes()

  return (
    <Container className="py-14">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold text-ink-950">{t('progress.title')}</h1>
          <p className="mt-2 text-ink-500">{t('progress.subtitle')}</p>
        </div>
        {totalAttempts > 0 && (
          <Button variant="ghost" onClick={reset}>
            <Icon name="RotateCcw" size={16} /> {t('progress.reset')}
          </Button>
        )}
      </div>

      {totalAttempts === 0 ? (
        <Card className="mt-8">
          <p className="text-sm text-ink-500">{t('progress.noData')}</p>
        </Card>
      ) : (
        <>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <Card>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">{t('progress.totalAttempts')}</p>
              <p className="mt-2 font-display text-3xl font-semibold text-ink-950">{totalAttempts}</p>
            </Card>
            <Card>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">{t('progress.successRate')}</p>
              <p className="mt-2 font-display text-3xl font-semibold text-ink-950">{Math.round(successRate * 100)}%</p>
              <div className="mt-3">
                <ProgressBar value={successRate} />
              </div>
            </Card>
          </div>

          {weakThemes.length > 0 && (
            <div className="mt-8">
              <h2 className="text-base font-semibold text-ink-950">{t('progress.weakThemes')}</h2>
              <div className="mt-4 flex flex-col gap-3">
                {weakThemes.map((stat) => {
                  const theme = getTheme(stat.themeSlug)
                  return (
                    <Card key={stat.themeSlug} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-ink-950">{theme?.title[lang] ?? stat.themeSlug}</p>
                        <p className="mt-1 text-xs text-ink-500">
                          {stat.correct}/{stat.attempts} · {Math.round(stat.successRate * 100)}%
                        </p>
                      </div>
                      <div className="w-28">
                        <ProgressBar value={stat.successRate} />
                      </div>
                    </Card>
                  )
                })}
              </div>
            </div>
          )}
        </>
      )}
    </Container>
  )
}
