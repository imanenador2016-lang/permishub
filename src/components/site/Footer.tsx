import { getLocale, getTranslations } from 'next-intl/server'
import { Container } from '@/components/ui/Container'
import { Link } from '@/i18n/navigation'

export async function Footer() {
  const t = await getTranslations('common')
  const locale = await getLocale()
  return (
    <footer className="border-t-[3px] border-ink bg-ink py-10 text-cream/70 sm:border-t-4">
      <Container className="flex flex-col items-start justify-between gap-4 text-sm sm:flex-row sm:items-center">
        <p className="font-display text-cream">
          {t('brand')} <span className="font-body font-normal text-cream/50">— {t('tagline')}</span>
        </p>
        <p>&copy; {new Date().getFullYear()} PermisHub — Belgique</p>
        {locale === 'fr' && <Link href="/faq" className="inline-flex min-h-11 items-center text-cream underline decoration-1 underline-offset-4 hover:text-yellow focus-visible:outline focus-visible:outline-2 focus-visible:outline-yellow">FAQ</Link>}
      </Container>
    </footer>
  )
}
