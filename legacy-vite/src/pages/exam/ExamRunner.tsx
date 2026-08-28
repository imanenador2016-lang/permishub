import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { DemoBanner } from '@/components/DemoBanner'
import { getExamBlueprint, getQuestionsForExam } from '@/content/repository'
import { usePreferencesStore } from '@/state/preferences-store'
import { useProgressStore } from '@/state/progress-store'
import type { ExamAnswer } from '@/domain/quiz'

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function ExamRunner() {
  const { blueprintId } = useParams<{ blueprintId: string }>()
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'nl' ? 'nl' : 'fr'
  const region = usePreferencesStore((s) => s.region)
  const recordExamAttempt = useProgressStore((s) => s.recordExamAttempt)

  const blueprint = blueprintId ? getExamBlueprint(blueprintId) : undefined
  const questions = useMemo(() => (blueprint ? getQuestionsForExam(blueprint, region) : []), [blueprint, region])

  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<ExamAnswer[]>([])
  const [secondsLeft, setSecondsLeft] = useState(() => (blueprint ? blueprint.durationMinutes * 60 : 0))
  const [status, setStatus] = useState<'running' | 'result'>('running')
  const submittedRef = useRef(false)

  const submit = useMemo(
    () => (finalAnswers: ExamAnswer[]) => {
      if (submittedRef.current || !blueprint) return
      submittedRef.current = true
      const errors = finalAnswers.filter((a) => !a.correct).length
      const score = finalAnswers.length > 0 ? finalAnswers.filter((a) => a.correct).length / finalAnswers.length : 0
      recordExamAttempt({
        id: `${blueprint.id}-${Date.now()}`,
        blueprintId: blueprint.id,
        region,
        language: lang,
        startedAt: new Date().toISOString(),
        finishedAt: new Date().toISOString(),
        answers: finalAnswers,
        score,
        passed: errors <= blueprint.maxErrorsAllowed,
      })
      setStatus('result')
    },
    [blueprint, lang, recordExamAttempt, region],
  )

  useEffect(() => {
    if (status !== 'running' || !blueprint) return
    const interval = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(interval)
          submit(answers)
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, blueprint])

  if (!blueprint || !blueprintId) return <Navigate to="/examens" replace />

  if (questions.length === 0) {
    return (
      <Container className="py-14">
        <p className="text-ink-500">{t('practice.empty')}</p>
      </Container>
    )
  }

  const question = questions[Math.min(index, questions.length - 1)]

  function handleAnswer(optionId: string) {
    const option = question.options.find((o) => o.id === optionId)
    const nextAnswers = [...answers, { questionId: question.id, optionId, correct: !!option?.correct }]
    setAnswers(nextAnswers)
    if (index + 1 >= questions.length) {
      submit(nextAnswers)
    } else {
      setIndex((i) => i + 1)
    }
  }

  if (status === 'result') {
    const errors = answers.filter((a) => !a.correct).length
    const passed = errors <= blueprint.maxErrorsAllowed
    return (
      <Container className="max-w-xl py-14">
        <Card className="text-center">
          <Badge tone={passed ? 'success' : 'danger'}>{passed ? t('exam.passed') : t('exam.failed')}</Badge>
          <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-ink-500">{t('exam.resultTitle')}</p>
          <p className="mt-2 font-display text-4xl font-semibold text-ink-950">
            {answers.filter((a) => a.correct).length}/{questions.length}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/examens">
              <Button variant="secondary">{t('exam.backToExams')}</Button>
            </Link>
            <Link to="/progression">
              <Button>{t('nav.progress')}</Button>
            </Link>
          </div>
        </Card>
      </Container>
    )
  }

  return (
    <Container className="max-w-2xl py-14">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="font-display text-2xl font-semibold text-ink-950">{blueprint.title[lang]}</h1>
          <Badge tone="warning">{t('common.demoBadge')}</Badge>
        </div>
        <div className={clsx('flex items-center gap-1.5 text-sm font-semibold', secondsLeft < 30 ? 'text-[#8a3527]' : 'text-ink-700')}>
          <Icon name="Timer" size={16} />
          {formatTime(secondsLeft)}
        </div>
      </div>

      <div className="mt-4">
        <DemoBanner />
      </div>

      <p className="mt-6 text-sm font-medium text-ink-500">{t('practice.questionOf', { current: index + 1, total: questions.length })}</p>

      <Card className="mt-3">
        <h2 className="text-lg font-semibold text-ink-950">{question.prompt[lang]}</h2>
        <div className="mt-5 flex flex-col gap-2.5">
          {question.options.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => handleAnswer(option.id)}
              className="rounded-xl border border-ink-100 px-4 py-3 text-left text-sm font-medium transition-colors hover:border-brand-300"
            >
              {option.text[lang]}
            </button>
          ))}
        </div>
      </Card>
    </Container>
  )
}
