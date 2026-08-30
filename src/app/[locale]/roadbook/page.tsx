import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Navbar } from '@/components/site/Navbar'
import { Footer } from '@/components/site/Footer'
import { Container } from '@/components/ui/Container'
import type { AppLocale } from '@/i18n/request'

const ROADBOOK_PDF_URL = '/documents/roadbook-permishub.pdf'

export async function generateMetadata({ params: { locale } }: { params: { locale: AppLocale } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'roadbookPage' })
  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: { canonical: `/${locale}/roadbook` },
  }
}

/**
 * Page roadbook — reliée depuis la Navbar (groupe "Pratique B"). Explique ce
 * qu'est un roadbook et comment le compléter, puis propose le PDF fourni
 * par le client (public/documents/roadbook-permishub.pdf) en
 * téléchargement gratuit, sans paiement — voir conversation du 2026-08-30.
 */
export default async function RoadbookPage({ params: { locale } }: { params: { locale: AppLocale } }) {
  setRequestLocale(locale)
  const t = await getTranslations('roadbookPage')

  const steps = [t('how1'), t('how2'), t('how3'), t('how4')]

  return (
    <>
      <Navbar />
      <main className="px-4 py-10 sm:px-6 sm:py-14">
        <Container className="max-w-3xl">
          <div className="mb-8 text-center">
            <span className="mb-4 inline-block w-fit -rotate-2 border-[3px] border-ink bg-yellow px-3 py-1.5 font-display text-xs">
              {t('eyebrow')}
            </span>
            <h1 className="mb-3 font-display text-3xl tracking-tight text-ink sm:text-4xl">{t('title')}</h1>
            <p className="mx-auto max-w-lg text-sm text-ink/70 sm:text-base">{t('subtitle')}</p>
          </div>

          <div className="panel mb-5 p-5 sm:p-6">
            <span className="mb-3 inline-block w-fit border-2 border-forest bg-forest/10 px-2.5 py-1 font-display text-[11px] text-forest">
              {t('badge')}
            </span>
            <a href={ROADBOOK_PDF_URL} target="_blank" rel="noopener noreferrer" className="btn-comic block w-full px-4 py-3.5 text-center text-base">
              {t('downloadCta')} →
            </a>
          </div>

          <div className="panel !shadow-hard-xs mb-5 p-5 sm:p-6">
            <p className="mb-2 font-display text-lg">{t('whatTitle')}</p>
            <p className="text-sm leading-relaxed text-ink/75">{t('whatBody')}</p>
          </div>

          <div className="panel !shadow-hard-xs p-5 sm:p-6">
            <p className="mb-3 font-display text-lg">{t('howTitle')}</p>
            <ul className="flex flex-col gap-2.5">
              {steps.map((step, i) => (
                <li key={step} className="flex items-start gap-2.5 text-sm text-ink/80">
                  <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full border-2 border-ink bg-yellow text-[11px] font-extrabold text-ink">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  )
}
