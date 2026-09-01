import type { Metadata } from 'next'
import Script from 'next/script'
import { Archivo_Black, Inter, Kalam } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { LOCALES, type AppLocale } from '@/i18n/request'
import '../globals.css'

// Direction artistique v2 "ligne claire" — voir reference-design-hero.html
// et docs/DESIGN_SYSTEM.md. Ne pas substituer ces familles.
const archivoBlack = Archivo_Black({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-archivo-black',
  display: 'swap',
})

const kalam = Kalam({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-kalam',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
})

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://permishub.be'

/**
 * generateMetadata (pas un objet statique) pour pouvoir poser le canonical
 * et les alternates hreflang par locale — absents avant l'audit SEO du
 * 2026-08-22, alors que le brief d'origine les demandait explicitement
 * (chaque route existe en /fr/ et /nl/, il faut le dire à Google).
 */
export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: 'PermisHub — Tout pour réussir ton permis',
      template: '%s — PermisHub',
    },
    description:
      "PermisHub évalue ton niveau en 2 minutes et construit ton parcours pour l'examen théorique belge : cours, questions et examens blancs, en français et néerlandais.",
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `/${l}`])),
    },
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

  // JSON-LD Organization uniquement — pas de Review/AggregateRating : voir
  // le rapport d'audit SEO du 2026-08-22 pour l'explication (risque
  // d'action manuelle Google sur des avis maison non vérifiables par une
  // plateforme tierce).
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'PermisHub',
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    description:
      "PermisHub évalue ton niveau en 2 minutes et construit ton parcours pour l'examen théorique belge : cours, questions et examens blancs, en français et néerlandais.",
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
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
