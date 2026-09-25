import type { Metadata } from 'next'
import Image from 'next/image'
import { Infinity, MapPinned, ShieldCheck, Zap } from 'lucide-react'
import { setRequestLocale } from 'next-intl/server'
import { Navbar } from '@/components/site/Navbar'
import { Footer } from '@/components/site/Footer'
import { Breadcrumbs } from '@/components/site/Breadcrumbs'
import { Container } from '@/components/ui/Container'
import { Link } from '@/i18n/navigation'
import { CircuitUnlockCta } from '@/components/circuits/CircuitUnlockCta'
import type { AppLocale } from '@/i18n/request'
import { getCircuitsByCenter } from '@/content/centers/registry'
import { LOBBES_SEO_DATA } from '@/content/centers/lobbes-seo'
import { pageMetadata } from '@/lib/seo'

const TITLE = 'Centre d’examen de Lobbes (Autosécurité) : horaires et circuits'
const DESCRIPTION = 'Prépare ton examen pratique à Lobbes : centre Autosécurité n° 1030, horaires, rendez-vous officiel et 4 circuits Google Maps PermisHub.'
const CENTER_PATH = '/centres-examen/lobbes'

export function generateMetadata({ params: { locale } }: { params: { locale: AppLocale } }): Metadata {
  return pageMetadata({
    locale,
    path: CENTER_PATH,
    title: TITLE,
    description: DESCRIPTION,
    indexable: locale === 'fr',
    languageAlternates: false,
  })
}

