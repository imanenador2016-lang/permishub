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
  motorway: '/learning/scenes/lesson-motorway-comparison.png',
  cycleBox: '/learning/scenes/lesson-advanced-cycle-box.png',
} as const

function searchableVisualText(step: LessonStep) {
  const question = 'question' in step ? step.question : ''
  const options = 'options' in step ? step.options.join(' ') : ''
  const title = 'title' in step ? step.title : ''
  const body = 'body' in step ? step.body : ''

  return `${title} ${body} ${question} ${options}`
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[’‘]/g, "'")
    .toLowerCase()
}

function fallbackSignIds(text: string) {
  if (text.includes('frequente par des enfants') || text.includes('panneau enfants') || text.includes('endroit frequente par des enfants')) return ['TEMP_SIGN_018']
  if (text.includes('chaussee glissante')) return ['TEMP_SIGN_014']
  if (text.includes('passage pour pietons')) return ['TEMP_SIGN_017']
  if (text.includes('passage pour cyclistes')) return ['TEMP_SIGN_019']
  if (text.includes('gros gibier')) return ['TEMP_SIGN_020']
  if (text.includes('traversee de betail')) return ['TEMP_SIGN_021']
  if (text.includes('chutes de pierres')) return ['TEMP_SIGN_015']
  if (text.includes("cassis") || text.includes("dos d'ane")) return ['TEMP_SIGN_012']
  if (text.includes('pont mobile')) return ['TEMP_SIGN_010']
  if (text.includes('quai') || text.includes('berge')) return ['TEMP_SIGN_011']
  if (text.includes('travaux')) return ['TEMP_SIGN_022']
  if (text.includes('passage a niveau avec barrieres')) return ['TEMP_SIGN_023']
  if (text.includes('passage a niveau sans barrieres')) return ['TEMP_SIGN_024']
  if (text.includes('double virage') || text.includes('succession de virages')) return ['TEMP_SIGN_003', 'TEMP_SIGN_004']
  if (text.includes('descente dangereuse') || text.includes('forte inclinaison')) return ['TEMP_SIGN_005', 'TEMP_SIGN_006']
  if (text.includes('retrecissement')) return ['TEMP_SIGN_007', 'TEMP_SIGN_008', 'TEMP_SIGN_009']
  if (text.includes('sens interdit') && text.includes('sens unique')) return ['TEMP_SIGN_044', 'TEMP_SIGN_127']
  if (text.includes('sens interdit')) return ['TEMP_SIGN_044']
  if (text.includes('acces interdit dans les deux sens')) return ['TEMP_SIGN_045']
  if (text.includes('motocyclettes') && text.includes('cyclomoteurs') && text.includes('cycles') && text.includes('pietons')) return ['TEMP_SIGN_047', 'TEMP_SIGN_048', 'TEMP_SIGN_049', 'TEMP_SIGN_050']
  if (text.includes('interdit de tourner a gauche')) return ['TEMP_SIGN_058']
  if (text.includes('interdit de tourner a droite')) return ['TEMP_SIGN_059']
  if (text.includes('demi-tour')) return ['TEMP_SIGN_060']
  if (text.includes('depassement interdit') || text.includes('debut interdiction') && text.includes('fin interdiction')) return ['C35', 'C37']
  if ((text.includes('direction obligatoire') || text.includes("panneau d'obligation") || text.includes('obligation a droite')) && text.includes('droite')) return ['TEMP_SIGN_075']
  if (text.includes('agglomeration, autoroute, sens unique ou voie sans issue')) return ['TEMP_SIGN_105', 'TEMP_SIGN_107', 'TEMP_SIGN_127', 'TEMP_SIGN_131']
  if (text.includes('commencement') && text.includes('fin') && text.includes('agglomeration') && text.includes('autoroute')) return ['TEMP_SIGN_105', 'TEMP_SIGN_106', 'TEMP_SIGN_107', 'TEMP_SIGN_108']
  if (text.includes("debut d'agglomeration") || text.includes("commencement d'agglomeration")) return ['TEMP_SIGN_105']
  if (text.includes("fin d'agglomeration")) return ['TEMP_SIGN_106']
  if (text.includes("commencement d'autoroute") || text.includes("debut d'autoroute")) return ['TEMP_SIGN_107']
  if (text.includes("fin d'autoroute")) return ['TEMP_SIGN_108']
  if (text.includes('route pour automobiles')) return ['TEMP_SIGN_107', 'TEMP_SIGN_109']
  if (text.includes('zone residentielle') || text.includes('zone de rencontre')) return ['TEMP_SIGN_111']
  if (text.includes('voie publique a sens unique') || text.includes('panneau sens unique')) return ['TEMP_SIGN_127']
  if (text.includes('voie sans issue')) return ['TEMP_SIGN_131', 'TEMP_SIGN_132']
  if (text.includes('reduction du nombre de bandes') || text.includes('bande va disparaitre')) return ['TEMP_SIGN_133']
  if (text.includes('evitement') && text.includes('berme centrale')) return ['TEMP_SIGN_134', 'TEMP_SIGN_135']
  if (text.includes('quelle bande') || text.includes('bande correspondant a ta direction')) return ['TEMP_SIGN_120']
  if (text.includes('bande') && text.includes('autobus')) return ['TEMP_SIGN_113']
  if (text.includes('numero') && text.includes('ring')) return ['TEMP_SIGN_123', 'TEMP_SIGN_124', 'TEMP_SIGN_125', 'TEMP_SIGN_126']
  return []
}

