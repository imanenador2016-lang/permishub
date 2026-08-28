import type { NextAuthOptions } from 'next-auth'
import { getServerSession } from 'next-auth/next'
import { PrismaAdapter } from '@auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'
import { prisma } from './prisma'

/**
 * Auth email + Google, comme demandé dans le brief. Ne fonctionne qu'une
 * fois les variables d'environnement renseignées (voir SETUP.md) :
 * GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET, et EMAIL_SERVER / EMAIL_FROM
 * pour les liens magiques (n'importe quel SMTP, ex. Resend/Postmark).
 */
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER ?? '',
      from: process.env.EMAIL_FROM ?? 'PermisHub <no-reply@permishub.be>',
    }),
  ],
  session: { strategy: 'database' },
  pages: {
    // Le test de niveau ouvre lui-même l'invite d'inscription (SignupPrompt) —
    // pas de page /login séparée nécessaire pour ce flux.
  },
  callbacks: {
    // Stratégie "database" : NextAuth ne copie pas automatiquement l'id
    // Prisma sur session.user — nécessaire pour lier un AchatCircuit à un
    // utilisateur (voir api/checkout/circuit). Type étendu dans next-auth.d.ts.
    session({ session, user }) {
      if (session.user) session.user.id = user.id
      return session
    },
  },
}

/**
 * Session optionnelle pour le checkout invité (api/checkout/pack,
 * api/checkout/circuit) — ne doit JAMAIS bloquer un achat, que
 * l'utilisateur soit connecté ou non. Sans ce garde-fou,
 * getServerSession() (stratégie 'database') tente une vraie connexion
 * Prisma à chaque appel ; si DATABASE_URL est vide ou la base
 * injoignable, la requête reste bloquée indéfiniment au lieu d'échouer
 * vite, ce qui bloque tout achat (trouvé en testant le paiement en
 * production le 2026-08-28, DATABASE_URL pas encore configurée).
 */
export async function getOptionalSession() {
  if (!process.env.DATABASE_URL) return null
  try {
    const timeout = new Promise<null>((resolve) => setTimeout(() => resolve(null), 4000))
    return await Promise.race([getServerSession(authOptions), timeout])
  } catch {
    return null
  }
}
