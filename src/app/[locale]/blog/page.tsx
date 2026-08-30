import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Navbar } from '@/components/site/Navbar'
import { Footer } from '@/components/site/Footer'
import { Container } from '@/components/ui/Container'
import { Link } from '@/i18n/navigation'
import type { AppLocale } from '@/i18n/request'

export async function generateMetadata({ params: { locale } }: { params: { locale: AppLocale } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'blogPage' })
  return {
    title: t('title'),
    description: t('body'),
    alternates: { canonical: `/${locale}/blog` },
  }
}

/**
 * Page /blog — reliée depuis la Navbar. Pas encore de contenu (voir
 * conversation du 2026-08-31) : état "Bientôt" honnête plutôt qu'un lien
 * mort, en attendant les premiers articles.
 */
export default async function BlogPage({ params: { locale } }: { params: { locale: AppLocale } }) {
  setRequestLocale(locale)
  const t = await getTranslations('blogPage')

  return (
    <>
      <Navbar />
      <main className="px-4 py-16 sm:px-6">
        <Container className="max-w-xl">
          <div className="panel p-6 text-center sm:p-8">
            <span className="mb-4 inline-block w-fit -rotate-2 border-[3px] border-ink bg-yellow px-3 py-1.5 font-display text-xs">
              {t('eyebrow')}
            </span>
            <h1 className="mb-3 font-display text-2xl tracking-tight text-ink sm:text-3xl">{t('title')}</h1>
            <p className="mb-6 text-sm text-ink/70 sm:text-base">{t('body')}</p>
            <Link href="/" className="text-sm font-semibold text-ink/60 hover:text-brick">
              {t('backHome')}
            </Link>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  )
}
