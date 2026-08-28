import { useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { DemoBanner } from '@/components/DemoBanner'
import { getTheme, getQuestionsByTheme, isDemoTheme } from '@/content/repository'
import { usePreferencesStore } from '@/state/preferences-store'
import { useProgressStore } from '@/state/progress-store'

export function PracticeSession() {
  const { themeSlug } = useParams<{ themeSlug: string }>()
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'nl' ? 'nl' : 'fr'
  const region = usePreferencesStore((s) => s.region)
  const recordQuestionAttempt = useProgressStore((s) => s.recordQuestionAttempt)

  const theme = themeSlug ? getTheme(themeSlug) : undefined
  const questions = useMemo(() => (themeSlug ? getQuestionsByTheme(themeSlug, region) : []), [themeSlug, region])

  const [index, setIndex] = useState(0)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [correctCount, setCorrectCount] = useState(0)

  if (!theme || !themeSlug) return <Navigate to="/questions" replace />

  if (questions.length === 0) {
    return (
      <Container className="py-14">
        <p className="text-ink-500">{t('practice.empty')}</p>
      </Container>
    )
  }

  const finished = index >= questions.length
  const question = questions[Math.min(index, questions.length - 1)]
  const selectedOption = question.options.find((o) => o.id === selectedId)

  function handleSelect(optionId: string) {
    if (selectedId) return
    setSelectedId(optionId)
    const option = question.options.find((o) => o.id === optionId)
    const correct = !!option?.correct
    if (correct) setCorrectCount((c) => c + 1)
    recordQuestionAttempt({
      questionId: question.id,
      themeSlug: question.themeSlug,
      correct,
      answeredAt: new Date().toISOString(),
    })
  }

  function handleNext() {
    setSelectedId(null)
    setIndex((i) => i + 1)
  }

  return (
    <Container className="max-w-2xl py-14">
      <div className="flex items-center gap-3">
        <h1 className="font-display text-2xl font-semibold text-ink-950">{theme.title[lang]}</h1>
        {isDemoTheme(theme.slug) && <Badge tone="warning">{t('common.demoBadge')}</Badge>}
      </div>

      {isDemoTheme(theme.slug) && (
        <div className="mt-4">
          <DemoBanner />
        </div>
      )}

      {!finished && (
        <>
          <div className="mt-6">
            <p className="mb-2 text-sm font-medium text-ink-500">
              {t('practice.questionOf', { current: index + 1, total: questions.length })}
            </p>
            <ProgressBar value={index / questions.length} />
          </div>

          <Card className="mt-6">
            <h2 className="text-lg font-semibold text-ink-950">{question.prompt[lang]}</h2>

            <div className="mt-5 flex flex-col gap-2.5">
              {question.options.map((option) => {
                const isSelected = option.id === selectedId
                const showState = !!selectedId
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleSelect(option.id)}
                    disabled={!!selectedId}
                    className={clsx(
                      'flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors',
                      !showState && 'border-ink-100 hover:border-brand-300',
                      showState && option.correct && 'border-brand-600 bg-brand-50 text-brand-800',
                      showState && isSelected && !option.correct && 'border-[#d9503f] bg-[#fbeae7] text-[#8a3527]',
                      showState && !isSelected && !option.correct && 'border-ink-100 text-ink-400',
                    )}
                  >
                    {option.text[lang]}
                    {showState && option.correct && <Icon name="Check" size={16} />}
                    {showState && isSelected && !option.correct && <Icon name="X" size={16} />}
                  </button>
                )
              })}
            </div>

            {selectedId && (
              <div className="mt-5 rounded-xl bg-ivory-200 p-4">
                <p className={clsx('text-sm font-semibold', selectedOption?.correct ? 'text-brand-700' : 'text-[#8a3527]')}>
                  {selectedOption?.correct ? t('practice.correct') : t('practice.incorrect')}
                </p>
                <p className="mt-1.5 text-xs font-semibold uppercase tracking-wide text-ink-500">{t('practice.explanationTitle')}</p>
                <p className="mt-1 text-sm text-ink-700">{question.explanation[lang]}</p>
              </div>
            )}

            {selectedId && (
              <Button className="mt-5 w-full" onClick={handleNext}>
                {t('common.next')}
              </Button>
            )}
          </Card>
        </>
      )}

      {finished && (
        <Card className="mt-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-ink-500">{t('exam.scoreLabel')}</p>
          <p className="mt-2 font-display text-4xl font-semibold text-ink-950">
            {correctCount}/{questions.length}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button
              variant="secondary"
              onClick={() => {
                setIndex(0)
                setSelectedId(null)
                setCorrectCount(0)
              }}
            >
              {t('exam.retry')}
            </Button>
            <Link to="/progression">
              <Button>{t('nav.progress')}</Button>
            </Link>
          </div>
        </Card>
      )}
    </Container>
  )
}
