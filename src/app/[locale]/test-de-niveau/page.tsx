import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getThemes } from '@/content/repository'
import { getTestDeNiveauQuestions } from '@/lib/test-de-niveau'
import { Navbar } from '@/components/site/Navbar'
import { Footer } from '@/components/site/Footer'
import { Container } from '@/components/ui/Container'
import { QuizFunnel } from '@/components/quiz-funnel/QuizFunnel'
import { LOCALES, type AppLocale } from '@/i18n/request'

export async function generateMetadata({ params: { locale } }: { params: { locale: AppLocale } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'quizFunnel' })
  return {
    title: t('emailTitle'),
    alternates: {
      canonical: `/${locale}/test-de-niveau`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `/${l}/test-de-niveau`])),
    },
  }
}

/**
 * Tunnel qualification + capture email, PUIS le vrai test (`TestDeNiveau.tsx`,
 * 11 questions avec photo + résultat/radar) — voir conversation du
 * 2026-09-08/09. Avant le 09/09, ce test s'ouvrait directement en modal
 * depuis le CTA de la home, sans qualification ni email ; il est maintenant
 * exclusivement déclenché ici, à la fin du tunnel (voir QuizFunnel.tsx).
 */
export default async function TestDeNiveauPage({ params: { locale } }: { params: { locale: AppLocale } }) {
  setRequestLocale(locale)

  const themes = getThemes()
  const questions = getTestDeNiveauQuestions('BE')
  const themeLabels = themes.map((th) => ({ slug: th.slug, label: th.title[locale] }))

  return (
    <>
      <Navbar />
      <main className="px-4 py-10 sm:px-6 sm:py-14">
        <Container>
          <QuizFunnel questions={questions} themeLabels={themeLabels} />
        </Container>
      </main>
      <Footer />
    </>
  )
}
