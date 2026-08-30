import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Navbar } from '@/components/site/Navbar'
import { Footer } from '@/components/site/Footer'
import { Container } from '@/components/ui/Container'
import { CircuitUnlockCta } from '@/components/circuits/CircuitUnlockCta'
import { CircuitIllustrationGeneric } from '@/components/circuits/CircuitIllustration'
import { Link } from '@/i18n/navigation'
import { EXAM_CENTERS, getCenter, getCircuitsByCenter } from '@/content/centers/registry'
import { REGION_LABELS } from '@/domain/region'
import type { AppLocale } from '@/i18n/request'

export function generateStaticParams() {
  return EXAM_CENTERS.map((center) => ({ centerSlug: center.slug }))
}

export async function generateMetadata({
  params: { locale, centerSlug },
}: {
  params: { locale: AppLocale; centerSlug: string }
}): Promise<Metadata> {
  const center = getCenter(centerSlug)
  const t = await getTranslations({ locale, namespace: 'circuits' })
  if (!center) return { title: t('title') }
  return {
    title: `${center.name} — ${t('title')}`,
    alternates: { canonical: `/${locale}/circuits/${centerSlug}` },
  }
}

const DIFFICULTY_STYLES: Record<string, string> = {
  facile: 'bg-forest text-cream',
  moyen: 'bg-yellow text-ink',
  difficile: 'bg-brick text-cream',
}

/**
 * Liste des circuits d'un centre (Circuit 1, 2, 3...). Chaque circuit avec
 * un tracé prêt ouvre l'offre de déblocage "tous les circuits du centre"
 * (CircuitOfferModal, 9,99 € — voir CircuitUnlockCta.tsx) au lieu d'aller
 * directement sur Google Maps ; une fois débloqué, le CTA devient un vrai
 * lien "Ouvrir sur Google Maps" (voir conversation du 2026-08-30).
 */
export default async function CenterCircuitsPage({
  params: { locale, centerSlug },
}: {
  params: { locale: AppLocale; centerSlug: string }
}) {
  setRequestLocale(locale)
  const center = getCenter(centerSlug)
  if (!center) notFound()

  const t = await getTranslations('circuits')
  const circuits = getCircuitsByCenter(centerSlug)

  return (
    <>
      <Navbar />
      <main className="px-4 py-10 sm:px-6 sm:py-14">
        <Container className="max-w-4xl">
          <Link href="/#circuits" className="mb-4 inline-block text-sm font-semibold text-ink/60 hover:text-brick">
            {t('backToCenters')}
          </Link>

          <div className="mb-8">
            <span className="mb-4 inline-block w-fit -rotate-2 border-[3px] border-ink bg-yellow px-3 py-1.5 font-display text-xs">
              {t('circuitListBadge')}
            </span>
            <h1 className="mb-3 font-display text-2xl tracking-tight text-ink sm:text-3xl">
              {REGION_LABELS[center.region][locale]} — {center.name}
            </h1>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {circuits.map((circuit, i) => (
              <div key={circuit.id} className="panel flex flex-col !p-0">
                {/* Visuel en tête de carte — même grammaire que le carrousel
                    home (CircuitsCarousel.tsx), pas le vrai tracé Google Maps
                    (réservé à une vraie carte embarquée, voir
                    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY dans SETUP.md, pas encore
                    configurée) mais suffit à donner du poids visuel à chaque
                    carte plutôt qu'un bloc de texte nu — voir conversation du
                    2026-08-30 (conversion). Teinte différente par carte
                    (seed=i) pour distinguer les circuits d'un même centre.
                */}
                <div className="h-[130px] border-b-[3px] border-ink sm:border-b-4">
                  <CircuitIllustrationGeneric seed={i} />
                </div>

                <div className="flex flex-1 flex-col gap-3 p-5">
                  <p className="font-display text-xl leading-tight">{t('circuitLabel', { n: i + 1 })}</p>

                  {circuit.distanceKm != null && circuit.attentionPointsCount != null && (
                    <p className="text-xs font-semibold text-ink/70">
                      {t('kmPoints', {
                        km: circuit.distanceKm.toLocaleString(locale === 'nl' ? 'nl-BE' : 'fr-BE'),
                        points: circuit.attentionPointsCount,
                      })}
                    </p>
                  )}
                  {circuit.difficulty && (
                    <span
                      className={`w-fit border-2 border-ink px-2.5 py-1 text-[10.5px] font-extrabold ${DIFFICULTY_STYLES[circuit.difficulty]}`}
                    >
                      {t(`difficulty.${circuit.difficulty}`)}
                    </span>
                  )}
                  {circuit.mapsUrl && (
                    <p className="w-fit border-2 border-ink bg-sky px-2 py-1 text-xs font-bold">{t('realMapsBadge')}</p>
                  )}

                  <p className="flex-1 text-sm text-ink/70">{circuit.description[locale]}</p>

                  {circuit.mapsUrl ? (
                    <CircuitUnlockCta mapsUrl={circuit.mapsUrl} centerSlug={center.slug} centerName={center.name} locale={locale} />
                  ) : (
                    <span className="block w-full cursor-not-allowed border-[3px] border-ink/25 px-4 py-3 text-center text-sm font-bold text-ink/40">
                      {t('circuitComingSoon')}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  )
}
