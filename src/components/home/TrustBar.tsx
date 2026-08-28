import { useTranslations } from 'next-intl'
import { Container } from '@/components/ui/Container'

/**
 * Bandeau de confiance / preuve sociale — dernière section de la home
 * (brief v2 §Ordre des sections). Anciennement dans le hero ; déplacé en
 * bas de page pour laisser cours/examens/circuits porter la démonstration
 * de valeur avant la réassurance finale.
 */
export function TrustBar() {
  const t = useTranslations('home')
  return (
    <Container className="pb-16">
      <div className="panel flex flex-wrap items-center justify-between gap-3.5 p-4 sm:p-5">
        {[t('trust1'), t('trust2'), t('trust3')].map((item) => (
          <div key={item} className="flex items-center gap-2 text-[13px] font-bold">
            <span className="h-2 w-2 rounded-full bg-forest" />
            {item}
          </div>
        ))}
      </div>
    </Container>
  )
}
