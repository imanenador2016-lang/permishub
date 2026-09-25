import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Navbar } from '@/components/site/Navbar'
import { Footer } from '@/components/site/Footer'
import { Breadcrumbs } from '@/components/site/Breadcrumbs'
import { Container } from '@/components/ui/Container'
import { FaqExplorer } from '@/components/faq/FaqExplorer'
import { Link } from '@/i18n/navigation'
import type { AppLocale } from '@/i18n/request'
import { pageMetadata } from '@/lib/seo'

const title = 'FAQ permis B en Belgique : examens et apprentissage'
const description = 'Réponses vérifiées sur le permis B en Belgique : examens, apprentissage, permis provisoire, perception des risques, centres, circuits et accès PermisHub.'

export function generateMetadata({ params: { locale } }: { params: { locale: AppLocale } }): Metadata {
  return pageMetadata({ locale, path: '/faq', title, description, indexable: locale === 'fr', languageAlternates: false })
}

export default function FaqPage({ params: { locale } }: { params: { locale: AppLocale } }) {
  setRequestLocale(locale)
  return <>
    <Navbar />
    <main className="px-4 py-7 sm:px-6 sm:py-12">
      <Container className="max-w-5xl">
        <Breadcrumbs locale={locale} items={[
          { label: locale === 'fr' ? 'Accueil' : 'Home', href: '/' },
          { label: 'FAQ', href: '/faq' },
        ]} />
        {locale === 'fr' ? <>
          <header className="mx-auto max-w-3xl py-5 text-center sm:py-10">
            <p className="font-display text-xs font-bold uppercase tracking-[.16em] text-forest">Permis B · Belgique</p>
            <h1 className="mt-3 font-display text-3xl leading-tight tracking-tight sm:text-5xl">Questions fréquentes sur le permis B</h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-ink/70 sm:text-lg">Des réponses utiles sur les examens, l’apprentissage et les outils PermisHub. Les règles officielles sont présentées par région et vérifiées le 24 septembre 2026.</p>
          </header>
          <FaqExplorer />
          <aside className="mt-14 rounded-2xl bg-[#e5f1ec] p-5 sm:p-8">
            <h2 className="font-display text-xl sm:text-2xl">Choisis où continuer</h2>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-forest underline decoration-1 underline-offset-4">
              <Link href="/apprendre">Leçons interactives</Link>
              <Link href="/examen-blanc">Examens blancs</Link>
              <Link href="/centres-examen">Centres et circuits</Link>
              <Link href="/perception-risques">Perception des risques</Link>
            </div>
          </aside>
        </> : <section className="mx-auto max-w-2xl py-16 text-center">
          <h1 className="font-display text-3xl">FAQ en français</h1>
          <p className="mt-4 text-ink/70">Cette page d’aide détaillée est actuellement disponible en français.</p>
          <Link className="mt-6 inline-flex min-h-11 items-center rounded-lg bg-yellow px-5 font-bold" href="/">Retour à l’accueil</Link>
        </section>}
      </Container>
    </main>
    <Footer />
  </>
}
