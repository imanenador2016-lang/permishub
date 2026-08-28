import { getTranslations } from 'next-intl/server'
import { Container } from '@/components/ui/Container'

export async function Footer() {
  const t = await getTranslations('common')
  return (
    <footer className="border-t-[3px] border-ink bg-ink py-10 text-cream/70 sm:border-t-4">
      <Container className="flex flex-col items-start justify-between gap-4 text-sm sm:flex-row sm:items-center">
        <p className="font-display text-cream">
          {t('brand')} <span className="font-body font-normal text-cream/50">— {t('tagline')}</span>
        </p>
        <p>&copy; {new Date().getFullYear()} PermisHub — Belgique</p>
      </Container>
    </footer>
  )
}
