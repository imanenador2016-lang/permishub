'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { COACHING_INTENSIF_SESSIONS } from '@/content/coaching-intensif'

export function CoachingBooking() {
  const searchParams = useSearchParams()
  const [selected, setSelected] = useState<string>()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const requestedSession = searchParams?.get('session')
    if (requestedSession && COACHING_INTENSIF_SESSIONS.some((session) => session.id === requestedSession)) {
      setSelected(requestedSession)
    }
  }, [searchParams])

  const reserve = async () => {
    if (!selected) { setMessage('Choisis un créneau.'); return }
    if (!/^\S+@\S+\.\S+$/.test(email)) { setMessage('Indique une adresse e-mail valide.'); return }
    setLoading(true)
    setMessage('')
    try {
      const response = await fetch('/api/checkout/coaching', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ sessionId: selected, email }) })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error)
      window.location.assign(data.url)
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Une erreur est survenue.')
      setLoading(false)
    }
  }

  return <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10"><div className="grid items-stretch gap-5 lg:grid-cols-[.9fr_1.1fr]">
    <header className="panel flex flex-col justify-center p-7 sm:p-10"><span className="inline-block w-fit -rotate-2 border-[3px] border-ink bg-yellow px-4 py-2 font-display text-sm shadow-hard-xs">EN DIRECT SUR ZOOM</span><p className="mt-8 text-sm font-bold uppercase tracking-[.14em] text-forest">Permis B · Belgique</p><h1 className="mt-3 max-w-xl text-4xl leading-[.98] sm:text-6xl">Coaching intensif pour ton permis.</h1><p className="mt-6 max-w-lg text-lg leading-relaxed text-ink/85">La crème de la crème : l’essentiel pour réussir, en direct avec PermisHub.</p><ul className="mt-8 space-y-3 font-bold"><li className="flex gap-3"><span className="grid size-7 shrink-0 place-items-center rounded-full border-[3px] border-ink bg-forest text-cream">✓</span>Session intensive de 5 heures</li><li className="flex gap-3"><span className="grid size-7 shrink-0 place-items-center rounded-full border-[3px] border-ink bg-forest text-cream">✓</span>Samedi ou dimanche, de 09:00 à 14:00</li><li className="flex gap-3"><span className="grid size-7 shrink-0 place-items-center rounded-full border-[3px] border-ink bg-forest text-cream">✓</span>Participation en direct sur Zoom</li></ul></header>
    <div className="panel p-6 sm:p-10"><p className="inline-block -rotate-1 border-[3px] border-ink bg-yellow px-3 py-1 font-display text-sm shadow-hard-xs">79 €</p><h2 className="mt-6 text-3xl leading-none">Choisis ton créneau</h2><p className="mt-3 text-ink/75">Sélectionne ta session avant de passer au paiement sécurisé.</p><div className="mt-6 grid gap-4 sm:grid-cols-2">{COACHING_INTENSIF_SESSIONS.map((session) => { const isSelected = selected === session.id; return <button key={session.id} type="button" aria-pressed={isSelected} onClick={() => setSelected(session.id)} className={`border-[3px] border-ink p-5 text-left transition-transform focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-forest ${isSelected ? 'bg-yellow shadow-hard-xs' : 'bg-cream hover:-translate-y-0.5 hover:shadow-hard-xs'}`}><b className="block text-xl leading-tight">{session.label}</b><span className="mt-3 block">{session.time} · Zoom</span><strong className="mt-5 block font-display text-lg">79 €</strong></button> })}</div><label className="mt-8 block text-sm font-bold" htmlFor="coaching-email">Ton e-mail<input id="coaching-email" value={email} onChange={(event) => setEmail(event.target.value)} type="email" autoComplete="email" placeholder="prenom@email.com" className="mt-2 block w-full border-[3px] border-ink bg-cream px-4 py-3 text-base font-normal outline-none focus:border-forest focus:ring-2 focus:ring-forest/30" /></label><p className="mt-3 text-sm text-ink/70">Après paiement confirmé, les informations de connexion Zoom te seront communiquées.</p><button type="button" onClick={reserve} disabled={loading} className="btn-comic mt-7 w-full px-5 py-4 text-base disabled:cursor-not-allowed disabled:opacity-60">{loading ? 'Redirection vers Stripe…' : 'Réserver ma place — 79 €'}</button>{message ? <p className="mt-4 font-bold text-brick" role="alert">{message}</p> : null}</div>
  </div></section>
}


