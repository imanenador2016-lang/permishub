import { Navbar } from '@/components/site/Navbar'
import { Footer } from '@/components/site/Footer'
import { ModuleSevenFinalChallenge } from '@/components/learning/ModuleSevenFinalChallenge'
import '../learning.css'
import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import type { AppLocale } from '@/i18n/request'

export function generateMetadata({ params: { locale } }: { params: { locale: AppLocale } }): Metadata {
  return pageMetadata({ locale, path: '/apprendre/defi-final-vehicule-securite-technique', title: 'Défi final — Véhicule et sécurité technique', description: 'Évaluez vos connaissances sur les masses, le chargement, les pneus, les freins et les feux.', indexable: false, languageAlternates: false })
}

export default function ModuleSevenChallengePage() {
  return <><Navbar /><ModuleSevenFinalChallenge /><Footer /></>
}
