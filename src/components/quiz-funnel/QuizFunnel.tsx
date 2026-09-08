'use client'

import { useEffect, useMemo, useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { trackEvent } from '@/lib/analytics'
import { computeSegment } from '@/lib/quiz-segment'
import {
  EMPTY_QUALIF_ANSWERS,
  FUNNEL_STEPS,
  type QualifAnswers,
  type Echeance,
  type ExamenVise,
  type Tentatives,
} from '@/lib/quiz-funnel-config'

const STORAGE_KEY = 'permishub:quiz-funnel:v1'

interface StoredState {
  stepIndex: number
  answers: QualifAnswers
  email: string
}

function loadStored(): StoredState | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as StoredState
  } catch {
    return null
  }
}

function saveStored(state: StoredState) {
  if (typeof window === 'undefined') return
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // sessionStorage indisponible (navigation privée, etc.) — jamais bloquant.
  }
}

/** Un simple email@domaine.tld — validation permissive, la vraie vérification stricte est refaite côté serveur (voir api/lead). */
function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

/**
 * Tunnel qualification (Q1-Q3) → capture email → test (placeholder, voir
 * quiz-funnel-config.ts pour FUNNEL_STEPS/EMAIL_GATE_POSITION). Le vrai test
 * et l'écran de résultat ne sont pas construits ici (brief en 2 temps, voir
 * conversation du 2026-09-08) — 'test' n'affiche qu'un écran d'attente.
 */
