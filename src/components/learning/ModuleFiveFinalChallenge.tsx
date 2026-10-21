'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { MODULE_FIVE_FINAL_CHALLENGE } from '@/content/learning/module-5-final-challenge'
import { getLearningScene } from '@/content/learning/scenes'
import { getPermisHubSign } from '@/content/learning/signs'

const KEY = 'permishub.module-5-final-challenge.v1'
const TOTAL = MODULE_FIVE_FINAL_CHALLENGE.length

export function ModuleFiveFinalChallenge() {
  const [started, setStarted] = useState(false)
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [done, setDone] = useState(false)
  const [review, setReview] = useState(false)
  const [best, setBest] = useState(0)

  useEffect(() => {
    const raw = localStorage.getItem(KEY)
    if (!raw) return
    try {
      const saved = JSON.parse(raw)
      setBest(saved.best || 0)
      if (saved.answers && !saved.done) {
        setAnswers(saved.answers)
        setIndex(Math.min(saved.index || 0, TOTAL - 1))
        setStarted(true)
      }
    } catch {
      localStorage.removeItem(KEY)
    }
  }, [])

  const score = useMemo(() => MODULE_FIVE_FINAL_CHALLENGE.reduce((total, question, questionIndex) => total + (answers[questionIndex] === question.correct ? 1 : 0), 0), [answers])
  const select = (answer: number) => setAnswers((current) => {
    const next = { ...current, [index]: answer }
    localStorage.setItem(KEY, JSON.stringify({ best, answers: next, index, done: false }))
    return next
  })
  const goTo = (nextIndex: number) => {
    setIndex(nextIndex)
    localStorage.setItem(KEY, JSON.stringify({ best, answers, index: nextIndex, done: false }))
  }
  const finish = () => {
    const nextBest = Math.max(best, score)
    setBest(nextBest)
    localStorage.setItem(KEY, JSON.stringify({ best: nextBest, answers, done: true }))
    setDone(true)
  }
  const reset = () => {
    localStorage.removeItem(KEY)
    setStarted(true)
    setIndex(0)
    setAnswers({})
    setDone(false)
    setReview(false)
  }
  const totals = MODULE_FIVE_FINAL_CHALLENGE.reduce<Record<string, { total: number; score: number }>>((all, question, questionIndex) => {
    const item = all[question.topic] || { total: 0, score: 0 }
    item.total += 1
    if (answers[questionIndex] === question.correct) item.score += 1
    all[question.topic] = item
    return all
  }, {})

  if (!started) return <main className="learn-shell"><section className="learn-result"><span className="learn-kicker">DÉFI FINAL · ARRÊT & STATIONNEMENT</span><h1>Es-tu prêt à choisir le bon emplacement ?</h1><p>{TOTAL} situations · 7 leçons évaluées · +50 XP</p><p>Observe l’endroit, la signalisation et la raison de l’immobilisation.</p><button type="button" className="learn-primary" onClick={() => setStarted(true)}>Commencer le défi →</button></section></main>

  if (done) {
    const errors = MODULE_FIVE_FINAL_CHALLENGE.map((question, questionIndex) => ({ question, questionIndex })).filter(({ question, questionIndex }) => answers[questionIndex] !== question.correct)
    return <main className="learn-shell"><section className="learn-result"><span className="learn-kicker">DÉFI TERMINÉ</span><h1>{score} / {TOTAL}</h1><h2>{score >= 12 ? 'Très solide' : score >= 9 ? 'Bon niveau' : 'Révision recommandée'}</h2><p className="learn-kicker">{Math.round(score / TOTAL * 100)} % · +50 XP</p><div className="learn-summary">{Object.entries(totals).map(([topic, value]) => <div key={topic}><b>{topic}</b><span>{value.score}/{value.total}</span></div>)}</div><div className="learn-result-actions"><button type="button" className="learn-secondary" onClick={() => setReview(!review)}>Revoir mes erreurs</button><button type="button" className="learn-primary" onClick={reset}>Recommencer le défi</button><Link className="learn-secondary" href="/apprendre">Retour aux modules</Link></div>{review ? <div className="learn-summary">{errors.length ? errors.map(({ question, questionIndex }) => { const scene = getLearningScene(question.visualId); const signIds = scene?.signIds || (scene?.signId ? [scene.signId] : []); const signs = signIds.map(getPermisHubSign).filter((sign): sign is NonNullable<typeof sign> => Boolean(sign)); return <div key={question.id}><b>Question {questionIndex + 1}</b>{scene?.image ? <div className="learn-scene-frame"><img className="learn-scene-image" src={scene.image} alt={scene.description} />{signs.length ? <div className={`learn-scene-signs${signs.length > 1 ? ' is-pair' : ''}`}>{signs.map((sign) => <img className="learn-scene-sign" src={sign.asset} alt={sign.name} key={sign.id} />)}</div> : null}</div> : null}<span><strong>{question.question}</strong><br />Ta réponse : {answers[questionIndex] === undefined ? 'Aucune réponse' : question.options[answers[questionIndex]]}<br />Bonne réponse : {question.options[question.correct]}<br />{question.explanation}</span></div> }) : <div><span>Aucune erreur à revoir.</span></div>}</div> : null}{best > 0 ? <p>Meilleur score : <strong>{best}/{TOTAL}</strong></p> : null}</section></main>
  }

  const question = MODULE_FIVE_FINAL_CHALLENGE[index]
  const scene = getLearningScene(question.visualId)
  const signIds = scene?.signIds || (scene?.signId ? [scene.signId] : [])
  const signs = signIds.map(getPermisHubSign).filter((sign): sign is NonNullable<typeof sign> => Boolean(sign))
  const selected = answers[index]
  const complete = Object.keys(answers).length === TOTAL
  const progress = Math.round((index + 1) / TOTAL * 100)
  return <main className="learn-shell"><section className="learn-player"><div className="learn-player-top"><span>QUESTION {String(index + 1).padStart(2, '0')} / {TOTAL}</span><strong>{progress}%</strong></div><div className="learn-progress"><i style={{ width: `${progress}%` }} /></div><article className="learn-card"><div className="learn-kicker">{question.topic}</div>{scene?.image ? <div className="learn-challenge-visual"><img className="learn-scene-image" src={scene.image} alt={scene.description} />{signs.length ? <div className={`learn-scene-signs${signs.length > 1 ? ' is-pair' : ''}`}>{signs.map((sign) => <img className="learn-scene-sign" src={sign.asset} alt={sign.name} key={sign.id} />)}</div> : null}</div> : null}<h2>{question.question}</h2><div className="learn-options">{question.options.map((option, optionIndex) => <button type="button" key={option} className={selected === optionIndex ? 'is-selected' : ''} onClick={() => select(optionIndex)}>{String.fromCharCode(65 + optionIndex)} <span>{option}</span></button>)}</div></article><p className="learn-challenge-note">{selected === undefined ? 'Choisis une réponse pour continuer.' : 'Réponse enregistrée. La correction sera affichée à la fin.'}</p><div className="learn-nav"><button type="button" disabled={index === 0} onClick={() => goTo(index - 1)}>← Précédent</button><span>{selected === undefined ? 'Réponse à enregistrer' : 'Réponse enregistrée'}</span>{index < TOTAL - 1 ? <button type="button" disabled={selected === undefined} onClick={() => goTo(index + 1)}>Suivant →</button> : <button type="button" className="learn-primary" disabled={!complete} onClick={finish}>Voir mon résultat →</button>}</div></section></main>
}
