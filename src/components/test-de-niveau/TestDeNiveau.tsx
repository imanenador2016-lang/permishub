'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import type { Question } from '@/domain/quiz'
import { computeTestResult, type TestAnswer } from '@/lib/test-de-niveau'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { ResumeHook } from './ResumeHook'
import { X, Check } from 'lucide-react'

type ThemeLabel = { slug: string; label: string }

/** Temps laissé pour répondre à chaque question. */
const ANSWER_SECONDS = 15
/** Courte respiration entre l'énoncé et chaque proposition. */
const SPEECH_PAUSE_MS = 180
/** Laisse au moteur vocal le temps de vider l'annulation précédente avant l'énoncé. */
const SPEECH_START_DELAY_MS = 80
const PRELOAD_AHEAD = 3

function webpOf(src: string): string {
  return src.replace(/\.jpg$/i, '.webp')
}

/** Précharge la variante webp (celle réellement servie par <picture>) pour qu'elle soit déjà en cache quand la question s'affiche — évite l'effet "texte affiché, photo qui arrive après", voir conversation du 2026-08-28. */
function preload(src: string) {
  if (typeof window === 'undefined') return
  const img = new window.Image()
  img.src = webpOf(src)
}

/** Photo de question — <picture> webp + fallback jpg chargée en eager (pas next/image, qui ajoute un aller-retour d'optimisation à la première demande) : identique à ExamenBlanc.tsx, déjà éprouvé. */
function QuestionPhoto({ src }: { src: string }) {
  return (
    <picture>
      <source srcSet={webpOf(src)} type="image/webp" />
      <img src={src} alt="" width={592} height={442} loading="eager" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
    </picture>
  )
}

