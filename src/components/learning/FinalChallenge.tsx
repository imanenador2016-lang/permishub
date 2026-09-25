'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FINAL_CHALLENGE } from '@/content/learning/final-challenge'

const KEY = 'permishub.final-challenge.v1'
const SCENE_IMAGES = [
  '/learning/scenes/final-challenge-q01-agent-feu-vert.png',
  '/learning/scenes/final-challenge-q02-stop-line-red.png',
  '/learning/scenes/final-challenge-q03-slippery-road.png',
  '/learning/scenes/final-challenge-q04-mandatory-right.png',
  '/learning/scenes/final-challenge-q05-dashed-line.png',
  '/learning/scenes/final-challenge-q06-amber-light.png',
  '/learning/scenes/final-challenge-q07-no-entry-comparison.png',
  '/learning/scenes/final-challenge-q08-distance-200m.png',
  '/learning/scenes/final-challenge-q09-paired-lines.png',
  '/learning/scenes/final-challenge-q10-one-way.png',
  '/learning/scenes/final-challenge-q11-no-u-turn.png',
  '/learning/scenes/final-challenge-q12-roadworks-marking.png',
  '/learning/scenes/final-challenge-q13-green-arrow-pedestrian.png',
  '/learning/scenes/final-challenge-q14-clearance-arrow.png',
  '/learning/scenes/final-challenge-q15-hierarchy.png',
]

export function FinalChallenge() {
  const [started, setStarted] = useState(false)
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [done, setDone] = useState(false)
  const [best, setBest] = useState(0)
  const [review, setReview] = useState(false)

  useEffect(() => {
    const raw = localStorage.getItem(KEY)
    if (!raw) return
    const saved = JSON.parse(raw)
    setBest(saved.best || 0)
    if (saved.answers && !saved.done) {
      setAnswers(saved.answers)
      setIndex(saved.answers.length)
      setStarted(true)
    }
  }, [])

  const score = answers.reduce((total, answer, questionIndex) => total + (answer === FINAL_CHALLENGE[questionIndex]?.correct ? 1 : 0), 0)
  const choose = (answer: number) => {
    const next = [...answers, answer]
    setAnswers(next)
    if (next.length === FINAL_CHALLENGE.length) {
      const finalScore = next.reduce((total, value, questionIndex) => total + (value === FINAL_CHALLENGE[questionIndex].correct ? 1 : 0), 0)
      setBest((value) => {
        const nextBest = Math.max(value, finalScore)
        localStorage.setItem(KEY, JSON.stringify({ best: nextBest, answers: next, done: true }))
        return nextBest
      })
      setDone(true)
      return
    }
    setIndex(next.length)
  }
  const reset = () => {
    setStarted(true)
    setDone(false)
    setReview(false)
    setIndex(0)
    setAnswers([])
    localStorage.removeItem(KEY)
  }

  if (!started) return <main className="learn-shell"><section className="learn-result"><span className="learn-kicker">DÉFI FINAL · SIGNALISATION</span><h1>Tu penses maîtriser la signalisation ?</h1><p>15 situations · 8 leçons évaluées · +50 XP</p><p>Observe bien : certaines situations mélangent plusieurs règles.</p><button className="learn-primary" onClick={() => setStarted(true)}>Commencer le défi →</button></section></main>

  if (done) return <main className="learn-shell"><section className="learn-result"><span className="learn-kicker">DÉFI TERMINÉ</span><h1>{score} / {FINAL_CHALLENGE.length}</h1><h2>{score === FINAL_CHALLENGE.length ? 'Signalisation maîtrisée' : score >= 13 ? 'Très solide' : score >= 10 ? 'Bon niveau' : score >= 7 ? 'Encore quelques confusions' : 'Révision recommandée'}</h2><p>{score === FINAL_CHALLENGE.length ? 'Tu n’as fait aucune erreur sur ce défi.' : score >= 13 ? 'Tu maîtrises presque toutes les situations de ce module.' : score >= 10 ? 'Les bases sont acquises, mais certaines notions doivent être consolidées.' : score >= 7 ? 'Identifie tes points faibles avant de passer à la suite.' : 'Reprends les notions où tu as fait le plus d’erreurs.'}</p><p className="learn-kicker">{Math.round(score / FINAL_CHALLENGE.length * 100)} % · +50 XP</p><div className="learn-result-actions"><button className="learn-secondary" onClick={() => setReview(!review)}>Revoir mes erreurs</button><button className="learn-primary" onClick={reset}>Refaire le défi</button><Link className="learn-secondary" href="/apprendre">Retour au module</Link></div>{review && <div className="learn-summary">{FINAL_CHALLENGE.map((question, questionIndex) => answers[questionIndex] !== question.correct ? <div key={question.question}><b>Question {questionIndex + 1}</b><span>Ta réponse : {question.options[answers[questionIndex]]}<br/>Bonne réponse : {question.options[question.correct]}<br/>{question.explanation}<br/><small>{question.lesson}</small></span></div> : null)}</div>}{best > 0 && <p>Meilleur score : <strong>{best}/{FINAL_CHALLENGE.length}</strong></p>}</section></main>

  const question = FINAL_CHALLENGE[index]
  return <main className="learn-shell"><section className="learn-player"><div className="learn-player-top"><span>QUESTION {String(index + 1).padStart(2, '0')} / {FINAL_CHALLENGE.length}</span><strong>{Math.round(index / FINAL_CHALLENGE.length * 100)}%</strong></div><div className="learn-progress"><i style={{ width: `${index / FINAL_CHALLENGE.length * 100}%` }} /></div><article className="learn-card"><div className="learn-kicker">{question.topicLabel}</div><div className="learn-challenge-visual"><img className="learn-scene-image" src={SCENE_IMAGES[index]} alt="Illustration de situation routière" /></div><h2>{question.question}</h2><div className="learn-options">{question.options.map((option, optionIndex) => <button key={option} onClick={() => choose(optionIndex)}>{String.fromCharCode(65 + optionIndex)} <span>{option}</span></button>)}</div></article><p className="learn-challenge-note">Réponse enregistrée. La correction sera affichée à la fin.</p></section></main>
}
