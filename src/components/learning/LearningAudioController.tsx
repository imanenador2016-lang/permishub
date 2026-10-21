'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Pause, Play, RotateCcw, Volume2, VolumeX } from 'lucide-react'

const SOUND_KEY = 'permishub.learning.sound.v1'
const OPTIONS_KEY = 'permishub.learning.voice-options.v1'
type SpeechState = 'idle' | 'playing' | 'paused'
type SoundKind = 'correct' | 'wrong' | 'complete' | 'victory' | 'select'

function cleanSpeech(text: string) {
  return text.replace(/\bkm\/h\b/gi, 'kilomètres par heure').replace(/%/g, ' pour cent ').replace(/\+/g, ' plus ').replace(/\s+/g, ' ').trim()
}

function bestFrenchVoice() {
  if (typeof window === 'undefined' || !window.speechSynthesis) return undefined
  const voices = window.speechSynthesis.getVoices().filter((voice) => voice.lang.toLowerCase().startsWith('fr'))
  return voices.find((voice) => /natural|neural|google|audrey|amelie|amélie|marie|thomas/i.test(voice.name)) ?? voices[0]
}

function currentSpeechText(includeOptions: boolean) {
  const card = document.querySelector<HTMLElement>('.learn-player .learn-card')
  const result = document.querySelector<HTMLElement>('.learn-result')
  const scope = card ?? result
  if (!scope) return ''
  const heading = scope.querySelector<HTMLElement>('.learn-question')?.innerText ?? scope.querySelector<HTMLElement>('h2')?.innerText ?? scope.querySelector<HTMLElement>('h1')?.innerText ?? ''
  const context = card
    ? Array.from(card.querySelectorAll<HTMLElement>(':scope > p, :scope > .learn-callout')).map((node) => node.innerText).join(' ')
    : Array.from(scope.querySelectorAll<HTMLElement>(':scope > p')).map((node) => node.innerText).join(' ')
  const options = includeOptions
    ? Array.from(scope.querySelectorAll<HTMLButtonElement>('.learn-options button')).map((button, index) => `${String.fromCharCode(65 + index)}. ${button.innerText.replace(/^[A-Z]\s+/, '')}`)
    : []
  const explanation = scope.querySelector<HTMLElement>('.learn-feedback')?.innerText ?? ''
  return cleanSpeech([heading, context, ...options, explanation].filter(Boolean).join('. '))
}

