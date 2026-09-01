'use client'

import { useEffect, useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { ExamOfferModal } from './ExamOfferModal'

/** Clé localStorage "pack Examens illimités débloqué" — posée par packs/succes après paiement vérifié (voir UnlockExamensEffect.tsx). */
export const EXAMENS_UNLOCKED_KEY = 'examens-unlocked'

/**
 * Bloque l'entrée d'un examen payant tant que le pack "Examens illimités"
 * n'est pas débloqué sur ce navigateur — renforce le verrou "à l'affichage"
 * du picker (ExamenBlancPicker.tsx) directement sur la page de l'examen,
 * pour quelqu'un qui arriverait par un lien direct. Comme pour les
 * circuits (CircuitUnlockCta.tsx), le seul "vrai" état est Stripe (vérifié
 * une fois sur packs/succes) ; localStorage n'est qu'un confort de
 * navigateur, pas un vrai contrôle d'accès serveur (voir
 * src/lib/examens-blancs.ts).
 *
 * `unlocked` démarre à `free` (donc le serveur affiche déjà le bon état :
 * le contenu si gratuit, sinon l'écran verrouillé) — avant l'audit SEO du
 * 2026-09-01, un état intermédiaire "pas encore vérifié" renvoyait `null`
 * le temps du premier rendu, donc les 7 pages d'examen (toutes payantes)
 * étaient servies à Google sans aucun contenu (pas de H1, rien). Le
 * useEffect ne fait plus que *déverrouiller* si le localStorage le confirme
 * — même comportement utilisateur, juste sans le flash de page vide.
 */
export function ExamAccessGate({ free, children }: { free: boolean; children: React.ReactNode }) {
  const t = useTranslations('examenBlanc')
  const locale = useLocale() as 'fr' | 'nl'
  const [unlocked, setUnlocked] = useState(free)
  const [offerOpen, setOfferOpen] = useState(false)

  useEffect(() => {
    if (free) return
    try {
      if (localStorage.getItem(EXAMENS_UNLOCKED_KEY) === '1') setUnlocked(true)
    } catch {
      // localStorage indisponible — reste verrouillé, jamais bloquant pour la navigation.
    }
  }, [free])

  if (unlocked) return <>{children}</>

  return (
    <div className="panel p-6 text-center sm:p-8">
      <span className="mb-4 inline-block w-fit -rotate-2 border-2 border-ink bg-cream px-2.5 py-1 font-display text-[11px] text-ink/70">
        {t('lockedBadge')}
      </span>
      <h1 className="mb-2 font-display text-xl sm:text-2xl">{t('lockedTitle')}</h1>
      <p className="mx-auto mb-6 max-w-sm text-sm text-ink/70">{t('lockedBody')}</p>

      <button onClick={() => setOfferOpen(true)} className="btn-comic mx-auto mb-4 inline-flex px-5 py-3 text-sm">
        {t('lockedCta')} →
      </button>
      <Link href="/examen-blanc" className="block text-xs font-semibold text-ink/60 hover:text-brick">
        {t('backToPicker')}
      </Link>

      {offerOpen && <ExamOfferModal locale={locale} onClose={() => setOfferOpen(false)} />}
    </div>
  )
}
