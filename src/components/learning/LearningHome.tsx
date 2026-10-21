'use client'

import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import {
  ArrowRight,
  Check,
  CircleParking,
  Gauge,
  GitBranch,
  LockKeyhole,
  Play,
  Route,
  ShieldCheck,
  Signpost,
  Sparkles,
  TrafficCone,
  TrainFront,
  Trophy,
  Users,
  Wrench,
  type LucideIcon,
} from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { LEARNING_LESSONS } from '@/content/learning/lesson-1'
import { MODULE_3 } from '@/content/learning/module-3'
import { MODULE_4 } from '@/content/learning/module-4'
import { MODULE_5 } from '@/content/learning/module-5'
import { MODULE_6 } from '@/content/learning/module-6'
import { MODULE_7 } from '@/content/learning/module-7'
import { MODULE_8 } from '@/content/learning/module-8'
import { MODULE_9 } from '@/content/learning/module-9'
import { MODULE_10 } from '@/content/learning/module-10'

type ModuleDefinition = {
  id: string
  number: string
  title: string
  description: string
  final: { id: string; title: string; description: string; locked: boolean }
  icon: LucideIcon
  tone: string
  challengeKey: string
}

const MODULES: ModuleDefinition[] = [
  { id: 'signalisation', number: 'MODULE 1', title: 'Comprendre la signalisation', description: 'Les indications qui organisent la route.', final: { id: 'defi-final', title: 'Défi final — Signalisation', description: '15 situations · 8 leçons évaluées · +50 XP', locked: false }, icon: Signpost, tone: 'amber', challengeKey: 'permishub.final-challenge.v1' },
  { id: 'priorities-intersections', number: 'MODULE 2', title: 'Priorités & carrefours', description: 'Observer un carrefour et appliquer la règle adaptée.', final: { id: 'defi-final-priorites-carrefours', title: 'Défi final — Priorités & carrefours', description: '15 situations · 7 leçons évaluées · +50 XP', locked: false }, icon: GitBranch, tone: 'sage', challengeKey: 'permishub.module-2-final-challenge.v1' },
  { id: MODULE_3.id, number: MODULE_3.number, title: MODULE_3.title, description: MODULE_3.description, final: { id: MODULE_3.finalChallenge.id, title: MODULE_3.finalChallenge.title, description: '15 questions · +50 XP', locked: false }, icon: Gauge, tone: 'blue', challengeKey: 'permishub.module-3-final-challenge.v1' },
  { id: MODULE_4.id, number: MODULE_4.number, title: MODULE_4.title, description: MODULE_4.description, final: { id: MODULE_4.finalChallenge.id, title: MODULE_4.finalChallenge.title, description: '15 situations · 7 leçons évaluées · +50 XP', locked: false }, icon: TrafficCone, tone: 'coral', challengeKey: 'permishub.module-4-final-challenge.v1' },
  { id: MODULE_5.id, number: MODULE_5.number, title: MODULE_5.title, description: MODULE_5.description, final: { id: MODULE_5.finalChallenge.id, title: MODULE_5.finalChallenge.title, description: '15 situations · 7 leçons évaluées · +50 XP', locked: false }, icon: CircleParking, tone: 'violet', challengeKey: 'permishub.module-5-final-challenge.v1' },
  { id: MODULE_6.id, number: MODULE_6.number, title: MODULE_6.title, description: MODULE_6.description, final: { id: MODULE_6.finalChallenge.id, title: MODULE_6.finalChallenge.title, description: '15 situations · 7 leçons évaluées · +50 XP', locked: false }, icon: ShieldCheck, tone: 'red', challengeKey: 'permishub.module-6-final-challenge.v1' },
  { id: MODULE_7.id, number: MODULE_7.number, title: MODULE_7.title, description: MODULE_7.description, final: { id: MODULE_7.finalChallenge.id, title: MODULE_7.finalChallenge.title, description: '15 situations · 7 leçons évaluées · +50 XP', locked: false }, icon: Wrench, tone: 'slate', challengeKey: 'permishub.module-7-final-challenge.v1' },
  { id: MODULE_8.id, number: MODULE_8.number, title: MODULE_8.title, description: MODULE_8.description, final: { id: MODULE_8.finalChallenge.id, title: MODULE_8.finalChallenge.title, description: '15 situations · 7 leçons évaluées · +50 XP', locked: false }, icon: Users, tone: 'teal', challengeKey: 'permishub.module-8-final-challenge.v1' },
  { id: MODULE_9.id, number: MODULE_9.number, title: MODULE_9.title, description: MODULE_9.description, final: { id: MODULE_9.finalChallenge.id, title: MODULE_9.finalChallenge.title, description: '15 situations · 7 leçons évaluées · +50 XP', locked: false }, icon: Route, tone: 'navy', challengeKey: 'permishub.module-9-final-challenge.v1' },
  { id: MODULE_10.id, number: MODULE_10.number, title: MODULE_10.title, description: MODULE_10.description, final: { id: MODULE_10.finalChallenge.id, title: MODULE_10.finalChallenge.title, description: '15 situations · 7 leçons évaluées · +50 XP', locked: false }, icon: TrainFront, tone: 'forest', challengeKey: 'permishub.module-10-final-challenge.v1' },
]

