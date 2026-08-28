import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Icon } from '@/components/ui/Icon'
import { Callout } from '@/components/lesson/Callout'
import { RegionTable } from '@/components/lesson/RegionTable'
import { MiniQuiz } from '@/components/lesson/MiniQuiz'
import { getTheme, getLesson, getQuestionsByIds } from '@/content/repository'
import { usePreferencesStore } from '@/state/preferences-store'

type Step = 'intro' | number | 'summary'

export function LessonView() {
  const { themeSlug, lessonSlug } = useParams<{ themeSlug: string; lessonSlug: string }>()
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'nl' ? 'nl' : 'fr'
  const region = usePreferencesStore((s) => s.region)
  const [step, setStep] = useState<Step>('intro')

  const theme = themeSlug ? getTheme(themeSlug) : undefined
  const lesson = themeSlug && lessonSlug ? getLesson(themeSlug, lessonSlug) : undefined
  if (!theme || !lesson || !themeSlug) return <Navigate to="/apprendre" replace />

  const totalSteps = lesson.chapters.length + 2 // intro + chapters + summary
  const currentStepNumber = step === 'intro' ? 0 : step === 'summary' ? totalSteps - 1 : step + 1
  const chapter = typeof step === 'number' ? lesson.chapters[step] : undefined

  return (
    <Container className="max-w-2xl py-10 sm:py-14">
      <Link to={`/apprendre/${themeSlug}`} className="inline-flex items-center gap-1 text-sm font-medium text-brand-700 hover:underline">
        <Icon name="ArrowLeft" size={14} /> {theme.title[lang]}
      </Link>

      <div className="mt-4">
        <ProgressBar value={currentStepNumber / (totalSteps - 1)} />
      </div>

      {step === 'intro' && (
        <div className="mt-6">
          <h1 className="font-display text-3xl font-semibold text-ink-950">{lesson.title[lang]}</h1>
          <p className="mt-3 flex items-center gap-1.5 text-sm text-ink-500">
            <Icon name="Timer" size={14} /> {lesson.estimatedMinutes} {t('common.minutes')} · {lesson.chapters.length} {t('lesson.chapters')}
          </p>
          <p className="mt-4 leading-relaxed text-ink-700">{lesson.intro[lang]}</p>

          <Card className="mt-6">
            <p className="flex items-center gap-2 text-sm font-semibold text-ink-950">
              <Icon name="Target" size={16} className="text-brand-700" /> {t('lesson.objectivesTitle')}
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              {lesson.objectives.map((objective, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-ink-700">
                  <Icon name="Check" size={16} className="mt-0.5 shrink-0 text-brand-600" />
                  {objective[lang]}
                </li>
              ))}
            </ul>
          </Card>

          <Button size="lg" className="mt-8 w-full" onClick={() => setStep(0)}>
            <Icon name="GraduationCap" size={18} /> {t('lesson.start')}
          </Button>
        </div>
      )}

      {chapter && (
        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">
            {t('lesson.chapterOf', { current: (step as number) + 1, total: lesson.chapters.length })}
          </p>
          <h2 className="mt-1.5 font-display text-2xl font-semibold text-ink-950">{chapter.title[lang]}</h2>

          <div className="mt-4 flex flex-col gap-4">
            {chapter.paragraphs.map((p, i) => (
              <p key={i} className="leading-relaxed text-ink-700">
                {p[lang]}
              </p>
            ))}
          </div>

          {chapter.table && <RegionTable table={chapter.table} lang={lang} currentRegion={region} />}

          {chapter.examples && chapter.examples.length > 0 && (
            <div className="mt-4 flex flex-col gap-2">
              {chapter.examples.map((example, i) => (
                <div key={i} className="flex items-start gap-2.5 rounded-xl bg-ivory-200 px-4 py-3 text-sm text-ink-700">
                  <Icon name="Lightbulb" size={16} className="mt-0.5 shrink-0 text-ink-500" />
                  <p className="italic">{example[lang]}</p>
                </div>
              ))}
            </div>
          )}

          {chapter.callouts && (
            <div className="mt-4 flex flex-col gap-3">
              {chapter.callouts.map((callout, i) => (
                <Callout key={i} callout={callout} lang={lang} />
              ))}
            </div>
          )}

          <MiniQuiz questions={getQuestionsByIds(chapter.miniQuizQuestionIds)} lang={lang} />

          <div className="mt-6 flex gap-3">
            <Button
              variant="secondary"
              onClick={() => setStep((step as number) === 0 ? 'intro' : (step as number) - 1)}
            >
              <Icon name="ArrowLeft" size={16} /> {t('lesson.previous')}
            </Button>
            <Button
              className="flex-1"
              onClick={() => setStep((step as number) + 1 >= lesson.chapters.length ? 'summary' : (step as number) + 1)}
            >
              {(step as number) + 1 >= lesson.chapters.length ? t('lesson.seeSummary') : t('lesson.nextChapter')}
              <Icon name="ArrowRight" size={16} />
            </Button>
          </div>
        </div>
      )}

      {step === 'summary' && (
        <div className="mt-6">
          <h2 className="font-display text-2xl font-semibold text-ink-950">{t('lesson.summaryTitle')}</h2>
          <Card className="mt-4 bg-brand-50">
            <p className="leading-relaxed text-brand-800">{lesson.summary[lang]}</p>
          </Card>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button variant="secondary" className="flex-1" onClick={() => setStep('intro')}>
              <Icon name="RotateCcw" size={16} /> {t('lesson.reviewLesson')}
            </Button>
            <Link to={`/questions/${themeSlug}`} className="flex-1">
              <Button className="w-full">
                {t('lesson.practiceCta')} <Icon name="ArrowRight" size={16} />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </Container>
  )
}
