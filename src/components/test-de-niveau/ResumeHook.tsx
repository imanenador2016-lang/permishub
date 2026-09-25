'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import { RadarChart, type RadarDatum } from './RadarChart'

type Diagnostic = { label: string; errors: number; total: number }

function scoreCopy(score: number) {
  if (score === 10) return { title: '10/10. Là, rien à dire.', text: 'Mais c’était un petit test. L’examen, lui, en compte 50.' }
  if (score === 9) return { title: 'Une faute sur 10.', text: 'Ça paraît peu. Mais on vient à peine de commencer.' }
  if (score === 8) return { title: '2 fautes. Sur seulement 10 questions.', text: 'Sur un petit test comme celui-ci, c’est déjà quelque chose à prendre au sérieux.' }
  if (score === 7) return { title: '3 fautes en 10 questions.', text: 'Là, ce n’est plus juste une petite erreur isolée. Il y a des règles à revoir.' }
  if (score === 6) return { title: '4 fautes sur 10.', text: 'Plusieurs règles ne sont clairement pas encore automatiques.' }
  if (score === 5) return { title: 'Une question sur deux.', text: 'Et on ne t’en a posé que 10.' }
  return { title: 'On va pas te mentir : il y a du travail.', text: 'Et c’est mieux de le voir maintenant que le jour de l’examen.' }
}

