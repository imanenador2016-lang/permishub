import type { Metadata } from 'next'
import Image from 'next/image'
import { setRequestLocale } from 'next-intl/server'
import { Navbar } from '@/components/site/Navbar'
import { Footer } from '@/components/site/Footer'
import { Breadcrumbs } from '@/components/site/Breadcrumbs'
import { Container } from '@/components/ui/Container'
import { Link } from '@/i18n/navigation'
import type { AppLocale } from '@/i18n/request'
import { ANDERLECHT_SEO_DATA } from '@/content/centers/anderlecht-seo'
import { CUESMES_SEO_DATA } from '@/content/centers/cuesmes-seo'
import { MARIEMBOURG_SEO_DATA } from '@/content/centers/mariembourg-seo'
import { LOBBES_SEO_DATA } from '@/content/centers/lobbes-seo'
import { SCHAERBEEK_SEO_DATA } from '@/content/centers/schaerbeek-seo'
import { BRAINE_LE_COMTE_SEO_DATA } from '@/content/centers/braine-le-comte-seo'
import { COUILLET_SEO_DATA } from '@/content/centers/couillet-seo'
import { LOUVAIN_LA_NEUVE_SEO_DATA } from '@/content/centers/louvain-la-neuve-seo'
import { EXAM_CENTERS, getCircuitsByCenter } from '@/content/centers/registry'
import { REGION_LABELS } from '@/domain/region'
import { pageMetadata } from '@/lib/seo'

const TITLE = "Circuits d'examen du permis en Belgique"
const DESCRIPTION = "Choisis ton centre d'examen pour retrouver ses informations et, lorsqu'ils existent, ses circuits d'entraînement PermisHub."

// Ajouter un slug ici uniquement lorsque sa page locale est prête.
const PUBLISHED_CENTER_PAGES = ['anderlecht', 'schaerbeek', 'cuesmes', 'mariembourg', 'lobbes', 'braine-le-comte', 'couillet', 'louvain-la-neuve'] as const
const CENTER_PHOTOS: Record<string, { src: string; alt: string }> = {
  anderlecht: ANDERLECHT_SEO_DATA.photo.value,
  schaerbeek: SCHAERBEEK_SEO_DATA.photo,
  cuesmes: CUESMES_SEO_DATA.photo,
  mariembourg: MARIEMBOURG_SEO_DATA.photo,
  lobbes: LOBBES_SEO_DATA.photo,
  'braine-le-comte': BRAINE_LE_COMTE_SEO_DATA.photo,
  couillet: COUILLET_SEO_DATA.photo,
  'louvain-la-neuve': LOUVAIN_LA_NEUVE_SEO_DATA.photo,
}
const REGIONS = [
  { id: 'BRUXELLES', title: 'Bruxelles' },
  { id: 'WALLONIE', title: 'Wallonie' },
] as const

export function generateMetadata({ params: { locale } }: { params: { locale: AppLocale } }): Metadata {
  return pageMetadata({
    locale,
    path: '/centres-examen',
    title: TITLE,
    description: DESCRIPTION,
    indexable: locale === 'fr',
    languageAlternates: false,
  })
}

export default function ExamCentersHubPage({ params: { locale } }: { params: { locale: AppLocale } }) {
  setRequestLocale(locale)
  const publishedCenters = PUBLISHED_CENTER_PAGES.flatMap((slug) => {
    const center = EXAM_CENTERS.find((entry) => entry.slug === slug)
    if (!center) return []
    const photo = CENTER_PHOTOS[slug]
    const availableCircuits = getCircuitsByCenter(slug).filter((circuit) => Boolean(circuit.hasMaps)).length
    return [{ center, photo, availableCircuits }]
  })

  return (
    <>
      <Navbar />
      <main className="px-4 py-7 sm:px-6 sm:py-12">
        <Container className="max-w-5xl">
          <Breadcrumbs locale={locale} items={[
            { label: 'Accueil', href: '/' },
            { label: "Centres d'examen", href: '/centres-examen' },
          ]} />

          {locale === 'nl' && <p className="mb-5 border-2 border-ink bg-creamdim p-3 text-sm">Deze informatiepagina is momenteel alleen in het Frans beschikbaar.</p>}

          <header className="max-w-4xl py-5 sm:py-10">
            <p className="font-display text-xs uppercase tracking-[.15em] text-forest">Préparation pratique · Permis B</p>
            <h1 className="mt-3 font-display text-3xl leading-tight tracking-tight sm:text-5xl">Circuits d&apos;examen du permis en Belgique</h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink/70 sm:text-lg">Choisis ton centre pour retrouver ses informations et, lorsqu&apos;ils existent, les circuits d&apos;entraînement PermisHub associés.</p>
          </header>

          <div className="space-y-10 sm:space-y-14">
            {REGIONS.map((region) => {
              const centers = publishedCenters.filter(({ center }) => center.region === region.id)
              return <section key={region.id} aria-labelledby={`region-${region.id}`}>
                <div className="mb-4 border-b-[3px] border-ink pb-3 sm:mb-6">
                  <h2 id={`region-${region.id}`} className="font-display text-2xl tracking-tight sm:text-3xl">{region.title}</h2>
                </div>
                {centers.length > 0 ? <div className="grid max-w-4xl gap-5 md:grid-cols-2">
                  {centers.map(({ center, photo, availableCircuits }) => <Link key={center.slug} href={`/centres-examen/${center.slug}` as never} className="group panel grid h-full overflow-hidden !p-0 transition-transform duration-200 hover:-translate-y-1 focus-visible:-translate-y-1 sm:grid-cols-[.9fr_1.1fr]">
                    {photo && <div className="relative min-h-48 overflow-hidden border-b-[3px] border-ink bg-creamdim sm:min-h-[210px] sm:border-b-0 sm:border-r-[3px]">
                      <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none" />
                    </div>}
                    <div className="flex flex-1 flex-col justify-center p-4 sm:p-5">
                      <p className="font-display text-xl sm:text-2xl">{center.name}</p>
                      <p className="mt-1 text-sm text-ink/65">{REGION_LABELS[center.region].fr}</p>
                      <p className="mt-4 text-sm font-semibold">{availableCircuits} circuits disponibles</p>
                      <span className="mt-4 inline-flex min-h-11 items-center gap-2 font-display text-sm text-brick underline decoration-2 underline-offset-4">Voir le centre <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span></span>
                    </div>
                  </Link>)}
                </div> : <p className="max-w-2xl border-l-4 border-forest bg-[#eee6d4] px-4 py-3 text-sm leading-relaxed text-ink/70">Les pages des centres de cette région seront ajoutées ici lorsqu&apos;elles seront prêtes.</p>}
              </section>
            })}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  )
}