type SavedProgress = Record<string, number>
type ChallengeProgress = Record<string, boolean>

export function LearningHome({ hasPremiumAccess, locale }: { hasPremiumAccess: boolean; locale: 'fr' | 'nl' }) {
  const [savedProgress, setSavedProgress] = useState<SavedProgress>({})
  const [challengeProgress, setChallengeProgress] = useState<ChallengeProgress>({})
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const readProgress = () => {
      const lessonState: SavedProgress = {}
      const challengeState: ChallengeProgress = {}
      LEARNING_LESSONS.forEach((lesson) => {
        const raw = window.localStorage.getItem(`permishub.lesson.${lesson.id}`)
        if (raw !== null && Number.isFinite(Number(raw))) lessonState[lesson.id] = Math.max(0, Number(raw))
      })
      MODULES.forEach((module) => {
        const raw = window.localStorage.getItem(module.challengeKey)
        if (!raw) return
        try { challengeState[module.id] = Boolean(JSON.parse(raw)?.done) } catch { challengeState[module.id] = false }
      })
      setSavedProgress(lessonState)
      setChallengeProgress(challengeState)
      setHydrated(true)
    }
    readProgress()
    window.addEventListener('storage', readProgress)
    return () => window.removeEventListener('storage', readProgress)
  }, [])

  const lessonProgress = useMemo(() => LEARNING_LESSONS.map((lesson) => {
    const savedStep = savedProgress[lesson.id]
    const started = savedStep !== undefined
    const percentage = started ? Math.min(100, Math.round(((savedStep + 1) / lesson.steps.length) * 100)) : 0
    return { lesson, started, percentage, completed: percentage === 100 }
  }), [savedProgress])

  const completedLessons = lessonProgress.filter((item) => item.completed).length
  const startedLessons = lessonProgress.filter((item) => item.started).length
  const completedChallenges = Object.values(challengeProgress).filter(Boolean).length
  const overallProgress = Math.round(((completedLessons + completedChallenges) / (LEARNING_LESSONS.length + MODULES.length)) * 100)
  const nextItem = lessonProgress.find((item) => item.started && !item.completed) ?? lessonProgress.find((item) => !item.started) ?? lessonProgress[0]
  const nextModule = MODULES.find((module) => module.id === nextItem?.lesson.moduleId)

  return (
    <main className="learn-shell learn-catalogue">
      <section className="learn-dashboard" aria-labelledby="learn-title">
        <div className="learn-dashboard-copy">
          <span className="learn-kicker">FORMATION THÉORIQUE · PERMIS B BELGE</span>
          <h1 id="learn-title">Ta route vers la réussite,<br /><em>étape par étape.</em></h1>
          <p>10 modules structurés pour comprendre les règles, reconnaître les pièges et avancer avec confiance.</p>
          <Link className="learn-resume" href={`/apprendre/${nextItem?.lesson.id ?? LEARNING_LESSONS[0].id}`}>
            <Play size={18} fill="currentColor" aria-hidden="true" />
            <span>{startedLessons ? 'Reprendre ma formation' : 'Commencer ma formation'}</span>
            <ArrowRight size={19} aria-hidden="true" />
          </Link>
          {hasPremiumAccess ? <a className="learn-manage-subscription" href={`/api/billing/learning?locale=${locale}`}>Gérer mon abonnement</a> : <small className="learn-free-note">Module 1 gratuit · Modules 2 à 10 : 7,99 €/semaine</small>}
          {nextItem ? <small className="learn-next-objective"><Sparkles size={15} aria-hidden="true" /> Prochaine étape : <strong>{nextItem.lesson.title}</strong>{nextModule ? ` · ${nextModule.number}` : ''}</small> : null}
        </div>
        <div className="learn-overview" aria-label="Progression globale">
          <div className="learn-overview-ring" style={{ '--learn-progress': `${hydrated ? overallProgress : 0}%` } as CSSProperties}>
            <strong>{hydrated ? overallProgress : 0}%</strong><span>parcours</span>
          </div>
          <div className="learn-overview-stats">
            <div><strong>{completedLessons}</strong><span>leçons parcourues</span></div>
            <div><strong>{completedChallenges}/10</strong><span>défis terminés</span></div>
            <div><strong>71</strong><span>leçons au total</span></div>
          </div>
        </div>
      </section>

      <div className="learn-journey-heading">
        <div><span className="learn-kicker">TON PARCOURS</span><h2>10 étapes pour tout maîtriser</h2></div>
        <p>Avance à ton rythme. La prochaine leçon utile est toujours mise en évidence.</p>
      </div>

      <div className="learn-journey">
        {MODULES.map((module, moduleIndex) => {
          const requiresSubscription = moduleIndex > 0 && !hasPremiumAccess
          const lessons = lessonProgress.filter((item) => item.lesson.moduleId === module.id)
          const moduleCompleted = lessons.filter((item) => item.completed).length
          const modulePercent = Math.round((moduleCompleted / lessons.length) * 100)
          const challengeDone = challengeProgress[module.id]
          const ModuleIcon = module.icon
          return (
            <section className={`learn-module learn-module--${module.tone}`} key={module.id} aria-labelledby={`module-${moduleIndex + 1}`}>
              <div className="learn-module-rail" aria-hidden="true"><span>{moduleIndex + 1}</span></div>
              <div className="learn-module-body">
                <header className="learn-module-head">
                  <div className="learn-icon"><ModuleIcon size={26} strokeWidth={2.2} aria-hidden="true" /></div>
                  <div className="learn-module-title"><span className="learn-kicker">{module.number}</span><h2 id={`module-${moduleIndex + 1}`}>{module.title}</h2><p>{module.description}</p></div>
                  <div className="learn-module-score">{requiresSubscription ? <><LockKeyhole size={21} aria-hidden="true" /><span>Abonnement requis</span></> : <><strong>{modulePercent}%</strong><span>{moduleCompleted}/{lessons.length} leçons</span></>}</div>
                </header>
                <div className="learn-module-progress" aria-label={`${modulePercent}% du module parcouru`}><div><i style={{ width: `${hydrated ? modulePercent : 0}%` }} /></div><span>{modulePercent === 100 && challengeDone ? 'Module terminé' : moduleCompleted ? `${lessons.length - moduleCompleted} leçons restantes` : 'Prêt à commencer'}</span></div>
                <div className="learn-lessons">
                  {requiresSubscription ? <div className="learn-subscription-lock"><LockKeyhole size={30} aria-hidden="true" /><div><strong>Débloque ce module et tous les suivants</strong><p>Accès complet aux modules 2 à 10 pour 7,99 € par semaine. Résiliable à tout moment.</p></div><a className="learn-primary" href={`/api/checkout/learning-subscription?locale=${locale}`}>S’abonner — 7,99 €/semaine</a></div> : lessons.map(({ lesson, started, completed, percentage }, lessonIndex) => {
                    const isCurrent = nextItem?.lesson.id === lesson.id
                    const status = completed ? 'completed' : started ? 'progress' : 'new'
                    return <Link href={`/apprendre/${lesson.id}`} className={`learn-lesson-card is-${status}${isCurrent ? ' is-current' : ''}`} key={lesson.id} aria-label={`${lesson.title} — ${completed ? 'Réviser' : started ? 'Continuer' : 'Commencer'}`}>
                      <span className="learn-lesson-number">{completed ? <Check size={18} strokeWidth={3} aria-hidden="true" /> : String(lessonIndex + 1).padStart(2, '0')}</span>
                      <div className="learn-lesson-copy"><div className="learn-lesson-title-row"><strong>{lesson.title}</strong>{isCurrent ? <span className="learn-current-badge">À suivre</span> : null}</div><p>{lesson.description}</p><div className="learn-lesson-meta"><span>{lesson.steps.length} écrans</span><span>{lesson.xp} XP</span>{started && !completed ? <span>{percentage}% parcouru</span> : null}</div></div>
                      <span className="learn-lesson-action">{completed ? 'Réviser' : started ? 'Continuer' : 'Commencer'} <ArrowRight size={16} aria-hidden="true" /></span>
                    </Link>
                  })}
                  {!requiresSubscription && (module.final.locked ? <div className="learn-challenge-card is-locked" aria-disabled="true"><div className="learn-challenge-icon"><LockKeyhole aria-hidden="true" /></div><div><span className="learn-kicker">DÉFI FINAL</span><strong>{module.final.title}</strong><p>{module.final.description}</p></div><span>Verrouillé</span></div> : <Link href={`/apprendre/${module.final.id}`} className={`learn-challenge-card${challengeDone ? ' is-completed' : ''}`}><div className="learn-challenge-icon"><Trophy aria-hidden="true" /></div><div><span className="learn-kicker">DÉFI FINAL</span><strong>{module.final.title}</strong><p>{module.final.description}</p></div><span>{challengeDone ? 'Rejouer' : 'Lancer le défi'} <ArrowRight size={17} aria-hidden="true" /></span></Link>)}
                </div>
              </div>
            </section>
          )
        })}
      </div>
    </main>
  )
}

