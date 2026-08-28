import type { MetadataRoute } from 'next'
import { LOCALES } from '@/i18n/request'

/**
 * SEO : ne référence QUE des routes qui existent réellement. Avant l'audit
 * du 2026-08-22, ce fichier listait /cours, /examen-blanc, /pricing et
 * /cours/[slug] pour chaque thème — aucune de ces pages n'est construite,
 * ce qui envoyait Google crawler des 404 et gaspillait le budget de crawl.
 * À réétendre au fur et à mesure que /cours, /examen-blanc, etc. sont
 * réellement construits (voir SETUP.md § Prochaines étapes).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://permishub.be'

  return LOCALES.map((locale) => ({
    url: `${base}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1,
    alternates: {
      languages: Object.fromEntries(LOCALES.map((l) => [l, `${base}/${l}`])),
    },
  }))
}
