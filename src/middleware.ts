import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { LOCALES, DEFAULT_LOCALE } from '@/i18n/request'
import { isFreeLearningPath } from '@/lib/learning-subscription'
import { LEARNING_ACCESS_COOKIE, verifyLearningAccess } from '@/lib/learning-access-token'

const handleI18n = createMiddleware({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: 'always', // chaque route existe en /fr/... et /nl/..., voir brief SEO
})

export default async function middleware(request: NextRequest) {
  // Les anciennes leçons, séquences de démonstration et interfaces internes
  // restent dans le dépôt, mais ne sont plus servies tant que l'offre est verrouillée.
  const riskChild = request.nextUrl.pathname.match(/^\/(fr|nl)\/perception-risques\/.+/)
  if (process.env.NODE_ENV === 'production' && riskChild) {
    return NextResponse.redirect(new URL(`/${riskChild[1]}/perception-risques`, request.url))
  }

  const learningChild = request.nextUrl.pathname.match(/^\/(fr|nl)\/apprendre\/.+/)
  // Local QA: allow the owner to inspect every lesson without creating a
  // Stripe subscription. Production access control remains unchanged.
  if (process.env.NODE_ENV === 'production' && learningChild && !isFreeLearningPath(request.nextUrl.pathname)) {
    const token = request.cookies.get(LEARNING_ACCESS_COOKIE)?.value
    if (!(await verifyLearningAccess(token))) {
      if (await verifyLearningAccess(token, true)) {
        const refresh = new URL('/api/access/learning/refresh', request.url)
        refresh.searchParams.set('locale', learningChild[1])
        refresh.searchParams.set('returnTo', `${request.nextUrl.pathname}${request.nextUrl.search}`)
        return NextResponse.redirect(refresh)
      }
      return NextResponse.redirect(new URL(`/${learningChild[1]}/apprendre?abonnement=requis`, request.url))
    }
  }
  return handleI18n(request)
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
