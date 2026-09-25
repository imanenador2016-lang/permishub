import { Navbar } from '@/components/site/Navbar'
import { Footer } from '@/components/site/Footer'
import { pageMetadata } from '@/lib/seo'
import type { AppLocale } from '@/i18n/request'

export function generateMetadata({ params: { locale } }: { params: { locale: AppLocale } }) {
  return pageMetadata({ locale, path: '/apprendre/defi-final', title: 'Défi final — Module 1', description: 'Écran du défi final de préparation au permis B.', indexable: false, languageAlternates: false })
}
import { FinalChallenge } from '@/components/learning/FinalChallenge'
import '../learning.css'
export default function FinalChallengePage(){return <><Navbar/><FinalChallenge/><Footer/></>}
