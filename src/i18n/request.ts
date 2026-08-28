import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'

export const LOCALES = ['fr', 'nl'] as const
export type AppLocale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: AppLocale = 'fr'

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale = LOCALES.includes(requested as AppLocale) ? (requested as AppLocale) : DEFAULT_LOCALE
  if (!LOCALES.includes(requested as AppLocale)) notFound()

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  }
})
