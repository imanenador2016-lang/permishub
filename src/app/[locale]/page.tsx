import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getThemes } from '@/content/repository'
import { getTestDeNiveauQuestions } from '@/lib/test-de-niveau'
import { Navbar } from '@/components/site/Navbar'
import { Footer } from '@/components/site/Footer'
import { Hero } from '@/components/home/Hero'
import { ExamenBlancTeaser } from '@/components/home/ExamenBlancTeaser'
import { TrustBar } from '@/components/home/TrustBar'
import { CircuitsCarousel } from '@/components/circuits/CircuitsCarousel'
import { CoutEchecBanner } from '@/components/circuits/CoutEchecBanner'
import { PacksSection } from '@/components/pricing/PacksSection'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { Container } from '@/components/ui/Container'
import type { AppLocale } from '@/i18n/request'

export default async function HomePage({ params: { locale } }: { params: { locale: AppLocale } }) {
  setRequestLocale(locale)
  const tc = await getTranslations('circuits')

  const themes = getThemes()
  const questions = getTestDeNiveauQuestions('BE')
  const themeLabels = themes.map((th) => ({ slug: th.slug, label: th.title[locale] }))

  return (
    <>
      <Navbar />
      <main>
        {/* 1. Hero (test de niveau) */}
        <Hero questions={questions} themeLabels={themeLabels} />

        {/* 1bis. Examen blanc gratuit — un seul examen réel pour l'instant
            (voir /examen-blanc et src/lib/examen-blanc.ts), remis en avant
            depuis le 2026-08-26 : sert d'appât gratuit avant l'offre
            "Examens illimités" (section #packs) — le hook de conversion est
            sur l'écran de résultat de l'examen lui-même. */}
        <Container className="py-10 sm:py-14">
          <ExamenBlancTeaser />
        </Container>

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

        {/* Bandeau de confiance / preuve sociale */}
        <TrustBar />
      </main>
      <Footer />
    </>
  )
}
