import type { Metadata } from 'next'
import { ComingSoonFeature } from '@/components/site/ComingSoonFeature'
import type { AppLocale } from '@/i18n/request'

export function generateMetadata({params:{locale}}:{params:{locale:AppLocale}}):Metadata {
  return { title:locale === 'fr' ? 'Perception des risques — bientôt disponible' : 'Gevarenherkenning — binnenkort beschikbaar', description:locale === 'fr' ? 'La préparation à la perception des risques sera bientôt disponible sur PermisHub.' : 'De voorbereiding op gevaarherkenning is binnenkort beschikbaar op PermisHub.',
    robots:{index:false,follow:false}, alternates:{canonical:`/${locale}/perception-risques`} }
}
export default function RiskPerceptionPage({params:{locale}}:{params:{locale:AppLocale}}) {
  return <ComingSoonFeature feature="risk-perception" locale={locale} />
}
