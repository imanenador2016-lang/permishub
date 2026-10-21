import { LoaderCircle } from 'lucide-react'

export default function CoachingLoading() {
  return (
    <main className="grid min-h-[70vh] place-items-center px-5" aria-live="polite" aria-busy="true">
      <div className="text-center">
        <LoaderCircle className="mx-auto animate-spin text-forest" size={38} aria-hidden="true" />
        <p className="mt-4 font-display text-xl">Chargement de la réservation…</p>
      </div>
    </main>
  )
}
