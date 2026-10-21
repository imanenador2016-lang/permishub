import { Navbar } from '@/components/site/Navbar'
import { Footer } from '@/components/site/Footer'
import { ModuleSixFinalChallenge } from '@/components/learning/ModuleSixFinalChallenge'
import '../learning.css'
import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import type { AppLocale } from '@/i18n/request'

export function generateMetadata({ params: { locale } }: { params: { locale: AppLocale } }): Metadata {
  return pageMetadata({ locale, path: '/apprendre/defi-final-securite-alcool-accidents', title: 'Défi final — Sécurité, alcool et accidents', description: 'Défi final du module consacré à la sécurité, à l’alcool et aux accidents.', indexable: false, languageAlternates: false })
}

export default function ModuleSixFinalChallengePage() {
  return <><Navbar /><ModuleSixFinalChallenge /><Footer /></>
}
