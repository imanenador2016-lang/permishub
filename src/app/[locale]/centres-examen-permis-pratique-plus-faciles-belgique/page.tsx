import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Navbar } from '@/components/site/Navbar'
import { Footer } from '@/components/site/Footer'
import { Container } from '@/components/ui/Container'
import { Link } from '@/i18n/navigation'
import type { AppLocale } from '@/i18n/request'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://permishub.be'
const SLUG = 'centres-examen-permis-pratique-plus-faciles-belgique'
const TITLE = 'Les 5 centres d’examen les plus faciles pour le permis pratique en Belgique'
const DESCRIPTION =
  'Découvrez les 5 centres d’examen du permis pratique avec les meilleurs taux de réussite en 2025 : Arlon, Lobbes, Mariembourg, Braine-le-Comte et Eupen.'
const PUBLISHED_AT = '2026-08-31'

/**
 * Article SEO — cible le mot-clé "centres d'examen permis pratique
 * Belgique" et les variantes associées (voir conversation du 2026-08-31).
 * Contenu éditorial fourni par le client, corrigé uniquement sur la forme
 * (fautes, structure HTML, hiérarchie de titres) — chiffres et faits
 * inchangés. Source : données officielles Gouvernement wallon / Parlement
 * de Wallonie, citées en texte (pas de lien externe fabriqué, aucune URL
 * précise n'a été fournie).
 *
 * URL/title/meta description imposés tels quels par le client, identiques
 * en fr et nl (mots-clés et chiffres 100% marché FR, pas de traduction du
 * contenu demandée) — même convention que examen-blanc pour le contenu
 * FR-only : bannière de notice en nl, contenu affiché malgré tout plutôt
 * qu'un 404.
 */
export async function generateMetadata({ params: { locale } }: { params: { locale: AppLocale } }): Promise<Metadata> {
  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: {
      canonical: `/${locale}/${SLUG}`,
      languages: Object.fromEntries(['fr', 'nl'].map((l) => [l, `/${l}/${SLUG}`])),
    },
    robots: { index: true, follow: true },
  }
}

const TOC = [
  { id: 'classement', label: 'Classement des 5 centres' },
  { id: 'arlon', label: '1. Arlon — 69,0 %' },
  { id: 'lobbes', label: '2. Lobbes — 67,7 %' },
  { id: 'mariembourg', label: '3. Mariembourg — 67,0 %' },
  { id: 'braine-le-comte', label: '4. Braine-le-Comte — 66,6 %' },
  { id: 'eupen', label: '5. Eupen — 63,9 %' },
  { id: 'centre-le-plus-facile', label: 'Le centre le plus facile ?' },
  { id: 'nimporte-quel-centre', label: 'Passer dans n’importe quel centre ?' },
  { id: 'stats-evoluent', label: 'Les statistiques évoluent-elles ?' },
  { id: 'conclusion', label: 'Conclusion' },
]

const RANKING = [
  { medal: '🥇', rank: 1, name: 'Arlon', rate: '69,0 %' },
  { medal: '🥈', rank: 2, name: 'Lobbes', rate: '67,7 %' },
  { medal: '🥉', rank: 3, name: 'Mariembourg', rate: '67,0 %' },
  { medal: '', rank: 4, name: 'Braine-le-Comte', rate: '66,6 %' },
  { medal: '', rank: 5, name: 'Eupen', rate: '63,9 %' },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: TITLE,
  description: DESCRIPTION,
  datePublished: PUBLISHED_AT,
  dateModified: PUBLISHED_AT,
  author: { '@type': 'Organization', name: 'PermisHub' },
  publisher: {
    '@type': 'Organization',
    name: 'PermisHub',
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.svg` },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/fr/${SLUG}` },
}

