import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Navbar } from '@/components/site/Navbar'
import { Footer } from '@/components/site/Footer'
import { Container } from '@/components/ui/Container'
import { LOCALES, type AppLocale } from '@/i18n/request'

export async function generateMetadata({ params: { locale } }: { params: { locale: AppLocale } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'privacyPage' })
  return {
    title: t('title'),
    description: t('intro'),
    alternates: {
      canonical: `/${locale}/confidentialite`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `/${l}/confidentialite`])),
    },
  }
}

/**
 * Page minimale requise pour le lien "Confidentialité" du tunnel de
 * qualification (voir quizFunnel.privacyLink, conversation du 2026-09-08) —
 * pas de numéro d'entreprise, [[EMAIL]] à remplacer par une vraie adresse
 * avant mise en prod (voir SETUP_LEADS.md).
 */
export default async function PrivacyPage({ params: { locale } }: { params: { locale: AppLocale } }) {
  setRequestLocale(locale)
  const t = await getTranslations('privacyPage')

  const sections = [
    { title: t('whatTitle'), body: t('whatBody') },
    { title: t('whyTitle'), body: t('whyBody') },
    { title: t('howLongTitle'), body: t('howLongBody') },
    { title: t('unsubscribeTitle'), body: t('unsubscribeBody') },
    { title: t('contactTitle'), body: t('contactBody') },
  ]

  return (
    <>
      <Navbar />
      <main className="px-4 py-14 sm:px-6">
        <Container className="max-w-2xl">
          <h1 className="mb-3 font-display text-3xl">{t('title')}</h1>
          <p className="mb-8 text-sm text-ink/70">{t('intro')}</p>

          <div className="flex flex-col gap-5">
            {sections.map((s) => (
              <div key={s.title} className="panel !shadow-hard-xs p-5">
                <p className="mb-1.5 font-display text-base">{s.title}</p>
                <p className="text-sm text-ink/75">{s.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  )
}
