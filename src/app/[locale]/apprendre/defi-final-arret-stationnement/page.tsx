import { Navbar } from '@/components/site/Navbar'
import { Footer } from '@/components/site/Footer'
import { ModuleFiveFinalChallenge } from '@/components/learning/ModuleFiveFinalChallenge'
import '../learning.css'
import { pageMetadata } from '@/lib/seo'
import type { AppLocale } from '@/i18n/request'

export function generateMetadata({ params: { locale } }: { params: { locale: AppLocale } }) {
  return pageMetadata({ locale, path: '/apprendre/defi-final-arret-stationnement', title: 'Défi final — Arrêt et stationnement', description: 'Défi final du module sur l’arrêt et le stationnement.', indexable: false, languageAlternates: false })
}

export default function ModuleFiveFinalChallengePage() {
  return <><Navbar /><ModuleFiveFinalChallenge /><Footer /></>
}
