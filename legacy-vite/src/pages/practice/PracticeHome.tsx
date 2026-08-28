import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { getThemes, isDemoTheme } from '@/content/repository'
import type { IconProps } from '@/components/ui/Icon'

export function PracticeHome() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'nl' ? 'nl' : 'fr'
  const themes = getThemes()

  return (
    <Container className="py-14">
      <h1 className="font-display text-3xl font-semibold text-ink-950">{t('practice.title')}</h1>
      <p className="mt-2 text-ink-500">{t('practice.subtitle')}</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {themes.map((theme) => (
          <Link key={theme.slug} to={`/questions/${theme.slug}`}>
            <Card interactive>
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-brand-800">
                  <Icon name={theme.icon as IconProps['name']} size={20} />
                </div>
                {isDemoTheme(theme.slug) && <Badge tone="warning">{t('common.demoBadge')}</Badge>}
              </div>
              <h3 className="mt-4 text-base font-semibold text-ink-950">{theme.title[lang]}</h3>
              <p className="mt-1.5 text-sm text-ink-500">{theme.description[lang]}</p>
            </Card>
          </Link>
        ))}
      </div>
    </Container>
  )
}
