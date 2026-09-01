import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Navbar } from '@/components/site/Navbar'
import { Footer } from '@/components/site/Footer'
import { Container } from '@/components/ui/Container'
import { ExamenBlanc } from '@/components/examen-blanc/ExamenBlanc'
import { ExamAccessGate } from '@/components/examen-blanc/ExamAccessGate'
import { EXAMENS_BLANCS, getExamenBlanc } from '@/lib/examens-blancs'
import { LOCALES, type AppLocale } from '@/i18n/request'

export function generateStaticParams() {
  return EXAMENS_BLANCS.map((exam) => ({ slug: exam.slug }))
}

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: { locale: AppLocale; slug: string }
}): Promise<Metadata> {
  const exam = getExamenBlanc(slug)
  const t = await getTranslations({ locale, namespace: 'examenBlanc' })
  if (!exam) return { title: t('pickerTitle') }
  return {
    title: `${exam.title} — ${t('title')}`,
    description: t('introPhoto', { total: exam.questions.length }),
    alternates: {
      canonical: `/${locale}/examen-blanc/${slug}`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `/${l}/examen-blanc/${slug}`])),
    },
  }
}

/**
 * Un examen blanc "photo" précis (voir /examen-blanc pour la liste).
 * ExamAccessGate bloque l'affichage pour un examen payant tant que le
 * pack "Examens illimités" n'est pas débloqué sur ce navigateur — voir la
 * réserve sur le contrôle d'accès réel dans src/lib/examens-blancs.ts.
 */
export default async function ExamenBlancPlayerPage({
  params: { locale, slug },
}: {
  params: { locale: AppLocale; slug: string }
}) {
  setRequestLocale(locale)
  const exam = getExamenBlanc(slug)
  if (!exam) notFound()

  return (
    <>
      <Navbar />
      <main className="px-4 py-10 sm:px-6 sm:py-14">
        <Container className="max-w-3xl">
          {locale === 'nl' && (
            <p className="mb-4 border-[3px] border-ink bg-cream p-3 text-center text-xs text-ink/70">
              Deze inhoud is momenteel enkel in het Frans beschikbaar.
            </p>
          )}
          <ExamAccessGate free={exam.free}>
            <ExamenBlanc questions={exam.questions} hideCorrection={exam.hideCorrection} />
          </ExamAccessGate>
        </Container>
      </main>
      <Footer />
    </>
  )
}
