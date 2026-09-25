import { BookOpen, ChevronLeft, LockKeyhole, ShieldAlert } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import type { AppLocale } from '@/i18n/request'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

type Feature = 'lessons' | 'risk-perception'

const COPY = {
  fr: {
    lessons: { eyebrow: 'ESPACE APPRENTISSAGE', title: 'Les leçons interactives arrivent bientôt.', body: 'Cet espace est temporairement verrouillé. Les leçons ne sont pas encore accessibles aux candidats.', status: 'Bientôt disponible' },
    'risk-perception': { eyebrow: 'ENTRAÎNEMENT PRATIQUE', title: 'La perception des risques arrive bientôt.', body: 'Cet entraînement est temporairement verrouillé. Il ne sera accessible qu’à son ouverture officielle.', status: 'Bientôt disponible' },
    back: 'Retour à l’accueil',
  },
  nl: {
    lessons: { eyebrow: 'LEEROMGEVING', title: 'Interactieve lessen zijn binnenkort beschikbaar.', body: 'Deze omgeving is tijdelijk vergrendeld. De lessen zijn momenteel nog niet toegankelijk voor kandidaten.', status: 'Binnenkort beschikbaar' },
    'risk-perception': { eyebrow: 'PRAKTISCHE TRAINING', title: 'Gevarenherkenning is binnenkort beschikbaar.', body: 'Deze training is tijdelijk vergrendeld en wordt toegankelijk zodra ze officieel wordt geopend.', status: 'Binnenkort beschikbaar' },
    back: 'Terug naar startpagina',
  },
} as const

export function ComingSoonFeature({ feature, locale }: { feature: Feature; locale: AppLocale }) {
  const copy = COPY[locale][feature]
  const Icon = feature === 'lessons' ? BookOpen : ShieldAlert

  return <>
    <Navbar />
    <main className="mx-auto flex min-h-[68vh] w-full max-w-6xl items-center px-4 py-10 sm:px-6 sm:py-16">
      <section className="relative grid w-full overflow-hidden border-[3px] border-ink bg-cream shadow-hard-sm md:grid-cols-[1.15fr_.85fr]">
        <div className="flex flex-col justify-center p-6 sm:p-10 md:p-14">
          <span className="mb-6 inline-flex w-fit -rotate-1 items-center gap-2 border-[3px] border-ink bg-yellow px-3 py-2 font-display text-xs shadow-hard-xs sm:text-sm">
            <LockKeyhole size={16} aria-hidden="true" /> {copy.status}
          </span>
          <p className="text-xs font-extrabold uppercase tracking-[.18em] text-forest">{copy.eyebrow}</p>
          <h1 className="mt-3 max-w-2xl text-4xl leading-[1.02] sm:text-5xl md:text-6xl">{copy.title}</h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink/75 sm:text-lg">{copy.body}</p>
          <Link href="/" className="btn-comic mt-8 inline-flex min-h-12 w-fit items-center gap-2 px-5 py-3 text-sm sm:text-base">
            <ChevronLeft size={18} aria-hidden="true" /> {COPY[locale].back}
          </Link>
        </div>
        <div aria-hidden="true" className="relative flex min-h-48 items-center justify-center overflow-hidden border-t-[3px] border-ink bg-forest px-8 py-10 text-cream md:min-h-full md:border-l-[3px] md:border-t-0">
          <div className="absolute -right-12 -top-16 size-56 rotate-12 border-[3px] border-cream/15" />
          <div className="absolute -bottom-20 -left-10 size-56 -rotate-12 border-[3px] border-yellow/35" />
          <div className="relative grid size-36 place-items-center border-[3px] border-cream bg-forest shadow-[8px_8px_0_#1f1a14] sm:size-44">
            <Icon size={64} strokeWidth={1.5} className="text-yellow sm:size-[76px]" />
            <span className="absolute -bottom-3 -right-3 grid size-11 place-items-center border-[3px] border-ink bg-yellow text-ink">
              <LockKeyhole size={19} strokeWidth={2.5} />
            </span>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </>
}
