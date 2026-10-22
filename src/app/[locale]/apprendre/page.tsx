import { cookies } from 'next/headers'
import { Navbar } from '@/components/site/Navbar'
import { Footer } from '@/components/site/Footer'
import { LearningHome } from '@/components/learning/LearningHome'
import './learning.css'
import { pageMetadata } from '@/lib/seo'
import type { AppLocale } from '@/i18n/request'
import { LEARNING_ACCESS_COOKIE, verifyLearningAccess } from '@/lib/learning-access-token'

export function generateMetadata({ params: { locale } }: { params: { locale: AppLocale } }) {
  return pageMetadata({ locale, path: '/apprendre', title: locale === 'fr' ? 'Apprendre le permis théorique' : 'Theorie leren voor het rijbewijs', description: locale === 'fr' ? 'Retrouve les modules et les leçons de préparation au permis théorique B.' : 'Bekijk de modules en lessen ter voorbereiding op het theoretisch rijbewijs B.', indexable: false })
}

export default async function LearnPage({ params: { locale } }: { params: { locale: AppLocale } }) {
  const hasPremiumAccess = process.env.NODE_ENV !== 'production'
    || Boolean(await verifyLearningAccess(cookies().get(LEARNING_ACCESS_COOKIE)?.value))
  return <><Navbar /><LearningHome hasPremiumAccess={hasPremiumAccess} locale={locale} showSubscriptionManagement={process.env.NODE_ENV === 'production'} /><Footer /></>
}
