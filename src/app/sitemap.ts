import type { MetadataRoute } from 'next'
import { LOCALES } from '@/i18n/request'

/**
 * SEO : ne référence QUE des routes qui existent réellement. Avant l'audit
 * du 2026-08-22, ce fichier listait /cours, /examen-blanc, /pricing et
 * /cours/[slug] pour chaque thème — aucune de ces pages n'est construite,
 * ce qui envoyait Google crawler des 404 et gaspillait le budget de crawl.
 * À réétendre au fur et à mesure que /cours, /examen-blanc, etc. sont
 * réellement construits (voir SETUP.md § Prochaines étapes) — de nombreuses
 * pages réelles (resume, roadbook, examen-blanc, circuits/*, blog...)
 * manquent encore ici, pas ajoutées dans ce commit pour rester focalisé sur
 * l'article ci-dessous (voir conversation du 2026-08-31).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://permishub.be'

  const homepages = LOCALES.map((locale) => ({
    url: `${base}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1,
    alternates: {
      languages: Object.fromEntries(LOCALES.map((l) => [l, `${base}/${l}`])),
    },
  }))

  // Article SEO "centres d'examen les plus faciles" (conversation du
  // 2026-08-31) — contenu FR uniquement, mais la route existe sous les 2
  // locales (voir page.tsx), donc listée pour les 2.
  const articleSlug = 'centres-examen-permis-pratique-plus-faciles-belgique'
  const article = LOCALES.map((locale) => ({
    url: `${base}/${locale}/${articleSlug}`,
    lastModified: new Date('2026-08-31'),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
    alternates: {
      languages: Object.fromEntries(LOCALES.map((l) => [l, `${base}/${l}/${articleSlug}`])),
    },
  }))

  return [...homepages, ...article]
}
