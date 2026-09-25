import type { MetadataRoute } from 'next'
import { LOCALES, type AppLocale } from '@/i18n/request'
import { EXAM_CENTERS, getCircuitsByCenter } from '@/content/centers/registry'
import { SITE_URL } from '@/lib/seo'

const PUBLIC_PATHS = [
  { path: '', priority: 1, changeFrequency: 'weekly' },
  { path: '/blog', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/centres-examen', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/confidentialite', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/coaching', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/examen-blanc', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/faq', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/resume', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/roadbook', priority: 0.6, changeFrequency: 'monthly' },
] as const satisfies ReadonlyArray<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }>

function withLocales(base: string, path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'], locales: readonly AppLocale[] = LOCALES) {
  return locales.map((locale) => ({
    url: `${base}/${locale}${path}`,
    changeFrequency,
    priority,
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [l, `${base}/${l}${path}`])),
    },
  }))
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL
  const staticPages = PUBLIC_PATHS.flatMap(({ path, priority, changeFrequency }) => {
    const locales = path === '/coaching' || path === '/centres-examen' || path === '/faq' ? (['fr'] as const) : LOCALES
    return withLocales(base, path, priority, changeFrequency, locales)
  })
  const editorialArticle = withLocales(base, '/centres-examen-permis-pratique-plus-faciles-belgique', 0.7, 'monthly', ['fr'])
  const centerAnderlecht = withLocales(base, '/centres-examen/anderlecht', 0.7, 'monthly', ['fr'])
  const centerCuesmes = withLocales(base, '/centres-examen/cuesmes', 0.7, 'monthly', ['fr'])
  const centerMariembourg = withLocales(base, '/centres-examen/mariembourg', 0.7, 'monthly', ['fr'])
  const centerLobbes = withLocales(base, '/centres-examen/lobbes', 0.7, 'monthly', ['fr'])
  const centerSchaerbeek = withLocales(base, '/centres-examen/schaerbeek', 0.7, 'monthly', ['fr'])
  const centerBraineLeComte = withLocales(base, '/centres-examen/braine-le-comte', 0.7, 'monthly', ['fr'])
  const centerCouillet = withLocales(base, '/centres-examen/couillet', 0.7, 'monthly', ['fr'])
  const centerLouvainLaNeuve = withLocales(base, '/centres-examen/louvain-la-neuve', 0.7, 'monthly', ['fr'])
  const circuitPages = EXAM_CENTERS
    .filter((center) => !center.comingSoon && getCircuitsByCenter(center.slug).some((circuit) => Boolean(circuit.hasMaps)))
    .flatMap((center) => withLocales(base, `/circuits/${center.slug}`, 0.6, 'monthly'))

  return [...staticPages, ...editorialArticle, ...centerAnderlecht, ...centerCuesmes, ...centerMariembourg, ...centerLobbes, ...centerSchaerbeek, ...centerBraineLeComte, ...centerCouillet, ...centerLouvainLaNeuve, ...circuitPages]
}
