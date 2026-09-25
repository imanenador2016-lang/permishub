import { Container } from '@/components/ui/Container'

export default function LocaleLoading() {
  return <main aria-busy="true" className="min-h-[60vh] px-4 py-8 sm:px-6 sm:py-12">
    <span role="status" className="sr-only">Chargement de la page…</span>
    <Container className="max-w-5xl motion-safe:animate-pulse">
      <div className="h-3 w-28 rounded bg-ink/10" />
      <div className="mt-6 h-10 max-w-xl rounded bg-ink/10 sm:h-14" />
      <div className="mt-4 h-4 max-w-2xl rounded bg-ink/10" />
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <div className="h-36 rounded-xl border-2 border-ink/10 bg-white/50" />
        <div className="h-36 rounded-xl border-2 border-ink/10 bg-white/50" />
      </div>
    </Container>
  </main>
}
