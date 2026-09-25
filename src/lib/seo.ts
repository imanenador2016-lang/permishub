import type { Metadata } from 'next'
import type { AppLocale } from '@/i18n/request'

// PermisHub choisit la version HTTPS sans www comme origine canonique.
export const SITE_URL = 'https://permishub.be'

type PageMetadataInput = {
  locale: AppLocale
  path: string
  title: string
  description: string
  indexable?: boolean
  openGraphType?: 'website' | 'article'
  image?: string
  languageAlternates?: boolean
}

/** Shared metadata builder: canonical URLs always use https://permishub.be, locale prefix, and no trailing slash. */
export function pageMetadata({ locale, path, title, description, indexable = true, openGraphType = 'website', image, languageAlternates = true }: PageMetadataInput): Metadata {
  const normalizedPath = path === '/' ? '' : `/${path.replace(/^\/+|\/+$/g, '')}`
  const canonical = `${SITE_URL}/${locale}${normalizedPath}`
  const alternates = languageAlternates
    ? { canonical, languages: { fr: `${SITE_URL}/fr${normalizedPath}`, nl: `${SITE_URL}/nl${normalizedPath}` } }
    : { canonical }

  return {
    title,
    description,
    alternates,
    robots: { index: indexable, follow: true, googleBot: { index: indexable, follow: true } },
    openGraph: {
      type: openGraphType,
      url: canonical,
      siteName: 'PermisHub',
      locale: locale === 'fr' ? 'fr_BE' : 'nl_BE',
      title,
      description,
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: { card: image ? 'summary_large_image' : 'summary', title, description, ...(image ? { images: [image] } : {}) },
  }
}

export function breadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
