import { Link } from '@/i18n/navigation'
import { Container } from '@/components/ui/Container'

export function HomeFaq() {
  return <section id="faq" aria-labelledby="home-faq-title" className="scroll-mt-6 bg-[#e5f1ec] py-14 sm:py-20">
    <Container className="max-w-4xl">
      <div className="mx-auto flex max-w-3xl flex-col items-center rounded-2xl border border-ink/20 bg-cream px-5 py-9 text-center shadow-sm sm:px-10 sm:py-12">
        <p className="font-display text-xs font-bold uppercase tracking-[.16em] text-forest">Aide PermisHub</p>
        <h2 id="home-faq-title" className="mt-2 font-display text-3xl tracking-tight sm:text-4xl">Une question ?</h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink/70 sm:text-base">Retrouve les réponses sur les examens, l’apprentissage, les centres et tes accès PermisHub.</p>
        <Link href="/faq" className="mt-6 inline-flex min-h-12 items-center justify-center rounded-lg bg-yellow px-6 font-bold text-ink shadow-[3px_3px_0_#1e1b18] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest">Consulter la FAQ complète <span aria-hidden="true" className="ml-2">→</span></Link>
      </div>
    </Container>
  </section>
}
