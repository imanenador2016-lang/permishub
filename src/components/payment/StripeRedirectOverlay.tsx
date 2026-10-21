import { LockKeyhole, LoaderCircle } from 'lucide-react'

export function StripeRedirectOverlay({ visible }: { visible: boolean }) {
  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[200] grid place-items-center bg-ink/75 px-5 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="stripe-redirect-title" aria-describedby="stripe-redirect-description">
      <div className="w-full max-w-md border-[4px] border-ink bg-cream p-7 text-center text-ink shadow-hard sm:p-10">
        <div className="mx-auto grid size-16 place-items-center rounded-full border-[3px] border-ink bg-yellow">
          <LoaderCircle className="animate-spin" size={32} aria-hidden="true" />
        </div>
        <h2 id="stripe-redirect-title" className="mt-6 font-display text-2xl leading-tight sm:text-3xl">Ouverture du paiement sécurisé</h2>
        <p id="stripe-redirect-description" className="mt-3 text-ink/75">Connexion à Stripe en cours. Ne ferme pas cette page.</p>
        <div className="mt-6 flex items-center justify-center gap-2 border-t-2 border-ink/15 pt-5 text-sm font-bold text-forest">
          <LockKeyhole size={17} aria-hidden="true" /> Paiement chiffré et sécurisé par Stripe
        </div>
      </div>
    </div>
  )
}
