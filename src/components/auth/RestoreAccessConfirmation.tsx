'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { EXAMENS_UNLOCKED_KEY } from '@/components/examen-blanc/ExamAccessGate'
import { circuitsUnlockedKey } from '@/components/circuits/CircuitUnlockCta'
import { RESUME_PDF_URL } from '@/content/pricing-config'
import { getCenter } from '@/content/centers/registry'

type Entitlements = { email: string; examensIllimites: boolean; resume: boolean; circuitCenters: string[] }

/**
 * Une fois connecté via le lien magique (voir RestoreAccessForm.tsx), on
 * relit les achats réels en base (api/mon-acces) et on pose les mêmes
 * flags localStorage que ceux posés juste après paiement (voir
 * UnlockExamensEffect.tsx / UnlockCenterEffect.tsx) — même mécanique de
 * lecture côté ExamenBlancPicker/ExamAccessGate/CircuitUnlockCta, rien à
 * changer là-bas.
 */
export function RestoreAccessConfirmation() {
  const t = useTranslations('restoreAccess')
  const [state, setState] = useState<'loading' | 'unauthenticated' | 'empty' | 'restored'>('loading')
  const [entitlements, setEntitlements] = useState<Entitlements | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch('/api/mon-acces')
      .then(async (res) => {
        if (cancelled) return
        if (res.status === 401) return setState('unauthenticated')
        const data = (await res.json()) as Entitlements
        setEntitlements(data)

        try {
          if (data.examensIllimites) localStorage.setItem(EXAMENS_UNLOCKED_KEY, '1')
          for (const centerSlug of data.circuitCenters) {
            localStorage.setItem(circuitsUnlockedKey(centerSlug), '1')
          }
        } catch {
          // localStorage indisponible — l'email reste la preuve d'achat, jamais bloquant.
        }

        setState(data.examensIllimites || data.resume || data.circuitCenters.length > 0 ? 'restored' : 'empty')
      })
      .catch(() => !cancelled && setState('unauthenticated'))
    return () => {
      cancelled = true
    }
  }, [])

  if (state === 'loading') {
    return (
      <div className="panel p-6 text-center sm:p-8">
        <p className="text-sm text-ink/60">{t('loading')}</p>
      </div>
    )
  }

  if (state === 'unauthenticated') {
    return (
      <div className="panel p-6 text-center sm:p-8">
        <h1 className="mb-2 font-display text-xl">{t('unauthTitle')}</h1>
        <p className="mx-auto mb-6 max-w-sm text-sm text-ink/70">{t('unauthBody')}</p>
        <Link href="/restaurer-acces" className="btn-comic inline-flex px-5 py-3 text-sm">
          {t('retryCta')} →
        </Link>
      </div>
    )
  }

  if (state === 'empty') {
    return (
      <div className="panel p-6 text-center sm:p-8">
        <h1 className="mb-2 font-display text-xl">{t('emptyTitle')}</h1>
        <p className="mx-auto max-w-sm text-sm text-ink/70">{t('emptyBody', { email: entitlements?.email ?? '' })}</p>
      </div>
    )
  }

  return (
    <div className="panel p-6 text-center sm:p-8">
      <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-ink bg-forest text-2xl text-cream">
        ✓
      </span>
      <h1 className="mb-2 font-display text-xl sm:text-2xl">{t('restoredTitle')}</h1>
      <p className="mx-auto mb-5 max-w-sm text-sm text-ink/70">{t('restoredBody')}</p>

      <div className="mx-auto flex max-w-xs flex-col gap-2.5">
        {entitlements?.examensIllimites && (
          <Link href="/examen-blanc" className="btn-comic block px-4 py-3 text-sm">
            {t('goToExamens')} →
          </Link>
        )}
        {entitlements?.circuitCenters.map((slug) => (
          <Link key={slug} href={`/circuits/${slug}`} className="btn-comic block px-4 py-3 text-sm">
            {t('goToCircuit', { center: getCenter(slug)?.name ?? slug })} →
          </Link>
        ))}
        {entitlements?.resume && (
          <a href={RESUME_PDF_URL} target="_blank" rel="noopener noreferrer" className="btn-comic block px-4 py-3 text-sm">
            {t('goToResume')} →
          </a>
        )}
      </div>
    </div>
  )
}