export default async function LobbesExamCenterPage({ params: { locale } }: { params: { locale: AppLocale } }) {
  setRequestLocale(locale)
  const circuits = getCircuitsByCenter('lobbes')
  const availableCircuits = circuits.filter((circuit) => Boolean(circuit.hasMaps)).length
  const verifiedDate = new Intl.DateTimeFormat('fr-BE', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date('2026-09-24T00:00:00Z'))
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(LOBBES_SEO_DATA.address.value + ', Belgique')}`

  return (
    <>
      <Navbar />
      <main className="overflow-hidden px-4 py-6 sm:px-6 sm:py-10">
        <Container className="max-w-6xl">
          <Breadcrumbs locale={locale} items={[
            { label: 'Accueil', href: '/' },
            { label: 'Centres d’examen', href: '/centres-examen' },
            { label: 'Lobbes', href: '/centres-examen/lobbes' },
          ]} />

          {locale === 'nl' && <p className="mb-5 border-2 border-ink bg-creamdim p-3 text-sm">Deze informatiepagina is momenteel alleen in het Frans beschikbaar.</p>}

          <section className="relative grid items-center gap-8 pb-8 pt-4 sm:gap-10 sm:pb-12 lg:grid-cols-[.92fr_1.08fr] lg:gap-14 lg:pb-16 lg:pt-8">
            <div className="relative z-10 py-1 sm:py-5">
              <p className="mb-5 flex items-center gap-3 font-display text-[11px] uppercase tracking-[.16em] text-forest sm:text-xs"><span className="h-[3px] w-8 bg-brick" />Centre d’examen · Hainaut</p>
              <h1 className="max-w-2xl font-display text-[2.35rem] leading-[1.02] tracking-[-.045em] sm:text-5xl lg:text-[3.65rem]">Centre d’examen du permis B <span className="text-brick">à Lobbes</span></h1>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-ink/75 sm:text-lg">Retrouve les informations du centre Autosécurité et prépare-toi à lire la route quand le trafic traverse Lobbes.</p>
              <div className="mt-7 flex flex-col items-stretch gap-2.5 sm:flex-row sm:items-center">
                <Link href="#pack" className="btn-comic min-h-14 px-6 py-3.5 text-center text-base sm:text-lg">Débloquer les circuits Lobbes <span aria-hidden>→</span></Link>
                <a href={mapsUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center justify-center px-2 py-2 text-sm font-bold text-forest underline decoration-2 underline-offset-4 sm:justify-start">Ouvrir l’adresse sur Google Maps</a>
              </div>
              <p className="mt-4 text-xs text-ink/55">{availableCircuits} circuits officiels PermisHub · Lobbes, Hainaut</p>
            </div>

            <figure className="group relative isolate overflow-hidden border-[3px] border-ink bg-creamdim shadow-hard-xs sm:border-4 sm:shadow-hard">
              <Image src={LOBBES_SEO_DATA.photo.src} alt={LOBBES_SEO_DATA.photo.alt} width={770} height={432} priority sizes="(max-width: 1024px) 100vw, 50vw" className="h-[255px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025] motion-reduce:transition-none sm:h-[360px] lg:h-[450px]" />
              <figcaption className="absolute inset-x-0 bottom-0 border-t-[3px] border-ink bg-cream/95 px-4 py-3 text-xs font-semibold text-ink/75 sm:px-5 sm:py-3.5">Centre d’examen de Lobbes · Rue de Binche</figcaption>
            </figure>
          </section>

          <section className="relative my-8 bg-[#eee6d4] px-5 py-7 sm:my-10 sm:px-8 sm:py-9 lg:px-10">
            <div className="grid gap-7 lg:grid-cols-[.8fr_1.2fr] lg:gap-12">
              <div>
                <p className="font-display text-xs uppercase tracking-[.14em] text-forest">Repères pratiques</p>
                <h2 className="mt-2 font-display text-2xl tracking-tight sm:text-3xl">Le centre en bref</h2>
                <dl className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                  <div><dt className="text-[11px] font-bold uppercase tracking-[.12em] text-ink/50">Nom officiel</dt><dd className="mt-1 font-semibold">{LOBBES_SEO_DATA.officialName.value}</dd></div>
                  <div><dt className="text-[11px] font-bold uppercase tracking-[.12em] text-ink/50">Adresse</dt><dd className="mt-1 font-semibold">{LOBBES_SEO_DATA.address.value}</dd></div>
                  <div className="grid grid-cols-2 gap-3"><div><dt className="text-[11px] font-bold uppercase tracking-[.12em] text-ink/50">Numéro du centre</dt><dd className="mt-1 font-semibold">{LOBBES_SEO_DATA.centerNumber.value}</dd></div><div><dt className="text-[11px] font-bold uppercase tracking-[.12em] text-ink/50">Opérateur</dt><dd className="mt-1 font-semibold">{LOBBES_SEO_DATA.operator.value}</dd></div></div>
                  <div><dt className="text-[11px] font-bold uppercase tracking-[.12em] text-ink/50">Téléphone permis de conduire</dt><dd className="mt-1 font-semibold"><a className="text-brick underline underline-offset-2" href={'tel:' + LOBBES_SEO_DATA.permitPhone.value.replace(/\s/g, '')}>{LOBBES_SEO_DATA.permitPhone.value}</a></dd></div>
                  <div><dt className="text-[11px] font-bold uppercase tracking-[.12em] text-ink/50">Ouverture du centre</dt><dd className="mt-1 font-semibold">{LOBBES_SEO_DATA.openingHours.value}</dd></div>
                </dl>
                <a href={mapsUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex min-h-11 items-center gap-2 font-bold text-brick underline decoration-2 underline-offset-4">Voir le centre sur Google Maps <span aria-hidden>↗</span></a>
              </div>
              <div className="grid content-start gap-5 sm:grid-cols-2 sm:gap-7">
                <div className="border-t-[3px] border-forest pt-3"><h3 className="font-display text-base">Examen pratique · permis B</h3><p className="mt-2 text-sm leading-relaxed text-ink/75">{LOBBES_SEO_DATA.practicalExam.value}</p></div>
                <div className="border-t-[3px] border-brick pt-3"><h3 className="font-display text-base">Théorie et perception des risques</h3><p className="mt-2 text-sm leading-relaxed text-ink/75">{LOBBES_SEO_DATA.theoryAndRisk.value}</p></div>
                <div className="sm:col-span-2"><a href={LOBBES_SEO_DATA.bookingUrl.value} target="_blank" rel="noreferrer" className="btn-comic min-h-12 w-full px-4 py-3 text-center sm:w-auto">Consulter le Portail RDV officiel <span aria-hidden>→</span></a><p className="mt-2 text-xs text-ink/55">Les horaires affichés sont ceux d’ouverture du centre ; les examens se prennent sur rendez-vous. Vérifié le {verifiedDate}.</p></div>
              </div>
            </div>
          </section>

          <section aria-labelledby="lobbes-local-title" className="my-10 border-y-[3px] border-ink py-8 sm:my-14 sm:py-11">
            <div className="grid gap-7 lg:grid-cols-[1fr_.8fr] lg:items-start lg:gap-12">
              <div>
                <p className="font-display text-xs uppercase tracking-[.14em] text-forest">Repères locaux à Lobbes</p>
                <h2 id="lobbes-local-title" className="mt-2 max-w-2xl font-display text-2xl leading-tight tracking-tight sm:text-3xl">À Lobbes, le trafic de transit change vite le décor</h2>
                <p className="mt-4 max-w-2xl leading-relaxed text-ink/80">Le plan stratégique communal signale le trafic de transit sur les routes nationales qui traversent l’entité, ainsi que des axes de faible gabarit dans les petites agglomérations. Pour ta préparation, entraîne-toi à adapter ton placement et ton allure aux panneaux et aux conditions rencontrées lorsque tu passes d’une rue locale à un axe plus fréquenté.</p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/65">Ce contexte décrit la commune, pas un itinéraire garanti d’examen. Le parcours peut dépendre des conditions locales.</p>
              </div>
              <aside className="relative border-l-[7px] border-ink bg-yellow px-4 py-5 sm:px-6 sm:py-6">
                <p className="font-display text-[11px] uppercase tracking-[.14em] text-ink/65">Point de vigilance</p>
                <p className="mt-2 font-display text-xl leading-tight sm:text-2xl">Relis la situation à chaque changement d’axe.</p>
                <p className="mt-3 text-sm leading-relaxed text-ink/85">Observe la signalisation, les intersections et l’espace disponible avant de choisir ta position. Ne conserve pas automatiquement le même rythme d’une rue à l’autre.</p>
              </aside>
            </div>
            <div className="mt-8 flex flex-col gap-4 border-t border-ink/20 pt-6 sm:mt-9 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-display text-lg sm:text-xl">Ne découvre pas le secteur le jour de ton examen.</p>
                <p className="mt-1 text-sm text-ink/70">{availableCircuits} circuits officiels PermisHub · Google Maps · accès immédiat</p>
              </div>
              <Link href="#pack" className="btn-comic min-h-12 px-5 py-3 text-center">Débloquer les circuits Lobbes <span aria-hidden>→</span></Link>
            </div>
          </section>

          <section id="pack" className="scroll-mt-6 bg-forest px-5 py-8 text-cream sm:px-8 sm:py-11 lg:px-10 lg:py-12">
            <div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:items-center lg:gap-14">
              <div>
                <p className="font-display text-xs uppercase tracking-[.14em] text-yellow">Pack circuits · Lobbes</p>
                <h2 className="mt-3 font-display text-3xl leading-tight tracking-tight sm:text-4xl">Les circuits officiels de Lobbes</h2>
                <ul className="mt-6 space-y-3 text-sm leading-snug sm:text-base">
                  {[
                    { title: `${availableCircuits} circuits officiels`, icon: MapPinned },
                    { title: 'Tracés Google Maps', icon: MapPinned },
                    { title: 'Accès immédiat après paiement', icon: Zap },
                    { title: 'Accès illimité aux circuits du centre', icon: Infinity },
                    { title: 'Remboursé si tu échoues à l’examen', icon: ShieldCheck },
                  ].map(({ title, icon: FeatureIcon }) => <li key={title} className="flex items-start gap-3"><FeatureIcon aria-hidden="true" className="mt-0.5 flex-none text-yellow" size={19} strokeWidth={1.8} /><span>{title}</span></li>)}
                </ul>
              </div>
              <div className="relative border-y border-cream/30 py-5 sm:py-6">
                <p className="mb-4 font-display text-[11px] uppercase tracking-[.15em] text-cream/65">Les {availableCircuits} circuits disponibles</p>
                <ol className="grid grid-cols-2 gap-x-5 sm:grid-cols-4 sm:gap-3">
                  {Array.from({ length: availableCircuits }, (_, index) => <li key={index} className="border-t-2 border-yellow py-3 font-display text-base sm:text-sm lg:text-base">Circuit <span className="text-yellow">{String(index + 1).padStart(2, '0')}</span></li>)}
                </ol>
                <p className="mt-2 text-xs text-cream/65">Accès après déblocage du pack.</p>
              </div>
            </div>
            {availableCircuits > 0 && <CircuitUnlockCta centerSlug="lobbes" centerName="Lobbes" locale="fr" unlockLabel="Débloquer les circuits Lobbes" />}
            <Link href="/circuits/lobbes" className="mt-5 inline-flex min-h-11 items-center font-bold text-yellow underline decoration-2 underline-offset-4 hover:text-cream">Voir la page des circuits de Lobbes <span aria-hidden className="ml-2">→</span></Link>
          </section>

          <section className="py-9 sm:py-12">
            <div className="grid gap-3 lg:grid-cols-[.7fr_1.3fr] lg:gap-12">
              <h2 className="font-display text-2xl tracking-tight sm:text-3xl">Questions fréquentes</h2>
              <div className="divide-y divide-ink/20 border-y border-ink/20">
                <details className="group py-4"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base marker:hidden sm:text-lg">Où se trouve le centre d’examen de Lobbes ?<span aria-hidden="true" className="flex h-8 w-8 flex-none items-center justify-center border-2 border-ink text-lg leading-none transition-transform group-open:rotate-45">+</span></summary><p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/75">Le centre Autosécurité se trouve au {LOBBES_SEO_DATA.address.value}. <a href={mapsUrl} target="_blank" rel="noreferrer" className="font-bold text-brick underline underline-offset-2">Afficher sur Google Maps</a>.</p></details>
                <details className="group py-4"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base marker:hidden sm:text-lg">Comment prendre rendez-vous pour l’examen pratique ?<span aria-hidden="true" className="flex h-8 w-8 flex-none items-center justify-center border-2 border-ink text-lg leading-none transition-transform group-open:rotate-45">+</span></summary><p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/75">Pour le permis B, Autosécurité demande un rendez-vous via son Portail RDV et recommande de le prendre au moins six semaines à l’avance.</p><a href={LOBBES_SEO_DATA.bookingUrl.value} target="_blank" rel="noreferrer" className="mt-2 inline-flex min-h-11 items-center font-bold text-brick underline underline-offset-2">Ouvrir le Portail RDV <span aria-hidden className="ml-2">↗</span></a></details>
                <details className="group py-4"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base marker:hidden sm:text-lg">Quels sont les horaires du centre ?<span aria-hidden="true" className="flex h-8 w-8 flex-none items-center justify-center border-2 border-ink text-lg leading-none transition-transform group-open:rotate-45">+</span></summary><p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/75">Le centre est ouvert lundi, mardi, mercredi et vendredi de 07:00 à 12:15 et de 13:00 à 16:45. Il est fermé le jeudi. Les examens pratiques ont leurs propres rendez-vous.</p></details>
                <details className="group py-4"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base marker:hidden sm:text-lg">Combien de circuits PermisHub sont disponibles à Lobbes ?<span aria-hidden="true" className="flex h-8 w-8 flex-none items-center justify-center border-2 border-ink text-lg leading-none transition-transform group-open:rotate-45">+</span></summary><p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/75">{availableCircuits} circuits officiels PermisHub sont proposés avec leurs tracés Google Maps, accessibles après déblocage.</p><Link href="#pack" className="mt-2 inline-flex min-h-11 items-center font-bold text-brick underline underline-offset-2">Débloquer les circuits Lobbes <span aria-hidden className="ml-2">→</span></Link></details>
                <details className="group py-4"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base marker:hidden sm:text-lg">Quel repère local préparer à Lobbes ?<span aria-hidden="true" className="flex h-8 w-8 flex-none items-center justify-center border-2 border-ink text-lg leading-none transition-transform group-open:rotate-45">+</span></summary><p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/75">Le plan communal relève du trafic de transit sur les routes nationales et des voiries plus étroites dans certaines agglomérations. Prépare-toi à adapter ta position et ton allure aux panneaux et à la situation réelle, sans mémoriser un trajet unique.</p></details>
              </div>
            </div>
          </section>
        </Container>
      </main>
      <Footer />
    </>
  )
}
