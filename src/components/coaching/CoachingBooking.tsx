'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Check, LockKeyhole, LoaderCircle } from 'lucide-react'
import { COACHING_INTENSIF_SESSIONS } from '@/content/coaching-intensif'

export function CoachingBooking() {
  const searchParams = useSearchParams()
  const firstAvailableSession = COACHING_INTENSIF_SESSIONS.find((session) => session.status === 'available')
  const [selected, setSelected] = useState<string | undefined>(firstAvailableSession?.id)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    void fetch('/api/checkout/coaching', { method: 'HEAD', cache: 'no-store' }).catch(() => undefined)
    const requestedSession = searchParams?.get('session')
    if (requestedSession && COACHING_INTENSIF_SESSIONS.some((session) => session.id === requestedSession && session.status === 'available')) setSelected(requestedSession)
  }, [searchParams])

  const reserve = async () => {
    if (!selected) { setMessage('Choisis un créneau.'); return }
    if (!/^\S+@\S+\.\S+$/.test(email)) { setMessage('Indique une adresse e-mail valide.'); return }
    setLoading(true)
    setMessage('')
    try {
      const response = await fetch('/api/checkout/coaching', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ sessionId: selected, email }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error)
      window.location.replace(data.url)
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Une erreur est survenue.')
      setLoading(false)
    }
  }

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
        <div className="grid items-stretch gap-5 lg:grid-cols-[.9fr_1.1fr]">
          <header className="panel flex flex-col justify-center p-7 sm:p-10">
            <span className="inline-block w-fit -rotate-2 border-[3px] border-ink bg-yellow px-4 py-2 font-display text-sm shadow-hard-xs">EN DIRECT SUR ZOOM</span>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <p className="text-sm font-bold uppercase tracking-[.14em] text-forest">Permis B · Belgique</p>
              <span className="border-2 border-ink bg-brick px-3 py-1 text-xs font-bold uppercase tracking-wide text-cream">Plus que 4 places</span>
            </div>
            <h1 className="mt-3 max-w-xl text-4xl leading-[.98] sm:text-6xl">5 heures pour faire décoller ta préparation.</h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink/85">Une session intensive à distance, en direct avec PermisHub, pour revoir l’essentiel et poser tes questions.</p>
            <ul className="mt-8 space-y-3 font-bold">
              <li className="flex gap-3"><span className="grid size-7 shrink-0 place-items-center rounded-full border-[3px] border-ink bg-forest text-cream">✓</span>Session intensive de 5 heures</li>
              <li className="flex gap-3"><span className="grid size-7 shrink-0 place-items-center rounded-full border-[3px] border-ink bg-forest text-cream">✓</span>Dimanche 1er novembre 2026, de 9 h à 14 h</li>
              <li className="flex gap-3"><span className="grid size-7 shrink-0 place-items-center rounded-full border-[3px] border-ink bg-forest text-cream">✓</span>À distance, en direct sur Zoom</li>
            </ul>
          </header>

          <div className="panel p-6 sm:p-10">
            <p className="inline-block -rotate-1 border-[3px] border-ink bg-yellow px-3 py-1 font-display text-sm shadow-hard-xs">79 €</p>
            <h2 className="mt-6 text-3xl leading-none">Réserve ta place</h2>
            <p className="mt-3 text-ink/75">Confirme la séance avant de passer au paiement sécurisé.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {COACHING_INTENSIF_SESSIONS.map((session) => {
                const isSelected = selected === session.id
                const isComplete = session.status === 'complete'
                const isExpired = session.status === 'expired'
                const isUnavailable = isComplete || isExpired
                return (
                  <button key={session.id} type="button" aria-pressed={isSelected} disabled={isUnavailable || loading} onClick={() => !isUnavailable && setSelected(session.id)} className={`border-[3px] border-ink p-5 text-left transition-transform focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-forest ${isUnavailable ? 'cursor-not-allowed bg-creamdim opacity-60' : isSelected ? 'bg-yellow shadow-hard-xs' : 'bg-cream hover:-translate-y-0.5 hover:shadow-hard-xs'}`}>
                    <b className="block text-xl leading-tight">{session.label}</b>
                    <span className="mt-3 block">{session.time} · Zoom</span>
                    {isComplete ? <span className="mt-4 block w-fit border-2 border-ink bg-brick px-2 py-1 text-xs font-bold text-cream">COMPLET</span> : isExpired ? <span className="mt-4 block w-fit border-2 border-ink bg-creamdim px-2 py-1 text-xs font-bold">SESSION TERMINÉE</span> : <span className="mt-4 inline-flex items-center gap-1.5 border-2 border-ink bg-brick px-2 py-1 text-xs font-bold text-cream"><Check size={14} aria-hidden="true" /> PLUS QUE {session.remainingSeats} PLACES</span>}
                    <strong className="mt-5 block font-display text-lg">{(session.priceCents / 100).toFixed(0)} €</strong>
                  </button>
                )
              })}
            </div>
            <label className="mt-8 block text-sm font-bold" htmlFor="coaching-email">Ton e-mail
              <input id="coaching-email" value={email} onChange={(event) => setEmail(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !loading) reserve() }} type="email" autoComplete="email" inputMode="email" placeholder="prenom@email.com" disabled={loading} className="mt-2 block w-full border-[3px] border-ink bg-cream px-4 py-3 text-base font-normal outline-none focus:border-forest focus:ring-2 focus:ring-forest/30 disabled:opacity-70" />
            </label>
            <p className="mt-3 text-sm text-ink/70">Après paiement confirmé, les informations de connexion Zoom te seront communiquées.</p>
            <button type="button" onClick={reserve} disabled={loading || !selected} className="btn-comic mt-7 w-full px-5 py-4 text-base disabled:cursor-not-allowed disabled:opacity-60">{loading ? <span className="inline-flex items-center justify-center gap-2"><LoaderCircle size={18} className="animate-spin" aria-hidden="true" />Connexion à Stripe…</span> : 'Réserver ma place — 79 €'}</button>
            {message ? <p className="mt-4 font-bold text-brick" role="alert">{message}</p> : null}
          </div>
        </div>
      </section>

      {loading ? (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-ink/75 px-5 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="stripe-loading-title" aria-describedby="stripe-loading-description">
          <div className="w-full max-w-md border-[4px] border-ink bg-cream p-7 text-center shadow-hard sm:p-10">
            <div className="mx-auto grid size-16 place-items-center rounded-full border-[3px] border-ink bg-yellow"><LoaderCircle className="animate-spin" size={32} aria-hidden="true" /></div>
            <h2 id="stripe-loading-title" className="mt-6 text-2xl leading-tight sm:text-3xl">Ouverture du paiement sécurisé</h2>
            <p id="stripe-loading-description" className="mt-3 text-ink/75">Connexion à Stripe en cours. Ne ferme pas cette page.</p>
            <div className="mt-6 flex items-center justify-center gap-2 border-t-2 border-ink/15 pt-5 text-sm font-bold text-forest"><LockKeyhole size={17} aria-hidden="true" /> Paiement chiffré et sécurisé par Stripe</div>
          </div>
        </div>
      ) : null}
    </>
  )
}
