import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { getCenters } from '@/content/centers/registry'
import { formatPrice } from '@/domain/centers'
import { usePurchasesStore } from '@/state/purchases-store'

export function CentersIndex() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'nl' ? 'nl' : 'fr'
  const centers = getCenters()
  const hasPurchased = usePurchasesStore((s) => s.hasPurchased)

  return (
    <Container className="py-14">
      <h1 className="font-display text-3xl font-semibold text-ink-950">{t('centers.indexTitle')}</h1>
      <p className="mt-3 max-w-xl leading-relaxed text-ink-700">{t('centers.indexSubtitle')}</p>
      <p className="mt-2 text-sm text-ink-500">{t('centers.perCenterNote')}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {centers.map((center) => (
          <Card key={center.slug} interactive className="flex flex-col gap-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="flex items-center gap-2 text-lg font-semibold text-ink-950">
                  <Icon name="MapPin" size={18} className="text-brand-700" />
                  {center.name}
                </p>
                <p className="mt-1 text-sm font-semibold text-brand-800">{formatPrice(center.priceCents, lang)}</p>
              </div>
              {hasPurchased(center.slug) && <Badge tone="success">{t('centers.unlockedBadge')}</Badge>}
            </div>

            <Link to={`/circuits/${center.slug}`}>
              <Button className="w-full">{t('centers.viewCenter', { center: center.name })}</Button>
            </Link>
          </Card>
        ))}
      </div>
    </Container>
  )
}
