'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Menu, X } from 'lucide-react'
import { Link } from '@/i18n/navigation'

// Durée de la transition CSS (ms) — doit correspondre à `duration-200`
// ci-dessous, sert à retarder le démontage pour laisser l'animation de
// sortie se jouer.
const TRANSITION_MS = 200

/**
 * Remplace une ancienne version framer-motion (AnimatePresence + motion.div)
 * par des transitions CSS pures — même rendu visuel (fondu + slide décalé
 * des liens), mais sans tirer framer-motion dans le bundle partagé par
 * TOUTES les pages : ce menu vit dans la Navbar, présente partout, donc la
 * librairie se retrouvait chargée même par les visiteurs desktop qui ne
 * l'ouvrent jamais. Voir audit performance du 2026-08-28.
 */
type NavLink = { href: string; label: string }
type NavGroup = { label: string; children: NavLink[] }

export function MobileMenu({
  leadingLink,
  groups,
  trailingLink,
}: {
  leadingLink: NavLink
  groups: NavGroup[]
  trailingLink: NavLink
}) {
  const [open, setOpen] = useState(false)
  const [rendered, setRendered] = useState(false)
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (open) {
      setRendered(true)
      return
    }
    if (!rendered) return
    const timeout = window.setTimeout(() => setRendered(false), TRANSITION_MS)
    return () => window.clearTimeout(timeout)
  }, [open, rendered])

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(true)}
        aria-label="Ouvrir le menu"
        className="border-[3px] border-ink bg-cream p-1.5 text-ink"
      >
        <Menu size={20} />
      </button>

      {/* Portail vers <body> : évite que l'overlay plein écran hérite d'un
          containing block d'un ancêtre positionné (header). */}
      {mounted &&
        rendered &&
        createPortal(
          <MenuOverlay leadingLink={leadingLink} groups={groups} trailingLink={trailingLink} open={open} onClose={() => setOpen(false)} />,
          document.body,
        )}
    </div>
  )
}

function MenuOverlay({
  leadingLink,
  groups,
  trailingLink,
  open,
  onClose,
}: {
  leadingLink: NavLink
  groups: NavGroup[]
  trailingLink: NavLink
  open: boolean
  onClose: () => void
}) {
  // Aplatit lien d'accueil + groupes + lien de fin en une seule liste
  // animée (entête de groupe non cliquable + ses liens) — même effet de
  // cascade au défilé que l'ancienne liste plate.
  let i = 0

  function PlainLink({ link }: { link: NavLink }) {
    return (
      <div
        className={`transition-all duration-200 ease-out ${open ? 'translate-x-0 opacity-100' : '-translate-x-3 opacity-0'}`}
        style={{ transitionDelay: open ? `${50 * i++}ms` : '0ms' }}
      >
        <Link href={link.href} onClick={onClose} className="block border-b-2 border-cream/10 py-4 font-display text-lg text-cream">
          {link.label}
        </Link>
      </div>
    )
  }

  return (
    <div
      className={`fixed inset-0 z-50 overflow-y-auto bg-ink transition-opacity duration-200 ease-out ${open ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="flex items-center justify-between border-b-[3px] border-cream/20 px-5 py-4">
        <span className="font-display text-lg text-cream">
          Permis<span className="text-brick">Hub</span>
        </span>
        <button
          onClick={onClose}
          aria-label="Fermer le menu"
          className="border-[3px] border-cream bg-ink p-1.5 text-cream"
        >
          <X size={20} />
        </button>
      </div>
      <nav className="flex flex-col gap-1 px-5 py-4">
        <PlainLink link={leadingLink} />
        {groups.map((group) => (
          <div key={group.label} className="mb-2">
            <p
              className={`pt-3 font-display text-xs uppercase tracking-wide text-cream/50 transition-all duration-200 ease-out ${open ? 'translate-x-0 opacity-100' : '-translate-x-3 opacity-0'}`}
              style={{ transitionDelay: open ? `${50 * i++}ms` : '0ms' }}
            >
              {group.label}
            </p>
            {group.children.map((link) => (
              <div
                key={link.href}
                className={`transition-all duration-200 ease-out ${open ? 'translate-x-0 opacity-100' : '-translate-x-3 opacity-0'}`}
                style={{ transitionDelay: open ? `${50 * i++}ms` : '0ms' }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block border-b-2 border-cream/10 py-4 font-display text-lg text-cream"
                >
                  {link.label}
                </Link>
              </div>
            ))}
          </div>
        ))}
        <PlainLink link={trailingLink} />
      </nav>
    </div>
  )
}
