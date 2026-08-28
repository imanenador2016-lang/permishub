import { getTranslations, getLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { Container } from '@/components/ui/Container'
import { LOCALES } from '@/i18n/request'
import { MobileMenu } from './MobileMenu'

export async function Navbar() {
  const t = await getTranslations('nav')
  const locale = await getLocale()

  // /examen-blanc existe désormais comme vraie page (voir 2026-08-26) — lien
  // direct plutôt qu'une ancre. /cours et /pricing restent des ancres tant
  // qu'ils n'existent pas comme pages dédiées : un lien vers une route
  // inexistante est un 404 silencieux, mauvais pour le SEO (budget de
  // crawl gaspillé) et pour l'utilisateur (voir audit SEO 2026-08-22,
  // SETUP.md).
  const links = [
    { href: '/examen-blanc', label: t('examens') },
    { href: '/#circuits', label: t('circuits') },
    { href: '/#packs', label: t('pricing') },
  ]

  return (
    <div className="px-4 pt-4 sm:px-6 sm:pt-6">
      <Container className="!px-0">
        <header className="panel flex items-center justify-between !p-3.5 sm:!p-4">
          <Link href="/" className="font-display text-lg tracking-tight text-ink sm:text-xl">
            Permis<span className="text-brick">Hub</span>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-medium text-ink md:flex">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-brick">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden overflow-hidden rounded-full border-[3px] border-ink text-xs font-bold sm:flex">
              {LOCALES.map((l) => (
                <Link
                  key={l}
                  href="/"
                  locale={l}
                  className={`rounded-full px-2.5 py-1 uppercase transition-colors ${
                    l === locale ? 'bg-ink text-cream' : 'text-ink hover:bg-creamdim'
                  }`}
                >
                  {l}
                </Link>
              ))}
            </div>
            <MobileMenu links={links} />
          </div>
        </header>
      </Container>
    </div>
  )
}
