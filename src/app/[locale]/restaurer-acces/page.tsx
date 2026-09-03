import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Navbar } from '@/components/site/Navbar'
import { Footer } from '@/components/site/Footer'
import { Container } from '@/components/ui/Container'
import { RestoreAccessForm } from '@/components/auth/RestoreAccessForm'
import type { AppLocale } from '@/i18n/request'

// Jamais indexable — page utilitaire, pas de contenu à référencer (même
// raisonnement que packs/succes, circuits/succes).
export async function generateMetadata({ params: { locale } }: { params: { locale: AppLocale } }): Promise<Metadata> {
  return {
    title: 'Restaurer mon accès',
    robots: { index: false, follow: false },
    alternates: { canonical: `/${locale}/restaurer-acces` },
  }
}

/**
 * "Tu as déjà payé sur un autre appareil ?" (voir conversation du
 * 2026-09-03) — l'accès aux examens/circuits achetés est posé en
 * localStorage au moment du paiement (voir ExamAccessGate.tsx), donc
 * propre à CE navigateur. Cette page permet de le retrouver ailleurs via
 * un lien magique envoyé par email (NextAuth, src/lib/auth.ts) : une fois
 * connecté, /restaurer-acces/confirmation relit les achats réels en base
 * (api/mon-acces) et repose les mêmes flags localStorage sur ce nouvel
 * appareil.
 */
export default async function RestaurerAccesPage({ params: { locale } }: { params: { locale: AppLocale } }) {
  setRequestLocale(locale)

  return (
    <>
      <Navbar />
      <main className="px-4 py-16 sm:px-6">
        <Container className="max-w-md">
          <RestoreAccessForm locale={locale} />
        </Container>
      </main>
      <Footer />
    </>
  )
}
