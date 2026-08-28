import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import { Container } from '../ui/Container'
import { Icon } from '../ui/Icon'
import { LanguageSwitch } from './LanguageSwitch'
import { RegionPill } from './RegionPill'

const NAV_ITEMS = [
  { to: '/apprendre', key: 'learn' as const },
  { to: '/questions', key: 'practice' as const },
  { to: '/examens', key: 'exam' as const },
  { to: '/circuits', key: 'circuits' as const },
  { to: '/progression', key: 'progress' as const },
]

export function NavBar() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-ink-100 bg-ivory-50/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2 font-display text-lg font-semibold text-ink-950" onClick={() => setOpen(false)}>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-800 text-sm font-bold text-ivory-50">P</span>
          {t('common.brand')}
        </NavLink>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                clsx(
                  'rounded-full px-3.5 py-2 text-sm font-medium transition-colors',
                  isActive ? 'bg-brand-100 text-brand-800' : 'text-ink-700 hover:bg-ivory-200',
                )
              }
            >
              {t(`nav.${item.key}`)}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <RegionPill />
          <LanguageSwitch />
          <NavLink
            to="/compte"
            className="rounded-full border border-ink-100 px-3.5 py-2 text-sm font-medium text-ink-700 hover:border-brand-300"
          >
            {t('nav.account')}
          </NavLink>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full text-ink-800 md:hidden"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <Icon name={open ? 'X' : 'Menu'} size={22} />
        </button>
      </Container>

      {open && (
        <div className="border-t border-ink-100 bg-ivory-50 md:hidden">
          <Container className="flex flex-col gap-1 py-3">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  clsx('rounded-lg px-3 py-2.5 text-sm font-medium', isActive ? 'bg-brand-100 text-brand-800' : 'text-ink-700')
                }
              >
                {t(`nav.${item.key}`)}
              </NavLink>
            ))}
            <NavLink to="/compte" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-700">
              {t('nav.account')}
            </NavLink>
            <div className="mt-2 flex items-center gap-3 border-t border-ink-100 px-3 pt-3">
              <RegionPill />
              <LanguageSwitch />
            </div>
          </Container>
        </div>
      )}
    </header>
  )
}
