import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Navbar } from '@/components/site/Navbar'
import { Footer } from '@/components/site/Footer'
import { Hero } from '@/components/home/Hero'
import { TrustBar } from '@/components/home/TrustBar'
import { HomeFaq } from '@/components/home/HomeFaq'
import { CircuitsCarousel } from '@/components/circuits/CircuitsCarousel'
import { CoutEchecBanner } from '@/components/circuits/CoutEchecBanner'
import { PacksSection } from '@/components/pricing/PacksSection'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { CoachingIntensifHomeSection } from '@/components/home/CoachingIntensifHomeSection'
import { Container } from '@/components/ui/Container'
import { Link } from '@/i18n/navigation'
import type { AppLocale } from '@/i18n/request'
import { pageMetadata } from '@/lib/seo'

export function generateMetadata({ params: { locale } }: { params: { locale: AppLocale } }) {
  const isFrench = locale === 'fr'
  return pageMetadata({
    locale,
    path: '/',
    title: isFrench ? 'Préparer le permis B en Belgique' : 'Je rijbewijs B voorbereiden in België',
    description: isFrench
      ? 'Prépare le permis B en Belgique avec des leçons, des questions d’entraînement, des examens blancs et des circuits d’examen.'
      : 'Bereid je voor op het rijbewijs B in België met lessen, oefenvragen, proefexamens en examencircuits.',
  })
}

export default async function HomePage({ params: { locale } }: { params: { locale: AppLocale } }) {
  setRequestLocale(locale)
  const tc = await getTranslations('circuits')

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CoachingIntensifHomeSection />

        <Container id="circuits" className="scroll-mt-6 py-20">
          <span className="mb-4 inline-block w-fit -rotate-2 border-[3px] border-ink bg-yellow px-3 py-1.5 font-display text-xs">
            {tc('eyebrow')}
          </span>
          <h2 className="mb-3 font-display text-2xl tracking-tight text-ink sm:text-3xl">{tc('title')}</h2>
          <p className="mb-8 max-w-2xl text-ink/70">{tc('lead')}</p>
          <CoutEchecBanner />
          <CircuitsCarousel />
          <div className="mt-8 border-t border-ink/15 pt-5">
            <Link href="/centres-examen" className="inline-flex min-h-11 items-center gap-2 font-display text-sm text-forest underline decoration-2 underline-offset-4 hover:text-brick sm:text-base">
              Voir tous les centres d’examen <span aria-hidden>→</span>
            </Link>
          </div>
        </Container>

        <Container id="packs" className="scroll-mt-6 py-20">
          <PacksSection />
        </Container>

        <TestimonialsSection />
        <TrustBar />
        {locale === 'fr' && <HomeFaq />}
      </main>
      <Footer />
    </>
  )
}



