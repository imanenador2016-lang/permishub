import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
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
 * Tunnel qualification + capture email (voir conversation du 2026-09-08) —
 * remplace à terme le modal `TestDeNiveau.tsx` ouvert depuis la home,
 * mais celui-ci reste inchangé pour l'instant (pas touché ici). Toute la
 * logique d'écrans/état est dans QuizFunnel.tsx (client component).
 */
export default async function TestDeNiveauPage({ params: { locale } }: { params: { locale: AppLocale } }) {
  setRequestLocale(locale)

  return (
    <>
      <Navbar />
      <main className="px-4 py-10 sm:px-6 sm:py-14">
        <Container>
          <QuizFunnel />
        </Container>
      </main>
      <Footer />
    </>
  )
}
