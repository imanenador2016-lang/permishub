import { Link, Navigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { getCenter, getCenters, getCircuitsByCenter } from '@/content/centers/registry'
import { formatPrice } from '@/domain/centers'
import { usePurchasesStore } from '@/state/purchases-store'

const HIGHLIGHT_ICONS = ['Route', 'Smartphone', 'MapPin', 'Target', 'GraduationCap'] as const
const HIGHLIGHT_KEYS = ['multiple', 'mobile', 'maps', 'aroundCenter', 'before'] as const

export function CenterDetail() {
  const { centerSlug } = useParams<{ centerSlug: string }>()
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'nl' ? 'nl' : 'fr'
  const hasPurchased = usePurchasesStore((s) => s.hasPurchased)

  const center = centerSlug ? getCenter(centerSlug) : undefined
  if (!center || !centerSlug) return <Navigate to="/circuits" replace />

  const circuits = getCircuitsByCenter(centerSlug)
  const unlocked = hasPurchased(centerSlug)
  const price = formatPrice(center.priceCents, lang)
  const otherCenters = getCenters().filter((c) => c.slug !== centerSlug)

  return (
    <Container className="max-w-3xl py-14">
      <Link to="/circuits" className="inline-flex items-center gap-1 text-sm font-medium text-brand-700 hover:underline">
        <Icon name="ArrowLeft" size={14} /> {t('centers.indexTitle')}
      </Link>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-semibold text-ink-950">
            {t('centers.detailTitle', { center: center.name })}
          </h1>
          <p className="mt-3 max-w-xl leading-relaxed text-ink-700">{t('centers.detailSubtitle')}</p>
        </div>
        {unlocked && <Badge tone="success">{t('centers.unlockedBadge')}</Badge>}
      </div>

      <Card className="mt-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-ink-500">{t('centers.highlightsTitle')}</p>
        <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
          {HIGHLIGHT_KEYS.map((key, i) => (
            <li key={key} className="flex items-center gap-2 text-sm text-ink-700">
              <Icon name={HIGHLIGHT_ICONS[i]} size={16} className="shrink-0 text-brand-600" />
              {t(`centers.highlights.${key}`)}
            </li>
          ))}
        </ul>
      </Card>

      <div className="mt-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-ink-500">{t('centers.circuitsListTitle')}</p>
        <div className="mt-3 flex flex-col gap-3">
          {circuits.map((circuit) => (
            <Card key={circuit.id} className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center sm:gap-4">
              <div className={!unlocked ? 'select-none blur-[2px]' : undefined}>
                <p className="font-semibold text-ink-950">{circuit.title[lang]}</p>
                <p className="mt-1 text-sm text-ink-600">{unlocked ? circuit.description[lang] : circuit.description[lang].slice(0, 40) + '…'}</p>
              </div>
              {!unlocked && (
                <span className="flex shrink-0 items-center gap-1 rounded-full bg-ivory-200 px-3 py-1.5 text-xs font-semibold text-ink-500">
                  <Icon name="Lock" size={12} /> {t('centers.lockedNote')}
                </span>
              )}
            </Card>
          ))}
        </div>
      </div>

      {!unlocked ? (
        <div className="mt-8">
          <Link to={`/circuits/${centerSlug}/paiement`}>
            <Button size="lg" className="w-full">
              <Icon name="CreditCard" size={18} /> {t('centers.ctaBuy', { price })}
            </Button>
          </Link>
          <p className="mt-2 text-center text-sm text-ink-500">{t('centers.accessNote', { center: center.name })}</p>
        </div>
      ) : (
        otherCenters.length > 0 && (
          <div className="mt-10">
            <p className="text-sm font-semibold uppercase tracking-wide text-ink-500">{t('centers.otherCentersTitle')}</p>
            <div className="mt-3 flex flex-col gap-3">
              {otherCenters.map((other) => (
                <Card key={other.slug} className="flex items-center justify-between gap-4">
                  <p className="font-semibold text-ink-950">{other.name}</p>
                  <Link to={`/circuits/${other.slug}`}>
                    <Button variant="secondary">
                      {t('centers.ctaBuyOther', { center: other.name, price: formatPrice(other.priceCents, lang) })}
                    </Button>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        )
      )}
    </Container>
  )
}