export function LearningAudioController() {
  const [target, setTarget] = useState<Element | null>(null)
  const [speechState, setSpeechState] = useState<SpeechState>('idle')
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [includeOptions, setIncludeOptions] = useState(false)
  const speechGeneration = useRef(0)
  const audioContext = useRef<AudioContext | null>(null)
  const previousScreen = useRef('')
  const resultCelebrated = useRef(false)

  const stopSpeech = useCallback(() => {
    speechGeneration.current += 1
    if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel()
    setSpeechState('idle')
  }, [])

  const playSound = useCallback((kind: SoundKind) => {
    if (!soundEnabled || typeof window === 'undefined') return
    if (window.speechSynthesis?.speaking || window.speechSynthesis?.paused) {
      speechGeneration.current += 1
      window.speechSynthesis.cancel()
      setSpeechState('idle')
    }
    const AudioContextClass = window.AudioContext ?? (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!AudioContextClass) return
    const context = audioContext.current ?? new AudioContextClass()
    audioContext.current = context
    void context.resume()
    const patterns: Record<SoundKind, Array<[number, number, number]>> = {
      correct: [[523, 0, .08], [659, .09, .09], [784, .19, .13]], wrong: [[330, 0, .08], [277, .1, .12]],
      complete: [[440, 0, .08], [554, .09, .09], [659, .19, .11], [880, .31, .18]],
      victory: [[523, 0, .1], [659, .11, .1], [784, .22, .12], [1047, .36, .24]], select: [[440, 0, .055]],
    }
    const start = context.currentTime
    patterns[kind].forEach(([frequency, delay, duration]) => {
      const oscillator = context.createOscillator(); const gain = context.createGain()
      oscillator.type = kind === 'wrong' ? 'sine' : 'triangle'; oscillator.frequency.setValueAtTime(frequency, start + delay)
      gain.gain.setValueAtTime(.0001, start + delay); gain.gain.exponentialRampToValueAtTime(kind === 'victory' ? .09 : .065, start + delay + .012); gain.gain.exponentialRampToValueAtTime(.0001, start + delay + duration)
      oscillator.connect(gain).connect(context.destination); oscillator.start(start + delay); oscillator.stop(start + delay + duration + .02)
    })
  }, [soundEnabled])

  const readCurrent = useCallback((restart = false) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return
    if (!restart && speechState === 'playing') { window.speechSynthesis.pause(); setSpeechState('paused'); return }
    if (!restart && speechState === 'paused') { window.speechSynthesis.resume(); setSpeechState('playing'); return }
    stopSpeech(); const text = currentSpeechText(includeOptions); if (!text) return
    const generation = ++speechGeneration.current; const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'fr-BE'; utterance.rate = .96; utterance.pitch = 1
    const voice = bestFrenchVoice(); if (voice) utterance.voice = voice
    utterance.onend = utterance.onerror = () => { if (speechGeneration.current === generation) setSpeechState('idle') }
    setSpeechState('playing'); window.speechSynthesis.speak(utterance)
  }, [includeOptions, speechState, stopSpeech])

  useEffect(() => {
    try { setSoundEnabled(localStorage.getItem(SOUND_KEY) !== 'off'); setIncludeOptions(localStorage.getItem(OPTIONS_KEY) === 'on') } catch {}
    if (window.speechSynthesis) window.speechSynthesis.getVoices()
    return stopSpeech
  }, [stopSpeech])

  useEffect(() => {
    const sync = () => {
      setTarget(document.querySelector('.learn-player-top') ?? document.querySelector('.learn-result'))
      const screen = document.querySelector<HTMLElement>('.learn-card')?.innerText ?? ''
      if (screen && previousScreen.current && screen !== previousScreen.current) stopSpeech()
      previousScreen.current = screen
      const finished = document.querySelector<HTMLElement>('.learn-result .learn-kicker')?.innerText.toUpperCase().includes('TERMIN') ?? false
      if (finished && !resultCelebrated.current) {
        resultCelebrated.current = true
        document.querySelector('.learn-result')?.classList.add('learn-result-celebration', 'is-audio-celebration')
        playSound(window.location.pathname.includes('defi-final') ? 'victory' : 'complete')
      } else if (!finished) resultCelebrated.current = false
    }
    sync(); const observer = new MutationObserver(sync); observer.observe(document.body, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [playSound, stopSpeech])

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const button = (event.target as Element | null)?.closest<HTMLButtonElement>('.learn-options button'); if (!button) return
      stopSpeech()
      window.setTimeout(() => {
        if (button.classList.contains('is-correct')) { button.classList.add('is-answer-pop'); playSound('correct') }
        else if (button.classList.contains('is-wrong')) { button.classList.add('is-answer-shake'); playSound('wrong') }
        else playSound('select')
      }, 40)
    }
    document.addEventListener('click', handleClick, true); return () => document.removeEventListener('click', handleClick, true)
  }, [playSound, stopSpeech])

  if (!target) return null
  const toggleSound = () => { const next = !soundEnabled; setSoundEnabled(next); try { localStorage.setItem(SOUND_KEY, next ? 'on' : 'off') } catch {} }
  const toggleOptions = () => { const next = !includeOptions; setIncludeOptions(next); try { localStorage.setItem(OPTIONS_KEY, next ? 'on' : 'off') } catch {} }

  return createPortal(<div className="learn-audio-controls" aria-label="Contrôles audio de la formation">
    <button type="button" onClick={() => readCurrent()} aria-label={speechState === 'playing' ? 'Mettre la lecture en pause' : speechState === 'paused' ? 'Reprendre la lecture' : 'Écouter cet écran'} title="Écouter cet écran">{speechState === 'playing' ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}<span>{speechState === 'playing' ? 'Pause' : speechState === 'paused' ? 'Reprendre' : 'Écouter'}</span></button>
    <button type="button" onClick={() => readCurrent(true)} aria-label="Réécouter depuis le début" title="Réécouter"><RotateCcw aria-hidden="true" /></button>
    <button type="button" className={includeOptions ? 'is-active' : ''} onClick={toggleOptions} aria-pressed={includeOptions} title="Lire aussi les réponses"><span className="learn-audio-answer-label">A+B</span></button>
    <button type="button" className={soundEnabled ? 'is-active' : ''} onClick={toggleSound} aria-pressed={soundEnabled} aria-label={soundEnabled ? 'Désactiver les effets sonores' : 'Activer les effets sonores'} title={soundEnabled ? 'Couper les sons' : 'Activer les sons'}>{soundEnabled ? <Volume2 aria-hidden="true" /> : <VolumeX aria-hidden="true" />}</button>
  </div>, target)
}
