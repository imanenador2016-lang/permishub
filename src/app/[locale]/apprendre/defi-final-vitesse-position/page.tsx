import { Navbar } from '@/components/site/Navbar'
import { Footer } from '@/components/site/Footer'
import { pageMetadata } from '@/lib/seo'
import type { AppLocale } from '@/i18n/request'

export function generateMetadata({ params: { locale } }: { params: { locale: AppLocale } }) {
  return pageMetadata({ locale, path: '/apprendre/defi-final-vitesse-position', title: 'Défi final — Vitesse et position', description: 'Écran du défi final sur la vitesse et la position sur la chaussée.', indexable: false, languageAlternates: false })
}
import { ModuleThreeFinalChallenge } from '@/components/learning/ModuleThreeFinalChallenge'
import '../learning.css'

export default function ModuleThreeFinalChallengePage() { return <><Navbar /><ModuleThreeFinalChallenge /><Footer /></> }
