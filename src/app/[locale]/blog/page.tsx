import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Navbar } from '@/components/site/Navbar'
import { Footer } from '@/components/site/Footer'
import { Container } from '@/components/ui/Container'
import { Link } from '@/i18n/navigation'
import { LOCALES, type AppLocale } from '@/i18n/request'

export async function generateMetadata({ params: { locale } }: { params: { locale: AppLocale } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'blogPage' })
  return {
    title: t('title'),
    description: t('body'),
    alternates: {
      canonical: `/${locale}/blog`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `/${l}/blog`])),
    },
  }
}

/**
 * Page /blog — reliée depuis la Navbar. Premier vrai article publié le
 * 2026-08-31 (voir conversation) : liste les articles réels au lieu du
 * pur état "Bientôt" d'origine, et sert de source de lien interne vers
 * l'article (voir centres-examen-permis-pratique-plus-faciles-belgique).
 */
export default async function BlogPage({ params: { locale } }: { params: { locale: AppLocale } }) {
  setRequestLocale(locale)
  const t = await getTranslations('blogPage')

  return (
    <>
      <Navbar />
      <main className="px-4 py-10 sm:px-6 sm:py-14">
        <Container className="max-w-2xl">
          <div className="mb-8">
            <span className="mb-4 inline-block w-fit -rotate-2 border-[3px] border-ink bg-yellow px-3 py-1.5 font-display text-xs">
              {t('eyebrow')}
            </span>
            <h1 className="mb-3 font-display text-2xl tracking-tight text-ink sm:text-3xl">{t('title')}</h1>
            <p className="text-sm text-ink/70 sm:text-base">{t('body')}</p>
          </div>

          <Link
            href="/centres-examen-permis-pratique-plus-faciles-belgique"
            className="panel !shadow-hard-xs mb-6 block p-5 transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-sm sm:p-6"
          >
            <span className="mb-3 inline-block w-fit border-2 border-ink bg-sky px-2.5 py-1 text-xs font-bold">Données 2025</span>
            <p className="mb-2 font-display text-xl leading-snug sm:text-2xl">
              Les 5 centres d’examen les plus faciles pour le permis pratique en Belgique
            </p>
            <p className="mb-3 text-sm text-ink/70">
              Le classement 2025 des centres d’examen wallons avec les meilleurs taux de réussite : Arlon, Lobbes, Mariembourg,
              Braine-le-Comte et Eupen.
            </p>
            <span className="text-sm font-semibold text-brick">{t('readArticle')} →</span>
          </Link>

          <p className="text-center text-sm text-ink/50">{t('moreSoon')}</p>

          <Link href="/" className="mt-8 block text-center text-sm font-semibold text-ink/60 hover:text-brick">
            {t('backHome')}
          </Link>
        </Container>
      </main>
      <Footer />
    </>
  )
}