export function ResumeHook({ score10, answerStates, diagnostics, radarData, onSkip }: { score10: number; answerStates: boolean[]; diagnostics: Diagnostic[]; radarData: RadarDatum[]; onSkip: () => void }) {
  const score = Math.min(10, Math.max(0, Math.round(score10)))
  const [analysing, setAnalysing] = useState(true)
  const [displayScore, setDisplayScore] = useState(0)
  const [showFifty, setShowFifty] = useState(false)
  const [showSticky, setShowSticky] = useState(false)
  const coachingRef = useRef<HTMLElement>(null)
  const copy = scoreCopy(score)

  useEffect(() => {
    const reveal = window.setTimeout(() => setAnalysing(false), 700)
    const fifty = window.setTimeout(() => setShowFifty(true), 1900)
    return () => { window.clearTimeout(reveal); window.clearTimeout(fifty) }
  }, [])
  useEffect(() => {
    const target = coachingRef.current
    if (!target) return
    const observer = new IntersectionObserver(([entry]) => setShowSticky(entry.isIntersecting), { threshold: 0.25 })
    observer.observe(target)
    return () => observer.disconnect()
  }, [analysing])
  useEffect(() => {
    if (analysing) return
    if (displayScore >= score) return
    const timer = window.setTimeout(() => setDisplayScore((value) => value + 1), 75)
    return () => window.clearTimeout(timer)
  }, [analysing, displayScore, score])

  const firstSession = { label: 'Samedi 26 septembre', time: '09:00–14:00', seats: 3, href: '/fr/coaching?session=coaching-intensif-2026-09-26' }
  const sundaySession = { label: 'Dimanche 27 septembre', time: '09:00–14:00', seats: 1, href: '/fr/coaching?session=coaching-intensif-2026-09-27' }
  const errors = diagnostics.filter((item) => item.errors > 0)
  const priorityLabels = errors.slice(0, 2).map((item) => item.label)
  const allCells = useMemo(() => Array.from({ length: 50 }, (_, index) => index), [])

  return <div className="pb-16 sm:pb-4">
    {analysing ? <div className="flex min-h-56 flex-col items-center justify-center text-center"><span className="size-10 animate-spin rounded-full border-4 border-ink border-t-yellow" aria-hidden="true" /><p className="mt-5 font-display text-2xl">On regarde ça…</p></div> : <>
      <div className="text-center"><p className="inline-block -rotate-2 border-[3px] border-ink bg-yellow px-3 py-1 font-display text-xs shadow-hard-xs">TON RÉSULTAT</p><div className="mt-7 flex items-end justify-center leading-none"><span className="font-display text-8xl tabular-nums sm:text-9xl">{displayScore}</span><span className="mb-2 ml-1 font-display text-3xl text-ink/60">/10</span></div><div className="mt-7 grid grid-cols-10 gap-1.5" aria-label={`${answerStates.filter(Boolean).length} réponses correctes`}>
        {answerStates.map((correct, index) => <span key={index} className={`aspect-square border-2 border-ink motion-safe:animate-[pulse_.28s_ease-out_both] ${correct ? 'bg-forest' : 'bg-brick'}`} style={{ animationDelay: `${index * 55}ms` }} aria-label={correct ? `Question ${index + 1} correcte` : `Question ${index + 1} incorrecte`} />)}
      </div><h2 className="mt-8 font-display text-3xl leading-[1.02] sm:text-4xl">{copy.title}</h2><p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-ink/80">{copy.text}</p></div>

      <section className="mt-12 border-y-[3px] border-ink py-7"><p className="font-display text-sm uppercase tracking-wide text-forest">{showFifty ? '50 questions à l’examen' : 'Le petit test'}</p><div className={`mt-4 grid grid-cols-10 gap-1.5 transition-all duration-500 ${showFifty ? 'scale-100' : 'max-h-12 overflow-hidden'}`}>{allCells.map((cell) => <span key={cell} className={`aspect-square border-2 border-ink ${cell < answerStates.length ? answerStates[cell] ? 'bg-forest' : 'bg-brick' : 'bg-ink/10'} ${cell >= answerStates.length && showFifty ? 'motion-safe:animate-[pulse_.3s_ease-out_both]' : ''}`} style={{ animationDelay: `${Math.max(0, cell - answerStates.length) * 22}ms` }} />)}</div>{showFifty && <div className="mt-6"><p className="font-display text-xl">Et ça, c’était le petit test.</p><p className="mt-2 text-ink/75">L’examen ne s’arrête pas à la 10e question.</p></div>}</section>

      <section className="mt-12"><h2 className="text-3xl leading-none">Voilà où tu as perdu tes points</h2>{errors.length ? <div className="mt-6 grid gap-3">{errors.map((item) => <div key={item.label} className="border-[3px] border-ink bg-creamdim p-4"><div className="flex items-center justify-between gap-4"><p className="font-display text-lg leading-tight">{item.label}</p><span className="shrink-0 border-2 border-ink bg-brick px-2 py-1 text-sm font-bold text-cream">{item.errors} erreur{item.errors > 1 ? 's' : ''}</span></div>{item.total > 1 && <p className="mt-2 text-sm text-ink/70">{item.total} questions dans ce thème</p>}</div>)}</div> : <p className="mt-5 border-[3px] border-forest bg-forest/10 p-4 font-medium">Aucune erreur sur ce test.</p>}</section>

      <section className="mt-12"><h2 className="text-3xl leading-none">Ton diagnostic en détail</h2><p className="mt-3 text-ink/75">Une vue par thème, basée uniquement sur tes réponses.</p>{radarData.length > 0 && <div className="mt-5 border-[3px] border-ink bg-creamdim p-4"><RadarChart data={radarData} size={260} /></div>}</section>

      <section ref={coachingRef} id="coaching-result" className="mt-12 border-[4px] border-ink bg-forest p-6 text-cream shadow-hard sm:p-8"><p className="inline-block -rotate-2 border-[3px] border-ink bg-yellow px-3 py-1 font-display text-xs text-ink shadow-hard-xs">PERMISHUB · COACHING INTENSIF</p><h2 className="mt-7 text-4xl leading-[.98]">Tu sais maintenant ce qui bloque.</h2><p className="mt-5 max-w-xl text-cream/85">Le but, ce n’est pas de refaire des questions au hasard. C’est de comprendre pourquoi tu te trompes et arrêter de refaire les mêmes erreurs.</p>{priorityLabels.length > 0 && <div className="mt-6"><p className="text-xs font-bold uppercase tracking-wide text-yellow">À revoir en priorité</p><div className="mt-3 flex flex-wrap gap-2">{priorityLabels.map((label) => <span key={label} className="border-2 border-cream bg-cream/10 px-3 py-1.5 text-sm font-bold">{label}</span>)}</div></div>}<p className="mt-7 font-display text-2xl">C’est exactement ce qu’on travaille pendant la séance intensive.</p><div className="mt-6 border-[3px] border-ink bg-cream p-5 text-ink"><p className="font-display text-xl">Prochaine séance</p><p className="mt-2 text-lg font-bold">{firstSession.label} · {firstSession.time}</p><p className="mt-2 text-sm">5H · En direct · Zoom · 79 €</p><p className="mt-4 inline-block border-2 border-ink bg-yellow px-2 py-1 text-sm font-bold">{firstSession.seats} places restantes</p><ul className="mt-5 space-y-2 text-sm"><li>• Les règles qui font hésiter</li><li>• Les questions pièges et les fautes graves</li><li>• Comprendre les réponses, puis s’entraîner en direct</li></ul><Link href={firstSession.href} className="btn-comic mt-6 w-full px-5 py-4">Réserver samedi →</Link><div className="mt-4 border-t-[3px] border-ink pt-4"><p className="font-display text-lg">Autre créneau : dimanche 27 septembre</p><p className="mt-1 text-sm">09:00–14:00 · Zoom · 79 €</p><p className="mt-3 inline-block border-2 border-ink bg-brick px-2 py-1 text-sm font-bold text-cream">Plus qu’1 place restante</p><Link href={sundaySession.href} className="mt-4 block w-full border-[3px] border-ink bg-cream px-4 py-3 text-center font-display text-sm text-ink shadow-hard-xs hover:bg-yellow">Réserver dimanche →</Link></div></div></section>
      <button onClick={onSkip} className="mt-6 block w-full text-center text-xs text-ink/50 underline">Fermer le résultat</button>
      <div className={`fixed inset-x-3 bottom-3 z-30 transition-all sm:hidden ${showSticky ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-16 opacity-0'}`}><Link href={firstSession.href} className="flex items-center justify-between border-[3px] border-ink bg-yellow px-4 py-3 font-display text-sm shadow-hard-xs"><span>Séance intensive 5H · 79 €</span><span>Réserver →</span></Link></div>
    </>}
  </div>
}


