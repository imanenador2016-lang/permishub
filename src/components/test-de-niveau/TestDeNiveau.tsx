'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import type { Question } from '@/domain/quiz'
import { computeTestResult, type TestAnswer } from '@/lib/test-de-niveau'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { ResumeHook } from './ResumeHook'
import { X } from 'lucide-react'

type ThemeLabel = { slug: string; label: string }

/** Temps laissé pour répondre une fois la lecture audio de la question terminée — même logique que ExamenBlanc.tsx, voir conversation du 2026-08-27/28. */
const ANSWER_SECONDS = 15
/** Garde-fou si la synthèse vocale ne déclenche jamais onend/onerror. */
const SPEECH_FALLBACK_MS = 20000
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
    .replace(/([a-zàâäéèêëïîôöùûüç])\.([A-ZÀÂÄÉÈÊËÏÎÔÖÙÛÜÇ])/g, '$1. $2')
    .replace(/[()[\]{}]/g, ' ')
    .replace(/[«»""'']/g, '')
    .replace(/[^\p{L}\p{N}\s.,!?;:'’\-]/gu, ' ')
    .replace(/\s*,\s*,\s*/g, ', ')
    .replace(/^[,;]\s*/, '')
    .replace(/[,;]\s*$/, '')
    .replace(/\s{2,}/g, ' ')
    .trim()
    .replace(/\.$/, '')
}

/** Voix douce dans la langue demandée — priorité aux voix réseau haute qualité portant un prénom féminin
 * courant (voir ExamenBlanc.tsx pour le même choix), sinon n'importe quelle voix de qualité, sinon la première
 * voix disponible pour cette langue. */
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

/** Lit la question puis ses choix, puis appelle `onEnd` — déclenche le chrono de réponse, voir conversation du
 * 2026-08-27/28. Débit ralenti et intonation adoucie ("voix douce et motivante") — voir conversation du
 * 2026-08-28. */
function speakQuestion(question: Question, locale: 'fr' | 'nl', onEnd: () => void) {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    onEnd()
    return
  }
  window.speechSynthesis.cancel()
  // Pas de préfixe "A, B, C" devant chaque réponse : les boutons à l'écran
  // n'affichent aucune lettre, et pour des questions comme "Voiture A / B /
  // C" le texte de la réponse contient déjà l'identifiant — le préfixe
  // redondant rendait l'audio confus (signalé le 2026-09-08).
  //
  // Chaque partie (question, puis chaque réponse) est lue comme un énoncé
  // séparé plutôt que jointe par de simples points dans un seul texte : la
  // pause entre deux appels à speak() est nette et fiable, alors qu'un
  // point de fin de phrase à l'intérieur d'un même énoncé était parfois
  // quasi inaudible avec certaines voix ("Voiture A. Voiture B." collé en
  // "Voiture A Voiture B" — toujours signalé après le premier correctif).
  const parts = [cleanForSpeech(question.prompt[locale], locale)]
  question.options.forEach((opt) => parts.push(cleanForSpeech(opt.text[locale], locale)))
  const lang = locale === 'nl' ? 'nl-BE' : 'fr-FR'
  const voice = pickLivelyVoice(locale)

  parts.forEach((part, i) => {
    const utterance = new SpeechSynthesisUtterance(part)
    utterance.lang = lang
    if (voice) utterance.voice = voice
    utterance.rate = 0.88
    utterance.pitch = 0.92
    if (i === parts.length - 1) {
      utterance.onend = onEnd
      utterance.onerror = onEnd
    }
    window.speechSynthesis.speak(utterance)
  })
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
  const [speechState, setSpeechState] = useState<SpeechState>('idle')
  // null = lecture audio pas encore terminée (chrono pas démarré).
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

  // Lecture automatique de la question dès son affichage — le chrono de réponse démarre à la fin de la lecture.
  const spokenForRef = useRef<string | null>(null)
  // Jeton de génération : avancer avant la fin de la lecture annule l'utterance en cours, ce qui déclenche
  // quand même son onend/onerror — sans ce garde-fou ce callback tardif redémarrerait par erreur le chrono
  // de la NOUVELLE question, voir ExamenBlanc.tsx.
  const speechGenRef = useRef(0)

  function guardedIdle(myGen: number, extra?: () => void) {
    return () => {
      if (speechGenRef.current !== myGen) return
      setSpeechState('idle')
      extra?.()
    }
  }

  useEffect(() => {
    if (isResult || !current) return
    if (spokenForRef.current === current.id) return
    spokenForRef.current = current.id
    setSecondsLeft(null)
    const myGen = ++speechGenRef.current
    const startTimer = () => {
      if (speechGenRef.current !== myGen) return
      setSecondsLeft(ANSWER_SECONDS)
    }
    setSpeechState('playing')
    speakQuestion(current, locale, guardedIdle(myGen, startTimer))
    window.setTimeout(startTimer, SPEECH_FALLBACK_MS)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current?.id, isResult, locale])

  // Chrono de réponse : décompte à la seconde, passe automatiquement à la question suivante à 0
  // si l'utilisateur n'a pas encore répondu — ne bloque jamais indéfiniment.
  useEffect(() => {
    if (isResult || secondsLeft === null) return
    if (secondsLeft <= 0) {
      setStep((s) => s + 1)
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
      speakQuestion(current, locale, guardedIdle(myGen))
    }
  }

  function selectOption(optionId: string) {
    setAnswers((prev) => [...prev.filter((a) => a.questionId !== current.id), { questionId: current.id, optionId }])
    window.setTimeout(() => setStep((s) => s + 1), 380)
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.18 }}
        className="panel relative max-h-[92vh] w-full max-w-xl overflow-y-auto bg-cream !p-0"
      >
        <button
          onClick={onClose}
          aria-label="Fermer"
          className="absolute right-3 top-3 z-10 border-[3px] border-ink bg-cream p-1.5 text-ink hover:bg-creamdim"
        >
          <X size={18} />
        </button>

        {!isResult && (
          <div className="p-6 sm:p-8">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="border-[3px] border-ink bg-yellow px-3 py-1 font-display text-xs uppercase tracking-wide">
                  {t('badge')}
                </span>
                <span className="font-display text-xs text-ink/60">
                  {t('questionOf', { current: step + 1, total: questions.length })}
                </span>
              </div>
              {secondsLeft !== null && (
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

                <div className="grid gap-3">
                  {current.options.map((opt) => {
                    const selected = answers.find((a) => a.questionId === current.id)?.optionId === opt.id
                    return (
                      <button
                        key={opt.id}
                        onClick={() => selectOption(opt.id)}
                        className={`border-[3px] px-4 py-3.5 text-left text-sm font-semibold transition-colors ${
                          selected ? 'border-ink bg-yellow' : 'border-ink/25 hover:border-ink'
                        }`}
                      >
                        {opt.text[locale]}
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {isResult && result && (
          <div className="p-6 sm:p-8">
            <ResumeHook score10={result.score10} weakThemeLabels={weakThemeLabels} radarData={radarData} onSkip={onClose} />
          </div>
        )}
      </motion.div>
    </div>
  )
}
