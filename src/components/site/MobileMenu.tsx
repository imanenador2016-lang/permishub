'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { BookOpen, ChevronRight, CircleHelp, FileText, GraduationCap, House, MapPin, Newspaper, ShieldAlert, UserRound, X, Menu, type LucideIcon } from 'lucide-react'
import { Link, usePathname } from '@/i18n/navigation'
import type { AppLocale } from '@/i18n/request'

type NavIcon = 'home' | 'learn' | 'summary' | 'exams' | 'coaching' | 'circuits' | 'risks' | 'blog' | 'help'
type NavLink = { href: string; label: string; icon: NavIcon }
type NavGroup = { label: string; children: NavLink[] }
type MenuLabels = {
  open: string
  close: string
  navigation: string
  account: string
  signIn: string
}

const EXIT_DELAY = 220
const LANGUAGES = ['fr', 'nl'] as const
const NAV_ICONS: Record<NavIcon, LucideIcon> = {
  home: House,
  learn: BookOpen,
  summary: FileText,
  exams: GraduationCap,
  coaching: GraduationCap,
  circuits: MapPin,
  risks: ShieldAlert,
  blog: Newspaper,
  help: CircleHelp,
}

export function MobileMenu({
  groups,
  locale,
  labels,
}: {
  groups: NavGroup[]
  locale: AppLocale
  labels: MenuLabels
}) {
  const [open, setOpen] = useState(false)
  const [rendered, setRendered] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [accountEmail, setAccountEmail] = useState<string | null>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const drawerRef = useRef<HTMLElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const drawerId = useId()
  const pathname = usePathname()

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (open) {
      setRendered(true)
      return
    }
    if (!rendered) return
    const timeout = window.setTimeout(() => setRendered(false), EXIT_DELAY)
    return () => window.clearTimeout(timeout)
  }, [open, rendered])

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const trigger = triggerRef.current
    document.body.style.overflow = 'hidden'
    requestAnimationFrame(() => closeRef.current?.focus())

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        setOpen(false)
        return
      }
      if (event.key !== 'Tab' || !drawerRef.current) return

      const focusable = drawerRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
      const first = focusable.item(0)
      const last = focusable.item(focusable.length - 1)
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
      if (previousFocus?.isConnected) requestAnimationFrame(() => trigger?.focus())
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const controller = new AbortController()
    fetch('/api/auth/session', { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((session: { user?: { email?: string | null } } | null) => {
        setAccountEmail(typeof session?.user?.email === 'string' ? session.user.email : null)
      })
      .catch(() => {
        if (!controller.signal.aborted) setAccountEmail(null)
      })
    return () => controller.abort()
  }, [open])

  function close() {
    setOpen(false)
  }

  function isActive(href: string) {
    const target = href.split('#')[0] || '/'
    return pathname === target || (target !== '/' && pathname.startsWith(`${target}/`))
  }

  return (
    <div className="md:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-label={labels.open}
        aria-expanded={open}
        aria-controls={drawerId}
        onClick={() => setOpen(true)}
        className="flex min-h-11 min-w-11 items-center justify-center border-[3px] border-ink bg-cream text-ink transition-colors hover:bg-creamdim focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-forest"
      >
        <Menu size={21} aria-hidden="true" />
      </button>

      {mounted && rendered && createPortal(
        <div className="fixed inset-0 z-[100]">
          <button
            type="button"
            tabIndex={-1}
            aria-label={labels.close}
            onClick={close}
            className={`absolute inset-0 h-full w-full bg-ink/45 transition-opacity duration-200 ${open ? 'opacity-100' : 'opacity-0'}`}
          />
          <aside
            ref={drawerRef}
            id={drawerId}
            role="dialog"
            aria-modal="true"
            aria-label={labels.navigation}
            aria-hidden={!open}
            inert={!open}
            className={`absolute inset-y-0 right-0 flex h-[100dvh] w-[87vw] max-w-[400px] min-w-[280px] flex-col border-l-[3px] border-ink bg-cream text-ink shadow-[-10px_0_32px_rgba(31,26,20,0.2)] transition-transform duration-200 ease-out motion-reduce:transition-none ${open ? 'translate-x-0' : 'translate-x-full'}`}
          >
            <header className="flex shrink-0 items-center justify-between border-b-2 border-ink/10 px-5 pb-3 pt-[max(env(safe-area-inset-top),0.75rem)]">
              <Link href="/" onClick={close} className="font-display text-xl tracking-tight text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-forest">
                Permis<span className="text-brick">Hub</span>
              </Link>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label={labels.close}
                className="flex min-h-11 min-w-11 items-center justify-center border-2 border-ink bg-cream text-ink transition-colors hover:bg-yellow focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-forest"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </header>

            <nav aria-label={labels.navigation} className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-4 pt-3">
              {groups.map((group) => (
                <section key={group.label} className="mb-3 last:mb-0">
                  <h2 className="mb-1 px-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-forest/80">{group.label}</h2>
                  <ul>
                    {group.children.map(({ href, label, icon }) => {
                      const active = isActive(href)
                      const Icon = NAV_ICONS[icon]
                      return (
                        <li key={href}>
                          <Link
                            href={href}
                            onClick={close}
                            aria-current={active ? 'page' : undefined}
                            className={`group flex min-h-11 items-center gap-3 rounded-sm px-2.5 py-2 text-[15px] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-forest ${active ? 'bg-yellow/35 text-ink' : 'hover:bg-creamdim'}`}
                          >
                            <Icon size={18} strokeWidth={1.8} aria-hidden="true" className={active ? 'text-brick' : 'text-forest'} />
                            <span className="flex-1">{label}</span>
                            <ChevronRight size={16} aria-hidden="true" className="text-ink/35 transition-transform group-hover:translate-x-0.5" />
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </section>
              ))}
            </nav>

            <footer className="shrink-0 border-t-2 border-ink/10 bg-cream px-5 pb-[max(env(safe-area-inset-bottom),1rem)] pt-3">
              <Link
                href="/restaurer-acces"
                onClick={close}
                className="flex min-h-12 items-center gap-3 border-[3px] border-ink bg-yellow px-3.5 py-2.5 font-display text-sm shadow-hard-xs transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-forest"
              >
                <UserRound size={18} aria-hidden="true" />
                <span className="min-w-0 flex-1 truncate">{accountEmail ? labels.account : labels.signIn}</span>
                <ChevronRight size={17} aria-hidden="true" />
              </Link>
              {accountEmail && <p className="mt-1 truncate px-1 text-xs text-ink/60">{accountEmail}</p>}

              <div className="mt-3 flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-ink/50">{locale === 'fr' ? 'Langue' : 'Taal'}</span>
                <div aria-label={locale === 'fr' ? 'Choisir la langue' : 'Kies een taal'} className="flex rounded-full border-2 border-ink p-0.5">
                  {LANGUAGES.map((nextLocale) => (
                    <Link
                      key={nextLocale}
                      href="/"
                      locale={nextLocale}
                      onClick={close}
                      aria-current={nextLocale === locale ? 'true' : undefined}
                      className={`min-w-11 rounded-full px-3 py-1 text-center text-xs font-extrabold uppercase transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-forest ${nextLocale === locale ? 'bg-ink text-cream' : 'text-ink hover:bg-creamdim'}`}
                    >
                      {nextLocale}
                    </Link>
                  ))}
                </div>
              </div>
            </footer>
          </aside>
        </div>,
        document.body,
      )}
    </div>
  )
}
