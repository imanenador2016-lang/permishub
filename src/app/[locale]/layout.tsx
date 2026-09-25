import type { Metadata } from 'next'
import Script from 'next/script'
import localFont from 'next/font/local'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { LOCALES, type AppLocale } from '@/i18n/request'
import { SITE_URL } from '@/lib/seo'
import '../globals.css'

// Direction artistique v2 "ligne claire" — voir reference-design-hero.html
// et docs/DESIGN_SYSTEM.md. Ne pas substituer ces familles.
const archivoBlack = localFont({
  src: '../../../public/fonts/archivo-black.ttf',
  weight: '400',
  variable: '--font-archivo-black',
  display: 'swap',
  preload: false,
})

const kalam = localFont({
  src: [
    { path: '../../../public/fonts/kalam-400.ttf', weight: '400' },
    { path: '../../../public/fonts/kalam-700.ttf', weight: '700' },
  ],
  variable: '--font-kalam',
  display: 'swap',
  preload: false,
})

const inter = localFont({
  src: [
    { path: '../../../public/fonts/inter-400.ttf', weight: '400' },
    { path: '../../../public/fonts/inter-500.ttf', weight: '500' },
    { path: '../../../public/fonts/inter-600.ttf', weight: '600' },
    { path: '../../../public/fonts/inter-700.ttf', weight: '700' },
    { path: '../../../public/fonts/inter-800.ttf', weight: '800' },
  ],
  variable: '--font-inter',
  display: 'swap',
  preload: false,
})

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

/**
 * Les métadonnées globales fournissent des valeurs de repli uniquement.
 * Un canonical placé dans ce layout serait hérité par les pages enfants
 * sans metadata et les ferait toutes pointer vers l'accueil.
 */
export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const isFrench = locale === 'fr'
  const title = isFrench ? 'PermisHub — Tout pour réussir ton permis' : 'PermisHub — Alles om te slagen voor je rijbewijs'
  const description = isFrench
    ? 'Prépare le permis B en Belgique avec des leçons, des questions d’entraînement, des examens blancs et des circuits d’examen.'
    : 'Bereid je voor op het rijbewijs B in België met lessen, oefenvragen, proefexamens en examencircuits.'
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: '%s — PermisHub',
    },
    description,
    openGraph: {
      type: 'website',
      siteName: 'PermisHub',
      title,
      description,
      locale: isFrench ? 'fr_BE' : 'nl_BE',
    },
    twitter: { card: 'summary', title, description },
  }
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  if (!LOCALES.includes(locale as AppLocale)) notFound()
  setRequestLocale(locale)
  const messages = await getMessages()

  // Organization + WebSite décrivent uniquement des informations visibles
  // et vérifiables. Aucun avis ni AggregateRating n'est déclaré.
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Organization', '@id': `${SITE_URL}/#organization`, name: 'PermisHub', url: SITE_URL, logo: `${SITE_URL}/favicon.svg` },
      { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, name: 'PermisHub', url: SITE_URL, publisher: { '@id': `${SITE_URL}/#organization` } },
    ],
  }

  // Google Analytics (gtag.js) — piloté par variable d'env plutôt qu'un ID
  // en dur : absente (ex. en dev local si non configurée), les scripts ne
  // sont juste pas rendus, pas de tracking accidentel avec un mauvais ID.
  // `afterInteractive` (voir next/script) : chargé après l'hydratation,
  // jamais bloquant pour le premier rendu — voir SETUP.md.
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  return (
    <html lang={locale} className={`${archivoBlack.variable} ${kalam.variable} ${inter.variable}`}>
      <body className="bg-cream text-ink">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        {gaMeasurementId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`} strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaMeasurementId}');
              `}
            </Script>
          </>
        )}
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  )
}
