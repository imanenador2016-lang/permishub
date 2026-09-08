'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import type { ExamenPhotoQuestion } from '@/domain/examen-photo'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { createCheckoutSession } from '@/lib/payment'
import { formatPrice } from '@/domain/centers'
import { RESUME_OFFER, EXAMENS_ILLIMITES_OFFER } from '@/content/pricing-config'
import { computeExamenBlancResult, type ExamenBlancAnswer, type ExamenBlancResult } from '@/lib/examen-blanc'

type Phase = 'intro' | 'running' | 'result'

const MILESTONES = [25, 40]
const PRELOAD_AHEAD = 3
/** Temps laissé pour répondre une fois la lecture audio de la question terminée (voir conversation du 2026-08-27). */
const ANSWER_SECONDS = 15
/** Garde-fou : démarre quand même le chrono si la synthèse vocale ne déclenche jamais onend/onerror (voix indisponible, navigateur capricieux) — pour ne jamais bloquer un visiteur indéfiniment sur une question. */
const SPEECH_FALLBACK_MS = 20000

function letterOf(choix: string): string {
  return choix.match(/^([A-D])[.:]/)?.[1] ?? choix[0]
}

function webpOf(src: string): string {
  return src.replace(/\.jpg$/i, '.webp')
}

/** Précharge l'image (variante webp — celle réellement servie par <picture> dans les navigateurs modernes) pour qu'elle soit déjà en cache navigateur quand la question s'affiche. */
function preload(src: string) {
  if (typeof window === 'undefined') return
  const img = new window.Image()
  img.src = webpOf(src)
}

/** Photo de question — <picture> webp + fallback jpg, taille intrinsèque déclarée pour ne pas faire sauter la mise en page pendant le chargement. */
function QuestionPhoto({ src, className = '' }: { src: string; className?: string }) {
  return (
    <picture>
      <source srcSet={webpOf(src)} type="image/webp" />
      <img
        src={src}
        alt=""
        width={592}
        height={442}
        loading="eager"
        decoding="async"
        className={`absolute inset-0 h-full w-full object-cover ${className}`}
      />
    </picture>
  )
}

/**
 * Nettoie un texte avant de le donner à la synthèse vocale — voir
 * conversation du 2026-08-27/28. Deux catégories bien distinctes :
 *
 * 1. Ce qu'on RETIRE (jamais utile à l'oral, parfois mal géré par
 *    certains moteurs) : "..."/"…" (sinon lus "point point point"),
 *    parenthèses et guillemets (on garde le texte qu'ils contiennent),
 *    et tout symbole hors lettres/chiffres/ponctuation de phrase standard
 *    (astérisques, dièses, crochets, barres verticales...).
 * 2. Ce qu'on GARDE tel quel : la ponctuation de phrase normale
 *    (. , ! ? : ;) — un moteur TTS de navigateur ne la prononce jamais
 *    littéralement ("point", "point d'interrogation"...), elle sert au
 *    contraire à poser les pauses et l'intonation qui rendent une lecture
 *    naturelle. La supprimer rendrait la voix plus plate, pas moins
 *    robotique — vérifié en conditions réelles.
 */
