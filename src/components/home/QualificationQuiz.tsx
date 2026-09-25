'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Icon } from '@/components/ui/Icon'
import { formatPrice } from '@/domain/centers'
import { createCheckoutSession } from '@/lib/payment'
import { LAUNCH_BUNDLE_OFFER, LAUNCH_BUNDLE_MAX_SLOTS, DRIVING_SCHOOL_TOTAL_CENTS } from '@/content/pricing-config'
import { MiniProof } from './MiniProof'

type Screen = 'intro' | 'email' | 'q1' | 'q2' | 'q3' | 'q4' | 'not-eligible' | 'eligible'
type Theory = 'debute' | 'flou' | 'active' | ''
type ExamFail = 'une' | 'plusieurs' | 'non' | ''

interface LaunchOfferStatus {
  remaining: number
  soldOut: boolean
  expired: boolean
  available: boolean
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const QUESTION_STEPS: Screen[] = ['q1', 'q2', 'q3', 'q4']
const PROCESSING_STEP_MS = 1100
const PROCESSING_KEYS = ['processingStep1', 'processingStep2', 'processingStep3', 'processingStep4'] as const
const FEATURE_ROWS = [
  { icon: 'BookOpen' as const, titleKey: 'featureTheoryTitle', descKey: 'featureTheoryDesc' },
  { icon: 'MessageCircle' as const, titleKey: 'featureCoachingTitle', descKey: 'featureCoachingDesc' },
  { icon: 'ShieldAlert' as const, titleKey: 'featureRiskTitle', descKey: 'featureRiskDesc' },
  { icon: 'Route' as const, titleKey: 'featurePracticeTitle', descKey: 'featurePracticeDesc' },
] as const

/**
 * Quiz de qualification avant achat — s'ouvre au clic sur le CTA du Hero
 * (remplace l'ancien "clic direct → Stripe", voir Hero.tsx).
 *
 * Ordre volontaire : EMAIL D'ABORD, avant les 4 questions (demande du
 * 2026-09-13 — "récupérer le mail en cas où il abandonne pour faire du
 * remarketing"). L'email est envoyé à /api/lead (même pipeline que
 * QuizFunnel.tsx → lib/leads.ts, Google Sheet) dès sa saisie, en
 * arrière-plan, sans attendre — s'il quitte avant la fin du quiz, le lead
 * existe déjà côté serveur. `segment: 'pack-qualification'` permet de le
 * distinguer des leads du tunnel test-de-niveau dans le Sheet.
 *
 * Une fois "éligible", le CTA final rappelle directement le VRAI checkout
 * Stripe (l'email est déjà connu, plus besoin de le redemander) — pas de
 * mockup de paiement ici, contrairement au prototype HTML autonome livré
 * d'abord en mockups/quiz-qualification.html.
 *
 * Les réponses aux 4 questions sont envoyées à /api/quiz-answers dès que Q4
 * est répondue (ligne séparée du lead email initial, voir lib/leads.ts et
 * SETUP_LEADS.md — demande du 2026-09-13 "lier les réponses avec un vrai
 * Google Sheet").
 */
export function QualificationQuiz({
  onClose,
  status,
  locale,
}: {
  onClose: () => void
  status: LaunchOfferStatus | null
  locale: 'fr' | 'nl'
}) {
  const t = useTranslations('qualificationQuiz')
  const th = useTranslations('heroLaunch')

  const [screen, setScreen] = useState<Screen>('intro')
  const [region, setRegion] = useState('')
  const [theory, setTheory] = useState<Theory>('')
  const [examFail, setExamFail] = useState<ExamFail>('')
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [emailError, setEmailError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [processingIndex, setProcessingIndex] = useState(0)

  useEffect(() => {
    // Escape ne ferme plus pendant la redirection Stripe — éviter qu'un
    // visiteur pressé se sente "planté" et quitte juste avant d'arriver sur
    // la page de paiement (demande du 2026-09-14 : le tenir pendant l'attente).
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && !loading) onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose, loading])

  // Micro-copy qui tourne pendant la création de la session Stripe — la
  // redirection prend parfois 1-2s, largement assez pour qu'un visiteur
  // pense que ça a planté s'il ne voit qu'un bouton figé (demande du
  // 2026-09-14). Purement cosmétique : ne reflète aucune vraie étape
  // serveur, juste de quoi occuper l'attente sans mentir sur une progression
  // précise.
  useEffect(() => {
    if (!loading) {
      setProcessingIndex(0)
      return
    }
    const id = setInterval(() => setProcessingIndex((i) => (i + 1) % PROCESSING_KEYS.length), PROCESSING_STEP_MS)
    return () => clearInterval(id)
  }, [loading])

  function handleEmailContinue() {
    const trimmed = email.trim()
    if (!EMAIL_REGEX.test(trimmed)) {
      setEmailError(t('emailInvalid'))
      return
    }
    if (!consent) {
      setEmailError(t('consentRequired'))
      return
    }
    setEmailError(null)

    // Jamais attendu — le quiz doit avancer tout de suite, cet appel part en
    // arrière-plan (même principe que QuizFunnel.tsx : voir son commentaire
    // sur handleEmailSubmit). Une erreur réseau ne doit jamais bloquer le
    // visiteur, juste ne pas enregistrer le lead cette fois-ci.
    const params = new URLSearchParams(window.location.search)
    fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: trimmed,
        locale,
        region: '',
        examenVise: '',
        echeance: '',
        tentatives: '',
        segment: 'pack-qualification',
        consentement: consent,
        utmSource: params.get('utm_source') ?? '',
        utmCampaign: params.get('utm_campaign') ?? '',
      }),
    }).catch((err) => {
      console.error('Échec de l’enregistrement du lead (non bloquant) :', err)
    })

    setScreen('q1')
  }

  // Q4 répondue — les 4 réponses sont connues, on les envoie en une ligne
  // séparée (voir doc du composant plus haut). `motivationValue` est passé
  // directement (pas relu depuis le state, qui ne serait pas encore à jour
  // dans ce même tick) ; `eligible` en découle.
  function finishQuiz(motivationValue: 'oui' | 'non') {
    const eligible = motivationValue === 'oui'
    fetch('/api/quiz-answers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        region,
        niveauTheorie: theory,
        echecExamen: examFail,
        motivation: motivationValue,
        eligible,
      }),
    }).catch((err) => {
      console.error('Échec de l’enregistrement des réponses du quiz (non bloquant) :', err)
    })
    setScreen(eligible ? 'eligible' : 'not-eligible')
  }

  async function handleUnlock() {
    setLoading(true)
    setError(null)
    try {
      const { url } = await createCheckoutSession(LAUNCH_BUNDLE_OFFER, { email })
      window.location.href = url
    } catch (err) {
      setError(err instanceof Error ? err.message : th('errorFallback'))
      setLoading(false)
    }
  }

  const stepIndex = QUESTION_STEPS.indexOf(screen)

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4"
      onClick={loading ? undefined : onClose}
    >
      <div
        className="panel !shadow-hard relative flex max-h-[92dvh] w-full max-w-md flex-col overflow-y-auto !p-0"
        onClick={(e) => e.stopPropagation()}
      >
        {!loading && (
          <button
            onClick={onClose}
            aria-label={t('closeLabel')}
            className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center border-2 border-ink bg-cream font-display text-sm hover:bg-creamdim"
          >
            ×
          </button>
        )}

        {/* Barre de progression — visible uniquement pendant les 4 questions. */}
        {stepIndex > -1 && (
          <div className="px-6 pb-1 pt-6 sm:px-7">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-ink/50">
              {t('stepLabel', { step: stepIndex + 1 })}
            </p>
            <div className="h-1.5 w-full border border-ink/15 bg-creamdim">
              <div
                className="h-full bg-brick transition-all duration-300 ease-out"
                style={{ width: `${((stepIndex + 1) / QUESTION_STEPS.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex flex-1 flex-col p-6 sm:p-7">
          {loading ? (
            // Écran d'attente pendant la création de la session Stripe — le
            // remplace tout le contenu de l'écran "éligible" en cours plutôt
            // que de juste changer le texte du bouton, pour vraiment "tenir"
            // le visiteur (demande du 2026-09-14).
            <div className="flex flex-1 flex-col items-center justify-center text-center">
              <Icon name="Loader2" size={40} className="mb-4 animate-spin text-brick" aria-hidden />
              <h2 className="mb-2 font-display text-lg leading-tight sm:text-xl">{t('processingTitle')}</h2>
              <AnimatePresence mode="wait">
                <motion.p
                  key={processingIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="text-sm font-semibold text-ink/60"
                >
                  {t(PROCESSING_KEYS[processingIndex])}
                </motion.p>
              </AnimatePresence>
              <p className="mt-5 flex items-center gap-1.5 text-[11px] font-semibold text-ink/40">
                <Icon name="Lock" size={12} className="flex-none" />
                {t('processingSecure')}
              </p>
            </div>
          ) : (
            <>
              {screen === 'intro' && (
            <>
              <h2 className="mb-3 font-display text-xl leading-tight sm:text-2xl">{t('introTitle')}</h2>
              <span className="mb-6 inline-flex w-fit items-center gap-1.5 border-2 border-ink bg-yellow px-3 py-1.5 font-display text-xs">
                ⏱️ {t('introTimer')}
              </span>
              <div className="flex-1" />
              <button onClick={() => setScreen('email')} className="btn-comic w-full px-4 py-3.5 text-base">
                {t('introCta')}
              </button>
            </>
          )}

          {screen === 'email' && (
            <>
              <h2 className="mb-4 font-display text-lg leading-tight sm:text-xl">{t('emailTitle')}</h2>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('emailPlaceholder')}
                autoComplete="email"
                className="mb-3 w-full border-2 border-ink bg-cream px-4 py-3.5 text-base font-semibold text-ink placeholder:font-normal placeholder:text-ink/40"
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
              <div className="flex-1" />
              <button onClick={handleEmailContinue} className="btn-comic w-full px-4 py-3.5 text-base">
                {t('emailCta')}
              </button>
              <p className="mt-2.5 text-center text-[11px] text-ink/50">{t('noSpamNote')}</p>
            </>
          )}

          {screen === 'q1' && (
            <>
              <h2 className="mb-4 font-display text-lg leading-tight sm:text-xl">{t('q1Title')}</h2>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="mb-4 w-full border-2 border-ink bg-cream px-4 py-3.5 font-semibold text-ink"
              >
                <option value="" disabled>
                  {t('q1Placeholder')}
                </option>
                <option value="bruxelles">{t('q1Bruxelles')}</option>
                <option value="flandre">{t('q1Flandre')}</option>
                <option value="wallonie">{t('q1Wallonie')}</option>
              </select>
              <div className="flex-1" />
              <button
                onClick={() => setScreen('q2')}
                disabled={!region}
                className="btn-comic w-full px-4 py-3.5 text-base disabled:opacity-40"
              >
                {t('q1Next')}
              </button>
            </>
          )}

          {screen === 'q2' && (
            <>
              <h2 className="mb-4 font-display text-lg leading-tight sm:text-xl">{t('q2Title')}</h2>
              <div className="flex flex-col gap-2.5">
                {(['debute', 'flou', 'active'] as const).map((value) => (
                  <button
                    key={value}
                    onClick={() => {
                      setTheory(value)
                      setScreen('q3')
                    }}
                    className="flex items-center justify-between gap-2 border-2 border-ink bg-cream px-4 py-3.5 text-left text-sm font-semibold hover:border-brick"
                  >
                    {t(value === 'debute' ? 'q2Debute' : value === 'flou' ? 'q2Flou' : 'q2Active')}
                    <Icon name="ArrowRight" size={16} className="flex-none text-brick" />
                  </button>
                ))}
              </div>
            </>
          )}

          {screen === 'q3' && (
            <>
              <h2 className="mb-4 font-display text-lg leading-tight sm:text-xl">{t('q3Title')}</h2>
              <div className="flex flex-col gap-2.5">
                {(['une', 'plusieurs', 'non'] as const).map((value) => (
                  <button
                    key={value}
                    onClick={() => {
                      setExamFail(value)
                      setScreen('q4')
                    }}
                    className="flex items-center justify-between gap-2 border-2 border-ink bg-cream px-4 py-3.5 text-left text-sm font-semibold hover:border-brick"
                  >
                    {t(value === 'une' ? 'q3Une' : value === 'plusieurs' ? 'q3Plusieurs' : 'q3Non')}
                    <Icon name="ArrowRight" size={16} className="flex-none text-brick" />
                  </button>
                ))}
              </div>
            </>
          )}

          {screen === 'q4' && (
            <>
              <h2 className="mb-4 font-display text-lg leading-tight sm:text-xl">{t('q4Title')}</h2>
              <div className="flex flex-col gap-2.5">
                <button
                  onClick={() => finishQuiz('oui')}
                  className="flex items-center justify-between gap-2 border-2 border-ink bg-cream px-4 py-3.5 text-left text-sm font-semibold hover:border-brick"
                >
                  {t('q4Oui')}
                  <Icon name="ArrowRight" size={16} className="flex-none text-brick" />
                </button>
                <button
                  onClick={() => finishQuiz('non')}
                  className="flex items-center justify-between gap-2 border-2 border-ink bg-cream px-4 py-3.5 text-left text-sm font-semibold hover:border-brick"
                >
                  {t('q4Non')}
                  <Icon name="ArrowRight" size={16} className="flex-none text-brick" />
                </button>
              </div>
            </>
          )}

          {screen === 'not-eligible' && (
            <>
              <Icon name="X" size={36} className="mb-2 text-brick" />
              <h2 className="mb-3 font-display text-xl leading-tight sm:text-2xl">{t('notEligibleTitle')}</h2>
              <p className="mb-3 border-2 border-ink/15 bg-cream p-3.5 text-sm leading-relaxed text-ink/70">{t('notEligibleBody1')}</p>
              <p className="mb-5 border-2 border-ink/15 bg-cream p-3.5 text-sm leading-relaxed text-ink/70">{t('notEligibleBody2')}</p>
              <div className="flex-1" />
              <button onClick={() => setScreen('q4')} className="btn-comic w-full px-4 py-3.5 text-base">
                {t('notEligibleCta')}
              </button>
            </>
          )}

          {screen === 'eligible' && (
            <>
              {/* Ordre volontairement compact — tout le chemin critique
                  (titre → urgence → preuve → prix → CTA) doit tenir SANS
                  scroller (retour du 2026-09-13 : le bouton d'achat n'était
                  pas visible à l'écran). Le détail (priorité + piliers) est
                  repoussé après le CTA : utile pour qui scrolle, jamais un
                  obstacle pour qui ne le fait pas. */}
              <div className="mb-3 flex items-center gap-2">
                <Icon name="Check" size={28} className="flex-none text-forest" />
                <h2 className="font-display text-lg leading-tight sm:text-xl">{t('eligibleTitle')}</h2>
              </div>

              {status && !status.soldOut && !status.expired && (
                <div className="mb-3 border-2 border-ink bg-ink p-3">
                  <p className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-yellow">
                    <Icon name="Flame" size={13} className="flex-none" />
                    {t('limitedOfferLabel')} — {th('slotsLabel', { remaining: status.remaining, max: LAUNCH_BUNDLE_MAX_SLOTS })}
                  </p>
                  <div className="h-2 w-full border border-cream/30 bg-ink">
                    <div
                      className="h-full bg-yellow"
                      style={{ width: `${Math.min(100, (status.remaining / LAUNCH_BUNDLE_MAX_SLOTS) * 100)}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Avis clients animés — même composant que le Hero (avis
                  vérifiés qui tournent), juste au-dessus du prix pour lever
                  le doute au moment exact de la décision (demande du
                  2026-09-13). */}
              <div className="mb-3 border-2 border-ink/15 bg-cream p-2.5">
                <MiniProof />
              </div>

              <div className="mb-3 flex items-end gap-3">
                <span className="text-base font-semibold text-ink/50 line-through">{formatPrice(DRIVING_SCHOOL_TOTAL_CENTS, locale)}</span>
                <span className="font-display text-4xl leading-none text-ink">{th('priceNow')}</span>
              </div>

              {/* L'email est déjà connu (écran 'email', tout au début) — le
                  CTA rappelle directement le vrai checkout Stripe. Ce bouton
                  disparaît dès `loading` (voir l'écran d'attente dédié
                  ci-dessus) : plus besoin d'un état "disabled" ici. */}
              <button onClick={handleUnlock} className="btn-comic w-full px-4 py-3.5 text-base">
                {th('cta')} — {th('priceNow')} →
              </button>
              {error && <p className="mt-2 text-center text-xs font-semibold text-brick">{error}</p>}

              {/* Détail — visible en scrollant, pas requis pour acheter. */}
              <div className="mt-5 flex items-start gap-2.5 border-2 border-ink/15 bg-yellow/25 p-3.5">
                <Icon name="Trophy" size={18} className="mt-0.5 flex-none text-brick" />
                <p className="text-xs font-semibold leading-snug text-ink/80">{t('priorityNote')}</p>
              </div>

              <div className="mt-3 flex flex-col gap-2">
                {FEATURE_ROWS.map((f) => (
                  <div key={f.titleKey} className="flex items-center gap-3 border-2 border-ink/15 bg-cream p-3">
                    <span className="flex h-9 w-9 flex-none items-center justify-center border-2 border-ink bg-yellow text-ink">
                      <Icon name={f.icon} size={16} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-sm leading-tight">{th(f.titleKey)}</p>
                      <p className="text-xs leading-snug text-ink/70">{th(f.descKey)}</p>
                    </div>
                    <Icon name="Check" size={16} className="flex-none text-forest" />
                  </div>
                ))}
              </div>
            </>
          )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
