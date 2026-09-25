import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Navbar } from '@/components/site/Navbar'
import { Footer } from '@/components/site/Footer'
import { Container } from '@/components/ui/Container'
import { CircuitUnlockCta } from '@/components/circuits/CircuitUnlockCta'
import { CircuitIllustrationGeneric } from '@/components/circuits/CircuitIllustration'
import { Link } from '@/i18n/navigation'
import { Breadcrumbs } from '@/components/site/Breadcrumbs'
import { EXAM_CENTERS, getCenter, getCircuitsByCenter } from '@/content/centers/registry'
import { REGION_LABELS } from '@/domain/region'
import type { AppLocale } from '@/i18n/request'
import { pageMetadata } from '@/lib/seo'
import { getCircuitMapsByCenter } from '@/lib/circuit-maps.server'
import { getCircuitCenterAccess } from '@/lib/circuit-access.server'

export const dynamic = 'force-dynamic'

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
  if (!center) return { title: t('title'), robots: { index: false, follow: true } }

  if (centerSlug === 'anderlecht' && locale === 'fr') {
    return pageMetadata({
      locale,
      path: '/circuits/anderlecht',
      title: 'Circuits d’examen à Anderlecht : parcours Google Maps',
      description: 'Prépare ton examen pratique à Anderlecht avec les 4 circuits d’entraînement PermisHub et leurs itinéraires Google Maps.',
    })
  }

  // Description unique par centre (audit SEO du 2026-09-01) — jamais le
  // même texte générique : nom, région et nombre réel de circuits varient
  // toujours d'un centre à l'autre, aucune donnée inventée.
  const circuitCount = getCircuitsByCenter(centerSlug).filter((circuit) => circuit.hasMaps).length
  const regionLabel = REGION_LABELS[center.region][locale]
  const description = center.comingSoon
    ? t('metaDescriptionComingSoon', { name: center.name, region: regionLabel })
    : t('metaDescriptionActive', { name: center.name, region: regionLabel, count: circuitCount })

  return pageMetadata({ locale, path: `/circuits/${centerSlug}`, title: `${center.name} — ${t('title')}`, description, indexable: !center.comingSoon })
}

const DIFFICULTY_STYLES: Record<string, string> = {
  facile: 'bg-forest text-cream',
  moyen: 'bg-yellow text-ink',
  difficile: 'bg-brick text-cream',
}

/**
 * Liste publique des circuits. Les URLs privées ne sont consultées qu'après
 * vérification serveur du compte acheteur ; un visiteur anonyme ne reçoit
 * jamais les données de tracé dans le HTML ni dans le payload RSC.
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
  const hasAccess = await getCircuitCenterAccess(centerSlug)
  const circuitMaps = hasAccess
    ? new Map((await getCircuitMapsByCenter(centerSlug)).map((link) => [link.circuitId, link.mapsUrl]))
    : new Map<string, string>()

  const breadcrumbs = [
    { label: locale === 'fr' ? 'Accueil' : 'Home', href: '/' },
    { label: locale === 'fr' ? "Centres d’examen" : 'Examencentra', href: '/centres-examen' },
    { label: center.name, href: `/centres-examen/${center.slug}` },
    { label: locale === 'fr' ? 'Circuits' : 'Circuits', href: `/circuits/${center.slug}` },
  ]

  return (
    <>
      <Navbar />
      <main className="px-4 py-10 sm:px-6 sm:py-14">
        <Container className="max-w-4xl">
          <Link href="/#circuits" className="mb-4 inline-block text-sm font-semibold text-ink/60 hover:text-brick">
            {t('backToCenters')}
          </Link>

          <Breadcrumbs locale={locale} items={breadcrumbs} />

          <div className="mb-8">
            <span className="mb-4 inline-block w-fit -rotate-2 border-[3px] border-ink bg-yellow px-3 py-1.5 font-display text-xs">
              {t('circuitListBadge')}
            </span>
            <h1 className="mb-3 font-display text-2xl tracking-tight text-ink sm:text-3xl">
              {centerSlug === 'anderlecht' && locale === 'fr' ? 'Circuits d’examen pratique à Anderlecht' : `${REGION_LABELS[center.region][locale]} — ${center.name}`}
            </h1>
          </div>

          {!hasAccess ? (
            <section className="panel max-w-xl p-6 sm:p-8">
              <p className="mb-5 text-ink/75">
                {locale === 'fr'
                  ? `${circuits.filter((circuit) => circuit.hasMaps).length} circuits d\u2019entra\u00eenement sont disponibles pour ${center.name}. D\u00e9bloque le pack pour acc\u00e9der aux itin\u00e9raires.`
                  : `${circuits.filter((circuit) => circuit.hasMaps).length} trainingscircuits zijn beschikbaar voor ${center.name}. Ontgrendel het pakket om de routes te bekijken.`}
              </p>
              <CircuitUnlockCta
                centerSlug={center.slug}
                centerName={center.name}
                locale={locale}
                unlockLabel={locale === 'fr' ? 'D\u00e9bloquer les circuits' : 'Circuits ontgrendelen'}
              />
            </section>
          ) : (
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

                  {centerSlug !== 'anderlecht' && circuit.durationMinutes != null && (
                    <p className="text-xs font-semibold text-ink/70">{t('durationLabel', { min: circuit.durationMinutes })}</p>
                  )}
                  {centerSlug !== 'anderlecht' && circuit.difficulty && (
                    <span
                      className={`w-fit border-2 border-ink px-2.5 py-1 text-[10.5px] font-extrabold ${DIFFICULTY_STYLES[circuit.difficulty]}`}
                    >
                      {t(`difficulty.${circuit.difficulty}`)}
                    </span>
                  )}
                  {circuit.hasMaps && (
                    <p className="w-fit border-2 border-ink bg-sky px-2 py-1 text-xs font-bold">{t('realMapsBadge')}</p>
                  )}

                  <p className="flex-1 text-sm text-ink/70">{centerSlug === 'anderlecht' ? (locale === 'fr' ? `Parcours d’entraînement ${i + 1} associé au centre d’Anderlecht. Le détail de l’itinéraire est consultable depuis PermisHub.` : `Trainingsroute ${i + 1} bij het examencentrum van Anderlecht. De route details zijn beschikbaar via PermisHub.`) : circuit.description[locale]}</p>

                  {circuit.hasMaps ? (
                    hasAccess && circuitMaps.get(circuit.id) ? (
                      <a href={circuitMaps.get(circuit.id)} target="_blank" rel="noopener noreferrer" className="btn-comic block w-full px-4 py-3 text-center text-sm">
                        {t('openInGoogleMaps')} →
                      </a>
                    ) : (
                      <CircuitUnlockCta centerSlug={center.slug} centerName={center.name} locale={locale} />
                    )
                  ) : (
                    <span className="block w-full cursor-not-allowed border-[3px] border-ink/25 px-4 py-3 text-center text-sm font-bold text-ink/40">
                      {t('circuitComingSoon')}
                    </span>
                  )}
                </div>
              </div>
            ))}
            </div>
          )}

        </Container>
      </main>
      <Footer />
    </>
  )
}
