'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { OfferCard } from './OfferCard'
import { RESUME_OFFER, EXAMENS_ILLIMITES_OFFER, RESUME_FREE_FOR_TESTING, RESUME_PDF_URL } from '@/content/pricing-config'

type Tab = 'theorique' | 'pratique'

/**
 * "Nos packs" — bascule Théorique/Pratique sur une seule ligne (pas deux
 * blocs empilés) pour rester compact et pousser vers l'achat sans diluer
 * l'attention entre 4 offres à la fois.
 */
export function PacksSection() {
  const t = useTranslations('packs')
  const to = useTranslations('offers')
  const [tab, setTab] = useState<Tab>('theorique')

  return (
    <div>
      <h2 className="mb-3 font-display text-2xl tracking-tight text-ink sm:text-3xl">{t('title')}</h2>
      <p className="mb-6 max-w-2xl text-ink/70">{t('lead')}</p>

      <div className="mb-6 flex w-fit overflow-hidden border-[3px] border-ink">
        <button
          onClick={() => setTab('theorique')}
          className={`px-5 py-2.5 font-display text-sm transition-colors ${tab === 'theorique' ? 'bg-ink text-cream' : 'bg-cream text-ink hover:bg-creamdim'}`}
        >
          {t('theoriqueLabel')}
        </button>
        <button
          onClick={() => setTab('pratique')}
          className={`border-l-[3px] border-ink px-5 py-2.5 font-display text-sm transition-colors ${tab === 'pratique' ? 'bg-brick text-cream' : 'bg-cream text-ink hover:bg-creamdim'}`}
        >
          {t('pratiqueLabel')}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {tab === 'theorique' ? (
          <motion.div
            key="theorique"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ duration: 0.18 }}
            className="grid gap-4 sm:grid-cols-2"
          >
            <OfferCard
              eyebrow={to('resumeEyebrow')}
              title={to('resumeTitle')}
              bullets={[t('resumeBullet1'), t('resumeBullet2'), t('resumeBullet3')]}
              offer={RESUME_OFFER}
              // ⚠️ TEMPORAIRE — voir RESUME_FREE_FOR_TESTING (pricing-config.ts).
              {...(RESUME_FREE_FOR_TESTING
                ? { ctaHref: RESUME_PDF_URL, ctaHrefNewTab: true, ctaLabel: t('ctaFree') }
                : { ctaLabel: t('cta') })}
              refundNote={to('resumeRefund')}
              highlight
            />
            <OfferCard
              eyebrow={t('examensEyebrow')}
              title={t('examensTitle')}
              bullets={[t('examensBullet1'), t('examensBullet2'), t('examensBullet3')]}
              offer={EXAMENS_ILLIMITES_OFFER}
              ctaLabel={t('cta')}
              refundNote={t('examensTrustLine')}
            />
          </motion.div>
        ) : (
          <motion.div
            key="pratique"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ duration: 0.18 }}
            className="grid gap-4 sm:grid-cols-2"
          >
            <OfferCard
              eyebrow={t('circuitEyebrow')}
              title={t('circuitTitle')}
              bullets={[t('circuitBullet1'), t('circuitBullet2'), t('circuitBullet3')]}
              priceLabel={t('circuitPriceLabel')}
              ctaHref="#circuits"
              ctaLabel={t('circuitCta')}
              refundNote={t('circuitRefund')}
              highlight
            />
            <OfferCard
              eyebrow={t('perceptionEyebrow')}
              title={t('perceptionTitle')}
              bullets={[t('perceptionBullet1'), t('perceptionBullet2'), t('perceptionBullet3')]}
              ctaLabel={t('comingSoonCta')}
              comingSoon
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
