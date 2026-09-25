import Link from 'next/link'

export default function LocaleNotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-20 sm:py-28">
      <div className="panel p-7 sm:p-10">
        <p className="font-display text-sm text-brick">404</p>
        <h1 className="mt-3 font-display text-3xl sm:text-4xl">Cette page n’existe pas.</h1>
        <p className="mt-4 max-w-xl text-ink/70">Retrouve les ressources PermisHub depuis une page principale.</p>
        <nav aria-label="Pages principales" className="mt-7 flex flex-wrap gap-3">
          <Link className="btn-comic px-4 py-2.5" href="/fr">Accueil</Link>
          <Link className="btn-comic px-4 py-2.5" href="/fr/examen-blanc">Examens blancs</Link>
          <Link className="btn-comic px-4 py-2.5" href="/fr/circuits/anderlecht">Circuits</Link>
          <Link className="btn-comic px-4 py-2.5" href="/fr/blog">Blog</Link>
        </nav>
      </div>
    </main>
  )
}
