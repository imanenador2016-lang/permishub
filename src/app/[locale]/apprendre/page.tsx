import { ComingSoonFeature } from '@/components/site/ComingSoonFeature'
import { pageMetadata } from '@/lib/seo'
import type { AppLocale } from '@/i18n/request'

export function generateMetadata({ params: { locale } }: { params: { locale: AppLocale } }) {
  return pageMetadata({ locale, path: '/apprendre', title: locale === 'fr' ? 'Apprendre le permis théorique' : 'Theorie leren voor het rijbewijs', description: locale === 'fr' ? 'Retrouve les modules et les leçons de préparation au permis théorique B.' : 'Bekijk de modules en lessen ter voorbereiding op het theoretisch rijbewijs B.', indexable: false })
}

export default function LearnPage({ params: { locale } }: { params: { locale: AppLocale } }) {
  return <ComingSoonFeature feature="lessons" locale={locale} />
}
