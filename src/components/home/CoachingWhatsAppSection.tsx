import { getTranslations } from 'next-intl/server'
import { Container } from '@/components/ui/Container'

/** Numéro WhatsApp pro du client (fourni le 2026-08-31), format international sans le "+" pour le lien wa.me. */
const WHATSAPP_NUMBER = '32456374648'

/**
 * Bandeau coaching individuel, remplace l'ancien CTA "Prêt à tester ton
 * niveau ?" (voir conversation du 2026-08-31). Pas de paiement en ligne :
 * la réservation se fait directement par message WhatsApp, prix annoncé
 * (50€) géré hors-site entre le client et le formateur — cohérent avec la
 * demande ("réserve une séance via WhatsApp").
 */
export async function CoachingWhatsAppSection() {
  const t = await getTranslations('coaching')
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t('waMessage'))}`

  return (
    <Container id="coaching" className="scroll-mt-6 pb-16">
      <div className="panel flex flex-col items-center gap-4 bg-forest p-6 text-center text-cream sm:p-10">
        <span className="w-fit -rotate-2 border-[3px] border-ink bg-yellow px-3.5 py-1.5 font-display text-xs text-ink sm:text-sm">
          {t('eyebrow')}
        </span>
        <h2 className="max-w-xl font-display text-2xl tracking-tight sm:text-3xl">{t('title')}</h2>
        <p className="max-w-xl text-sm text-cream/80 sm:text-base">{t('body')}</p>
        <p className="font-display text-xl sm:text-2xl">{t('priceLabel')}</p>

        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-comic inline-flex items-center gap-2 px-7 py-4 text-base sm:text-lg"
        >
          <WhatsAppIcon />
          {t('cta')} →
        </a>
      </div>
    </Container>
  )
}

/** Glyphe WhatsApp minimal, même esprit "ligne claire" que les autres icônes du site — pas d'icône lucide-react équivalente (icônes génériques, pas de marques). */
function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.2h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.8 14.09c-.24.68-1.4 1.3-1.94 1.38-.5.08-1.12.11-1.8-.11a16.3 16.3 0 0 1-1.65-.61c-2.9-1.25-4.8-4.17-4.94-4.36-.15-.2-1.18-1.57-1.18-3 0-1.42.75-2.12 1.01-2.41.27-.29.58-.36.78-.36.2 0 .39 0 .56.01.18.01.42-.07.66.5.24.58.83 2 .9 2.14.07.15.12.32.02.52-.1.2-.15.32-.29.49-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.76 1.26 1.64 2.04 1.13 1.01 2.08 1.32 2.37 1.47.29.15.46.13.63-.08.17-.2.72-.84.92-1.13.2-.29.39-.24.66-.14.27.1 1.7.8 1.99.94.29.15.49.22.56.34.07.13.07.75-.17 1.43Z" />
    </svg>
  )
}
