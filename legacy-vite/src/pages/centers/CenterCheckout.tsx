import { Link, Navigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { getCenter } from '@/content/centers/registry'
import { formatPrice } from '@/domain/centers'

/**
 * Page de paiement. Volontairement une interface seule, sans paiement réel
 * — voir src/lib/payment.ts. Il n'y a aucun bouton "payer" qui déclenche un
 * faux succès : tant que Stripe n'est pas branché côté serveur, cette page
 * explique honnêtement l'état d'avancement plutôt que de simuler un achat.
 */
export function CenterCheckout() {
  const { centerSlug } = useParams<{ centerSlug: string }>()
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'nl' ? 'nl' : 'fr'

  const center = centerSlug ? getCenter(centerSlug) : undefined
  if (!center || !centerSlug) return <Navigate to="/circuits" replace />

  return (
    <Container className="max-w-md py-14">
      <Link to={`/circuits/${centerSlug}`} className="inline-flex items-center gap-1 text-sm font-medium text-brand-700 hover:underline">
        <Icon name="ArrowLeft" size={14} /> {t('centers.checkoutBack')}
      </Link>

      <h1 className="mt-4 font-display text-2xl font-semibold text-ink-950">
        {t('centers.checkoutTitle', { center: center.name })}
      </h1>

      <Card className="mt-6">
        <div className="flex items-center justify-between">
          <p className="font-medium text-ink-800">{t('centers.checkoutSummary', { center: center.name })}</p>
          <p className="font-semibold text-ink-950">{formatPrice(center.priceCents, lang)}</p>
        </div>
      </Card>

      <Card className="mt-4 flex items-start gap-3 bg-ivory-200">
        <Icon name="CreditCard" size={18} className="mt-0.5 shrink-0 text-ink-500" />
        <p className="text-sm leading-relaxed text-ink-700">{t('centers.checkoutNotReady')}</p>
      </Card>

      <Button size="lg" className="mt-6 w-full" disabled>
        <Icon name="Lock" size={16} /> {t('centers.ctaBuy', { price: formatPrice(center.priceCents, lang) })}
      </Button>
    </Container>
  )
}
