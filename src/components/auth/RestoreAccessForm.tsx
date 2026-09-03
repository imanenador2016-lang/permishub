'use client'

import { useState, type FormEvent } from 'react'
import { signIn } from 'next-auth/react'
import { useTranslations } from 'next-intl'

/**
 * Formulaire "Restaurer mon accès" (voir conversation du 2026-09-03) —
 * envoie un lien magique NextAuth (provider Email, src/lib/auth.ts) à
 * l'adresse utilisée pour payer. Le lien connecte le client sur ce nouvel
 * appareil ; la page de confirmation (RestoreAccessConfirmation.tsx) pose
 * ensuite les mêmes flags localStorage que juste après paiement.
 */
export function RestoreAccessForm({ locale }: { locale: 'fr' | 'nl' }) {
  const t = useTranslations('restoreAccess')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const result = await signIn('email', {
        email,
        redirect: false,
        callbackUrl: `/${locale}/restaurer-acces/confirmation`,
      })
      setStatus(result?.error ? 'error' : 'sent')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="panel p-6 text-center sm:p-8">
        <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-ink bg-forest text-2xl text-cream">
          ✓
        </span>
        <h1 className="mb-2 font-display text-xl sm:text-2xl">{t('sentTitle')}</h1>
        <p className="mx-auto max-w-sm text-sm text-ink/70">{t('sentBody', { email })}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="panel p-6 text-center sm:p-8">
      <h1 className="mb-2 font-display text-xl sm:text-2xl">{t('title')}</h1>
      <p className="mx-auto mb-5 max-w-sm text-sm text-ink/70">{t('subtitle')}</p>

      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t('emailPlaceholder')}
        className="mb-3 w-full border-2 border-ink bg-cream px-4 py-3 text-center text-sm outline-none focus:border-brick"
      />

      <button type="submit" disabled={status === 'loading'} className="btn-comic block w-full px-5 py-3.5 text-base disabled:opacity-60">
        {status === 'loading' ? t('sending') : t('submitCta')} →
      </button>

      {status === 'error' && <p className="mt-3 text-[13px] font-semibold text-brick">{t('errorBody')}</p>}
    </form>
  )
}
