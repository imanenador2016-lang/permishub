import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Navbar } from '@/components/site/Navbar'
import { Footer } from '@/components/site/Footer'
import { Container } from '@/components/ui/Container'
import { OfferCard } from '@/components/pricing/OfferCard'
import { RESUME_OFFER } from '@/content/pricing-config'
import type { AppLocale } from '@/i18n/request'

export async function generateMetadata({ params: { locale } }: { params: { locale: AppLocale } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'resumePage' })
  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: { canonical: `/${locale}/resume` },
  }
}

/**
 * Page de vente dédiée au pack "Résumé sans blabla" — reliée depuis la
 * Navbar (groupe "Théorie B"). Hiérarchie pensée pour convertir : accroche
 * qui nomme le problème → pourquoi ça marche → prix/achat (OfferCard,
 * même composant que "Nos packs" pour rester cohérent) → garantie
 * remboursement. Voir conversation du 2026-08-30.
 */
export default async function ResumePage({ params: { locale } }: { params: { locale: AppLocale } }) {
  setRequestLocale(locale)
  const t = await getTranslations('resumePage')
  const p = await getTranslations('packs')
  const to = await getTranslations('offers')

  const whys = [
    { title: t('why1Title'), body: t('why1Body') },
    { title: t('why2Title'), body: t('why2Body') },
    { title: t('why3Title'), body: t('why3Body') },
  ]

  return (
    <>
      <Navbar />
      <main className="px-4 py-10 sm:px-6 sm:py-14">
        <Container className="max-w-4xl">
          <div className="mb-10 text-center">
            <span className="mb-4 inline-block w-fit -rotate-2 border-[3px] border-ink bg-yellow px-3 py-1.5 font-display text-xs">
              {t('eyebrow')}
            </span>
            <h1 className="mb-3 font-display text-3xl tracking-tight text-ink sm:text-4xl">{t('title')}</h1>
            <p className="mx-auto max-w-lg text-sm text-ink/70 sm:text-base">{t('subtitle')}</p>
          </div>

          <div className="mb-10 grid gap-4 sm:grid-cols-3">
            {whys.map((why) => (
              <div key={why.title} className="panel !shadow-hard-xs p-4 text-center">
                <p className="mb-1 font-display text-base">{why.title}</p>
                <p className="text-sm text-ink/70">{why.body}</p>
              </div>
            ))}
          </div>

          <div className="mx-auto max-w-sm">
            <OfferCard
              eyebrow={to('resumeEyebrow')}
              title={to('resumeTitle')}
              bullets={[p('resumeBullet1'), p('resumeBullet2'), p('resumeBullet3')]}
              offer={RESUME_OFFER}
              ctaLabel={p('cta')}
              refundNote={to('resumeRefund')}
              highlight
            />
            <p className="mt-3 text-center text-[11px] font-semibold text-ink/50">{t('trustLine')}</p>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  )
}
