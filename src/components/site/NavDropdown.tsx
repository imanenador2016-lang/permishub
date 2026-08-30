'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Link } from '@/i18n/navigation'

/**
 * Menu déroulant desktop de la Navbar (ex. "Théorie B" → Résumé, Examens
 * blancs) — voir Navbar.tsx. Ouverture au clic (pas juste au survol, plus
 * fiable au clavier/tactile), fermeture au clic extérieur ou Échap.
 */
export function NavDropdown({ label, links }: { label: string; links: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onClickOutside)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen((v) => !v)} aria-expanded={open} className="flex items-center gap-1 hover:text-brick">
        {label}
        <ChevronDown size={14} className={`transition-transform duration-150 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="panel !shadow-hard-xs absolute left-0 top-[calc(100%+10px)] z-20 min-w-[200px] overflow-hidden !p-0">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block border-b-2 border-ink/10 bg-cream px-4 py-2.5 text-sm font-medium last:border-b-0 hover:bg-creamdim hover:text-brick"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
