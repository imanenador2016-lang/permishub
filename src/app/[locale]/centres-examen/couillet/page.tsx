import type { Metadata } from 'next'
import Image from 'next/image'
import { Clock3, MapPinned, ShieldCheck } from 'lucide-react'
import { setRequestLocale } from 'next-intl/server'
import { Navbar } from '@/components/site/Navbar'
import { Footer } from '@/components/site/Footer'
import { Breadcrumbs } from '@/components/site/Breadcrumbs'
import { Container } from '@/components/ui/Container'
import { Link } from '@/i18n/navigation'
import { CircuitUnlockCta } from '@/components/circuits/CircuitUnlockCta'
import type { AppLocale } from '@/i18n/request'
import { getCircuitsByCenter } from '@/content/centers/registry'
import { COUILLET_SEO_DATA } from '@/content/centers/couillet-seo'
import { pageMetadata } from '@/lib/seo'

const TITLE = 'Centre d’examen de Couillet : infos et 4 circuits PermisHub'
const DESCRIPTION = 'Prépare ton examen pratique à Couillet : infos officielles du centre AIBV et 4 circuits PermisHub à ouvrir dans Google Maps.'
const CENTER_PATH = '/centres-examen/couillet'

export function generateMetadata({ params: { locale } }: { params: { locale: AppLocale } }): Metadata {
  return pageMetadata({ locale, path: CENTER_PATH, title: TITLE, description: DESCRIPTION, indexable: locale === 'fr', languageAlternates: false })
}

