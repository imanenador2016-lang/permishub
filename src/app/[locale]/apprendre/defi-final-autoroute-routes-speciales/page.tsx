import { Navbar } from '@/components/site/Navbar'
import { Footer } from '@/components/site/Footer'
import { ModuleNineFinalChallenge } from '@/components/learning/ModuleNineFinalChallenge'
import '../learning.css'
import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import type { AppLocale } from '@/i18n/request'

export function generateMetadata({ params: { locale } }: { params: { locale: AppLocale } }): Metadata {
  return pageMetadata({ locale, path: '/apprendre/defi-final-autoroute-routes-speciales', title: 'Défi final — Autoroute et routes spéciales', description: 'Évaluez vos connaissances sur les autoroutes, routes pour automobiles et zones spéciales en Belgique.', indexable: false, languageAlternates: false })
}

export default function ModuleNineChallengePage() {
  return <><Navbar /><ModuleNineFinalChallenge /><Footer /></>
}
