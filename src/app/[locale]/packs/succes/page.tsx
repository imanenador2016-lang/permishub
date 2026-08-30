import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { stripe } from '@/lib/stripe'
import { getPackOffer, RESUME_OFFER, RESUME_PDF_URL, EXAMENS_ILLIMITES_OFFER } from '@/content/pricing-config'
import { formatPrice } from '@/domain/centers'
import { Container } from '@/components/ui/Container'
import { Navbar } from '@/components/site/Navbar'
import { Footer } from '@/components/site/Footer'
import { UnlockExamensEffect } from '@/components/examen-blanc/UnlockExamensEffect'
import { Link } from '@/i18n/navigation'
import type { AppLocale } from '@/i18n/request'

// Voir circuits/succes/page.tsx — même raisonnement, jamais indexable.
export async function generateMetadata({ params: { locale } }: { params: { locale: AppLocale } }): Promise<Metadata> {
  return {
    title: 'Accès débloqué',
    robots: { index: false, follow: true },
    alternates: { canonical: `/${locale}/packs/succes` },
  }
}

/**
 * Accès instantané après paiement d'un pack — même principe que
 * circuits/succes : session_id revérifié en direct auprès de Stripe
 * (payment_status === 'paid'), jamais fait confiance à l'URL seule. Le
 * pack Résumé a un vrai contenu livrable (PDF, voir RESUME_PDF_URL) — les
 * 2 autres (série d'examens, perception des risques) ne l'ont pas encore
 * (voir SETUP.md) : le message le dit honnêtement plutôt que de prétendre
 * livrer quelque chose.
 */
export default async function PackSuccessPage({
  params: { locale },
  searchParams,
}: {
  params: { locale: AppLocale }
  searchParams: { session_id?: string }
}) {
  setRequestLocale(locale)
  const t = await getTranslations('checkoutSuccess')

  const sessionId = searchParams.session_id
  const result = sessionId ? await verify(sessionId, locale) : null

  return (
    <>
      <Navbar />
      <main className="px-4 py-16 sm:px-6">
        <Container className="max-w-xl">
          {result ? (
            <div className="panel p-6 text-center sm:p-8">
              <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-ink bg-forest text-2xl text-cream">
                ✓
              </span>
              <h1 className="mb-2 font-display text-2xl sm:text-3xl">{t('title')}</h1>
              <p className="mb-6 text-sm text-ink/70">
                <strong className="text-ink">{result.offerTitle}</strong> — {formatPrice(result.amountCents, locale)}
              </p>

              {result.offerId === RESUME_OFFER.id ? (
                <div className="panel !shadow-hard-xs mb-5 p-4 text-left">
                  <p className="mb-1 font-display text-sm">{t('resumeReadyTitle')}</p>
                  <p className="mb-3 text-sm text-ink/75">{t('resumeReadyBody')}</p>
                  <a href={RESUME_PDF_URL} target="_blank" rel="noopener noreferrer" className="btn-comic inline-flex px-4 py-2.5 text-sm">
                    {t('openResume')} →
                  </a>
                </div>
              ) : result.offerId === EXAMENS_ILLIMITES_OFFER.id ? (
                <div className="panel !shadow-hard-xs mb-5 p-4 text-left">
                  <UnlockExamensEffect />
                  <p className="mb-1 font-display text-sm">{t('examensReadyTitle')}</p>
                  <p className="mb-3 text-sm text-ink/75">{t('examensReadyBody')}</p>
                  <Link href="/examen-blanc" className="btn-comic inline-flex px-4 py-2.5 text-sm">
                    {t('viewExamens')} →
                  </Link>
                </div>
              ) : (
                <div className="panel !shadow-hard-xs mb-5 p-4 text-left">
                  <p className="mb-1 font-display text-sm">{t('packPendingTitle')}</p>
                  <p className="text-sm text-ink/75">{t('packPendingBody')}</p>
                </div>
              )}

              <p className="text-xs text-ink/50">{t('receiptNote')}</p>
            </div>
          ) : (
            <div className="panel p-6 text-center sm:p-8">
              <h1 className="mb-2 font-display text-xl">{t('errorTitle')}</h1>
              <p className="mb-6 text-sm text-ink/70">{t('errorBody')}</p>
              <Link href="/#packs" className="btn-comic inline-flex px-4 py-2.5 text-sm">
                {t('backToPacks')} →
              </Link>
            </div>
          )}
        </Container>
      </main>
      <Footer />
    </>
  )
}

async function verify(sessionId: string, locale: AppLocale) {
  let session
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId)
  } catch {
    return null
  }

  if (session.payment_status !== 'paid') return null

  const offerId = session.metadata?.offerId
  const offer = offerId ? getPackOffer(offerId) : undefined
  if (!offer) return null

  return {
    offerId: offer.id,
    offerTitle: offer.title[locale],
    amountCents: session.amount_total ?? offer.priceCents,
  }
}
