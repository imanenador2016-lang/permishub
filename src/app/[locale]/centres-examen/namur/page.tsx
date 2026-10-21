import type { Metadata } from 'next'
import Image from 'next/image'
import { BarChart3, Clock3, MapPinned, ShieldCheck } from 'lucide-react'
import { setRequestLocale } from 'next-intl/server'
import { Navbar } from '@/components/site/Navbar'
import { Footer } from '@/components/site/Footer'
import { Breadcrumbs } from '@/components/site/Breadcrumbs'
import { Container } from '@/components/ui/Container'
import { Link } from '@/i18n/navigation'
import { CircuitUnlockCta } from '@/components/circuits/CircuitUnlockCta'
import { CircuitConstructionFaq } from '@/components/circuits/CircuitConstructionFaq'
import type { AppLocale } from '@/i18n/request'
import { getCircuitsByCenter } from '@/content/centers/registry'
import { NAMUR_SEO_DATA } from '@/content/centers/namur-seo'
import { pageMetadata } from '@/lib/seo'

const TITLE = 'Namur : le centre d’examen le plus difficile en Belgique ?'
const DESCRIPTION = 'Namur-Suarlée a les taux de réussite pratique B les plus faibles publiés en Wallonie en 2025. Infos officielles et 4 circuits PermisHub.'
const CENTER_PATH = '/centres-examen/namur'

export function generateMetadata({ params: { locale } }: { params: { locale: AppLocale } }): Metadata {
  return pageMetadata({ locale, path: CENTER_PATH, title: TITLE, description: DESCRIPTION, indexable: locale === 'fr', languageAlternates: false })
}

