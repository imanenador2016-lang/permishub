import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Navbar } from '@/components/site/Navbar'
import { Footer } from '@/components/site/Footer'
import { Container } from '@/components/ui/Container'
import { ExamAccessGate } from '@/components/examen-blanc/ExamAccessGate'
import { ExamenBlanc } from '@/components/examen-blanc/ExamenBlanc'
import { getExamenBlanc } from '@/lib/examens-blancs'
import { hasExamAccess } from '@/lib/exam-access.server'
import type { AppLocale } from '@/i18n/request'
import { pageMetadata } from '@/lib/seo'

// L'autorisation payante est lue dans un cookie HttpOnly à chaque requête.
export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: { locale: AppLocale; slug: string }
}): Promise<Metadata> {
  const exam = getExamenBlanc(slug)
  const t = await getTranslations({ locale, namespace: 'examenBlanc' })
  if (!exam) return { title: t('pickerTitle'), robots: { index: false, follow: true } }
  return pageMetadata({ locale, path: `/examen-blanc/${slug}`, title: `${exam.title} — ${t('title')}`, description: t('introPhoto', { total: exam.questions.length }), indexable: false })
}

/**
 * Un examen blanc "photo" précis (voir /examen-blanc pour la liste).
 * ExamAccessGate bloque l'affichage pour un examen payant tant que le
 * pack "Examens illimités" n'est pas débloqué sur ce navigateur — voir la
 * réserve sur le contrôle d'accès réel dans src/lib/examens-blancs.ts.
 */
export default async function ExamenBlancPlayerPage({
  params: { locale, slug },
  searchParams,
}: {
  params: { locale: AppLocale; slug: string }
  searchParams?: { preview?: string }
}) {
  setRequestLocale(locale)
  const exam = getExamenBlanc(slug)
  if (!exam) notFound()
  const unlocked = hasExamAccess() || (process.env.NODE_ENV !== 'production' && searchParams?.preview === '1')
  return (
    <>
      <Navbar />
      <main className="px-2 py-3 sm:px-4 sm:py-4">
        <Container className="max-w-5xl">
          {locale === 'nl' && (
            <p className="mb-4 border-[3px] border-ink bg-cream p-3 text-center text-xs text-ink/70">
              Deze inhoud is momenteel enkel in het Frans beschikbaar.
            </p>
          )}
          <ExamAccessGate unlocked={unlocked}>
            <ExamenBlanc questions={exam.questions} hideCorrection={exam.hideCorrection} />
          </ExamAccessGate>
        </Container>
      </main>
      <Footer />
    </>
  )
}