export default async function CouilletExamCenterPage({ params: { locale } }: { params: { locale: AppLocale } }) {
  setRequestLocale(locale)
  const circuits = getCircuitsByCenter('couillet').filter((circuit) => Boolean(circuit.hasMaps))
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(COUILLET_SEO_DATA.address.value + ', Belgique')}`
  const verifiedDate = new Intl.DateTimeFormat('fr-BE', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date('2026-09-24T00:00:00Z'))

  return <>
    <Navbar />
    <main className="overflow-hidden px-4 py-6 sm:px-6 sm:py-10">
      <Container className="max-w-6xl">
        <Breadcrumbs locale={locale} items={[{ label: 'Accueil', href: '/' }, { label: "Centres d'examen", href: '/centres-examen' }, { label: 'Couillet', href: '/centres-examen/couillet' }]} />
        {locale === 'nl' && <p className="mb-5 border-2 border-ink bg-creamdim p-3 text-sm">Deze informatiepagina is momenteel alleen in het Frans beschikbaar.</p>}

        <section className="relative grid items-center gap-8 pb-8 pt-4 sm:gap-10 sm:pb-12 lg:grid-cols-[.92fr_1.08fr] lg:gap-14 lg:pb-16 lg:pt-8">
          <div className="relative z-10 py-1 sm:py-5">
            <p className="mb-5 flex items-center gap-3 font-display text-[11px] uppercase tracking-[.16em] text-forest sm:text-xs"><span className="h-[3px] w-8 bg-brick" />Centre d’examen · Charleroi</p>
            <h1 className="max-w-2xl font-display text-[2.35rem] leading-[1.02] tracking-[-.045em] sm:text-5xl lg:text-[3.65rem]">À Couillet, prépare le partage de la route <span className="text-brick">avant le jour J</span></h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-ink/75 sm:text-lg">Le réseau cyclable de Charleroi évolue jusque dans le secteur de Couillet. Prépare-toi à garder tes repères, lire la signalisation et observer les autres usagers.</p>
            <div className="mt-7 flex flex-col items-stretch gap-2.5 sm:flex-row sm:items-center">
              <div className="sm:min-w-64 [&>button]:min-h-14 [&>button]:px-6 [&>button]:py-3.5 [&>button]:text-base"><CircuitUnlockCta centerSlug="couillet" centerName="Couillet" locale="fr" unlockLabel={`Débloquer les ${circuits.length} circuits`} /></div>
              <a href={mapsUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center justify-center px-2 py-2 text-sm font-bold text-forest underline decoration-2 underline-offset-4 sm:justify-start">Localiser le centre <span aria-hidden className="ml-2">↗</span></a>
            </div>
            <p className="mt-4 text-xs text-ink/55">{circuits.length} circuits PermisHub · Google Maps · accès après déblocage</p>
          </div>
          <figure className="group relative isolate overflow-hidden border-[3px] border-ink bg-creamdim shadow-hard-xs sm:border-4 sm:shadow-hard">
            <Image src={COUILLET_SEO_DATA.photo.src} alt={COUILLET_SEO_DATA.photo.alt} width={1280} height={720} priority sizes="(max-width: 1024px) 100vw, 50vw" className="h-[255px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025] motion-reduce:transition-none sm:h-[360px] lg:h-[450px]" />
            <figcaption className="absolute inset-x-0 bottom-0 border-t-[3px] border-ink bg-cream/95 px-4 py-3 text-xs font-semibold text-ink/75 sm:px-5 sm:py-3.5">Centre d’examen AIBV · Rue du Lion Belge</figcaption>
          </figure>
        </section>

        <section className="relative my-8 bg-[#eee6d4] px-5 py-7 sm:my-10 sm:px-8 sm:py-9 lg:px-10">
          <div className="grid gap-7 lg:grid-cols-[.8fr_1.2fr] lg:gap-12">
            <div>
              <p className="font-display text-xs uppercase tracking-[.14em] text-forest">Repères pratiques</p>
              <h2 className="mt-2 font-display text-2xl tracking-tight sm:text-3xl">Le centre en bref</h2>
              <dl className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <div><dt className="text-[11px] font-bold uppercase tracking-[.12em] text-ink/50">Nom officiel</dt><dd className="mt-1 font-semibold">{COUILLET_SEO_DATA.officialName.value}</dd></div>
                <div><dt className="text-[11px] font-bold uppercase tracking-[.12em] text-ink/50">Adresse</dt><dd className="mt-1 font-semibold">{COUILLET_SEO_DATA.address.value}</dd></div>
                <div className="grid grid-cols-2 gap-3"><div><dt className="text-[11px] font-bold uppercase tracking-[.12em] text-ink/50">Numéro du centre</dt><dd className="mt-1 font-semibold">{COUILLET_SEO_DATA.centerNumber.value}</dd></div><div><dt className="text-[11px] font-bold uppercase tracking-[.12em] text-ink/50">Opérateur</dt><dd className="mt-1 font-semibold">{COUILLET_SEO_DATA.operator.value}</dd></div></div>
                <div><dt className="text-[11px] font-bold uppercase tracking-[.12em] text-ink/50">Téléphone permis de conduire</dt><dd className="mt-1 font-semibold"><a className="text-brick underline underline-offset-2" href={'tel:' + COUILLET_SEO_DATA.permitPhone.value.replace(/\s/g, '')}>{COUILLET_SEO_DATA.permitPhone.value}</a></dd></div>
                <div><dt className="text-[11px] font-bold uppercase tracking-[.12em] text-ink/50">Ouverture du centre</dt><dd className="mt-1 font-semibold">{COUILLET_SEO_DATA.openingHours.value}</dd></div>
              </dl>
              <a href={mapsUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex min-h-11 items-center gap-2 font-bold text-brick underline decoration-2 underline-offset-4">Voir le centre sur Google Maps <span aria-hidden>↗</span></a>
            </div>
            <div className="grid content-start gap-5 sm:grid-cols-2 sm:gap-7">
              <div className="border-t-[3px] border-forest pt-3"><h3 className="font-display text-base">Examen pratique · permis B</h3><p className="mt-2 text-sm leading-relaxed text-ink/75">{COUILLET_SEO_DATA.practicalExam.value}</p></div>
              <div className="border-t-[3px] border-brick pt-3"><h3 className="font-display text-base">Théorie et perception des risques</h3><p className="mt-2 text-sm leading-relaxed text-ink/75">La prise de rendez-vous et les disponibilités sont à vérifier sur le portail AIBV.</p></div>
              <div className="sm:col-span-2"><a href={COUILLET_SEO_DATA.bookingUrl.value} target="_blank" rel="noreferrer" className="btn-comic min-h-12 w-full px-4 py-3 text-center sm:w-auto">Consulter les modalités AIBV <span aria-hidden>↗</span></a><p className="mt-2 text-xs text-ink/55">Les horaires affichés sont les heures d’ouverture du centre. Informations vérifiées le {verifiedDate}.</p></div>
            </div>
          </div>
        </section>

        <section aria-labelledby="couillet-local-title" className="my-10 border-y-[3px] border-ink py-8 sm:my-14 sm:py-11">
          <div className="grid gap-7 lg:grid-cols-[1fr_.8fr] lg:items-start lg:gap-12">
            <div><p className="font-display text-xs uppercase tracking-[.14em] text-forest">Repère local</p><h2 id="couillet-local-title" className="mt-2 max-w-2xl font-display text-2xl leading-tight tracking-tight sm:text-3xl">À Couillet, anticipe les cyclistes et les changements de voirie</h2><p className="mt-4 max-w-2xl leading-relaxed text-ink/80">La Ville de Charleroi décrit le Ring Vélo comme un réseau en développement, dont la partie sud relie notamment Couillet à d’autres quartiers. Entraîne-toi à observer les cyclistes, les aménagements et la signalisation à chaque changement de contexte. Cela ne permet pas de prédire le parcours de ton examen.</p><a href={COUILLET_SEO_DATA.localPreparation.sourceUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex min-h-10 items-center text-sm font-bold text-brick underline underline-offset-2">Source mobilité de la Ville de Charleroi <span aria-hidden className="ml-2">↗</span></a></div>
            <aside className="relative border-l-[7px] border-ink bg-yellow px-4 py-5 sm:px-6 sm:py-6"><p className="font-display text-[11px] uppercase tracking-[.14em] text-ink/65">À travailler</p><p className="mt-2 font-display text-xl leading-tight sm:text-2xl">Regarde les usagers, puis lis la route</p><p className="mt-3 text-sm leading-relaxed text-ink/85">Ne te fie pas seulement aux marquages : observe ce qui change autour de toi et adapte ton placement à la signalisation présente.</p></aside>
          </div>
          <div className="mt-8 flex flex-col gap-4 border-t border-ink/20 pt-6 sm:mt-9 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-display text-lg sm:text-xl">Prépare le partage de la route avant le jour de ton examen.</p><p className="mt-1 text-sm text-ink/70">{circuits.length} circuits PermisHub · Google Maps · accès après déblocage</p></div><Link href="#pack" className="btn-comic min-h-12 px-5 py-3 text-center">Voir le pack Couillet <span aria-hidden>→</span></Link></div>
        </section>

        <section id="pack" className="scroll-mt-6 bg-forest px-5 py-8 text-cream sm:px-8 sm:py-11 lg:px-10 lg:py-12">
          <div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:items-center lg:gap-14"><div><p className="font-display text-xs uppercase tracking-[.14em] text-yellow">Pack circuits · Couillet</p><h2 className="mt-3 font-display text-3xl leading-tight tracking-tight sm:text-4xl">Prends tes repères dans le secteur</h2><ul className="mt-6 space-y-3 text-sm leading-snug sm:text-base">{[{ title: `${circuits.length} circuits d’entraînement`, icon: MapPinned }, { title: 'Itinéraires à ouvrir dans Google Maps', icon: MapPinned }, { title: '30 minutes indiquées par circuit', icon: Clock3 }, { title: 'Accès après déblocage', icon: ShieldCheck }].map(({ title, icon: FeatureIcon }) => <li key={title} className="flex items-start gap-3"><FeatureIcon aria-hidden="true" className="mt-0.5 flex-none text-yellow" size={19} strokeWidth={1.8} /><span>{title}</span></li>)}</ul></div>
            <div className="relative border-y border-cream/30 py-5 sm:py-6"><p className="mb-4 font-display text-[11px] uppercase tracking-[.15em] text-cream/65">Circuits disponibles après déblocage</p><ol className="grid grid-cols-2 gap-x-5 sm:grid-cols-4 sm:gap-3">{circuits.map((circuit, index) => <li key={circuit.id} className="border-t-2 border-yellow py-3 font-display text-base sm:text-sm lg:text-base">Circuit <span className="text-yellow">{String(index + 1).padStart(2, '0')}</span></li>)}</ol><p className="mt-2 text-xs text-cream/65">Les liens détaillés restent dans l’espace circuits.</p></div>
          </div>
          {circuits.length > 0 && <div className="mt-6"><CircuitUnlockCta centerSlug="couillet" centerName="Couillet" locale="fr" unlockLabel="Débloquer les 4 circuits Couillet" /></div>}
          <Link href="/circuits/couillet" className="mt-5 inline-flex min-h-11 items-center font-bold text-yellow underline decoration-2 underline-offset-4 hover:text-cream">Accéder à l’espace circuits <span aria-hidden className="ml-2">→</span></Link>
        </section>

        <section className="py-9 sm:py-12"><div className="grid gap-3 lg:grid-cols-[.7fr_1.3fr] lg:gap-12"><h2 className="font-display text-2xl tracking-tight sm:text-3xl">Questions fréquentes</h2><div className="divide-y divide-ink/20 border-y border-ink/20">
          <details className="group py-4"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base marker:hidden sm:text-lg">Où se trouve le centre d’examen de Couillet ?<span aria-hidden="true" className="flex h-8 w-8 flex-none items-center justify-center border-2 border-ink text-lg leading-none transition-transform group-open:rotate-45">+</span></summary><p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/75">Le centre AIBV se trouve au {COUILLET_SEO_DATA.address.value}. <a href={mapsUrl} target="_blank" rel="noreferrer" className="font-bold text-brick underline underline-offset-2">Ouvrir l’adresse sur Google Maps</a>.</p></details>
          <details className="group py-4"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base marker:hidden sm:text-lg">Combien de circuits PermisHub sont disponibles ?<span aria-hidden="true" className="flex h-8 w-8 flex-none items-center justify-center border-2 border-ink text-lg leading-none transition-transform group-open:rotate-45">+</span></summary><p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/75">Quatre circuits sont enregistrés pour Couillet. Leurs itinéraires Google Maps sont accessibles après déblocage.</p><Link href="#pack" className="mt-2 inline-flex min-h-11 items-center font-bold text-brick underline underline-offset-2">Débloquer les circuits <span aria-hidden className="ml-2">→</span></Link></details>
          <details className="group py-4"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base marker:hidden sm:text-lg">Comment prendre rendez-vous pour l’examen pratique ?<span aria-hidden="true" className="flex h-8 w-8 flex-none items-center justify-center border-2 border-ink text-lg leading-none transition-transform group-open:rotate-45">+</span></summary><p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/75">AIBV demande un rendez-vous pour les examens pratiques. Consulte les modalités officielles ou contacte le centre au {COUILLET_SEO_DATA.permitPhone.value}.</p><a href={COUILLET_SEO_DATA.bookingUrl.value} target="_blank" rel="noreferrer" className="mt-2 inline-flex min-h-11 items-center font-bold text-brick underline underline-offset-2">Voir les modalités AIBV <span aria-hidden className="ml-2">↗</span></a></details>
        </div></div></section>
      </Container>
    </main>
    <Footer />
  </>
}