/** Nettoyage avant synthèse vocale — copié de ExamenBlanc.tsx (voir ce fichier pour le détail des choix), gardé dupliqué ici pour ne pas toucher ce composant déjà validé. Prend la locale pour prononcer "km/h" (FR) / "km/u" (NL) en toutes lettres plutôt que lu tel quel — voir conversation du 2026-08-28. */
function cleanForSpeech(text: string, locale: 'fr' | 'nl'): string {
  return text
    .replace(/\bkm\/h\b/gi, locale === 'nl' ? 'kilometer per uur' : 'kilomètres par heure')
    .replace(/\bkm\/u\b/gi, 'kilometer per uur')
    .replace(/\(\s*(?:\.{2,}|…)\s*\)/g, ', ')
    .replace(/\.{2,}|…/g, ', ')
    .replace(/‰/g, ' pour mille ')
    .replace(/%/g, ' pour cent ')
    .replace(/\bMMA\b/g, 'M M A')
    .replace(/\bMEC\b/g, 'M E C')
    .replace(/([\p{Ll}])\.([\p{Lu}])/gu, '$1. $2')
    .replace(/[()[\]{}]/g, ' ')
    .replace(/[«»"]/g, '')
    .replace(/[^\p{L}\p{N}\s.,!?;:'’\-]/gu, ' ')
    .replace(/\s*,\s*,\s*/g, ', ')
    .replace(/^[,;]\s*/, '')
    .replace(/[,;]\s*$/, '')
    .replace(/\s{2,}/g, ' ')
    .trim()
    .replace(/\.$/, '')
}

/** Priorité aux voix natives/navigateur de meilleure qualité disponibles dans la langue demandée. */
function pickLivelyVoice(lang: 'fr' | 'nl'): SpeechSynthesisVoice | undefined {
  if (typeof window === 'undefined' || !window.speechSynthesis) return undefined
  const voices = window.speechSynthesis.getVoices().filter((v) => v.lang?.toLowerCase().startsWith(lang))
  if (voices.length === 0) return undefined
  const isQuality = (v: SpeechSynthesisVoice) => /google|natural|wavenet|neural/i.test(v.name)
  const isFeminine = (v: SpeechSynthesisVoice) =>
    /female|femme|vrouw|amelie|amélie|audrey|julie|léa|lea|céline|celine|charlotte|marie|sophie|emma|lotte|femke/i.test(
      v.name,
    )
  return (
    voices.find((v) => isQuality(v) && isFeminine(v)) ??
    voices.find(isQuality) ??
    voices.find(isFeminine) ??
    voices.find((v) => !v.localService) ??
    voices[0]
  )
}

/** Lit successivement l'énoncé puis les propositions, avec une courte pause entre chaque partie. */
function speakQuestion(
  question: Question,
  locale: 'fr' | 'nl',
  onEnd: () => void,
  isActive: () => boolean,
) {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    onEnd()
    return
  }
  window.speechSynthesis.cancel()
  const parts = [cleanForSpeech(question.prompt[locale], locale)]
  question.options.forEach((opt) => {
    parts.push(cleanForSpeech(opt.text[locale], locale))
  })
  const lang = locale === 'nl' ? 'nl-BE' : 'fr-FR'
  const voice = pickLivelyVoice(locale)

  const speakPart = (index: number) => {
    if (!isActive()) return
    const part = parts[index]
    const utterance = new SpeechSynthesisUtterance(part)
    utterance.lang = lang
    if (voice) utterance.voice = voice
    utterance.rate = 1.0
    utterance.pitch = 1.05
    const continueReading = () => {
      if (!isActive()) return
      if (index === parts.length - 1) {
        onEnd()
        return
      }
      window.setTimeout(() => {
        if (isActive()) speakPart(index + 1)
      }, SPEECH_PAUSE_MS)
    }
    utterance.onend = continueReading
    utterance.onerror = continueReading
    window.speechSynthesis.speak(utterance)
  }

  window.setTimeout(() => {
    if (isActive()) speakPart(0)
  }, SPEECH_START_DELAY_MS)
}

type SpeechState = 'idle' | 'playing' | 'paused'

export function TestDeNiveau({
  questions,
  themeLabels,
  onClose,
  email,
}: {
  questions: Question[]
  themeLabels: ThemeLabel[]
  onClose: () => void
  /** Email capturé par le tunnel de qualification (voir QuizFunnel.tsx) — si présent, le résultat lui est envoyé par email dès qu'il est calculé (voir plus bas). */
  email?: string
}) {
  const t = useTranslations('testDeNiveau')
  const locale = useLocale() as 'fr' | 'nl'
  const [step, setStep] = useState(0) // index de question, ou questions.length pour le résultat
  const [answers, setAnswers] = useState<TestAnswer[]>([])
  // Correction immédiate après chaque question (demande du 2026-09-14) — au
  // lieu d'avancer automatiquement 380ms après le clic, on affiche la bonne
  // réponse + l'explication et on attend un clic explicite sur "Suivant".
  // Reste vrai aussi en cas de timeout (voir plus bas) : même sans réponse,
  // autant montrer la bonne réponse plutôt que de juste passer à la suite.
  const [showCorrection, setShowCorrection] = useState(false)
  const [speechState, setSpeechState] = useState<SpeechState>('idle')
  // null uniquement lorsque le résultat est affiché.
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null)

  const isResult = step >= questions.length
  const current = questions[step]

  const result = useMemo(
    () => (isResult ? computeTestResult(answers, questions) : null),
    [isResult, answers, questions],
  )

  // Arrêt de la voix si on ferme le test.
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel()
    }
  }, [])

  // Amorce le chargement des voix le plus tôt possible (asynchrone sur Chrome notamment).
  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return
    window.speechSynthesis.getVoices()
  }, [])

  // Précharge les toutes premières photos dès l'ouverture du test.
  const didPreloadInitial = useRef(false)
  useEffect(() => {
    if (didPreloadInitial.current) return
    didPreloadInitial.current = true
    questions.slice(0, PRELOAD_AHEAD).forEach((q) => q.imageUrl && preload(q.imageUrl))
  }, [questions])

  // Précharge les 3 prochaines questions à chaque avancée.
  useEffect(() => {
    if (isResult) return
    questions.slice(step + 1, step + 1 + PRELOAD_AHEAD).forEach((q) => q.imageUrl && preload(q.imageUrl))
  }, [step, isResult, questions])

  // Jeton de génération : annuler une lecture peut encore déclencher onend/onerror dans certains navigateurs.
  const speechGenRef = useRef(0)
  const autoSpokenRef = useRef<string | null>(null)

  function guardedIdle(myGen: number, extra?: () => void) {
    return () => {
      if (speechGenRef.current !== myGen) return
      setSpeechState('idle')
      extra?.()
    }
  }

  function stopSpeech() {
    speechGenRef.current += 1
    if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel()
    setSpeechState('idle')
  }

  useEffect(() => {
    if (isResult || !current) return
    const spokenKey = `${current.id}:${locale}`
    if (autoSpokenRef.current === spokenKey) return
    autoSpokenRef.current = spokenKey
    stopSpeech()
    setSecondsLeft(ANSWER_SECONDS)
    const myGen = ++speechGenRef.current
    setSpeechState('playing')
    speakQuestion(current, locale, guardedIdle(myGen), () => speechGenRef.current === myGen)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current?.id, isResult, locale])

  // Chrono de réponse : décompte à la seconde, révèle la correction à 0 si
  // l'utilisateur n'a pas encore répondu (au lieu d'avancer directement) —
  // ne bloque jamais indéfiniment, mais montre quand même la bonne réponse.
  useEffect(() => {
    if (isResult || secondsLeft === null) return
    if (secondsLeft <= 0) {
      setShowCorrection(true)
      return
    }
    const id = window.setTimeout(() => setSecondsLeft((s) => (s !== null ? s - 1 : null)), 1000)
    return () => window.clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft, isResult])

  // Bouton audio à 3 états : lecture -> pause ; pause -> reprend ; repos -> relit depuis le début.
  function handleAudioButtonClick() {
    if (typeof window === 'undefined' || !window.speechSynthesis || !current) return
    if (speechState === 'playing') {
      window.speechSynthesis.pause()
      setSpeechState('paused')
    } else if (speechState === 'paused') {
      window.speechSynthesis.resume()
      setSpeechState('playing')
    } else {
      const myGen = ++speechGenRef.current
      setSpeechState('playing')
      speakQuestion(current, locale, guardedIdle(myGen), () => speechGenRef.current === myGen)
    }
  }

  function selectOption(optionId: string) {
    if (showCorrection) return
    stopSpeech()
    setAnswers((prev) => [...prev.filter((a) => a.questionId !== current.id), { questionId: current.id, optionId }])
    setShowCorrection(true)
  }

  function goToNextQuestion() {
    stopSpeech()
    setShowCorrection(false)
    setStep((s) => s + 1)
  }

  const weakThemeLabels = result
    ? result.weakestThemeSlugs.map((slug) => themeLabels.find((th) => th.slug === slug)?.label ?? slug)
    : []

  // Envoie le résultat par email dès qu'il est calculé — voir
  // api/test-result-email et conversation du 2026-09-09 (le site promettait
  // "on t'envoie ton résultat" sans jamais l'envoyer réellement). `sentRef`
  // évite un second envoi si le composant se re-rend une fois `isResult`
  // déjà vrai. Jamais bloquant pour l'affichage du résultat : une erreur ici
  // est juste loguée, pas montrée au visiteur.
  const resultEmailSentRef = useRef(false)
  useEffect(() => {
    if (!result || !email || resultEmailSentRef.current) return
    resultEmailSentRef.current = true
    fetch('/api/test-result-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, locale, score10: result.score10, weakThemeLabels }),
    })
      .then((res) => {
        // fetch() ne rejette que sur une erreur réseau — une réponse 4xx/5xx
        // (ex. rate limit, échec Resend) est un succès du point de vue de la
        // promesse et passait inaperçue sans ce contrôle explicite (trouvé
        // le 2026-09-09 : aucun email reçu après un vrai test complet, sans
        // aucune trace d'erreur nulle part).
        if (!res.ok) console.error('Échec de l’envoi du résultat par email (non bloquant), statut', res.status)
      })
      .catch((err) => {
        console.error('Échec de l’envoi du résultat par email (non bloquant) :', err)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result, email, locale])

  // Un point par thème couvert par le test — voir RadarChart.tsx (composant
  // déjà construit mais jamais branché ici avant le 2026-09-08).
  const radarData = result
    ? Object.entries(result.scoreByTheme).map(([slug, value]) => ({
        label: themeLabels.find((th) => th.slug === slug)?.label ?? slug,
        value,
      }))
    : []

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-ink/80 ${isResult ? 'p-0 sm:p-4' : 'p-4'}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.18 }}
        className={`panel relative w-full overflow-y-auto bg-cream !p-0 ${isResult ? 'max-h-dvh max-w-6xl sm:max-h-[92vh]' : 'max-h-[92vh] max-w-xl'}`}
      >
        <button
          onClick={onClose}
          aria-label="Fermer"
          className="absolute right-3 top-3 z-10 border-[3px] border-ink bg-cream p-1.5 text-ink hover:bg-creamdim"
        >
          <X size={18} />
        </button>

        {!isResult && (
          <div className="p-5 sm:p-7">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="border-[3px] border-ink bg-yellow px-3 py-1 font-display text-xs uppercase tracking-wide">
                  {t('badge')}
                </span>
                <span className="font-display text-xs text-ink/60">
                  {t('questionOf', { current: step + 1, total: questions.length })}
                </span>
              </div>
              {secondsLeft !== null && !showCorrection && (
                <span
                  className={`border-[3px] border-ink px-3 py-1 font-display text-xs tabular-nums ${
                    secondsLeft <= 5 ? 'bg-brick text-cream' : 'bg-ink text-cream'
                  }`}
                >
                  ⏱ {t('timeLeft', { seconds: secondsLeft })}
                </span>
              )}
            </div>

            <div className="mb-8">
              <ProgressBar value={step / questions.length} />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {current.imageUrl && (
                  <div className="relative mb-3 h-48 w-full overflow-hidden border-[3px] border-ink bg-creamdim sm:h-64 md:h-72">
                    <QuestionPhoto src={current.imageUrl} />
                  </div>
                )}

                <div className="mb-6 flex items-start gap-3">
                  <button
                    type="button"
                    onClick={handleAudioButtonClick}
                    aria-live="polite"
                    aria-label={
                      speechState === 'playing' ? t('audioPlaying') : speechState === 'paused' ? t('audioResume') : t('audioListen')
                    }
                    title={
                      speechState === 'playing' ? t('audioPlaying') : speechState === 'paused' ? t('audioResume') : t('audioListen')
                    }
                    className={`flex h-11 w-11 flex-none items-center justify-center border-[3px] border-ink text-lg transition-colors ${
                      speechState === 'playing'
                        ? 'bg-forest text-cream'
                        : speechState === 'paused'
                          ? 'bg-yellow text-ink'
                          : 'bg-cream text-ink hover:bg-creamdim'
                    }`}
                  >
                    <span aria-hidden>{speechState === 'playing' ? '⏸' : speechState === 'paused' ? '▶️' : '🔊'}</span>
                  </button>
                  <h3 className="flex-1 pt-1.5 font-display text-xl leading-snug sm:pt-1 sm:text-2xl">
                    {current.prompt[locale]}
                  </h3>
                </div>

                {current.penaltyPoints === 5 && (
                  <p className="mb-4 inline-flex border-[3px] border-ink bg-brick px-3 py-1.5 font-display text-xs uppercase tracking-wide text-cream shadow-hard-xs">
                    {locale === 'fr' ? 'Faute grave · −5 points' : 'Zware fout · −5 punten'}
                  </p>
                )}

                <div className="grid gap-3">
                  {current.options.map((opt) => {
                    const selected = answers.find((a) => a.questionId === current.id)?.optionId === opt.id
                    // Avant réponse (ou pendant l'affichage) : jaune si sélectionnée, neutre sinon. Une fois
                    // `showCorrection` vrai : la bonne réponse ressort en vert (toujours), le choix erroné de
                    // l'utilisateur en rouge, le reste s'efface (ni vrai ni faux, pas d'intérêt à le souligner).
                    let stateClasses = selected ? 'border-ink bg-yellow' : 'border-ink/25 hover:border-ink'
                    if (showCorrection) {
                      if (opt.correct) stateClasses = 'border-forest bg-forest/15'
                      else if (selected) stateClasses = 'border-brick bg-brick/10'
                      else stateClasses = 'border-ink/15 text-ink/40'
                    }
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => selectOption(opt.id)}
                        disabled={showCorrection}
                        className={`flex items-center justify-between gap-2 border-[3px] px-4 py-3.5 text-left text-sm font-semibold transition-colors ${stateClasses}`}
                      >
                        <span>{opt.text[locale]}</span>
                        {showCorrection && opt.correct && <Check size={16} className="flex-none text-forest" />}
                        {showCorrection && selected && !opt.correct && <X size={16} className="flex-none text-brick" />}
                      </button>
                    )
                  })}
                </div>

                {showCorrection && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="mt-4 border-[3px] border-ink bg-cream p-4"
                  >
                    <p className="mb-1.5 font-display text-[11px] uppercase tracking-wide text-forest">{t('correctionLabel')}</p>
                    <p className="mb-4 text-sm leading-relaxed text-ink/80">{current.explanation[locale]}</p>
                    <button onClick={goToNextQuestion} className="btn-comic w-full px-4 py-3 text-sm">
                      {t('next')} →
                    </button>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {isResult && result && (
          <div className="px-2 pb-3 pt-12 sm:p-7">
            <ResumeHook
              score10={result.score10}
              answerStates={questions.map((question) => {
                const answer = answers.find((item) => item.questionId === question.id)
                return Boolean(answer && question.options.find((option) => option.id === answer.optionId)?.correct)
              })}
              diagnostics={Object.entries(result.scoreByTheme).map(([slug, value]) => {
                const total = questions.filter((question) => question.themeSlug === slug).length
                return { label: themeLabels.find((theme) => theme.slug === slug)?.label ?? slug, errors: total - Math.round((value / 100) * total), total }
              }).filter((item) => item.errors > 0).sort((a, b) => b.errors - a.errors)}
              radarData={radarData}
              onSkip={onClose}
            />
          </div>
        )}
      </motion.div>
    </div>
  )
}

