import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { LOCALES, DEFAULT_LOCALE } from '@/i18n/request'

const handleI18n = createMiddleware({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: 'always', // chaque route existe en /fr/... et /nl/..., voir brief SEO
})

export default function middleware(request: NextRequest) {
  // Les anciennes leçons, séquences de démonstration et interfaces internes
  // restent dans le dépôt, mais ne sont plus servies tant que l'offre est verrouillée.
  const lockedChild = request.nextUrl.pathname.match(/^\/(fr|nl)\/(apprendre|perception-risques)\/.+/)
  if (lockedChild) {
    return NextResponse.redirect(new URL(`/${lockedChild[1]}/${lockedChild[2]}`, request.url))
  }
  return handleI18n(request)
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
