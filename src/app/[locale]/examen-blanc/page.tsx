import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Navbar } from '@/components/site/Navbar'
import { Footer } from '@/components/site/Footer'
import { Container } from '@/components/ui/Container'
import { ExamenBlancPicker } from '@/components/examen-blanc/ExamenBlancPicker'
import { getExamensBlancsSummary } from '@/lib/examens-blancs'
import { LOCALES, type AppLocale } from '@/i18n/request'

export async function generateMetadata({ params: { locale } }: { params: { locale: AppLocale } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'examenBlanc' })
  return {
    title: t('pickerTitle'),
    description: t('pickerIntro'),
    alternates: {
      canonical: `/${locale}/examen-blanc`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `/${l}/examen-blanc`])),
    },
  }
}

/**
 * Liste des examens blancs — 1 gratuit + le reste réservé au pack "Examens
 * illimités" (voir ExamenBlancPicker.tsx et src/lib/examens-blancs.ts).
 * Reliée depuis la Navbar et la home (teaser gratuit) depuis le
 * 2026-08-26 ; passée en registre multi-examens le 2026-08-26 (voir
 * conversation — examens 3 et 4 ajoutés).
 */
export default async function ExamenBlancListPage({ params: { locale } }: { params: { locale: AppLocale } }) {
  setRequestLocale(locale)
  const t = await getTranslations('examenBlanc')

  return (
    <>
      <Navbar />
      <main className="px-4 py-10 sm:px-6 sm:py-14">
        <Container className="max-w-4xl">
          <div className="mb-8 text-center">
            <span className="mb-4 inline-block w-fit -rotate-2 border-[3px] border-ink bg-yellow px-3 py-1.5 font-display text-xs">
              {t('pickerBadge')}
            </span>
            <h1 className="mb-3 font-display text-2xl tracking-tight text-ink sm:text-3xl">{t('pickerTitle')}</h1>
            <p className="mx-auto max-w-lg text-sm text-ink/70 sm:text-base">{t('pickerIntro')}</p>
          </div>

          {locale === 'nl' && (
            <p className="mb-6 border-[3px] border-ink bg-cream p-3 text-center text-xs text-ink/70">
              Deze inhoud is momenteel enkel in het Frans beschikbaar.
            </p>
          )}

          <ExamenBlancPicker exams={getExamensBlancsSummary()} />
        </Container>
      </main>
      <Footer />
    </>
  )
}