function restrictionValues(text: string) {
  const number = '(\\d+(?:[,.]\\d+)?)'
  const explicitHeight = text.match(new RegExp(`hauteur maximale ${number} m.*vehicule[^0-9]*${number} m`))
  const quizHeight = text.match(new RegExp(`vehicule mesure ${number} m.*(?:au-dela de|maximum) ${number} m`))
  const mass = text.match(new RegExp(`panneau[^0-9]*${number} t.*masse en charge ${number} t`))
  if (explicitHeight) return { kind: 'height' as const, limit: explicitHeight[1], vehicle: explicitHeight[2], unit: 'm' }
  if (quizHeight) return { kind: 'height' as const, limit: quizHeight[2], vehicle: quizHeight[1], unit: 'm' }
  if (mass) return { kind: 'mass' as const, limit: mass[1], vehicle: mass[2], unit: 't' }
  return null
}

function speedLimitValue(text: string) {
  const match = text.match(/(?:limitation a|limitation de vitesse a|panneau de limitation a|signifie)\s*(\d{2,3})(?:\s*km\/h)?/) || text.match(/\b(\d{2,3}) dans un cercle\b/)
  return match?.[1] ?? null
}

function RestrictionVisual({ kind, limit, vehicle, unit }: NonNullable<ReturnType<typeof restrictionValues>>) {
  const label = kind === 'height' ? 'Hauteur maximale' : 'Masse maximale'
  return <div className="learn-restriction-visual" role="img" aria-label={`${label} ${limit} ${unit}, véhicule ${vehicle} ${unit}`}>
    <div className={`learn-restriction-sign is-${kind}`}><span>{limit}</span><small>{unit}</small></div>
    <div className="learn-restriction-comparison" aria-hidden="true"><strong>{vehicle} {unit}</strong><span>›</span><b>{limit} {unit}</b></div>
    <div className="learn-restriction-vehicle" aria-hidden="true"><i /><span /></div>
    <p>{label} : <strong>{limit} {unit}</strong> · Véhicule : <strong>{vehicle} {unit}</strong></p>
  </div>
}

function SpeedLimitVisual({ value }: { value: string }) {
  return <div className="learn-speed-visual" role="img" aria-label={`Limitation de vitesse maximale à ${value} kilomètres par heure`}><div><strong>{value}</strong></div><p>Vitesse maximale autorisée : <b>{value} km/h</b></p></div>
}

