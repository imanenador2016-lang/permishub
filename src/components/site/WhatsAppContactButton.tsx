'use client'

import type { AppLocale } from '@/i18n/request'
import { usePathname } from 'next/navigation'

const WHATSAPP_NUMBER = '32451027232'

export function WhatsAppContactButton({ locale }: { locale: AppLocale }) {
  const pathname = usePathname()
  const isTrainingInterface = pathname?.includes('/apprendre') || pathname?.includes('/examen-blanc')
  if (isTrainingInterface) return null

  const message = locale === 'fr'
    ? 'Bonjour PermisHub, j’ai une question.'
    : 'Hallo PermisHub, ik heb een vraag.'
  const label = locale === 'fr' ? 'Contacter PermisHub sur WhatsApp' : 'Contacteer PermisHub via WhatsApp'

  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-40 inline-flex min-h-14 min-w-14 items-center justify-center gap-2 rounded-full border-[3px] border-ink bg-forest px-3 text-cream shadow-hard-xs transition-transform hover:-translate-y-0.5 hover:shadow-hard-sm focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-forest sm:min-h-12 sm:min-w-0 sm:px-5"
    >
      <svg viewBox="0 0 24 24" className="size-6 shrink-0" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.2h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.8 14.09c-.24.68-1.4 1.3-1.94 1.38-.5.08-1.12.11-1.8-.11a16.3 16.3 0 0 1-1.65-.61c-2.9-1.25-4.8-4.17-4.94-4.36-.15-.2-1.18-1.57-1.18-3 0-1.42.75-2.12 1.01-2.41.27-.29.58-.36.78-.36.2 0 .39 0 .56.01.18.01.42-.07.66.5.24.58.83 2 .9 2.14.07.15.12.32.02.52-.1.2-.15.32-.29.49-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.76 1.26 1.64 2.04 1.13 1.01 2.08 1.32 2.37 1.47.29.15.46.13.63-.08.17-.2.72-.84.92-1.13.2-.29.39-.24.66-.14.27.1 1.7.8 1.99.94.29.15.49.22.56.34.07.13.07.75-.17 1.43Z" />
      </svg>
      <span className="hidden font-display text-sm sm:inline">WhatsApp</span>
    </a>
  )
}
