import { getTranslations, getLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { Container } from '@/components/ui/Container'
import { LOCALES } from '@/i18n/request'
import { MobileMenu } from './MobileMenu'
import { NavDropdown } from './NavDropdown'

export async function Navbar() {
  const t = await getTranslations('nav')
  const locale = await getLocale()

  // Nav restructurée en 2 groupes le 2026-08-30 (Théorie B / Pratique B —
  // voir conversation) : chaque item vers une vraie page ou une ancre
  // existante, jamais une route qui n'existe pas encore (404 silencieux,
  // mauvais pour le SEO — voir audit SEO 2026-08-22, SETUP.md). Perception
  // des risques n'a pas encore de page dédiée (offre "Bientôt") donc pointe
  // vers la section tarifs où elle est affichée verrouillée.
  const theorieLinks = [
    { href: '/resume', label: t('resume') },
    { href: '/examen-blanc', label: t('examens') },
    { href: '/#coaching', label: t('coaching') },
  ]
  const pratiqueLinks = [
    { href: '/#circuits', label: t('circuits') },
    { href: '/#packs', label: t('perception') },
    { href: '/roadbook', label: t('roadbook') },
  ]

  return (
    <div className="px-4 pt-4 sm:px-6 sm:pt-6">
      <Container className="!px-0">
        <header className="panel flex items-center justify-between !p-3.5 sm:!p-4">
          <Link href="/" className="font-display text-lg tracking-tight text-ink sm:text-xl">
            Permis<span className="text-brick">Hub</span>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-medium text-ink md:flex">
            <Link href="/" className="hover:text-brick">
              {t('home')}
            </Link>
            <NavDropdown label={t('theorieB')} links={theorieLinks} />
            <NavDropdown label={t('pratiqueB')} links={pratiqueLinks} />
            <Link href="/blog" className="hover:text-brick">
              {t('blog')}
            </Link>
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
            <MobileMenu
              leadingLink={{ href: '/', label: t('home') }}
              groups={[
                { label: t('theorieB'), children: theorieLinks },
                { label: t('pratiqueB'), children: pratiqueLinks },
              ]}
              trailingLink={{ href: '/blog', label: t('blog') }}
            />
          </div>
        </header>
      </Container>
    </div>
  )
}
