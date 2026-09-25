'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import type { LearningLesson, LessonStep } from '@/content/learning/types'
import { getLearningScene } from '@/content/learning/scenes'
import { getPermisHubSign } from '@/content/learning/signs'
const SCENE_IMAGES = {
  hierarchy: '/learning/scenes/final-challenge-q01-agent-feu-vert.png',
  stopLine: '/learning/scenes/final-challenge-q02-stop-line-red.png',
  slippery: '/learning/scenes/final-challenge-q03-slippery-road.png',
  mandatoryRight: '/learning/scenes/final-challenge-q04-mandatory-right.png',
  dashedLine: '/learning/scenes/final-challenge-q05-dashed-line.png',
  amber: '/learning/scenes/final-challenge-q06-amber-light.png',
  noEntry: '/learning/scenes/final-challenge-q07-no-entry-comparison.png',
  distance: '/learning/scenes/final-challenge-q08-distance-200m.png',
  pairedLines: '/learning/scenes/final-challenge-q09-paired-lines.png',
  oneWay: '/learning/scenes/final-challenge-q10-one-way.png',
  uTurn: '/learning/scenes/final-challenge-q11-no-u-turn.png',
  roadworks: '/learning/scenes/final-challenge-q12-roadworks-marking.png',
  greenArrow: '/learning/scenes/final-challenge-q13-green-arrow-pedestrian.png',
  clearance: '/learning/scenes/final-challenge-q14-clearance-arrow.png',
  agentProfile: '/learning/scenes/lesson-agent-profile.png',
  blockedJunction: '/learning/scenes/lesson-green-blocked-junction.png',
  laneControl: '/learning/scenes/lesson-lane-control-signals.png',
  speedLimit: '/learning/scenes/lesson-speed-limit-50.png',
  motorway: '/learning/scenes/lesson-motorway-comparison.png',
  cycleBox: '/learning/scenes/lesson-advanced-cycle-box.png',
} as const

function LearningVisual({ step }: { step: LessonStep }) {
  const explicitScene = getLearningScene(step.visualId)
  if (explicitScene?.image) { const sign = explicitScene.signId ? getPermisHubSign(explicitScene.signId) : undefined; return <><img className="learn-scene-image learn-lesson-scene" src={explicitScene.image} alt={explicitScene.description} />{sign ? <img className="learn-scene-sign" src={sign.asset} alt={sign.name} /> : null}</> }
  if (explicitScene?.status === 'needs-validation') return <div className="learn-scene-placeholder"><strong>Visuel en attente de validation</strong><span>{explicitScene.requiredVisual}</span></div>
  const question = 'question' in step ? step.question : ''
  const options = 'options' in step ? step.options.join(' ') : ''
  const text = `${step.title} ${'body' in step ? step.body : ''} ${question} ${options}`.toLowerCase()
  const source = text.includes('agent de profil') || text.includes('est de profil') ? SCENE_IMAGES.agentProfile
    : text.includes('carrefour bloqué') || text.includes('carrefour devant toi est complètement bouché') ? SCENE_IMAGES.blockedJunction
    : text.includes('flèche orange') || text.includes('croix rouge') || text.includes('au-dessus de ta bande') ? SCENE_IMAGES.laneControl
    : text.includes('zone avancée cyclistes') || text.includes('zone cycliste') ? SCENE_IMAGES.cycleBox
    : text.includes('autoroute') ? SCENE_IMAGES.motorway
    : text.includes('limitation à') || text.includes('50 dans un cercle') || text.includes('hauteur maximale') || text.includes('masse indiquée') ? SCENE_IMAGES.speedLimit
    : text.includes('flèche d’évacuation') ? SCENE_IMAGES.clearance
    : text.includes('flèche verte') || text.includes('piéton') ? SCENE_IMAGES.greenArrow
    : text.includes('travaux') || text.includes('temporaire') ? SCENE_IMAGES.roadworks
    : text.includes('juxtapos') || text.includes('ligne de mon côté') ? SCENE_IMAGES.pairedLines
    : text.includes('chaussée glissante') || text.includes('adhérence') ? SCENE_IMAGES.slippery
    : text.includes('200 m') ? SCENE_IMAGES.distance
    : text.includes('demi-tour') ? SCENE_IMAGES.uTurn
    : text.includes('sens interdit') || text.includes('accès interdit') ? SCENE_IMAGES.noEntry
    : text.includes('sens unique') ? SCENE_IMAGES.oneWay
    : text.includes('obligatoire') && text.includes('droite') ? SCENE_IMAGES.mandatoryRight
    : text.includes('ligne d’arrêt') || text.includes('feu rouge') ? SCENE_IMAGES.stopLine
    : text.includes('orange') ? SCENE_IMAGES.amber
    : text.includes('ligne discontinue') || text.includes('ligne continue') ? SCENE_IMAGES.dashedLine
    : text.includes('agent') || text.includes('carrefour') ? SCENE_IMAGES.hierarchy
    : null
  return source ? <img className="learn-scene-image learn-lesson-scene" src={source} alt="Illustration de situation routière" /> : null
}

