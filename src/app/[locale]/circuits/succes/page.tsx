import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { stripe } from '@/lib/stripe'
import { getCircuitById, getCenter } from '@/content/centers/registry'
import { formatPrice } from '@/domain/centers'
import { Container } from '@/components/ui/Container'
import { Navbar } from '@/components/site/Navbar'
import { Footer } from '@/components/site/Footer'
import { UnlockCenterEffect } from '@/components/circuits/UnlockCenterEffect'
import { Link } from '@/i18n/navigation'
import type { AppLocale } from '@/i18n/request'
import { getCircuitMapsByCenter } from '@/lib/circuit-maps.server'

// Le résultat dépend du session_id Stripe de chaque acheteur. Cette page ne
// doit jamais être pré-rendue sans ses paramètres de paiement.
export const dynamic = 'force-dynamic'

export async function generateMetadata({ params: { locale } }: { params: { locale: AppLocale } }): Promise<Metadata> {
  return {
    title: 'Accès débloqué',
    robots: { index: false, follow: true },
    alternates: { canonical: `/${locale}/circuits/succes` },
  }
}

export default async function CircuitSuccessPage({
  params: { locale },
  searchParams,
}: {
  params: { locale: AppLocale }
  searchParams: { session_id?: string; access?: string }
}) {
  const sessionId = searchParams.session_id
  if (sessionId && searchParams.access !== 'confirmed') {
    redirect(`/api/access/circuits/confirm?session_id=${encodeURIComponent(sessionId)}&locale=${locale}`)
  }

  setRequestLocale(locale)
  const t = await getTranslations('checkoutSuccess')
  const circuitsT = await getTranslations('circuits')

  const result = sessionId ? await verifyAndResolve(sessionId) : null

  const centerLinks = result ? await getCircuitMapsByCenter(result.centerSlug) : []
  const circuitLinks = result?.kind === 'circuit'
    ? centerLinks.filter((link) => link.circuitId === result.circuitId)
    : centerLinks

  return (
    <>
      <Navbar />
      <main className="px-4 py-10 sm:px-6 sm:py-16">
        <Container className="max-w-3xl">
          {result ? (
            <div className="panel p-5 sm:p-8">
              <UnlockCenterEffect centerSlug={result.centerSlug} />

              <div className="mb-7 text-center">
                <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-ink bg-forest text-2xl text-cream">
                  ✓
                </span>
                <h1 className="mb-2 font-display text-2xl sm:text-3xl">
                  {result.kind === 'bundle' ? t('bundleTitle') : t('title')}
                </h1>
                <p className="text-sm text-ink/70">
                  {result.kind === 'bundle'
                    ? t('bundleBody', { center: result.centerName })
                    : `${t('circuitLabel')} ${result.circuitTitle}`}{' '}
                  — {formatPrice(result.amountCents, locale)}
                </p>
              </div>

              {circuitLinks.length > 0 ? (
                <section aria-labelledby="available-circuits-title">
                  <h2 id="available-circuits-title" className="mb-4 font-display text-xl">
                    {locale === 'fr' ? 'Tes circuits sont disponibles' : 'Je circuits zijn beschikbaar'}
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {circuitLinks.map((link, index) => {
                      const circuitNumber = Number(link.circuitId.match(/-(\d+)$/)?.[1]) || index + 1
                      return (
                        <a
                          key={link.circuitId}
                          href={link.mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex min-h-28 items-center justify-between border-[3px] border-ink bg-cream px-5 py-4 shadow-hard-xs transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-yellow"
                        >
                          <span>
                            <span className="block font-display text-xl">{circuitsT('circuitLabel', { n: circuitNumber })}</span>
                            <span className="mt-1 block text-xs font-semibold text-ink/60">{circuitsT('openInGoogleMaps')}</span>
                          </span>
                          <span aria-hidden="true" className="text-2xl transition-transform group-hover:translate-x-1">→</span>
                        </a>
                      )
                    })}
                  </div>
                </section>
              ) : (
                <div className="border-[3px] border-ink bg-yellow/25 p-4 text-sm">
                  {locale === 'fr'
                    ? 'Le paiement est confirmé, mais les liens ne peuvent pas être chargés pour le moment. Retrouve-les depuis la page du centre ou restaure ton accès.'
                    : 'De betaling is bevestigd, maar de links kunnen momenteel niet worden geladen. Open ze via de centrumpagina of herstel je toegang.'}
                </div>
              )}

              <div className="mt-6 flex flex-col items-center gap-3 text-center">
                <Link href={`/circuits/${result.centerSlug}`} className="text-sm font-bold underline underline-offset-4">
                  {t('viewCircuits')} →
                </Link>
                <p className="text-xs text-ink/50">{t('receiptNote')}</p>
              </div>
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

  if (session.metadata?.kind === 'circuits-bundle') {
    const centerSlug = session.metadata.centerSlug
    const center = centerSlug ? getCenter(centerSlug) : undefined
    if (!center) return null
    return {
      kind: 'bundle' as const,
      centerSlug: center.slug,
      centerName: center.name,
      amountCents: session.amount_total ?? 0,
    }
  }

  const circuitId = session.metadata?.circuitId
  const circuit = circuitId ? getCircuitById(circuitId) : undefined
  if (!circuit) return null

  const center = getCenter(circuit.centerSlug)
  return {
    kind: 'circuit' as const,
    circuitId: circuit.id,
    centerSlug: circuit.centerSlug,
    centerName: center?.name ?? circuit.title.fr,
    circuitTitle: circuit.title.fr,
    amountCents: session.amount_total ?? circuit.priceCents ?? 0,
  }
}
