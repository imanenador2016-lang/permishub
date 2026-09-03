import type { NextAuthOptions } from 'next-auth'
import { getServerSession } from 'next-auth/next'
import { PrismaAdapter } from '@auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'
import { prisma } from './prisma'

/**
 * Auth email + Google, comme demandé dans le brief. Ne fonctionne qu'une
 * fois les variables d'environnement renseignées (voir SETUP.md) :
 * GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET, et RESEND_API_KEY / EMAIL_FROM
 * pour les liens magiques (voir "Restaurer mon accès" du 2026-09-03 —
 * envoi via l'API Resend directement plutôt que SMTP/nodemailer, plus
 * fiable et pas de dépendance nodemailer supplémentaire).
 */
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    EmailProvider({
      from: process.env.EMAIL_FROM ?? 'PermisHub <onboarding@resend.dev>',
      sendVerificationRequest: async ({ identifier: email, url, provider }) => {
        const apiKey = process.env.RESEND_API_KEY
        if (!apiKey) throw new Error('RESEND_API_KEY manquante — impossible d’envoyer le lien de connexion.')

        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: provider.from,
            to: email,
            subject: 'Ton lien de connexion — PermisHub',
            html: `
              <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
                <h1 style="font-size: 20px;">Connexion à PermisHub</h1>
                <p>Clique sur le bouton ci-dessous pour te connecter et retrouver ton accès. Ce lien est valable 24h et ne peut servir qu'une fois.</p>
                <p style="margin: 24px 0;">
                  <a href="${url}" style="background:#F5B400;color:#1F1A14;padding:12px 20px;border-radius:6px;text-decoration:none;font-weight:bold;display:inline-block;">
                    Me connecter
                  </a>
                </p>
                <p style="color:#666;font-size:13px;">Si tu n'as pas demandé ce lien, tu peux ignorer cet email.</p>
              </div>
            `,
          }),
        })

        if (!res.ok) {
          const body = await res.text().catch(() => '')
          throw new Error(`Échec de l'envoi Resend (${res.status}): ${body}`)
        }
      },
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
