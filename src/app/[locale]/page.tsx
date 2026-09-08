import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Navbar } from '@/components/site/Navbar'
import { Footer } from '@/components/site/Footer'
import { Hero } from '@/components/home/Hero'
import { TrustBar } from '@/components/home/TrustBar'
import { CircuitsCarousel } from '@/components/circuits/CircuitsCarousel'
import { CoutEchecBanner } from '@/components/circuits/CoutEchecBanner'
import { PacksSection } from '@/components/pricing/PacksSection'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { CoachingWhatsAppSection } from '@/components/home/CoachingWhatsAppSection'
import { Container } from '@/components/ui/Container'
import type { AppLocale } from '@/i18n/request'

export default async function HomePage({ params: { locale } }: { params: { locale: AppLocale } }) {
  setRequestLocale(locale)
  const tc = await getTranslations('circuits')

  return (
    <>
      <Navbar />
      <main>
        {/* 1. Hero — le CTA mène au tunnel /test-de-niveau (qualification +
            email avant le vrai test), voir Hero.tsx. */}
        <Hero />

        {/* 2. Circuits d'examen pratique — remonté juste après le hero
            (section Cours retirée de la home, pas encore de contenu). */}
        <Container id="circuits" className="scroll-mt-6 py-20">
          <span className="mb-4 inline-block w-fit -rotate-2 border-[3px] border-ink bg-yellow px-3 py-1.5 font-display text-xs">
            {tc('eyebrow')}
          </span>
          <h2 className="mb-3 font-display text-2xl tracking-tight text-ink sm:text-3xl">{tc('title')}</h2>
          <p className="mb-8 max-w-2xl text-ink/70">{tc('lead')}</p>
          <CoutEchecBanner />
          <CircuitsCarousel />
        </Container>

        {/* 3. Nos packs (théorique + pratique) */}
        <Container id="packs" className="scroll-mt-6 py-20">
          <PacksSection />
        </Container>

        {/* Avis clients */}
        <TestimonialsSection />

        {/* Coaching individuel, réservation via WhatsApp */}
        <CoachingWhatsAppSection />

        {/* Bandeau de confiance / preuve sociale */}
        <TrustBar />
      </main>
      <Footer />
    </>
  )
}
