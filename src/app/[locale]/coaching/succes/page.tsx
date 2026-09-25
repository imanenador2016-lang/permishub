import Link from 'next/link'

import { pageMetadata } from '@/lib/seo'
import type { AppLocale } from '@/i18n/request'

export function generateMetadata({ params: { locale } }: { params: { locale: AppLocale } }) {
  return pageMetadata({ locale, path: '/coaching/succes', title: 'Réservation coaching confirmée', description: 'Confirmation de réservation de coaching PermisHub.', indexable: false, languageAlternates: false })
}

export default function CoachingSuccess() {
  return <main className="mx-auto max-w-2xl px-4 py-16 sm:py-24"><div className="panel p-7 sm:p-10"><span className="inline-block -rotate-2 border-[3px] border-ink bg-yellow px-4 py-2 font-display text-sm shadow-hard-xs">RÉSERVATION REÇUE</span><p className="mt-8 text-sm font-bold uppercase tracking-[.14em] text-forest">Paiement en cours de confirmation</p><h1 className="mt-3 text-4xl leading-none sm:text-5xl">Merci pour ta réservation.</h1><p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/80">Dès que le paiement est confirmé, tu recevras les informations de connexion Zoom à l’adresse indiquée.</p><Link className="btn-comic mt-8 px-6 py-3" href="/fr">Retour à PermisHub →</Link></div></main>
}
