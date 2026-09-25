import { Navbar } from '@/components/site/Navbar'
import { Footer } from '@/components/site/Footer'
import { pageMetadata } from '@/lib/seo'
import type { AppLocale } from '@/i18n/request'

export function generateMetadata({ params: { locale } }: { params: { locale: AppLocale } }) {
  return pageMetadata({ locale, path: '/apprendre/defi-final-priorites-carrefours', title: 'Défi final — Priorités et carrefours', description: 'Écran du défi final sur les priorités et les carrefours.', indexable: false, languageAlternates: false })
}
import { ModuleTwoFinalChallenge } from '@/components/learning/ModuleTwoFinalChallenge'
import '../learning.css'

export default function ModuleTwoFinalChallengePage() { return <><Navbar /><ModuleTwoFinalChallenge /><Footer /></> }
