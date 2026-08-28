import { useTranslation } from 'react-i18next'
import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
import { Icon } from '@/components/ui/Icon'

export function Account() {
  const { t } = useTranslation()
  return (
    <Container className="max-w-xl py-14">
      <h1 className="font-display text-3xl font-semibold text-ink-950">{t('account.title')}</h1>

      <Card className="mt-8">
        <div className="flex items-start gap-3">
          <Icon name="UserRound" className="mt-0.5 shrink-0 text-brand-700" />
          <p className="text-sm text-ink-700">{t('account.body')}</p>
        </div>
      </Card>

      <Card className="mt-4 border-brand-200 bg-brand-50">
        <div className="flex items-start gap-3">
          <Icon name="Sparkles" className="mt-0.5 shrink-0 text-brand-700" />
          <div>
            <p className="text-sm font-semibold text-brand-800">{t('account.premiumTitle')}</p>
            <p className="mt-1 text-sm text-brand-700">{t('account.premiumBody')}</p>
          </div>
        </div>
      </Card>
    </Container>
  )
}
