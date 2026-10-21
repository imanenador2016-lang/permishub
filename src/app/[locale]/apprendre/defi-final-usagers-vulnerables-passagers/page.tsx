import { Navbar } from '@/components/site/Navbar'
import { Footer } from '@/components/site/Footer'
import { ModuleEightFinalChallenge } from '@/components/learning/ModuleEightFinalChallenge'
import '../learning.css'
import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import type { AppLocale } from '@/i18n/request'

export function generateMetadata({ params: { locale } }: { params: { locale: AppLocale } }): Metadata {
  return pageMetadata({ locale, path: '/apprendre/defi-final-usagers-vulnerables-passagers', title: 'Défi final — Usagers vulnérables et passagers', description: 'Évaluez vos connaissances sur les piétons, cyclistes, enfants, ceintures et angles morts.', indexable: false, languageAlternates: false })
}

export default function ModuleEightChallengePage() {
  return <><Navbar /><ModuleEightFinalChallenge /><Footer /></>
}
