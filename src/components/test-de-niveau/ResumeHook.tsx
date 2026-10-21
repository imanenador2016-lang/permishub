'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { RadarChart, type RadarDatum } from './RadarChart'
import { TESTIMONIALS } from '@/components/home/TestimonialsSection'
import { OfferCard } from '@/components/pricing/OfferCard'
import { EXAMENS_ILLIMITES_OFFER, PACK_THEORIE_ILLIMITE_OFFER, RESUME_OFFER } from '@/content/pricing-config'

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
  const testimonialsT = useTranslations('testimonials')
  const score = Math.min(10, Math.max(0, Math.round(score10)))
  const [analysing, setAnalysing] = useState(true)
  const [displayScore, setDisplayScore] = useState(0)
  const [showFifty, setShowFifty] = useState(false)
  const copy = scoreCopy(score)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const reveal = window.setTimeout(() => setAnalysing(false), 700)
    const fifty = window.setTimeout(() => setShowFifty(true), 1900)
    return () => { window.clearTimeout(reveal); window.clearTimeout(fifty) }
  }, [])
  useEffect(() => {
    if (analysing) return
    if (displayScore >= score) return
    const timer = window.setTimeout(() => setDisplayScore((value) => value + 1), 75)
    return () => window.clearTimeout(timer)
  }, [analysing, displayScore, score])

  const errors = diagnostics.filter((item) => item.errors > 0)
  const allCells = useMemo(() => Array.from({ length: 50 }, (_, index) => index), [])

  return <div className="pb-16 sm:pb-4">
    {analysing ? <div className="flex min-h-56 flex-col items-center justify-center text-center"><span className="size-10 animate-spin rounded-full border-4 border-ink border-t-yellow" aria-hidden="true" /><p className="mt-5 font-display text-2xl">On regarde ça…</p></div> : <>
      <div className="sm:hidden">
        <div className="flex items-center justify-between gap-2 pr-10">
          <p className="font-display text-[10px] uppercase tracking-[.14em] text-forest">Ton résultat</p>
          <p className="font-display leading-none"><span className="text-3xl tabular-nums">{displayScore}</span><span className="ml-0.5 text-base text-ink/60">/10</span></p>
        </div>
      </div>

      <div className="hidden text-center sm:block"><p className="inline-block -rotate-2 border-[3px] border-ink bg-yellow px-3 py-1 font-display text-xs shadow-hard-xs">TON RÉSULTAT</p><div className="mt-3 flex items-end justify-center leading-none"><span className="font-display text-7xl tabular-nums">{displayScore}</span><span className="mb-1 ml-1 font-display text-2xl text-ink/60">/10</span></div><div className="mx-auto mt-3 grid max-w-md grid-cols-10 gap-1.5" aria-label={`${answerStates.filter(Boolean).length} réponses correctes`}>
        {answerStates.map((correct, index) => <span key={index} className={`aspect-square border-2 border-ink motion-safe:animate-[pulse_.28s_ease-out_both] ${correct ? 'bg-forest' : 'bg-brick'}`} style={{ animationDelay: `${index * 55}ms` }} aria-label={correct ? `Question ${index + 1} correcte` : `Question ${index + 1} incorrecte`} />)}
      </div><h2 className="mt-5 font-display text-3xl leading-[1.02]">{copy.title}</h2><p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-ink/80">{copy.text}</p></div>

      <motion.section initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .32 }} aria-label="Résumé sans blabla et séries d’examens" className="mx-auto mt-5 max-w-xl">
        <OfferCard
          eyebrow="OFFRE RECOMMANDÉE APRÈS TON TEST"
          scoreLabel={'Ton score ' + score + '/10'}
          title="Résumé sans blabla + séries d’examens"
          description="Révise les règles essentielles, puis entraîne-toi avec des questions mises à jour chaque semaine."
          bullets={["Questions mises à jour chaque semaine", "Accès illimité", "Sans abonnement"]}
          offer={PACK_THEORIE_ILLIMITE_OFFER}
          imageSrc="/images/offers/pack-resume-examens.webp"
          imageAlt="Pack théorie PermisHub avec résumé et examens"
          ctaLabel="Débloquer le pack"
          tone="forest"
          highlight
        />
      </motion.section>


      <section aria-label="Offres secondaires" className="mx-auto mt-4 grid max-w-xl gap-3 sm:grid-cols-2">
        <OfferCard
          compact
          eyebrow="RÉSUMÉ SEUL"
          title="Résumé sans blabla"
          description="Les règles essentielles du permis théorique, sans détour."
          bullets={["PDF de révision", "Accès immédiat après paiement"]}
          offer={RESUME_OFFER}
          ctaLabel="Obtenir le résumé"
        />
        <OfferCard
          compact
          eyebrow="EXAMENS SEULS"
          title="Séries d’examens"
          description="Entraîne-toi avec des questions régulièrement renouvelées."
          bullets={["Questions mises à jour chaque semaine", "Accès illimité", "Sans abonnement"]}
          offer={EXAMENS_ILLIMITES_OFFER}
          ctaLabel="Débloquer les examens"
        />
      </section>

      <section aria-labelledby="test-result-reviews" className="mx-auto mt-5 max-w-xl rounded-2xl border border-forest/15 bg-forest/[0.05] p-4 sm:mt-6 sm:p-5">
        <h2 id="test-result-reviews" className="mb-3 font-display text-lg leading-tight text-ink sm:text-xl">{testimonialsT('title')}</h2>
        <div className="grid gap-2.5 sm:grid-cols-3">
          {TESTIMONIALS.slice(0, 3).map((item) => (
            <article key={item.key} className="flex min-w-0 items-start gap-2.5 rounded-xl border border-ink/10 bg-cream p-2.5">
              <div className="relative size-11 flex-none overflow-hidden rounded-lg">
                <Image src={item.photo} alt="" fill sizes="44px" className="object-cover" />
              </div>
              <div className="min-w-0">
                <p aria-hidden="true" className="mb-1 text-[10px] leading-none tracking-[.12em] text-[#C79200]">★★★★★</p>
                <p className="text-xs font-medium leading-snug text-ink">“{testimonialsT(`${item.key}.quote`)}”</p>
                <p className="mt-1.5 text-[10px] font-semibold text-forest">{testimonialsT(`${item.key}.label`)}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12 border-y-[3px] border-ink py-7"><p className="font-display text-sm uppercase tracking-wide text-forest">{showFifty ? '50 questions à l’examen' : 'Le petit test'}</p><div className={`mt-4 grid grid-cols-10 gap-1.5 transition-all duration-500 ${showFifty ? 'scale-100' : 'max-h-12 overflow-hidden'}`}>{allCells.map((cell) => <span key={cell} className={`aspect-square border-2 border-ink ${cell < answerStates.length ? answerStates[cell] ? 'bg-forest' : 'bg-brick' : 'bg-ink/10'} ${cell >= answerStates.length && showFifty ? 'motion-safe:animate-[pulse_.3s_ease-out_both]' : ''}`} style={{ animationDelay: `${Math.max(0, cell - answerStates.length) * 22}ms` }} />)}</div>{showFifty && <div className="mt-6"><p className="font-display text-xl">Et ça, c’était le petit test.</p><p className="mt-2 text-ink/75">L’examen ne s’arrête pas à la 10e question.</p></div>}</section>

      <section className="mt-12"><h2 className="text-3xl leading-none">Voilà où tu as perdu tes points</h2>{errors.length ? <div className="mt-6 grid gap-3">{errors.map((item) => <div key={item.label} className="border-[3px] border-ink bg-creamdim p-4"><div className="flex items-center justify-between gap-4"><p className="font-display text-lg leading-tight">{item.label}</p><span className="shrink-0 border-2 border-ink bg-brick px-2 py-1 text-sm font-bold text-cream">{item.errors} erreur{item.errors > 1 ? 's' : ''}</span></div>{item.total > 1 && <p className="mt-2 text-sm text-ink/70">{item.total} questions dans ce thème</p>}</div>)}</div> : <p className="mt-5 border-[3px] border-forest bg-forest/10 p-4 font-medium">Aucune erreur sur ce test.</p>}</section>

      <section className="mt-12"><h2 className="text-3xl leading-none">Ton diagnostic en détail</h2><p className="mt-3 text-ink/75">Une vue par thème, basée uniquement sur tes réponses.</p>{radarData.length > 0 && <div className="mt-5 border-[3px] border-ink bg-creamdim p-4"><RadarChart data={radarData} size={260} /></div>}</section>


      <button onClick={onSkip} className="mt-6 block w-full text-center text-xs text-ink/50 underline">Fermer le résultat</button>
    </>}
  </div>
}