function cleanForSpeech(text: string): string {
  return text
    .replace(/\bkm\/h\b/gi, 'kilomètres par heure') // sinon lu "km h" — voir conversation du 2026-08-28
    .replace(/\(\s*(?:\.{2,}|…)\s*\)/g, ', ') // "(...)" / "(…)" — blanc à compléter type "a (...) ans" — traité comme une seule pause, pas parenthèse + ellipsis séparément
    .replace(/\.{2,}|…/g, ', ')
    .replace(/([a-zàâäéèêëïîôöùûüç])\.([A-ZÀÂÄÉÈÊËÏÎÔÖÙÛÜÇ])/g, '$1. $2') // espace manquant après un point avant une majuscule (artefact d'extraction, ex. "nombre.À")
    .replace(/[()[\]{}]/g, ' ') // parenthèses/crochets — on garde le contenu, on retire juste les caractères
    .replace(/[«»""'']/g, '') // guillemets français/anglais
    .replace(/[^\p{L}\p{N}\s.,!?;:'’\-]/gu, ' ') // tout symbole restant hors lettres/chiffres/ponctuation de phrase/apostrophe/tiret
    .replace(/\s*,\s*,\s*/g, ', ') // double virgule (ex. ellipsis en tête d'un texte qui commence déjà par une virgule ajoutée)
    .replace(/^[,;]\s*/, '') // virgule orpheline en tête (ellipsis en tout début de phrase)
    .replace(/[,;]\s*$/, '') // virgule orpheline en fin (ellipsis en toute fin de phrase)
    .replace(/\s{2,}/g, ' ')
    .trim()
    .replace(/\.$/, '') // point final retiré — parts.join('. ') dans speakQuestion en ajoute un seul, propre, entre chaque partie
}

/** Version lue d'un choix — enlève le préfixe "A." / "B:" / "C/" écrit pour l'affichage et le remplace par une simple virgule (pause naturelle, jamais lue comme un mot) tout en gardant la lettre, utile pour savoir quoi sélectionner à l'oreille. */
function speechForChoice(choix: string): string {
  const m = choix.match(/^([A-D])\s?[./:]\s*/)
  const rest = cleanForSpeech(m ? choix.slice(m[0].length) : choix)
  return m ? `${m[1]}, ${rest}` : rest
}

/** Choisit une voix française douce plutôt que la voix système par défaut, souvent plate — priorité aux voix
 * réseau haute qualité (Google, voix "Natural"/"Neural") portant un prénom féminin courant (plus proche du
 * rendu "douce et motivante" demandé, voir conversation du 2026-08-28), puis n'importe quelle voix de qualité,
 * puis n'importe quelle voix "féminine", puis la première voix fr disponible. Peut renvoyer undefined tant que
 * `getVoices()` n'a pas fini de charger (navigateur-dépendant) — l'appelant retombe alors sur `utterance.lang` seul. */
function pickLivelyVoice(): SpeechSynthesisVoice | undefined {
  if (typeof window === 'undefined' || !window.speechSynthesis) return undefined
  const fr = window.speechSynthesis.getVoices().filter((v) => v.lang?.toLowerCase().startsWith('fr'))
  if (fr.length === 0) return undefined
  const isQuality = (v: SpeechSynthesisVoice) => /google|natural|wavenet|neural/i.test(v.name)
  const isFeminine = (v: SpeechSynthesisVoice) =>
    /female|femme|amelie|amélie|audrey|julie|léa|lea|céline|celine|charlotte|marie|sophie|emma/i.test(v.name)
  return (
    fr.find((v) => isQuality(v) && isFeminine(v)) ??
    fr.find(isQuality) ??
    fr.find(isFeminine) ??
    fr.find((v) => !v.localService) ??
    fr[0]
  )
}

/** Lit la question à voix haute puis appelle `onEnd` — sert à déclencher le chronomètre de réponse une fois la
 * lecture terminée (voir conversation du 2026-08-27). `onEnd` est appelé immédiatement si la synthèse vocale
 * n'est pas disponible. Débit ralenti et intonation adoucie pour une voix douce et posée plutôt qu'enjouée et
 * rapide — voir conversation du 2026-08-28 ("elle parle vite, je veux une voix douce et motivante"). */
function speakQuestion(question: ExamenPhotoQuestion, onEnd: () => void) {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    onEnd()
    return
  }
  window.speechSynthesis.cancel()
  const parts = [cleanForSpeech(question.question)]
  if (question.type === 'choix_multiple') parts.push(...question.choix.map(speechForChoice))
  if (question.type === 'oui_non') parts.push('Oui, ou non ?')
  const utterance = new SpeechSynthesisUtterance(parts.join('. '))
  utterance.lang = 'fr-FR'
  const voice = pickLivelyVoice()
  if (voice) utterance.voice = voice
  utterance.rate = 0.88
  utterance.pitch = 0.92
  utterance.onend = onEnd
  utterance.onerror = onEnd
  window.speechSynthesis.speak(utterance)
}

type SpeechState = 'idle' | 'playing' | 'paused'

export function ExamenBlanc({ questions, hideCorrection = false }: { questions: ExamenPhotoQuestion[]; hideCorrection?: boolean }) {
  const t = useTranslations('examenBlanc')
  const to = useTranslations('offers')
  const tc = useTranslations('common')
  const locale = useLocale() as 'fr' | 'nl'
  const [phase, setPhase] = useState<Phase>('intro')
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<ExamenBlancAnswer[]>([])
  const [numericDraft, setNumericDraft] = useState('')
  const [checkoutMessage, setCheckoutMessage] = useState<string | null>(null)
  const [checkoutMessageSecondary, setCheckoutMessageSecondary] = useState<string | null>(null)
  const [checkoutMessageCorrection, setCheckoutMessageCorrection] = useState<string | null>(null)
  // Aucun retour visuel pendant l'appel à Stripe sur ces 4 boutons — même bug
  // que OfferCard.tsx, jamais corrigé ici (signalé le 2026-09-08 : "il faut
  // un truc de redirection sur tout, pas juste le résumé").
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [checkoutLoadingSecondary, setCheckoutLoadingSecondary] = useState(false)
  const [checkoutLoadingCorrection, setCheckoutLoadingCorrection] = useState(false)
  // État du bouton audio (écouter / pause / reprendre) — voir conversation du 2026-08-28.
  const [speechState, setSpeechState] = useState<SpeechState>('idle')
  // null = lecture audio pas encore terminée (chrono pas démarré) — voir conversation du 2026-08-27.
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null)

  const total = questions.length
  const current = questions[index]
  const currentAnswer = answers.find((a) => a.questionId === current?.id)?.value

  useEffect(() => {
    setNumericDraft(currentAnswer ?? '')
  }, [index, currentAnswer])

  // Arrêt de la voix si on quitte l'écran d'examen (changement de phase/démontage).
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel()
    }
  }, [])

  // Amorce le chargement de la liste des voix (asynchrone sur certains
  // navigateurs, notamment Chrome) le plus tôt possible, pour avoir de
  // meilleures chances qu'une voix fr de qualité soit déjà disponible au
  // moment de la première lecture — voir pickLivelyVoice ci-dessus.
  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return
    window.speechSynthesis.getVoices()
  }, [])

  // Précharge dès l'arrivée sur la page (écran d'intro compris) les toutes
  // premières photos, pour que la question 1 n'ait pas de retard à
  // l'affichage — voir conversation du 2026-08-24 (photos en retard sur le
  // texte).
  const didPreloadInitial = useRef(false)
  useEffect(() => {
    if (didPreloadInitial.current) return
    didPreloadInitial.current = true
    questions.slice(0, PRELOAD_AHEAD).forEach((q) => preload(q.image))
  }, [questions])

  // Précharge les 3 prochaines questions à chaque avancée dans l'examen.
  useEffect(() => {
    if (phase !== 'running') return
    questions.slice(index + 1, index + 1 + PRELOAD_AHEAD).forEach((q) => preload(q.image))
  }, [index, phase, questions])

  // Lecture automatique de la question dès son affichage. Le bouton sert à
  // mettre en pause / reprendre / relancer — voir handleAudioButtonClick.
  // Le chrono de réponse démarre à la fin de la lecture.
  const spokenForRef = useRef<number | null>(null)
  // Jeton de génération : passer à la question suivante avant la fin de la
  // lecture annule l'utterance en cours, ce qui déclenche quand même son
  // onend/onerror — sans ce garde-fou, ce callback tardif redémarrerait par
  // erreur le chrono (ou l'état du bouton) de la NOUVELLE question avant
  // même la fin de sa propre lecture.
  const speechGenRef = useRef(0)

  function guardedIdle(myGen: number, extra?: () => void) {
    return () => {
      if (speechGenRef.current !== myGen) return
      setSpeechState('idle')
      extra?.()
    }
  }

  useEffect(() => {
    if (phase !== 'running' || !current) return
    if (spokenForRef.current === current.id) return
    spokenForRef.current = current.id
    setSecondsLeft(null)
    const myGen = ++speechGenRef.current
    const startTimer = () => {
      if (speechGenRef.current !== myGen) return
      setSecondsLeft(ANSWER_SECONDS)
    }
    setSpeechState('playing')
    speakQuestion(current, guardedIdle(myGen, startTimer))
    window.setTimeout(startTimer, SPEECH_FALLBACK_MS)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current?.id, phase])

  // Chrono de réponse : décompte à la seconde une fois lancé, passe
  // automatiquement à la question suivante (ou à la correction sur la
  // dernière) à 0 — laisse le suspense entier jusqu'au score final, voir
  // conversation du 2026-08-27.
  useEffect(() => {
    if (phase !== 'running' || secondsLeft === null) return
    if (secondsLeft <= 0) {
      if (index < total - 1) goNext()
      else finish()
      return
    }
    const id = window.setTimeout(() => setSecondsLeft((s) => (s !== null ? s - 1 : null)), 1000)
    return () => window.clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft, phase])

  // Bouton audio à 3 états : lecture en cours -> pause ; en pause ->
  // reprend ; au repos (fini, ou pas encore lancé) -> relit depuis le
  // début. Ne touche jamais au chrono de réponse, déjà géré séparément.
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
      speakQuestion(current, guardedIdle(myGen))
    }
  }

  const result: ExamenBlancResult | null = useMemo(
    () => (phase === 'result' ? computeExamenBlancResult(answers, questions) : null),
    [phase, answers, questions],
  )

  function setAnswer(value: string) {
    setAnswers((prev) => [...prev.filter((a) => a.questionId !== current.id), { questionId: current.id, value }])
  }

  function goNext() {
    if (index < total - 1) setIndex((i) => i + 1)
  }
  function goPrevious() {
    if (index > 0) setIndex((i) => i - 1)
  }
  function finish() {
    if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel()
    setPhase('result')
  }
  function restart() {
    if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel()
    setAnswers([])
    setIndex(0)
    spokenForRef.current = null
    setSecondsLeft(null)
    setSpeechState('idle')
    setPhase('intro')
  }

  async function unlock(
    offer: { id: string; priceCents: number },
    setMsg: (m: string | null) => void,
    setLoading: (l: boolean) => void,
  ) {
    setLoading(true)
    try {
      const { url } = await createCheckoutSession(offer)
      window.location.href = url
    } catch (err) {
      setMsg(err instanceof Error ? err.message : 'Une erreur est survenue.')
      setLoading(false)
    }
  }

  const unansweredCount = total - answers.length
  const milestoneHit = MILESTONES.includes(index + 1)

  if (phase === 'intro') {
    return (
      <div className="panel p-6 text-center sm:p-8">
        <span className="mb-4 inline-block w-fit -rotate-2 border-[3px] border-ink bg-yellow px-3 py-1.5 font-display text-xs">
          {t('badge')}
        </span>
        <h1 className="mb-3 font-display text-2xl tracking-tight text-ink sm:text-3xl">{t('title')}</h1>
        <p className="mx-auto mb-6 max-w-lg text-sm text-ink/70 sm:text-base">{t('introPhoto', { total })}</p>
        <Button size="lg" onClick={() => setPhase('running')}>
          {t('start')} →
        </Button>
      </div>
    )
  }

  if (phase === 'running' && current) {
    return (
      <div className="panel p-4 sm:p-8">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
          <span className="font-display text-xs text-ink/60">{t('questionOf', { current: index + 1, total })}</span>
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

        <div className="mb-3">
          <ProgressBar value={index / total} />
        </div>

        {milestoneHit && (
          <p className="mb-3 border-[3px] border-ink bg-yellow px-3 py-2 text-center text-xs font-bold">
            {t(index + 1 === 25 ? 'milestone25' : 'milestone40')}
          </p>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Hauteur bornée (pas aspect-ratio, qui grandit avec la largeur
                et pousse le reste hors écran sur les grands téléphones) —
                l'image reste bien visible sans dominer tout l'écran, voir
                conversation du 2026-08-28 (format de référence envoyé). */}
            <div className="relative mb-3 h-48 w-full overflow-hidden border-[3px] border-ink bg-creamdim sm:h-64 md:h-72">
              <QuestionPhoto src={current.image} />
            </div>

            <div className="mb-3 flex items-start gap-3">
              <button
                type="button"
                onClick={handleAudioButtonClick}
                aria-live="polite"
                aria-label={
                  speechState === 'playing' ? t('audioPlaying') : speechState === 'paused' ? t('audioResume') : t('audioListen')
                }
                title={speechState === 'playing' ? t('audioPlaying') : speechState === 'paused' ? t('audioResume') : t('audioListen')}
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

              <h2 className="flex-1 pt-1.5 font-display text-base leading-snug sm:pt-1 sm:text-lg md:text-xl">
                {current.question}
              </h2>
            </div>

            {current.gravite === 'grave' && (
              <p className="mb-3 inline-block border-[3px] border-brick bg-cream px-2 py-1 text-xs font-bold text-brick">
                {t('gravePill')}
              </p>
            )}

            {current.type === 'choix_multiple' && (
              <div className="grid gap-2 sm:gap-3">
                {current.choix.map((opt) => {
                  const letter = letterOf(opt)
                  const selected = currentAnswer === letter
                  return (
                    <button
                      key={letter}
                      onClick={() => setAnswer(letter)}
                      className={`border-[3px] px-4 py-3.5 text-left text-sm font-semibold transition-colors ${
                        selected ? 'border-ink bg-yellow' : 'border-ink/25 hover:border-ink'
                      }`}
                    >
                      {opt}
                    </button>
                  )
                })}
              </div>
            )}

            {current.type === 'oui_non' && (
              <div className="grid grid-cols-2 gap-3">
                {(['OUI', 'NON'] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setAnswer(v)}
                    className={`border-[3px] px-4 py-3.5 text-center font-display text-sm transition-colors ${
                      currentAnswer === v ? 'border-ink bg-yellow' : 'border-ink/25 hover:border-ink'
                    }`}
                  >
                    {v === 'OUI' ? t('yes') : t('no')}
                  </button>
                ))}
              </div>
            )}

            {current.type === 'numerique' && (
              <input
                type="number"
                inputMode="numeric"
                value={numericDraft}
                onChange={(e) => {
                  setNumericDraft(e.target.value)
                  setAnswer(e.target.value)
                }}
                placeholder={t('numericPlaceholder')}
                className="w-full border-[3px] border-ink bg-cream px-4 py-3.5 text-sm font-semibold outline-none focus:bg-yellow/20"
              />
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 sm:mt-6">
          <Button variant="secondary" onClick={goPrevious} disabled={index === 0} className="px-4 sm:px-5">
            ← {t('previous')}
          </Button>

          {index < total - 1 ? (
            <Button onClick={goNext} className="px-4 sm:px-5">
              {t('next')} →
            </Button>
          ) : (
            <Button onClick={finish} className="px-4 sm:px-5">
              {hideCorrection ? t('seeResultsFree') : t('seeResults')}
            </Button>
          )}
        </div>

        {index === total - 1 && unansweredCount > 0 && (
          <p className="mt-4 text-center text-xs font-medium text-brick">
            {t('unansweredWarning', { count: unansweredCount })}
          </p>
        )}
      </div>
    )
  }

  if (phase === 'result' && result) {
    return (
      <div className="flex flex-col gap-6">
        <div className="panel p-6 text-center sm:p-8">
          <h1 className="mb-2 font-display text-2xl tracking-tight text-ink sm:text-3xl">{t('resultTitle')}</h1>
          <p className="mb-3 font-display text-3xl text-ink sm:text-4xl">
            {t('scoreLabel', { score: Math.max(result.score, 0), total: result.total })}
          </p>
          <span
            className={`mb-3 inline-block border-[3px] border-ink px-4 py-1.5 font-display text-sm ${
              result.passed ? 'bg-forest text-cream' : 'bg-brick text-cream'
            }`}
          >
            {result.passed ? t('passed') : t('failed')}
          </span>
          <p className="mb-1 text-sm text-ink/70">
            {t('faultsBreakdown', { graves: result.gravesFautes, normales: result.normalesFautes })}
          </p>
          <p className="mx-auto mb-6 max-w-md text-xs italic text-ink/50">{t('adaptedThresholdNote')}</p>

          {!result.passed ? (
            <div className="mx-auto max-w-md border-[3px] border-ink bg-yellow/20 p-5 text-left">
              <span className="mb-3 inline-block w-fit -rotate-2 border-[3px] border-ink bg-yellow px-3 py-1 font-display text-xs">
                {t('failOfferEyebrow')}
              </span>
              <h3 className="mb-3 font-display text-lg leading-snug">{t('failOfferTitle')}</h3>

              <button
                onClick={() => unlock(EXAMENS_ILLIMITES_OFFER, setCheckoutMessage, setCheckoutLoading)}
                disabled={checkoutLoading}
                className="btn-comic block w-full px-5 py-4 text-base disabled:opacity-60"
              >
                {checkoutLoading
                  ? tc('redirecting')
                  : `${to('cta')} ${to('examensTitle')} — ${formatPrice(EXAMENS_ILLIMITES_OFFER.priceCents, locale)} →`}
              </button>
              {checkoutMessage && <p className="mt-1.5 text-center text-xs text-ink/60">{checkoutMessage}</p>}

              <button
                onClick={() => unlock(RESUME_OFFER, setCheckoutMessageSecondary, setCheckoutLoadingSecondary)}
                disabled={checkoutLoadingSecondary}
                className="mt-4 block w-full text-center text-xs font-semibold text-ink/70 underline decoration-2 underline-offset-4 hover:text-brick disabled:opacity-60"
              >
                {checkoutLoadingSecondary
                  ? tc('redirecting')
                  : `${t('resumeSecondaryPrefix')} ${to('resumeTitle')} — ${formatPrice(RESUME_OFFER.priceCents, locale)} →`}
              </button>
              {checkoutMessageSecondary && <p className="mt-1.5 text-center text-xs text-ink/60">{checkoutMessageSecondary}</p>}
            </div>
          ) : (
            <div className="mx-auto max-w-md border-[3px] border-ink bg-forest/10 p-5 text-left">
              <h3 className="mb-2 font-display text-base leading-snug">{t('passOfferTitle')}</h3>
              <p className="mb-3 text-sm text-ink/70">{t('passOfferBody')}</p>
              <button
                onClick={() => unlock(RESUME_OFFER, setCheckoutMessage, setCheckoutLoading)}
                disabled={checkoutLoading}
                className="block w-full text-center text-sm font-semibold text-ink underline decoration-2 underline-offset-4 hover:text-brick disabled:opacity-60"
              >
                {checkoutLoading ? tc('redirecting') : `${to('resumeTitle')} — ${formatPrice(RESUME_OFFER.priceCents, locale)} →`}
              </button>
              {checkoutMessage && <p className="mt-1.5 text-center text-xs text-ink/60">{checkoutMessage}</p>}
            </div>
          )}

          <div className="mt-6">
            <Button variant="secondary" onClick={restart}>
              {t('retry')}
            </Button>
          </div>
        </div>

        {hideCorrection ? (
          <div className="panel p-6 text-center sm:p-8">
            <h2 className="mb-2 font-display text-lg">{t('correctionLockedTitle')}</h2>
            <p className="mx-auto mb-4 max-w-md text-sm text-ink/70">{t('correctionLockedBody')}</p>
            <button
              onClick={() => unlock(EXAMENS_ILLIMITES_OFFER, setCheckoutMessageCorrection, setCheckoutLoadingCorrection)}
              disabled={checkoutLoadingCorrection}
              className="btn-comic mx-auto block w-full max-w-sm px-5 py-4 text-base disabled:opacity-60"
            >
              {checkoutLoadingCorrection
                ? tc('redirecting')
                : `${to('cta')} ${to('examensTitle')} — ${formatPrice(EXAMENS_ILLIMITES_OFFER.priceCents, locale)} →`}
            </button>
            {checkoutMessageCorrection && <p className="mt-1.5 text-center text-xs text-ink/60">{checkoutMessageCorrection}</p>}
          </div>
        ) : (
          <div className="panel p-6 sm:p-8">
            <h2 className="mb-5 font-display text-lg">{t('correctionTitle')}</h2>
            <div className="flex flex-col gap-5">
              {result.perQuestion.map((r) => (
                <div key={r.question.id} className={`border-[3px] p-4 ${r.correct ? 'border-forest' : 'border-brick'}`}>
                  <p className="mb-2 text-xs font-bold uppercase tracking-wide text-ink/50">
                    {t('questionOf', { current: r.question.id, total: result.total })}
                    {r.question.gravite === 'grave' && <span className="ml-2 text-brick">{t('gravePill')}</span>}
                  </p>

                  <div className="relative mb-3 aspect-[4/3] w-full max-w-sm overflow-hidden border-[3px] border-ink bg-creamdim">
                    <QuestionPhoto src={r.question.image} />
                  </div>

                  <p className="mb-3 font-display text-base leading-snug">{r.question.question}</p>

                  <p className="mb-1 text-sm">
                    <span className="font-semibold text-ink/70">{t('yourAnswer')} : </span>
                    <span className={r.correct ? 'text-forest' : 'text-brick'}>{r.answer ?? t('noAnswer')}</span>
                  </p>
                  {!r.correct && (
                    <p className="mb-2 text-sm">
                      <span className="font-semibold text-ink/70">{t('correctAnswer')} : </span>
                      <span className="text-forest">{r.question.reponse}</span>
                    </p>
                  )}

                  {r.question.explication && <p className="text-sm text-ink/70">{r.question.explication}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return null
}
