import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getThemes } from '@/content/repository'
import { getTestDeNiveauQuestions } from '@/lib/test-de-niveau'
import { Navbar } from '@/components/site/Navbar'
import { Footer } from '@/components/site/Footer'
import { Hero } from '@/components/home/Hero'
import { TrustBar } from '@/components/home/TrustBar'
import { CircuitsCarousel } from '@/components/circuits/CircuitsCarousel'
import { CoutEchecBanner } from '@/components/circuits/CoutEchecBanner'
import { PacksSection } from '@/components/pricing/PacksSection'
import { FaqSection } from '@/components/home/FaqSection'
import { ReviewsPanel } from '@/components/home/ReviewsPanel'
import { FinalCtaSection } from '@/components/home/FinalCtaSection'
import { Container } from '@/components/ui/Container'
import { FAQ_ITEMS } from '@/content/faq'
import type { AppLocale } from '@/i18n/request'

export default async function HomePage({ params: { locale } }: { params: { locale: AppLocale } }) {
  setRequestLocale(locale)
  const tc = await getTranslations('circuits')

  const themes = getThemes()
  const questions = getTestDeNiveauQuestions('BE')
  const themeLabels = themes.map((th) => ({ slug: th.slug, label: th.title[locale] }))

  // JSON-LD FAQPage — générée depuis FAQ_ITEMS (content/faq.ts), la même
  // source que la FAQ affichée (FaqSection.tsx) : jamais désynchronisée
  // avec le contenu réellement visible, condition pour rester éligible aux
  // rich snippets Google sans risquer un signalement "structured data
  // trompeuse".
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question[locale],
      acceptedAnswer: { '@type': 'Answer', text: item.answer[locale] },
    })),
  }

  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Navbar />
      <main>
        {/* 1. Hero (test de niveau) */}
        <Hero questions={questions} themeLabels={themeLabels} />

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

        {/* FAQ + avis clients côte à côte — remplace l'ancienne section
            témoignages (voir conversation du 2026-08-31). */}
        <Container className="pb-16">
          <div className="grid gap-10 md:grid-cols-2">
            <FaqSection />
            <ReviewsPanel locale={locale} />
          </div>
        </Container>

        {/* CTA final, juste après la FAQ */}
        <FinalCtaSection questions={questions} themeLabels={themeLabels} />

        {/* Bandeau de confiance / preuve sociale */}
        <TrustBar />
      </main>
      <Footer />
    </>
  )
}
