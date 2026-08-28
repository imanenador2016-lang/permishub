import { useTranslation } from 'react-i18next'
import { Container } from '../ui/Container'

export function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="mt-24 border-t border-ink-100 bg-ink-950 py-12 text-ivory-200">
      <Container className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-lg font-semibold text-ivory-50">{t('common.brand')}</p>
          <p className="mt-1 text-sm text-ink-300">{t('common.tagline')}</p>
        </div>
        <p className="text-xs text-ink-500">© {new Date().getFullYear()} PermisHub. permishub.be</p>
      </Container>
    </footer>
  )
}
