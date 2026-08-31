import type { MetadataRoute } from 'next'
import { LOCALES } from '@/i18n/request'
import { EXAM_CENTERS } from '@/content/centers/registry'
import { EXAMENS_BLANCS } from '@/lib/examens-blancs'

/**
 * SEO : ne référence QUE des routes qui existent réellement. Avant l'audit
 * du 2026-08-22, ce fichier listait /cours, /examen-blanc, /pricing et
 * /cours/[slug] pour chaque thème — aucune de ces pages n'était construite,
 * ce qui envoyait Google crawler des 404 et gaspillait le budget de crawl.
 * Complété le 2026-08-31 (voir conversation) pour lister enfin toutes les
 * pages réellement construites depuis — routes statiques + routes générées
 * depuis les mêmes registres que le reste du site (EXAM_CENTERS,
 * EXAMENS_BLANCS), jamais une liste dupliquée à la main qui pourrait dériver.
 */
function withLocales(base: string, path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']) {
  return LOCALES.map((locale) => ({
    url: `${base}/${locale}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: {
      languages: Object.fromEntries(LOCALES.map((l) => [l, `${base}/${l}${path}`])),
    },
  }))
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://permishub.be'

  const homepages = withLocales(base, '', 1, 'weekly')
  const staticPages = [
    ...withLocales(base, '/resume', 0.8, 'monthly'),
    ...withLocales(base, '/roadbook', 0.7, 'monthly'),
    ...withLocales(base, '/examen-blanc', 0.8, 'weekly'),
    ...withLocales(base, '/blog', 0.7, 'weekly'),
  ]

  const examPages = EXAMENS_BLANCS.flatMap((exam) => withLocales(base, `/examen-blanc/${exam.slug}`, 0.6, 'monthly'))

  // Centres "Bientôt" inclus quand même : ce sont de vraies pages qui
  // répondent 200 (verrouillées, pas des 404) — voir circuits/[centerSlug].
  const circuitPages = EXAM_CENTERS.flatMap((center) => withLocales(base, `/circuits/${center.slug}`, 0.7, 'monthly'))

  // Article SEO "centres d'examen les plus faciles" (conversation du
  // 2026-08-31) — contenu FR uniquement, mais la route existe sous les 2
  // locales (voir page.tsx), donc listée pour les 2.
  const article = withLocales(base, '/centres-examen-permis-pratique-plus-faciles-belgique', 0.8, 'monthly')

  return [...homepages, ...staticPages, ...examPages, ...circuitPages, ...article]
}
