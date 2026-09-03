import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Navbar } from '@/components/site/Navbar'
import { Footer } from '@/components/site/Footer'
import { Container } from '@/components/ui/Container'
import { RestoreAccessConfirmation } from '@/components/auth/RestoreAccessConfirmation'
import type { AppLocale } from '@/i18n/request'

export async function generateMetadata({ params: { locale } }: { params: { locale: AppLocale } }): Promise<Metadata> {
  return {
    title: 'Accès restauré',
    robots: { index: false, follow: false },
    alternates: { canonical: `/${locale}/restaurer-acces/confirmation` },
  }
}

// Destination du lien magique (voir restaurer-acces/page.tsx) — la session
// NextAuth est déjà posée (cookie) à l'arrivée ici, RestoreAccessConfirmation
// relit les achats réels en base et repose les flags localStorage.
export default async function RestaurerAccesConfirmationPage({ params: { locale } }: { params: { locale: AppLocale } }) {
  setRequestLocale(locale)

  return (
    <>
      <Navbar />
      <main className="px-4 py-16 sm:px-6">
        <Container className="max-w-md">
          <RestoreAccessConfirmation />
        </Container>
      </main>
      <Footer />
    </>
  )
}
