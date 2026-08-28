import type { DefaultSession } from 'next-auth'

/** Ajoute `id` à session.user (voir lib/auth.ts callbacks.session). */
declare module 'next-auth' {
  interface Session {
    user: {
      id: string
    } & DefaultSession['user']
  }
}
