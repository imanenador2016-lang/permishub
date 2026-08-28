import createMiddleware from 'next-intl/middleware'
import { LOCALES, DEFAULT_LOCALE } from '@/i18n/request'

export default createMiddleware({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: 'always', // chaque route existe en /fr/... et /nl/..., voir brief SEO
})

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
