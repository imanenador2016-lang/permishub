'use client'

import { signIn } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/Button'

/**
 * Moment de conversion le plus fort du parcours : juste après avoir montré
 * la valeur (le résultat), jamais avant. `signIn` nécessite
 * GOOGLE_CLIENT_ID/SECRET (et un provider email) en variables
 * d'environnement — voir SETUP.md.
 */
export function SignupPrompt({ onSkip }: { onSkip: () => void }) {
  const t = useTranslations('testDeNiveau')

  return (
    <div>
      <p className="mb-1 font-display text-sm">{t('saveProgressTitle')}</p>
      <p className="mb-4 text-sm text-ink/75">{t('saveProgressBody')}</p>
      <div className="flex flex-col gap-2.5 sm:flex-row">
        <Button variant="primary" className="flex-1" onClick={() => signIn('google')}>
          {t('saveWithGoogle')}
        </Button>
        <Button variant="secondary" className="flex-1" onClick={() => signIn('email')}>
          {t('saveWithEmail')}
        </Button>
      </div>
      <button onClick={onSkip} className="mt-3 text-xs text-ink/50 underline-offset-2 hover:underline">
        {t('skipForNow')}
      </button>
    </div>
  )
}