export default function NamurExamCenterPage({ params: { locale } }: { params: { locale: AppLocale } }) {
  setRequestLocale(locale)
  const circuits = getCircuitsByCenter('namur').filter((circuit) => Boolean(circuit.hasMaps))
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(NAMUR_SEO_DATA.address.value + ', Belgique')}`

  return <>
    <Navbar />
    <main className="overflow-hidden px-4 py-6 sm:px-6 sm:py-10">
      <Container className="max-w-6xl">
        <Breadcrumbs locale={locale} items={[{ label: 'Accueil', href: '/' }, { label: "Centres d'examen", href: '/centres-examen' }, { label: 'Namur - Suarlée', href: CENTER_PATH }]} />
        {locale === 'nl' && <p className="mb-5 border-2 border-ink bg-creamdim p-3 text-sm">Deze informatiepagina is momenteel alleen in het Frans beschikbaar.</p>}

        <section className="grid items-center gap-8 pb-9 pt-4 sm:gap-10 sm:pb-14 lg:grid-cols-[.96fr_1.04fr] lg:gap-14 lg:pt-8">
          <div className="py-1 sm:py-5">
            <p className="mb-5 flex items-center gap-3 font-display text-[11px] uppercase tracking-[.16em] text-forest sm:text-xs"><span className="h-[3px] w-8 bg-brick" />Centre d’examen · Namur - Suarlée</p>
            <h1 className="max-w-2xl font-display text-[2.3rem] leading-[1.02] tracking-[-.045em] sm:text-5xl lg:text-[3.45rem]">Namur est-il le centre d’examen <span className="text-brick">le plus difficile de Belgique&nbsp;?</span></h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink/75 sm:text-lg">Les données 2025 placent Suarlée au dernier rang des centres wallons publiés pour les deux filières du permis pratique B. Une raison de plus pour préparer le secteur avec méthode.</p>
            <div className="mt-7 flex flex-col items-stretch gap-2.5 sm:flex-row sm:items-center"><div className="sm:min-w-64 [&>button]:min-h-14 [&>button]:px-6 [&>button]:py-3.5 [&>button]:text-base"><CircuitUnlockCta centerSlug="namur" centerName="Namur - Suarlée" locale="fr" unlockLabel={`Débloquer les ${circuits.length} circuits`} /></div><a href={mapsUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center justify-center px-2 py-2 text-sm font-bold text-forest underline decoration-2 underline-offset-4">Localiser le centre <span aria-hidden className="ml-2">↗</span></a></div>
            <p className="mt-4 text-xs text-ink/55">{circuits.length} circuits PermisHub · Google Maps · accès après déblocage</p>
          </div>
          <figure className="group relative isolate overflow-hidden border-[3px] border-ink bg-creamdim shadow-hard-xs sm:border-4 sm:shadow-hard"><Image src={NAMUR_SEO_DATA.photo.src} alt={NAMUR_SEO_DATA.photo.alt} width={1024} height={1536} priority sizes="(max-width: 1024px) 100vw, 50vw" className="h-[310px] w-full object-cover object-[center_68%] transition-transform duration-700 group-hover:scale-[1.025] motion-reduce:transition-none sm:h-[390px] lg:h-[470px]" /><figcaption className="absolute inset-x-0 bottom-0 border-t-[3px] border-ink bg-cream/95 px-4 py-3 text-xs font-semibold text-ink/75">Namur et sa citadelle · Le centre d’examen se situe à Suarlée</figcaption></figure>
        </section>

        <section aria-labelledby="statistics-title" className="my-8 border-[3px] border-ink bg-yellow px-5 py-7 shadow-hard-xs sm:px-8 sm:py-9">
          <div className="grid gap-6 lg:grid-cols-[.85fr_1.15fr] lg:items-center lg:gap-12"><div><p className="flex items-center gap-2 font-display text-xs uppercase tracking-[.14em] text-ink/65"><BarChart3 size={18} />Statistiques officielles · 2025</p><h2 id="statistics-title" className="mt-3 font-display text-2xl leading-tight tracking-tight sm:text-4xl">Le taux de réussite le plus faible de Wallonie</h2></div><div><p className="text-base leading-relaxed text-ink/85">{NAMUR_SEO_DATA.statistics.value}</p><div className="mt-5 grid grid-cols-2 gap-3"><div className="border-t-[3px] border-ink pt-3"><strong className="font-display text-3xl text-brick">35,0 %</strong><p className="mt-1 text-sm font-semibold">Filière libre</p></div><div className="border-t-[3px] border-ink pt-3"><strong className="font-display text-3xl text-brick">46,4 %</strong><p className="mt-1 text-sm font-semibold">Auto-école</p></div></div><p className="mt-5 text-sm leading-relaxed text-ink/75"><strong>Important :</strong> ces chiffres concernent les centres wallons publiés et ne prouvent pas que l’examen est intrinsèquement plus sévère ni que Namur est le plus difficile de toute la Belgique.</p><a href={NAMUR_SEO_DATA.statistics.sourceUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex min-h-10 items-center text-sm font-bold text-ink underline decoration-2 underline-offset-2">Consulter la réponse du Parlement wallon <span aria-hidden className="ml-2">↗</span></a></div></div>
        </section>

        <section className="my-10 bg-[#eee6d4] px-5 py-7 sm:px-8 sm:py-9 lg:px-10"><div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-12"><div><p className="font-display text-xs uppercase tracking-[.14em] text-forest">Repères pratiques</p><h2 className="mt-2 font-display text-2xl sm:text-3xl">Le centre en bref</h2><dl className="mt-5 grid gap-4"><div><dt className="text-[11px] font-bold uppercase tracking-[.12em] text-ink/50">Adresse</dt><dd className="mt-1 font-semibold">{NAMUR_SEO_DATA.address.value}</dd></div><div className="grid grid-cols-2 gap-3"><div><dt className="text-[11px] font-bold uppercase tracking-[.12em] text-ink/50">Centre</dt><dd className="mt-1 font-semibold">1007</dd></div><div><dt className="text-[11px] font-bold uppercase tracking-[.12em] text-ink/50">Opérateur</dt><dd className="mt-1 font-semibold">AutoSécurité</dd></div></div><div><dt className="text-[11px] font-bold uppercase tracking-[.12em] text-ink/50">Téléphone</dt><dd className="mt-1 font-semibold"><a className="text-brick underline" href="tel:087572030">087 57 20 30</a></dd></div><div><dt className="text-[11px] font-bold uppercase tracking-[.12em] text-ink/50">Ouverture</dt><dd className="mt-1 font-semibold">{NAMUR_SEO_DATA.openingHours.value}</dd></div></dl></div><div className="grid content-start gap-5 sm:grid-cols-2"><div className="border-t-[3px] border-forest pt-3"><h3 className="font-display">Examen pratique B</h3><p className="mt-2 text-sm leading-relaxed text-ink/75">{NAMUR_SEO_DATA.practicalExam.value}</p></div><div className="border-t-[3px] border-brick pt-3"><h3 className="font-display">Préparation locale</h3><p className="mt-2 text-sm leading-relaxed text-ink/75">{NAMUR_SEO_DATA.localPreparation.value}</p></div><div className="sm:col-span-2"><a href={NAMUR_SEO_DATA.bookingUrl.value} target="_blank" rel="noreferrer" className="btn-comic min-h-12 px-4 py-3 text-center">Prendre rendez-vous officiellement <span aria-hidden>↗</span></a></div></div></div></section>

        <section id="pack" className="scroll-mt-6 bg-forest px-5 py-8 text-cream sm:px-8 sm:py-11 lg:px-10 lg:py-12"><div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:items-center lg:gap-14"><div><p className="font-display text-xs uppercase tracking-[.14em] text-yellow">Pack circuits · Namur</p><h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">Prépare le secteur avant le jour J</h2><ul className="mt-6 space-y-3 text-sm sm:text-base">{[{ title: '4 circuits d’entraînement', icon: MapPinned }, { title: 'Itinéraires Google Maps', icon: MapPinned }, { title: '30 minutes indiquées par circuit', icon: Clock3 }, { title: 'Accès après déblocage', icon: ShieldCheck }].map(({ title, icon: Icon }) => <li key={title} className="flex items-start gap-3"><Icon className="mt-0.5 flex-none text-yellow" size={19} aria-hidden /><span>{title}</span></li>)}</ul></div><div className="border-y border-cream/30 py-5"><p className="mb-4 font-display text-[11px] uppercase tracking-[.15em] text-cream/65">Circuits disponibles après déblocage</p><ol className="grid grid-cols-2 gap-x-5 sm:grid-cols-4 sm:gap-3">{circuits.map((circuit, index) => <li key={circuit.id} className="border-t-2 border-yellow py-3 font-display">Circuit <span className="text-yellow">{String(index + 1).padStart(2, '0')}</span></li>)}</ol><p className="mt-2 text-xs text-cream/65">Supports d’entraînement PermisHub, sans garantie du trajet choisi à l’examen.</p></div></div><div className="mt-6"><CircuitUnlockCta centerSlug="namur" centerName="Namur - Suarlée" locale="fr" unlockLabel="Débloquer les 4 circuits Namur" /></div><Link href="/circuits/namur" className="mt-5 inline-flex min-h-11 items-center font-bold text-yellow underline decoration-2 underline-offset-4">Accéder à l’espace circuits <span aria-hidden className="ml-2">→</span></Link></section>

        <section className="py-9 sm:py-12"><div className="grid gap-3 lg:grid-cols-[.7fr_1.3fr] lg:gap-12"><h2 className="font-display text-2xl sm:text-3xl">Questions fréquentes</h2><div className="divide-y divide-ink/20 border-y border-ink/20"><details className="group py-4"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base sm:text-lg">Namur est-il le centre d’examen le plus difficile de Belgique ?<span aria-hidden className="flex h-8 w-8 items-center justify-center border-2 border-ink group-open:rotate-45">+</span></summary><p className="mt-3 text-sm leading-relaxed text-ink/75">On ne peut pas l’affirmer pour toute la Belgique avec les données disponibles. En revanche, Suarlée présente bien les taux pratiques B les plus faibles des centres wallons publiés pour 2025, dans les deux filières.</p></details><details className="group py-4"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base sm:text-lg">Où se trouve le centre de Namur ?<span aria-hidden className="flex h-8 w-8 items-center justify-center border-2 border-ink group-open:rotate-45">+</span></summary><p className="mt-3 text-sm leading-relaxed text-ink/75">Le centre se trouve Nouvelle Route de Suarlée 23, à 5020 Namur. <a href={mapsUrl} target="_blank" rel="noreferrer" className="font-bold text-brick underline">Afficher sur Google Maps</a>.</p></details><CircuitConstructionFaq /></div></div></section>
      </Container>
    </main>
    <Footer />
  </>
}