function StepCard({ step, selectedAnswer, onAnswer }: { step: LessonStep; selectedAnswer?: number; onAnswer: (correct: boolean, answer: number) => void }) {
  const answer = (index: number, correct: number) => { if (selectedAnswer === undefined) onAnswer(index === correct, index) }
  if (step.type === 'hierarchy') return <article className="learn-card"><span className="learn-kicker">LA HIÉRARCHIE</span><div className="learn-pedagogical-visual"><LearningVisual step={step}/></div><h2>{step.title}</h2><p>{step.body}</p><div className="learn-hierarchy">{step.items.map((item, i) => <div key={item}><b>{i + 1}</b><span>{item}</span></div>)}</div><div className="learn-memory"><small>À retenir</small><strong>{step.memory}</strong></div></article>
  if (step.type === 'compare') return <article className="learn-card"><span className="learn-kicker">SITUATION</span><div className="learn-pedagogical-visual"><LearningVisual step={step}/></div><h2>{step.title}</h2><p>{step.body}</p><div className="learn-compare">{step.items.map((item) => <div key={item.label}><strong>{item.label}</strong><b>{item.result}</b></div>)}</div></article>
  if (step.type === 'summary') return <article className="learn-card"><span className="learn-kicker">RÉSUMÉ</span><div className="learn-pedagogical-visual"><LearningVisual step={step}/></div><h2>{step.title}</h2><div className="learn-summary">{step.items.map((item) => <div key={item}>✓ <span>{item}</span></div>)}</div></article>
  return <article className="learn-card"><span className="learn-kicker">{step.type === 'quiz' ? 'QUESTION' : step.type === 'scenario' ? 'SCÉNARIO' : 'EXPLICATION'}</span><div className="learn-pedagogical-visual"><LearningVisual step={step}/></div><h2>{step.title}</h2><p>{'body' in step ? step.body : ''}</p>{'callout' in step && step.callout ? <div className="learn-callout">{step.callout}</div> : null}{'question' in step ? <><h3 className="learn-question">{step.question}</h3><div className="learn-options">{step.options.map((option, i) => <button key={option} className={selectedAnswer === i ? (i === step.correct ? 'is-correct' : 'is-wrong') : ''} onClick={() => answer(i, step.correct)}>{String.fromCharCode(65 + i)} <span>{option}</span></button>)}</div>{selectedAnswer !== undefined ? <div className={`learn-feedback ${selectedAnswer === step.correct ? 'is-correct' : 'is-wrong'}`}>{selectedAnswer === step.correct ? '✓ Bonne réponse' : '✕ À revoir'} — {step.explanation}</div> : null}</> : null}</article>
}

