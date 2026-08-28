import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/cn'
import { Icon } from '@/components/ui/Icon'
import { useProgressStore } from '@/state/progress-store'
import type { Question } from '@/domain/quiz'
import type { Language } from '@/domain/language'

/** Mini-quiz de fin de chapitre : réutilise les mêmes Question que l'entraînement/l'examen, et alimente la même progression. */
export function MiniQuiz({ questions, lang }: { questions: Question[]; lang: Language }) {
  // TODO: ajouter le namespace `lesson` à messages/{fr,nl}.json en branchant /cours.
  const t = useTranslations()
  const recordQuestionAttempt = useProgressStore((s) => s.recordQuestionAttempt)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  if (questions.length === 0) return null

  function handleSelect(question: Question, optionId: string) {
    if (answers[question.id]) return
    setAnswers((a) => ({ ...a, [question.id]: optionId }))
    const option = question.options.find((o) => o.id === optionId)
    recordQuestionAttempt({
      questionId: question.id,
      themeSlug: question.themeSlug,
      correct: !!option?.correct,
      answeredAt: new Date().toISOString(),
    })
  }

  return (
    <div className="mt-6 flex flex-col gap-3">
      <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-brand-700">
        <Icon name="ListChecks" size={14} /> {t('lesson.miniQuiz')}
      </p>
      {questions.map((q) => {
        const selectedId = answers[q.id]
        const selectedOption = q.options.find((o) => o.id === selectedId)
        return (
          <div key={q.id} className="rounded-xl border border-ink-100 bg-ivory-50 p-4">
            <p className="text-sm font-semibold text-ink-950">{q.prompt[lang]}</p>
            <div className="mt-3 flex flex-col gap-2">
              {q.options.map((option) => {
                const isSelected = option.id === selectedId
                const showState = !!selectedId
                return (
                  <button
                    key={option.id}
                    type="button"
                    disabled={showState}
                    onClick={() => handleSelect(q, option.id)}
                    className={cn(
                      'flex items-center justify-between rounded-lg border px-3 py-2 text-left text-sm font-medium transition-colors',
                      !showState && 'border-ink-100 hover:border-brand-300',
                      showState && option.correct && 'border-brand-600 bg-brand-50 text-brand-800',
                      showState && isSelected && !option.correct && 'border-[#d9503f] bg-[#fbeae7] text-[#8a3527]',
                      showState && !isSelected && !option.correct && 'border-ink-100 text-ink-400',
                    )}
                  >
                    {option.text[lang]}
                    {showState && option.correct && <Icon name="Check" size={14} />}
                  </button>
                )
              })}
            </div>
            {selectedId && (
              <p className="mt-3 text-xs leading-relaxed text-ink-600">
                <span className={cn('font-semibold', selectedOption?.correct ? 'text-brand-700' : 'text-[#8a3527]')}>
                  {selectedOption?.correct ? '✓' : '✗'}
                </span>{' '}
                {q.explanation[lang]}
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}
