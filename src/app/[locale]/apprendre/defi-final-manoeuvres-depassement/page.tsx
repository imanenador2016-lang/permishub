import { Navbar } from '@/components/site/Navbar'
import { Footer } from '@/components/site/Footer'
import { ModuleFourFinalChallenge } from '@/components/learning/ModuleFourFinalChallenge'
import { pageMetadata } from '@/lib/seo'
import type { AppLocale } from '@/i18n/request'
import '../learning.css'

export function generateMetadata({ params: { locale } }: { params: { locale: AppLocale } }) {
  return pageMetadata({
    locale,
    path: '/apprendre/defi-final-manoeuvres-depassement',
    title: 'Défi final — Manœuvres et dépassement',
    description: 'Défi final du module sur les manœuvres et le dépassement.',
    indexable: false,
    languageAlternates: false,
  })
}

export default function ModuleFourFinalChallengePage() {
  return <><Navbar /><ModuleFourFinalChallenge /><Footer /></>
}