function LearningVisual({ step }: { step: LessonStep }) {
  const explicitScene = getLearningScene(step.visualId)
  if (explicitScene?.image) {
    const signIds = explicitScene.signIds || (explicitScene.signId ? [explicitScene.signId] : [])
    const signs = signIds.map(getPermisHubSign).filter((sign): sign is NonNullable<typeof sign> => Boolean(sign))
    return <div className="learn-scene-frame"><img className="learn-scene-image learn-lesson-scene" src={explicitScene.image} alt={explicitScene.description} />{signs.length ? <div className={`learn-scene-signs${signs.length > 1 ? ' is-pair' : ''}`}>{signs.map((sign) => <img className="learn-scene-sign" src={sign.asset} alt={sign.name} key={sign.id} />)}</div> : null}</div>
  }
  if (explicitScene?.status === 'needs-validation') return <div className="learn-scene-placeholder"><strong>Visuel en attente de validation</strong><span>{explicitScene.requiredVisual}</span></div>
  const text = searchableVisualText(step)
  const restriction = restrictionValues(text)
  if (restriction) return <RestrictionVisual {...restriction} />
  const speedLimit = speedLimitValue(text)
  if (speedLimit) return <SpeedLimitVisual value={speedLimit} />
  const fallbackSigns = fallbackSignIds(text).map(getPermisHubSign).filter((sign): sign is NonNullable<typeof sign> => Boolean(sign))
  if (fallbackSigns.length) return <div className={`learn-lesson-sign-board${fallbackSigns.length > 1 ? ' is-multiple' : ''}`}>{fallbackSigns.map((sign) => <figure key={sign.id}><img className="learn-lesson-sign-visual" src={sign.asset} alt={sign.name} /><figcaption>{sign.officialCode ? `Signal ${sign.officialCode}` : sign.name}</figcaption></figure>)}</div>
  const source = text.includes('agent de profil') || text.includes('est de profil') ? SCENE_IMAGES.agentProfile
    : text.includes('carrefour bloque') || text.includes('carrefour devant toi est completement bouche') ? SCENE_IMAGES.blockedJunction
    : text.includes("fleche d'evacuation") ? SCENE_IMAGES.clearance
    : text.includes('fleche orange') || text.includes('croix rouge') || text.includes('au-dessus de ta bande') ? SCENE_IMAGES.laneControl
    : text.includes('zone avancee cyclistes') || text.includes('zone cycliste') ? SCENE_IMAGES.cycleBox
    : text.includes('autoroute') ? SCENE_IMAGES.motorway
    : text.includes('fleche verte') || text.includes('pieton') ? SCENE_IMAGES.greenArrow
    : text.includes('travaux') || text.includes('temporaire') ? SCENE_IMAGES.roadworks
    : text.includes('juxtapos') || text.includes('ligne de mon cote') ? SCENE_IMAGES.pairedLines
    : text.includes('200 m') ? SCENE_IMAGES.distance
    : text.includes('chaussee glissante') || text.includes('adherence') || text.includes('panneau de danger') ? SCENE_IMAGES.slippery
    : text.includes('demi-tour') ? SCENE_IMAGES.uTurn
    : text.includes('sens interdit') || text.includes('acces interdit') || text.includes("panneau d'interdiction") ? SCENE_IMAGES.noEntry
    : text.includes('sens unique') ? SCENE_IMAGES.oneWay
    : (text.includes('obligatoire') || text.includes('obligation')) && text.includes('droite') ? SCENE_IMAGES.mandatoryRight
    : text.includes("ligne d'arret") || text.includes('feu rouge') ? SCENE_IMAGES.stopLine
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
  return <article className={`learn-card${'question' in step ? ' learn-card--exercise' : ''}`}><span className="learn-kicker">{step.type === 'quiz' ? 'QUESTION' : step.type === 'scenario' ? 'SCÉNARIO' : 'EXPLICATION'}</span><div className="learn-pedagogical-visual"><LearningVisual step={step}/></div><h2>{step.title}</h2><p>{'body' in step ? step.body : ''}</p>{'callout' in step && step.callout ? <div className="learn-callout">{step.callout}</div> : null}{'question' in step ? <><h3 className="learn-question">{step.question}</h3><div className="learn-options">{step.options.map((option, i) => { const answered = selectedAnswer !== undefined; const className = selectedAnswer === i ? (i === step.correct ? 'is-correct' : 'is-wrong') : answered && i === step.correct ? 'is-correct-answer' : ''; return <button type="button" key={option} aria-pressed={selectedAnswer === i} className={className} onClick={() => answer(i, step.correct)}>{String.fromCharCode(65 + i)} <span>{option}</span></button> })}</div>{selectedAnswer !== undefined ? <div role="status" aria-live="polite" className={`learn-feedback ${selectedAnswer === step.correct ? 'is-correct' : 'is-wrong'}`}>{selectedAnswer === step.correct ? '✓ Bonne réponse' : '✕ À revoir'} — {step.explanation}</div> : null}</> : null}</article>
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
    return <section className="learn-result learn-result-celebration"><span className="learn-kicker">LEÇON TERMINÉE</span><div className="learn-result-medal" aria-hidden="true">✓</div><h1>{quizScore} / {assessment.length}</h1><p className="learn-result-xp">+{lesson.xp} XP</p><p>{message}</p><div className="learn-result-actions">{lesson.trainingPlaceholderLabel ? <span className="learn-secondary" aria-disabled="true">{lesson.trainingPlaceholderLabel}</span> : null}<button type="button" className="learn-secondary" onClick={() => setReview((value) => !value)}>{review ? 'Masquer les erreurs' : 'Revoir mes erreurs'}</button><button type="button" className="learn-primary" onClick={restart}>Recommencer</button>{nextLessonId ? <Link className="learn-primary" href={`/apprendre/${nextLessonId}`}>Continuer →</Link> : nextHref ? <Link className="learn-primary" href={nextHref}>{lesson.nextLessonLabel ?? 'Continuer →'}</Link> : <span className="learn-secondary">{lesson.nextLessonLabel ?? 'Prochaine leçon bientôt disponible'}</span>}<Link className="learn-secondary" href="/apprendre">Retour aux leçons</Link></div>{review && <div className="learn-summary">{errors.length ? errors.map(({ question, index, answer }) => <div key={question.question}><b>Question {index + 1}</b><span>Ta réponse : {answer === undefined ? 'Aucune réponse' : question.options[answer]}<br/>Bonne réponse : {question.options[question.correct]}<br/>{question.explanation}</span></div>) : <div><span>Aucune erreur à revoir.</span></div>}</div>}</section>
  }

  return <section className="learn-player"><div className="learn-player-top"><span>{quizMode ? `Mini-test · ${quizIndex + 1}/${lesson.quiz.length}` : `Leçon · ${step + 1}/${total}`}</span><strong>{Math.round(progress)}%</strong></div><div className="learn-progress" role="progressbar" aria-label="Progression de la leçon" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)}><i style={{ width: `${progress}%` }} /></div><StepCard key={quizMode ? `quiz-${quizIndex}` : `step-${step}`} step={current as LessonStep} selectedAnswer={selectedAnswer} onAnswer={recordAnswer} /><div className="learn-nav">{!quizMode && <button type="button" disabled={step === 0} onClick={() => setStep((value) => value - 1)}>← Précédent</button>}{quizMode && <button type="button" disabled={quizIndex === 0} onClick={() => setQuizIndex((value) => value - 1)}>← Précédent</button>}<span>{quizMode ? (needsAnswer && selectedAnswer === undefined ? 'Choisis une réponse pour continuer' : 'Réponse enregistrée') : 'Progresse à ton rythme'}</span>{!quizMode && step < total - 1 ? <button type="button" onClick={() => setStep((value) => value + 1)}>Suivant →</button> : !quizMode ? <button type="button" className="learn-primary" onClick={() => lesson.inlineQuizOnly ? setFinished(true) : setQuizMode(true)}>{lesson.inlineQuizOnly ? 'Voir mon résultat →' : 'Tester mes connaissances →'}</button> : quizIndex < lesson.quiz.length - 1 ? <button type="button" disabled={needsAnswer && selectedAnswer === undefined} onClick={() => setQuizIndex((value) => value + 1)}>Suivant →</button> : <button type="button" disabled={needsAnswer && selectedAnswer === undefined} className="learn-primary" onClick={() => setFinished(true)}>Voir mon résultat →</button>}</div></section>
}