export default async function CentresExamenPermisPratiqueArticle({ params: { locale } }: { params: { locale: AppLocale } }) {
  setRequestLocale(locale)

  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main className="px-4 py-10 sm:px-6 sm:py-14">
        <Container className="max-w-3xl">
          {/* Fil d'Ariane */}
          <nav aria-label="Fil d’Ariane" className="mb-6 flex flex-wrap items-center gap-1.5 text-xs font-semibold text-ink/60">
            <Link href="/" className="hover:text-brick">
              Accueil
            </Link>
            <span aria-hidden>/</span>
            <Link href="/blog" className="hover:text-brick">
              Blog
            </Link>
            <span aria-hidden>/</span>
            <span className="text-ink/40">Centres d’examen les plus faciles</span>
          </nav>

          <span className="mb-4 inline-block w-fit -rotate-2 border-[3px] border-ink bg-yellow px-3 py-1.5 font-display text-xs">
            Données 2025
          </span>

          <h1 className="mb-4 font-display text-3xl leading-tight tracking-tight text-ink sm:text-4xl">{TITLE}</h1>

          <p className="mb-2 text-xs font-semibold text-ink/50">Mis à jour le 31 août 2026</p>

          {locale === 'nl' && (
            <p className="mb-4 border-[3px] border-ink bg-cream p-3 text-xs text-ink/70">
              Deze inhoud is momenteel enkel in het Frans beschikbaar.
            </p>
          )}

          <p className="mb-8 text-[15px] leading-relaxed text-ink/80 sm:text-base">
            Vous cherchez <strong>le centre d’examen le plus facile pour passer le permis pratique B en Belgique</strong> ? Le choix du
            centre peut avoir son importance, surtout lorsque plusieurs{' '}
            <Link href="/#circuits" className="text-brick underline decoration-2 underline-offset-2">
              centres d’examen pratique
            </Link>{' '}
            sont accessibles depuis votre région.
          </p>

          <p className="mb-10 text-[15px] leading-relaxed text-ink/80 sm:text-base">
            Pour vous aider à faire votre choix, PermisHub a comparé les <strong>taux de réussite officiels 2025 des centres d’examen
            wallons</strong>. Le classement ci-dessous est basé sur les résultats de la <strong>filière libre</strong>, avec des données
            communiquées officiellement au Parlement de Wallonie.
          </p>

          {/* Sommaire cliquable */}
          <div className="panel !shadow-hard-xs mb-10 p-5">
            <p className="mb-3 font-display text-sm">Sommaire</p>
            <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
              {TOC.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-sm font-medium text-ink/75 hover:text-brick">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Encadré méthodologie */}
          <div className="panel !shadow-hard-xs mb-12 flex gap-3 p-5">
            <span aria-hidden className="flex-none text-xl">
              ⚠️
            </span>
            <p className="text-sm leading-relaxed text-ink/80">
              <strong>Important :</strong> il n’existe pas de classement officiel indiquant qu’un centre est objectivement « facile ». Un
              taux de réussite élevé ne signifie pas que l’examen est automatiquement plus simple. Le niveau de préparation des candidats,
              leur expérience et leur nombre d’heures de conduite peuvent également influencer les résultats.
            </p>
          </div>

          {/* Classement */}
          <h2 id="classement" className="mb-4 scroll-mt-6 font-display text-2xl tracking-tight text-ink sm:text-3xl">
            Classement des 5 centres d’examen avec les meilleurs taux de réussite
          </h2>

          <div className="mb-3 overflow-x-auto">
            <table className="w-full border-collapse border-[3px] border-ink text-sm sm:text-base">
              <thead>
                <tr className="bg-ink text-cream">
                  <th className="border-2 border-ink px-3 py-2.5 text-left font-display">Classement</th>
                  <th className="border-2 border-ink px-3 py-2.5 text-left font-display">Centre d’examen</th>
                  <th className="border-2 border-ink px-3 py-2.5 text-right font-display">Taux de réussite 2025</th>
                </tr>
              </thead>
              <tbody>
                {RANKING.map((row) => (
                  <tr key={row.name} className="odd:bg-cream even:bg-creamdim">
                    <td className="border-2 border-ink px-3 py-2.5 font-display">
                      {row.medal} {row.rank}
                    </td>
                    <td className="border-2 border-ink px-3 py-2.5 font-semibold">{row.name}</td>
                    <td className="border-2 border-ink px-3 py-2.5 text-right font-display">{row.rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mb-12 text-xs italic text-ink/50">Taux de réussite 2025 — filière libre.</p>

          <p className="mb-12 text-[15px] leading-relaxed text-ink/80 sm:text-base">
            Ces chiffres correspondent à la <strong>filière libre</strong> et proviennent du tableau officiel communiqué par le
            Gouvernement wallon pour les années 2023 à 2025.
          </p>

          {/* 1. Arlon */}
          <h2 id="arlon" className="mb-3 scroll-mt-6 font-display text-2xl tracking-tight text-ink sm:text-3xl">
            1. Centre d’examen d’Arlon : 69 % de réussite
          </h2>
          <p className="mb-3 text-[15px] leading-relaxed text-ink/80 sm:text-base">
            Avec <strong>69,0 % de réussite en 2025</strong>, Arlon affiche le meilleur taux parmi les centres wallons dans la filière
            libre.
          </p>
          <p className="mb-3 text-[15px] leading-relaxed text-ink/80 sm:text-base">
            Sur 100 candidats présentés dans cette filière, environ <strong>69 ont réussi leur examen pratique</strong>.
          </p>
          <p className="mb-3 text-[15px] leading-relaxed text-ink/80 sm:text-base">
            Le centre d’Arlon peut donc être particulièrement intéressant pour les candidats qui ont la possibilité de s’y préparer
            correctement et qui souhaitent passer leur examen dans un environnement qu’ils connaissent.
          </p>
          <p className="mb-12 font-display text-sm text-forest">Taux de réussite 2025 : 69,0 %</p>

          {/* 2. Lobbes */}
          <h2 id="lobbes" className="mb-3 scroll-mt-6 font-display text-2xl tracking-tight text-ink sm:text-3xl">
            2. Centre d’examen de Lobbes : 67,7 % de réussite
          </h2>
          <p className="mb-3 text-[15px] leading-relaxed text-ink/80 sm:text-base">
            Le centre de <strong>Lobbes</strong> arrive en deuxième position avec un taux de réussite de <strong>67,7 % en 2025</strong>{' '}
            en filière libre.
          </p>
          <p className="mb-3 text-[15px] leading-relaxed text-ink/80 sm:text-base">
            C’est également l’un des centres qui affiche les meilleurs résultats sur plusieurs années : le taux était de 70,0 % en 2023
            et de 73,2 % en 2024 avant de revenir à 67,7 % en 2025.
          </p>
          <p className="mb-3 text-[15px] leading-relaxed text-ink/80 sm:text-base">
            Cela montre qu’il est préférable de regarder plusieurs années de statistiques plutôt qu’une seule année avant de choisir son
            centre.
          </p>
          <p className="mb-12 font-display text-sm text-forest">Taux de réussite 2025 : 67,7 %</p>

          {/* 3. Mariembourg */}
          <h2 id="mariembourg" className="mb-3 scroll-mt-6 font-display text-2xl tracking-tight text-ink sm:text-3xl">
            3. Centre d’examen de Mariembourg : 67 % de réussite
          </h2>
          <p className="mb-3 text-[15px] leading-relaxed text-ink/80 sm:text-base">
            Avec <strong>67,0 % de réussite</strong>, Mariembourg occupe la troisième place du classement 2025 en filière libre.
          </p>
          <p className="mb-3 text-[15px] leading-relaxed text-ink/80 sm:text-base">
            Le centre affiche également un résultat particulièrement intéressant en <strong>filière auto-école</strong>, avec{' '}
            <strong>62,5 % de réussite en 2025</strong>, soit le meilleur résultat parmi les centres repris dans le tableau officiel pour
            cette filière.
          </p>
          <p className="mb-3 text-[15px] leading-relaxed text-ink/80 sm:text-base">
            Mariembourg fait donc partie des centres présentant les meilleurs résultats quelle que soit la filière d’apprentissage.
          </p>
          <p className="mb-12 font-display text-sm text-forest">Taux de réussite 2025 : 67,0 % en filière libre</p>

          {/* 4. Braine-le-Comte */}
          <h2 id="braine-le-comte" className="mb-3 scroll-mt-6 font-display text-2xl tracking-tight text-ink sm:text-3xl">
            4. Centre d’examen de Braine-le-Comte : 66,6 % de réussite
          </h2>
          <p className="mb-3 text-[15px] leading-relaxed text-ink/80 sm:text-base">
            Braine-le-Comte se classe quatrième avec <strong>66,6 % de réussite en filière libre en 2025</strong>.
          </p>
          <p className="mb-3 text-[15px] leading-relaxed text-ink/80 sm:text-base">
            Le centre a également enregistré un taux de <strong>55,0 % en filière auto-école</strong> cette même année.
          </p>
          <p className="mb-3 text-[15px] leading-relaxed text-ink/80 sm:text-base">
            Pour un candidat qui souhaite choisir son centre principalement sur la base des statistiques disponibles, Braine-le-Comte
            figure donc parmi les options les plus intéressantes.
          </p>
          <p className="mb-12 font-display text-sm text-forest">Taux de réussite 2025 : 66,6 %</p>

          {/* 5. Eupen */}
          <h2 id="eupen" className="mb-3 scroll-mt-6 font-display text-2xl tracking-tight text-ink sm:text-3xl">
            5. Centre d’examen d’Eupen : 63,9 % de réussite
          </h2>
          <p className="mb-3 text-[15px] leading-relaxed text-ink/80 sm:text-base">
            Eupen complète le Top 5 avec <strong>63,9 % de réussite en filière libre en 2025</strong>.
          </p>
          <p className="mb-3 text-[15px] leading-relaxed text-ink/80 sm:text-base">
            Le centre est également intéressant pour les candidats germanophones : la Wallonie indique que les candidats qui choisissent
            de passer l’examen pratique en allemand doivent le faire au centre d’examen d’Eupen.
          </p>
          <p className="mb-3 text-[15px] leading-relaxed text-ink/80 sm:text-base">
            En filière auto-école, Eupen a enregistré <strong>57,2 % de réussite en 2025</strong>.
          </p>
          <p className="mb-12 font-display text-sm text-forest">Taux de réussite 2025 : 63,9 %</p>

          {/* Le centre le plus facile ? */}
          <h2 id="centre-le-plus-facile" className="mb-3 scroll-mt-6 font-display text-2xl tracking-tight text-ink sm:text-3xl">
            Quel est le centre d’examen le plus facile pour le permis pratique ?
          </h2>
          <p className="mb-3 text-[15px] leading-relaxed text-ink/80 sm:text-base">
            Si l’on utilise le <strong>taux de réussite 2025 en filière libre comme indicateur</strong>, le classement est donc :
          </p>
          <ol className="mb-4 flex flex-col gap-1 pl-1 text-[15px] leading-relaxed text-ink/80 sm:text-base">
            <li>
              <strong>1. Arlon — 69,0 %</strong>
            </li>
            <li>
              <strong>2. Lobbes — 67,7 %</strong>
            </li>
            <li>
              <strong>3. Mariembourg — 67,0 %</strong>
            </li>
            <li>
              <strong>4. Braine-le-Comte — 66,6 %</strong>
            </li>
            <li>
              <strong>5. Eupen — 63,9 %</strong>
            </li>
          </ol>
          <p className="mb-3 text-[15px] leading-relaxed text-ink/80 sm:text-base">
            Mais attention : <strong>un taux de réussite élevé ne garantit pas la réussite à votre examen</strong>.
          </p>
          <p className="mb-10 text-[15px] leading-relaxed text-ink/80 sm:text-base">
            Le Gouvernement wallon explique notamment que les différences entre la filière libre et l’auto-école peuvent être liées aux
            conditions d’apprentissage. Les candidats en filière libre peuvent notamment multiplier plus facilement les heures de{' '}
            <Link href="/roadbook" className="text-brick underline decoration-2 underline-offset-2">
              conduite avec leur guide
            </Link>
            .
          </p>

          <h3 className="mb-3 font-display text-xl tracking-tight text-ink sm:text-2xl">
            Est-ce vraiment utile de choisir un centre avec un taux de réussite élevé ?
          </h3>
          <p className="mb-3 text-[15px] leading-relaxed text-ink/80 sm:text-base">
            Oui, les statistiques peuvent être utiles pour comparer les centres, mais elles ne doivent pas être le seul critère.
          </p>
          <p className="mb-3 text-[15px] leading-relaxed text-ink/80 sm:text-base">
            Avant de choisir votre centre d’examen du{' '}
            <Link href="/" className="text-brick underline decoration-2 underline-offset-2">
              permis B
            </Link>
            , pensez également à :
          </p>
          <ul className="mb-4 flex flex-col gap-1.5 pl-1 text-[15px] leading-relaxed text-ink/80 sm:text-base">
            <li>• connaître les routes autour du centre ;</li>
            <li>• vous entraîner dans les zones où vous passerez réellement votre examen ;</li>
            <li>• maîtriser les priorités et les changements de direction ;</li>
            <li>• vous entraîner aux manœuvres ;</li>
            <li>• savoir gérer les ronds-points et les insertions ;</li>
            <li>• vous habituer à la circulation locale ;</li>
            <li>
              • faire plusieurs simulations d’{' '}
              <Link href="/examen-blanc" className="text-brick underline decoration-2 underline-offset-2">
                examen
              </Link>{' '}
              avant le jour J.
            </li>
          </ul>
          <p className="mb-12 text-[15px] font-semibold leading-relaxed text-ink sm:text-base">
            Le meilleur centre pour vous est souvent celui dont vous connaissez parfaitement l’environnement.
          </p>

          {/* N'importe quel centre ? */}
          <h2 id="nimporte-quel-centre" className="mb-3 scroll-mt-6 font-display text-2xl tracking-tight text-ink sm:text-3xl">
            Peut-on passer son permis pratique dans n’importe quel centre ?
          </h2>
          <p className="mb-3 text-[15px] leading-relaxed text-ink/80 sm:text-base">Pas nécessairement.</p>
          <p className="mb-3 text-[15px] leading-relaxed text-ink/80 sm:text-base">
            Depuis le <strong>1er janvier 2026</strong>, la Wallonie impose que l’ensemble du parcours d’examen permettant d’accéder à
            l’épreuve pratique en Wallonie ait été réalisé en Région wallonne. Cela concerne notamment l’examen{' '}
            <Link href="/resume" className="text-brick underline decoration-2 underline-offset-2">
              théorique
            </Link>{' '}
            et le test de perception des risques.
          </p>
          <p className="mb-12 text-[15px] leading-relaxed text-ink/80 sm:text-base">
            Il est donc important de vérifier les conditions applicables à votre situation avant de choisir votre centre.
          </p>

          {/* Stats évoluent */}
          <h2 id="stats-evoluent" className="mb-3 scroll-mt-6 font-display text-2xl tracking-tight text-ink sm:text-3xl">
            Les statistiques des centres d’examen peuvent-elles changer ?
          </h2>
          <p className="mb-3 text-[15px] leading-relaxed text-ink/80 sm:text-base">Oui.</p>
          <p className="mb-3 text-[15px] leading-relaxed text-ink/80 sm:text-base">
            Les taux de réussite évoluent d’une année à l’autre. C’est pourquoi il est préférable de consulter les statistiques les plus
            récentes disponibles plutôt que de se fier à une ancienne réputation du centre.
          </p>
          <p className="mb-3 text-[15px] leading-relaxed text-ink/80 sm:text-base">
            En 2025, par exemple, <strong>87 162 examens pratiques B ont été présentés en Wallonie et 47 152 ont été réussis, soit un
            taux global de 54 %</strong>.
          </p>
          <p className="mb-12 text-[15px] leading-relaxed text-ink/80 sm:text-base">
            Le classement des centres doit donc être considéré comme un <strong>indicateur statistique</strong>, et non comme une
            garantie de réussite.
          </p>

          {/* Conclusion */}
          <h2 id="conclusion" className="mb-3 scroll-mt-6 font-display text-2xl tracking-tight text-ink sm:text-3xl">
            Conclusion : où passer son permis pratique ?
          </h2>
          <p className="mb-3 text-[15px] leading-relaxed text-ink/80 sm:text-base">
            Si vous recherchez un <strong>centre d’examen avec un taux de réussite élevé</strong>, les cinq centres qui ressortent en
            tête des statistiques officielles 2025 de la filière libre sont :
          </p>
          <p className="mb-3 text-[15px] font-semibold leading-relaxed text-ink sm:text-base">
            Arlon, Lobbes, Mariembourg, Braine-le-Comte et Eupen.
          </p>
          <p className="mb-3 text-[15px] leading-relaxed text-ink/80 sm:text-base">
            Arlon arrive en première position avec <strong>69,0 % de réussite</strong>, suivi de Lobbes avec <strong>67,7 %</strong> et
            Mariembourg avec <strong>67,0 %</strong>.
          </p>
          <p className="mb-10 text-[15px] leading-relaxed text-ink/80 sm:text-base">
            Mais le choix du centre ne fait pas tout. Une bonne préparation, la connaissance des parcours et la maîtrise des situations
            de circulation restent essentielles pour réussir son <strong>examen pratique du permis B</strong>.
          </p>

          <div className="panel flex flex-col items-start gap-3 bg-forest p-5 text-cream sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <p className="font-display text-lg leading-snug sm:text-xl">Vous préparez votre examen pratique ?</p>
            <Link href="/examen-blanc" className="btn-comic flex-none px-5 py-3 text-sm sm:text-base">
              S’entraîner sur PermisHub →
            </Link>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  )
}
