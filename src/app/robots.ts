import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://permishub.be'
  return {
    // Disallow /api/ ajouté lors de l'audit SEO du 2026-09-01 — routes
    // JSON (checkout, webhooks...), aucune valeur pour un moteur de
    // recherche, autant ne pas gaspiller de budget de crawl dessus.
    rules: { userAgent: '*', allow: '/', disallow: '/api/' },
    sitemap: `${base}/sitemap.xml`,
  }
}
