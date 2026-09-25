import { Navbar } from '@/components/site/Navbar'
import { Footer } from '@/components/site/Footer'
import { CoachingBooking } from '@/components/coaching/CoachingBooking'
import { pageMetadata } from '@/lib/seo'
import type { AppLocale } from '@/i18n/request'

export function generateMetadata({ params: { locale } }: { params: { locale: AppLocale } }) {
  return pageMetadata({ locale, path: '/coaching', title: 'Coaching intensif permis B en ligne', description: 'Découvre les séances de préparation intensive au permis B proposées par PermisHub à distance sur Zoom.', indexable: locale === 'fr', languageAlternates: false })
}
export default function CoachingPage(){return <><Navbar/><main><CoachingBooking/></main><Footer/></>}
