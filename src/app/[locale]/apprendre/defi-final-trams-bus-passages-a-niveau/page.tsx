import { Navbar } from '@/components/site/Navbar'
import { Footer } from '@/components/site/Footer'
import { ModuleTenFinalChallenge } from '@/components/learning/ModuleTenFinalChallenge'
import '../learning.css'
import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import type { AppLocale } from '@/i18n/request'

export function generateMetadata({ params: { locale } }: { params: { locale: AppLocale } }): Metadata {
  return pageMetadata({ locale, path: '/apprendre/defi-final-trams-bus-passages-a-niveau', title: 'Défi final — Trams, bus et passages à niveau', description: 'Évaluez vos connaissances sur les transports publics et les passages à niveau en Belgique.', indexable: false, languageAlternates: false })
}

export default function ModuleTenChallengePage() {
  return <><Navbar /><ModuleTenFinalChallenge /><Footer /></>
}