export function LessonPlayer({ lesson, nextLessonId, nextHref }: { lesson: LearningLesson; nextLessonId?: string; nextHref?: string }) {
  const storageKey = `permishub.lesson.${lesson.id}`
  const [step, setStep] = useState(0)
  const [quizMode, setQuizMode] = useState(false)
  const [quizIndex, setQuizIndex] = useState(0)
  const [stepAnswers, setStepAnswers] = useState<Record<number, number>>({})
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({})
  const [finished, setFinished] = useState(false)
  const [review, setReview] = useState(false)
  const current = quizMode ? lesson.quiz[quizIndex] : lesson.steps[step]
  const needsAnswer = 'options' in current
  const selectedAnswer = quizMode ? quizAnswers[quizIndex] : stepAnswers[step]
  const total = lesson.steps.length

  useEffect(() => { const saved = window.localStorage.getItem(storageKey); if (saved) setStep(Math.min(Number(saved), total - 1)) }, [storageKey, total])
  useEffect(() => { if (!quizMode) window.localStorage.setItem(storageKey, String(step)) }, [quizMode, step, storageKey])

  const progress = useMemo(() => quizMode ? ((quizIndex + 1) / lesson.quiz.length) * 100 : ((step + 1) / total) * 100, [quizMode, quizIndex, lesson.quiz.length, step, total])
  const inlineAssessment = lesson.steps.map((item, index) => ({ item, index })).filter((entry) => 'options' in entry.item) as { item: Extract<LessonStep, { options: string[] }>; index: number }[]
  const assessment = lesson.inlineQuizOnly ? inlineAssessment.map((entry) => entry.item) : lesson.quiz
  const quizScore = assessment.reduce((score, question, index) => {
    const answer = lesson.inlineQuizOnly ? stepAnswers[inlineAssessment[index].index] : quizAnswers[index]
    return score + (question.correct === answer ? 1 : 0)
  }, 0)
  const recordAnswer = (correct: boolean, answer: number) => {
    if (quizMode) setQuizAnswers((answers) => ({ ...answers, [quizIndex]: answer }))
    else setStepAnswers((answers) => ({ ...answers, [step]: answer }))
  }
  const restart = () => { setFinished(false); setReview(false); setQuizMode(false); setStep(0); setQuizIndex(0); setStepAnswers({}); setQuizAnswers({}) }

  if (finished) {
    const messages = lesson.resultMessages ?? { perfect: 'Excellent, tu maîtrises cette règle.', good: 'Bien joué. On te fera retravailler tes erreurs.', low: 'Quelques règles ne sont pas encore acquises.' }
    const message = quizScore === assessment.length ? messages.perfect : quizScore >= Math.ceil(assessment.length * 0.66) ? messages.good : messages.low
    const errors = assessment.map((question, index) => ({ question, index, answer: lesson.inlineQuizOnly ? stepAnswers[inlineAssessment[index].index] : quizAnswers[index] })).filter(({ question, answer }) => answer !== question.correct)
    return <section className="learn-result"><span className="learn-kicker">LEÇON TERMINÉE</span><h1>{quizScore} / {assessment.length}</h1><p>{message}</p><div className="learn-result-actions">{lesson.trainingPlaceholderLabel ? <span className="learn-secondary" aria-disabled="true">{lesson.trainingPlaceholderLabel}</span> : null}<button className="learn-secondary" onClick={() => setReview((value) => !value)}>{review ? 'Masquer les erreurs' : 'Revoir mes erreurs'}</button><button className="learn-primary" onClick={restart}>Recommencer</button>{nextLessonId ? <Link className="learn-primary" href={`/apprendre/${nextLessonId}`}>Continuer →</Link> : nextHref ? <Link className="learn-primary" href={nextHref}>{lesson.nextLessonLabel ?? 'Continuer →'}</Link> : <span className="learn-secondary">{lesson.nextLessonLabel ?? 'Prochaine leçon bientôt disponible'}</span>}<Link className="learn-secondary" href="/apprendre">Retour aux leçons</Link></div>{review && <div className="learn-summary">{errors.length ? errors.map(({ question, index, answer }) => <div key={question.question}><b>Question {index + 1}</b><span>Ta réponse : {answer === undefined ? 'Aucune réponse' : question.options[answer]}<br/>Bonne réponse : {question.options[question.correct]}<br/>{question.explanation}</span></div>) : <div><span>Aucune erreur à revoir.</span></div>}</div>}</section>
  }

  return <section className="learn-player"><div className="learn-player-top"><span>{quizMode ? `Mini-test · ${quizIndex + 1}/${lesson.quiz.length}` : `Leçon · ${step + 1}/${total}`}</span><strong>{Math.round(progress)}%</strong></div><div className="learn-progress"><i style={{ width: `${progress}%` }} /></div><StepCard key={quizMode ? `quiz-${quizIndex}` : `step-${step}`} step={current as LessonStep} selectedAnswer={selectedAnswer} onAnswer={recordAnswer} /><div className="learn-nav">{!quizMode && <button disabled={step === 0} onClick={() => setStep((value) => value - 1)}>← Précédent</button>}{quizMode && <button disabled={quizIndex === 0} onClick={() => setQuizIndex((value) => value - 1)}>← Précédent</button>}<span>{quizMode ? (needsAnswer && selectedAnswer === undefined ? 'Choisis une réponse pour continuer' : 'Réponse enregistrée') : 'Progresse à ton rythme'}</span>{!quizMode && step < total - 1 ? <button onClick={() => setStep((value) => value + 1)}>Suivant →</button> : !quizMode ? <button className="learn-primary" onClick={() => lesson.inlineQuizOnly ? setFinished(true) : setQuizMode(true)}>{lesson.inlineQuizOnly ? 'Voir mon résultat →' : 'Tester mes connaissances →'}</button> : quizIndex < lesson.quiz.length - 1 ? <button disabled={needsAnswer && selectedAnswer === undefined} onClick={() => setQuizIndex((value) => value + 1)}>Suivant →</button> : <button disabled={needsAnswer && selectedAnswer === undefined} className="learn-primary" onClick={() => setFinished(true)}>Voir mon résultat →</button>}</div></section>
}



