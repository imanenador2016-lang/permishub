import type { Metadata } from 'next'
import Image from 'next/image'
import { MapPinned, Clock3, ShieldCheck } from 'lucide-react'
import { setRequestLocale } from 'next-intl/server'
import { Navbar } from '@/components/site/Navbar'
import { Footer } from '@/components/site/Footer'
import { Breadcrumbs } from '@/components/site/Breadcrumbs'
import { Container } from '@/components/ui/Container'
import { Link } from '@/i18n/navigation'
import { CircuitUnlockCta } from '@/components/circuits/CircuitUnlockCta'
import type { AppLocale } from '@/i18n/request'
import { getCircuitsByCenter } from '@/content/centers/registry'
import { BRAINE_LE_COMTE_SEO_DATA } from '@/content/centers/braine-le-comte-seo'
import { pageMetadata } from '@/lib/seo'

const TITLE = 'Centre d’examen de Braine-le-Comte : infos et circuits'
const DESCRIPTION = 'Prépare ton examen pratique au centre AIBV de Braine-le-Comte : adresse, horaires, rendez-vous officiel et 4 circuits PermisHub sur Google Maps.'
const CENTER_PATH = '/centres-examen/braine-le-comte'

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

export default async function BraineLeComteExamCenterPage({ params: { locale } }: { params: { locale: AppLocale } }) {
  setRequestLocale(locale)
  const circuits = getCircuitsByCenter('braine-le-comte')
  const availableCircuits = circuits.filter((circuit) => Boolean(circuit.hasMaps)).length
  const verifiedDate = new Intl.DateTimeFormat('fr-BE', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date('2026-09-24T00:00:00Z'))
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BRAINE_LE_COMTE_SEO_DATA.address.value + ', Belgique')}`

  return (
    <>
      <Navbar />
      <main className="overflow-hidden px-4 py-6 sm:px-6 sm:py-10">
        <Container className="max-w-6xl">
          <Breadcrumbs locale={locale} items={[
            { label: 'Accueil', href: '/' },
            { label: "Centres d'examen", href: '/centres-examen' },
            { label: 'Braine-le-Comte', href: '/centres-examen/braine-le-comte' },
          ]} />

          {locale === 'nl' && <p className="mb-5 border-2 border-ink bg-creamdim p-3 text-sm">Deze informatiepagina is momenteel alleen in het Frans beschikbaar.</p>}

          <section className="relative grid items-center gap-8 pb-8 pt-4 sm:gap-10 sm:pb-12 lg:grid-cols-[.92fr_1.08fr] lg:gap-14 lg:pb-16 lg:pt-8">
            <div className="relative z-10 py-1 sm:py-5">
              <p className="mb-5 flex items-center gap-3 font-display text-[11px] uppercase tracking-[.16em] text-forest sm:text-xs"><span className="h-[3px] w-8 bg-brick" />Centre d’examen · Hainaut</p>
              <h1 className="max-w-2xl font-display text-[2.35rem] leading-[1.02] tracking-[-.045em] sm:text-5xl lg:text-[3.65rem]">Prépare ton examen pratique <span className="text-brick">à Braine-le-Comte</span></h1>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-ink/75 sm:text-lg">Retrouve les informations du centre AIBV et entraîne-toi à garder tes repères quand le contexte routier évolue.</p>
              <div className="mt-7 flex flex-col items-stretch gap-2.5 sm:flex-row sm:items-center">
                <div className="sm:min-w-64 [&>button]:min-h-14 [&>button]:px-6 [&>button]:py-3.5 [&>button]:text-base">
                  <CircuitUnlockCta centerSlug="braine-le-comte" centerName="Braine-le-Comte" locale="fr" unlockLabel={`Débloquer les ${availableCircuits} circuits`} />
                </div>
                <a href={mapsUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center justify-center px-2 py-2 text-sm font-bold text-forest underline decoration-2 underline-offset-4 sm:justify-start">Ouvrir l’adresse sur Google Maps</a>
              </div>
              <p className="mt-4 text-xs text-ink/55">{availableCircuits} circuits PermisHub · informations vérifiées le {verifiedDate}</p>
            </div>

            <figure className="group relative isolate overflow-hidden border-[3px] border-ink bg-creamdim shadow-hard-xs sm:border-4 sm:shadow-hard">
              <Image src={BRAINE_LE_COMTE_SEO_DATA.photo.src} alt={BRAINE_LE_COMTE_SEO_DATA.photo.alt} width={1280} height={720} priority sizes="(max-width: 1024px) 100vw, 50vw" className="h-[255px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025] motion-reduce:transition-none sm:h-[360px] lg:h-[450px]" />
              <figcaption className="absolute inset-x-0 bottom-0 border-t-[3px] border-ink bg-cream/95 px-4 py-3 text-xs font-semibold text-ink/75 sm:px-5 sm:py-3.5">Centre d’examen AIBV · Avenue du Marouset</figcaption>
            </figure>
          </section>

          <section className="relative my-8 bg-[#eee6d4] px-5 py-7 sm:my-10 sm:px-8 sm:py-9 lg:px-10">
            <div className="grid gap-7 lg:grid-cols-[.8fr_1.2fr] lg:gap-12">
              <div>
                <p className="font-display text-xs uppercase tracking-[.14em] text-forest">Repères pratiques</p>
                <h2 className="mt-2 font-display text-2xl tracking-tight sm:text-3xl">Le centre en bref</h2>
                <dl className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                  <div><dt className="text-[11px] font-bold uppercase tracking-[.12em] text-ink/50">Nom officiel</dt><dd className="mt-1 font-semibold">{BRAINE_LE_COMTE_SEO_DATA.officialName.value}</dd></div>
                  <div><dt className="text-[11px] font-bold uppercase tracking-[.12em] text-ink/50">Adresse</dt><dd className="mt-1 font-semibold">{BRAINE_LE_COMTE_SEO_DATA.address.value}</dd></div>
                  <div className="grid grid-cols-2 gap-3"><div><dt className="text-[11px] font-bold uppercase tracking-[.12em] text-ink/50">Numéro du centre</dt><dd className="mt-1 font-semibold">{BRAINE_LE_COMTE_SEO_DATA.centerNumber.value}</dd></div><div><dt className="text-[11px] font-bold uppercase tracking-[.12em] text-ink/50">Opérateur</dt><dd className="mt-1 font-semibold">{BRAINE_LE_COMTE_SEO_DATA.operator.value}</dd></div></div>
                  <div><dt className="text-[11px] font-bold uppercase tracking-[.12em] text-ink/50">Téléphone permis de conduire</dt><dd className="mt-1 font-semibold"><a className="text-brick underline underline-offset-2" href={'tel:' + BRAINE_LE_COMTE_SEO_DATA.permitPhone.value.replace(/\s/g, '')}>{BRAINE_LE_COMTE_SEO_DATA.permitPhone.value}</a></dd></div>
                  <div><dt className="text-[11px] font-bold uppercase tracking-[.12em] text-ink/50">Ouverture du centre</dt><dd className="mt-1 font-semibold">{BRAINE_LE_COMTE_SEO_DATA.openingHours.value}</dd></div>
                </dl>
                <a href={mapsUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex min-h-11 items-center gap-2 font-bold text-brick underline decoration-2 underline-offset-4">Voir le centre sur Google Maps <span aria-hidden>↗</span></a>
              </div>
              <div className="grid content-start gap-5 sm:grid-cols-2 sm:gap-7">
                <div className="border-t-[3px] border-forest pt-3"><h3 className="font-display text-base">Examen pratique · permis B</h3><p className="mt-2 text-sm leading-relaxed text-ink/75">{BRAINE_LE_COMTE_SEO_DATA.practicalExam.value}</p></div>
                <div className="border-t-[3px] border-brick pt-3"><h3 className="font-display text-base">Rendez-vous</h3><p className="mt-2 text-sm leading-relaxed text-ink/75">AIBV indique qu’un rendez-vous est indispensable pour présenter l’examen pratique.</p></div>
                <div className="sm:col-span-2"><a href={BRAINE_LE_COMTE_SEO_DATA.bookingUrl.value} target="_blank" rel="noreferrer" className="btn-comic min-h-12 w-full px-4 py-3 text-center sm:w-auto">Voir les modalités officielles <span aria-hidden>↗</span></a><p className="mt-2 text-xs text-ink/55">Ces horaires sont ceux d’ouverture du centre, pas les plages garanties d’examen. Vérifiés le {verifiedDate}.</p></div>
              </div>
            </div>
          </section>

          <section aria-labelledby="braine-local-title" className="my-10 border-y-[3px] border-ink py-8 sm:my-14 sm:py-11">
            <div className="grid gap-7 lg:grid-cols-[1fr_.8fr] lg:items-start lg:gap-12">
              <div>
                <p className="font-display text-xs uppercase tracking-[.14em] text-forest">Préparation locale</p>
                <h2 id="braine-local-title" className="mt-2 max-w-2xl font-display text-2xl leading-tight tracking-tight sm:text-3xl">À Braine-le-Comte, garde ton attention quand le contexte change</h2>
                <p className="mt-4 max-w-2xl leading-relaxed text-ink/80">La commune relie son centre-ville aux villages de l’entité et documente ses aménagements pour les déplacements à vélo. Entraîne-toi à lire la signalisation et la route devant toi, à observer les intersections et à partager l’espace avec les autres usagers, dont les cyclistes.</p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/65">Les repères de préparation ne prédisent pas le trajet de ton examen : les indications présentes et les conditions réelles de circulation restent prioritaires.</p>
              </div>
              <aside className="relative border-l-[7px] border-ink bg-yellow px-4 py-5 sm:px-6 sm:py-6">
                <p className="font-display text-[11px] uppercase tracking-[.14em] text-ink/65">Point de vigilance</p>
                <p className="mt-2 font-display text-xl leading-tight sm:text-2xl">Ne laisse pas un changement de décor faire baisser ton attention.</p>
                <p className="mt-3 text-sm leading-relaxed text-ink/85">Regarde loin, vérifie les priorités et adapte ton allure à ce que la signalisation indique, sans supposer que la route est toujours la même.</p>
              </aside>
            </div>
            <div className="mt-8 flex flex-col gap-4 border-t border-ink/20 pt-6 sm:mt-9 sm:flex-row sm:items-center sm:justify-between">
              <div><p className="font-display text-lg sm:text-xl">Ne découvre pas le secteur le jour de ton examen.</p><p className="mt-1 text-sm text-ink/70">{availableCircuits} circuits PermisHub · Google Maps · accès après déblocage</p></div>
              <Link href="#pack" className="btn-comic min-h-12 px-5 py-3 text-center">Débloquer les circuits <span aria-hidden>→</span></Link>
            </div>
          </section>

          <section id="pack" className="scroll-mt-6 bg-forest px-5 py-8 text-cream sm:px-8 sm:py-11 lg:px-10 lg:py-12">
            <div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:items-center lg:gap-14">
              <div>
                <p className="font-display text-xs uppercase tracking-[.14em] text-yellow">Circuits PermisHub · Braine-le-Comte</p>
                <h2 className="mt-3 font-display text-3xl leading-tight tracking-tight sm:text-4xl">Prépare le secteur à ton rythme</h2>
                <ul className="mt-6 space-y-3 text-sm leading-snug sm:text-base">
                  {[
                    { title: `${availableCircuits} circuits associés à Braine-le-Comte`, icon: MapPinned },
                    { title: 'Itinéraires ouvrables dans Google Maps', icon: MapPinned },
                    { title: '30 minutes indiquées par circuit', icon: Clock3 },
                    { title: 'Accès aux circuits après déblocage', icon: ShieldCheck },
                  ].map(({ title, icon: FeatureIcon }) => <li key={title} className="flex items-start gap-3"><FeatureIcon aria-hidden="true" className="mt-0.5 flex-none text-yellow" size={19} strokeWidth={1.8} /><span>{title}</span></li>)}
                </ul>
              </div>
              <div className="relative border-y border-cream/30 py-5 sm:py-6">
                <p className="mb-4 font-display text-[11px] uppercase tracking-[.15em] text-cream/65">Les circuits disponibles</p>
                <ol className="grid grid-cols-2 gap-x-5 sm:grid-cols-4 sm:gap-3">
                  {Array.from({ length: availableCircuits }, (_, index) => <li key={index} className="border-t-2 border-yellow py-3 font-display text-base sm:text-sm lg:text-base">Circuit <span className="text-yellow">{String(index + 1).padStart(2, '0')}</span></li>)}
                </ol>
                <p className="mt-2 text-xs text-cream/65">Les détails des itinéraires sont disponibles après déblocage.</p>
              </div>
            </div>
            {availableCircuits > 0 && <CircuitUnlockCta centerSlug="braine-le-comte" centerName="Braine-le-Comte" locale="fr" unlockLabel="Débloquer les circuits Braine-le-Comte" />}
            <Link href="/circuits/braine-le-comte" className="mt-5 inline-flex min-h-11 items-center font-bold text-yellow underline decoration-2 underline-offset-4 hover:text-cream">Accéder à l’espace circuits <span aria-hidden className="ml-2">→</span></Link>
          </section>

          <section className="py-9 sm:py-12">
            <div className="grid gap-3 lg:grid-cols-[.7fr_1.3fr] lg:gap-12">
              <h2 className="font-display text-2xl tracking-tight sm:text-3xl">Questions fréquentes</h2>
              <div className="divide-y divide-ink/20 border-y border-ink/20">
                <details className="group py-4"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base marker:hidden sm:text-lg">Où se trouve le centre AIBV de Braine-le-Comte ?<span aria-hidden="true" className="flex h-8 w-8 flex-none items-center justify-center border-2 border-ink text-lg leading-none transition-transform group-open:rotate-45">+</span></summary><p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/75">Il se trouve au {BRAINE_LE_COMTE_SEO_DATA.address.value}. <a href={mapsUrl} target="_blank" rel="noreferrer" className="font-bold text-brick underline underline-offset-2">Afficher l’adresse sur Google Maps</a>.</p></details>
                <details className="group py-4"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base marker:hidden sm:text-lg">Quels sont les horaires du centre ?<span aria-hidden="true" className="flex h-8 w-8 flex-none items-center justify-center border-2 border-ink text-lg leading-none transition-transform group-open:rotate-45">+</span></summary><p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/75">Du lundi au vendredi, de 07:30 à 12:00 et de 12:30 à 17:00. Ce sont les heures d’ouverture, pas les horaires individuels d’examen.</p></details>
                <details className="group py-4"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base marker:hidden sm:text-lg">Comment prendre rendez-vous pour l’examen pratique ?<span aria-hidden="true" className="flex h-8 w-8 flex-none items-center justify-center border-2 border-ink text-lg leading-none transition-transform group-open:rotate-45">+</span></summary><p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/75">AIBV demande un rendez-vous pour présenter l’examen pratique. Consulte les modalités officielles ou contacte le centre au {BRAINE_LE_COMTE_SEO_DATA.permitPhone.value}.</p><a href={BRAINE_LE_COMTE_SEO_DATA.bookingUrl.value} target="_blank" rel="noreferrer" className="mt-2 inline-flex min-h-11 items-center font-bold text-brick underline underline-offset-2">Voir les modalités AIBV <span aria-hidden className="ml-2">↗</span></a></details>
                <details className="group py-4"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base marker:hidden sm:text-lg">Combien de circuits PermisHub sont disponibles ?<span aria-hidden="true" className="flex h-8 w-8 flex-none items-center justify-center border-2 border-ink text-lg leading-none transition-transform group-open:rotate-45">+</span></summary><p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/75">{availableCircuits} circuits sont enregistrés pour Braine-le-Comte. Leurs détails s’ouvrent après déblocage.</p><Link href="#pack" className="mt-2 inline-flex min-h-11 items-center font-bold text-brick underline underline-offset-2">Débloquer les circuits <span aria-hidden className="ml-2">→</span></Link></details>
                <details className="group py-4"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base marker:hidden sm:text-lg">Quel repère local travailler en priorité ?<span aria-hidden="true" className="flex h-8 w-8 flex-none items-center justify-center border-2 border-ink text-lg leading-none transition-transform group-open:rotate-45">+</span></summary><p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/75">Garde une observation active quand le contexte change et vérifie les indications sur place, notamment la signalisation et la présence d’autres usagers.</p></details>
              </div>
            </div>
          </section>
        </Container>
      </main>
      <Footer />
    </>
  )
}
