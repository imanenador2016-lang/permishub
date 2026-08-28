import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { stripe } from '@/lib/stripe'
import { getCircuitById, getCenter } from '@/content/centers/registry'
import { formatPrice } from '@/domain/centers'
import { Container } from '@/components/ui/Container'
import { Navbar } from '@/components/site/Navbar'
import { Footer } from '@/components/site/Footer'
import { Link } from '@/i18n/navigation'
import type { AppLocale } from '@/i18n/request'

// Page transactionnelle personnalisée (dépend d'un session_id Stripe) —
// jamais indexable : contenu vide/dupliqué sans session_id valide, et
// aucune valeur SEO à faire apparaître dans les résultats de recherche.
export async function generateMetadata({ params: { locale } }: { params: { locale: AppLocale } }): Promise<Metadata> {
  return {
    title: 'Accès débloqué',
    robots: { index: false, follow: true },
    alternates: { canonical: `/${locale}/circuits/succes` },
  }
}

/**
 * Accès instantané après paiement — jamais d'email à attendre. Le
 * session_id n'est JAMAIS pris pour argent comptant : on le revérifie en
 * direct auprès de Stripe (payment_status === 'paid') avant d'afficher
 * quoi que ce soit. Aucune base de données nécessaire pour ce mécanisme —
 * Stripe est la seule source de vérité (voir décision du 2026-08-21).
 */
export default async function CircuitSuccessPage({
  params: { locale },
  searchParams,
}: {
  params: { locale: AppLocale }
  searchParams: { session_id?: string }
}) {
  setRequestLocale(locale)
  const t = await getTranslations('checkoutSuccess')

  const sessionId = searchParams.session_id
  const result = sessionId ? await verifyAndResolve(sessionId) : null

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
                {t('circuitLabel')} <strong className="text-ink">{result.circuitTitle}</strong> — {formatPrice(result.amountCents, locale)}
              </p>

              <div className="panel !shadow-hard-xs mb-5 p-4 text-left">
                <p className="mb-1 font-display text-sm">{t('mapsPendingTitle')}</p>
                <p className="mb-3 text-sm text-ink/75">{t('mapsPendingBody')}</p>
                {result.mapsUrl && (
                  <a href={result.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-comic inline-flex px-4 py-2.5 text-sm">
                    {t('openMaps')} →
                  </a>
                )}
              </div>

              <p className="text-xs text-ink/50">{t('receiptNote')}</p>
            </div>
          ) : (
            <div className="panel p-6 text-center sm:p-8">
              <h1 className="mb-2 font-display text-xl">{t('errorTitle')}</h1>
              <p className="mb-6 text-sm text-ink/70">{t('errorBody')}</p>
              <Link href="/#circuits" className="btn-comic inline-flex px-4 py-2.5 text-sm">
                {t('backToCircuits')} →
              </Link>
            </div>
          )}
        </Container>
      </main>
      <Footer />
    </>
  )
}

async function verifyAndResolve(sessionId: string) {
  let session
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId)
  } catch {
    return null
  }

  if (session.payment_status !== 'paid') return null

  const circuitId = session.metadata?.circuitId
  const circuit = circuitId ? getCircuitById(circuitId) : undefined
  if (!circuit) return null

  const center = getCenter(circuit.centerSlug)
  const mapsUrl =
    circuit.mapsUrl ??
    (center?.lat != null && center?.lng != null
      ? `https://www.google.com/maps/search/?api=1&query=${center.lat},${center.lng}`
      : undefined)

  return {
    circuitTitle: center ? `${center.name}` : circuit.title.fr,
    amountCents: session.amount_total ?? circuit.priceCents ?? 0,
    mapsUrl,
  }
}