export function QuizFunnel() {
  const t = useTranslations('quizFunnel')
  const locale = useLocale() as 'fr' | 'nl'

  const [stepIndex, setStepIndex] = useState(0)
  const [answers, setAnswers] = useState<QualifAnswers>(EMPTY_QUALIF_ANSWERS)
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [emailError, setEmailError] = useState<string | null>(null)
  const [restored, setRestored] = useState(false)

  // Restaure depuis sessionStorage au montage (survit à un refresh, voir brief).
  useEffect(() => {
    const stored = loadStored()
    if (stored) {
      setStepIndex(stored.stepIndex)
      setAnswers(stored.answers)
      setEmail(stored.email)
    }
    setRestored(true)
    trackEvent('quiz_start')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Sauvegarde à chaque changement (une fois la restauration initiale faite,
  // pour ne pas écraser un état stocké avec les valeurs vides du tout 1er rendu).
  useEffect(() => {
    if (!restored) return
    saveStored({ stepIndex, answers, email })
  }, [restored, stepIndex, answers, email])

  const step = FUNNEL_STEPS[stepIndex]
  const progress = (stepIndex + 1) / FUNNEL_STEPS.length

  function goNext() {
    setStepIndex((i) => Math.min(i + 1, FUNNEL_STEPS.length - 1))
  }

  function goBack() {
    setStepIndex((i) => Math.max(i - 1, 0))
  }

  function answerQ1(value: ExamenVise) {
    setAnswers((a) => ({ ...a, examenVise: value }))
    trackEvent('quiz_q1_answered', { value })
    goNext()
  }

  function answerQ2(value: Echeance) {
    setAnswers((a) => ({ ...a, echeance: value }))
    trackEvent('quiz_q2_answered', { value })
    goNext()
  }

  function answerQ3(value: Tentatives) {
    setAnswers((a) => ({ ...a, tentatives: value }))
    trackEvent('quiz_q3_answered', { value })
    goNext()
  }

  const segment = useMemo(() => computeSegment(answers), [answers])

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isValidEmail(email)) {
      setEmailError(t('emailInvalid'))
      return
    }
    if (!consent) {
      setEmailError(t('consentRequired'))
      return
    }
    setEmailError(null)
    setSubmitting(true)

    // Le test doit démarrer même si l'enregistrement du lead échoue (voir
    // brief) — on tente, on log une éventuelle erreur, mais on avance dans
    // tous les cas.
    try {
      const params = new URLSearchParams(window.location.search)
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          locale,
          examenVise: answers.examenVise,
          echeance: answers.echeance,
          tentatives: answers.tentatives,
          segment,
          consentement: consent,
          utmSource: params.get('utm_source') ?? '',
          utmCampaign: params.get('utm_campaign') ?? '',
        }),
      })
      if (res.ok) trackEvent('quiz_email_submitted', { segment })
      else trackEvent('quiz_email_error')
    } catch (err) {
      // Erreur réseau ou autre — jamais bloquant pour le visiteur (voir
      // brief), on avance quand même vers le test dans le `finally`.
      console.error('Échec de l’enregistrement du lead (non bloquant) :', err)
      trackEvent('quiz_email_error')
    } finally {
      setSubmitting(false)
      goNext()
    }
  }

  useEffect(() => {
    if (step === 'email') trackEvent('quiz_email_shown')
  }, [step])

  const showBack = stepIndex > 0 && step !== 'test'

  return (
    <div className="panel mx-auto max-w-lg p-6 sm:p-8">
      {step !== 'test' && (
        <div className="mb-6">
          <ProgressBar value={progress} />
        </div>
      )}

      {showBack && (
        <button onClick={goBack} className="mb-4 text-xs font-semibold text-ink/60 hover:text-brick">
          {t('back')}
        </button>
      )}

      {step === 'q1' && (
        <QualifScreen
          title={t('q1Title')}
          options={[
            { value: 'theorique' as const, label: t('q1Theorique') },
            { value: 'pratique' as const, label: t('q1Pratique') },
            { value: 'les_deux' as const, label: t('q1LesDeux') },
          ]}
          onSelect={answerQ1}
        />
      )}

      {step === 'q2' && (
        <QualifScreen
          title={t('q2Title')}
          options={[
            { value: 'urgent' as const, label: t('q2Urgent') },
            { value: 'bientot' as const, label: t('q2Bientot') },
            { value: 'froid' as const, label: t('q2Froid') },
          ]}
          onSelect={answerQ2}
        />
      )}

      {step === 'q3' && (
        <QualifScreen
          title={t('q3Title')}
          options={[
            { value: '0' as const, label: t('q3Jamais') },
            { value: '1' as const, label: t('q3UneFois') },
            { value: '2plus' as const, label: t('q3DeuxPlus') },
          ]}
          onSelect={answerQ3}
        />
      )}

      {step === 'email' && (
        <form onSubmit={handleEmailSubmit}>
          <h2 className="mb-2 font-display text-2xl leading-snug">{t('emailTitle')}</h2>
          <p className="mb-5 text-sm text-ink/70">{t('emailSubtitle')}</p>

          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('emailPlaceholder')}
            className="mb-3 w-full border-2 border-ink bg-cream px-4 py-3.5 text-base outline-none focus:border-brick"
          />

          <label className="mb-4 flex items-start gap-2.5 text-xs text-ink/75">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 h-5 w-5 flex-none border-2 border-ink accent-forest"
            />
            <span>
              {t('consentLabel')}{' '}
              <Link href="/confidentialite" target="_blank" className="underline decoration-2 underline-offset-2 hover:text-brick">
                {t('privacyLink')}
              </Link>
            </span>
          </label>

          {emailError && <p className="mb-3 text-xs font-semibold text-brick">{emailError}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="btn-comic block w-full px-5 py-3.5 text-base disabled:opacity-60"
            style={{ minHeight: 48 }}
          >
            {submitting ? t('sending') : t('startCta')}
          </button>
          <p className="mt-2.5 text-center text-[11px] text-ink/50">{t('noSpamNote')}</p>
        </form>
      )}

      {step === 'test' && (
        <div className="text-center">
          <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-ink bg-yellow text-2xl">
            🚧
          </span>
          <h2 className="mb-2 font-display text-xl">{t('placeholderTestTitle')}</h2>
          <p className="text-sm text-ink/70">{t('placeholderTestBody')}</p>
          {process.env.NODE_ENV !== 'production' && (
            <p className="mt-4 text-[11px] text-ink/40">{t('placeholderSegmentDebug', { segment })}</p>
          )}
        </div>
      )}
    </div>
  )
}

function QualifScreen<TValue extends string>({
  title,
  options,
  onSelect,
}: {
  title: string
  options: { value: TValue; label: string }[]
  onSelect: (value: TValue) => void
}) {
  return (
    <div>
      <h2 className="mb-5 font-display text-2xl leading-snug">{title}</h2>
      <div className="flex flex-col gap-3">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onSelect(opt.value)}
            className="w-full border-[3px] border-ink bg-cream px-5 py-4 text-left text-base font-semibold shadow-hard-xs transition-all duration-150 ease-out hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-yellow/40 hover:shadow-hard-sm active:translate-x-0 active:translate-y-0 active:shadow-none"
            style={{ minHeight: 48 }}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}
