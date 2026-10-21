'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { Icon } from '@/components/ui/Icon'
import { Container } from '@/components/ui/Container'
import { ProgressBar } from '@/components/ui/ProgressBar'

/**
 * Entrée vers /test-de-niveau depuis la home — retirée quand le Hero est
 * devenu la promo du pack de lancement (2026-09-12), redemandée le
 * 2026-09-14 ("le test de niveau théorique... que j'avais en hero"). Section
 * à part plutôt qu'un second CTA dans le Hero lui-même : un hero garde un
 * seul CTA principal (voir ui-ux-pro-max §Style Selection, `primary-action`)
 * — celui-ci reste 100% sur le pack, cette section capte ceux pas encore
 * prêts à payer, plus bas sur la page.
 *
 * L'aperçu à droite montre l'état "correction" (voir TestDeNiveau.tsx,
 * ajoutée le même jour) — la vraie nouveauté à mettre en avant, pas juste
 * "un quiz".
 */
export function TestNiveauTeaser() {
  const t = useTranslations('testTeaser')

  return (
    <Container className="py-20">
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.4 }}
        >
          <span className="mb-4 inline-flex w-fit -rotate-2 items-center border-[3px] border-ink bg-yellow px-3 py-1.5 font-display text-xs">
            {t('eyebrow')}
          </span>
          <h2 className="mb-3.5 font-display text-2xl leading-[1.15] tracking-tight sm:text-3xl">
            {t('titleLine')} <span className="text-brick">{t('titleAccent')}</span>
          </h2>
          <p className="mb-6 max-w-md text-[15px] leading-relaxed text-ink/70">{t('lead')}</p>

          <ul className="mb-7 flex flex-col gap-2.5">
            {[t('benefit1'), t('benefit2'), t('benefit3')].map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-sm font-semibold">
                <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full border-2 border-ink bg-forest text-cream">
                  <Icon name="Check" size={12} />
                </span>
                {b}
              </li>
            ))}
          </ul>

          <Link href="/test-de-niveau" className="btn-comic inline-flex px-6 py-3.5 text-base">
            {t('cta')} →
          </Link>
        </motion.div>

        {/* Aperçu — mêmes styles que le vrai composant (voir TestDeNiveau.tsx),
            figé sur l'état "correction" pour montrer la nouveauté. Décoratif
            (aria-hidden) : pas un vrai quiz interactif, juste une preview. */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="panel p-5 sm:p-6"
        >
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <span className="border-[3px] border-ink bg-yellow px-3 py-1 font-display text-xs uppercase tracking-wide">
              {t('mockBadge')}
            </span>
            <span className="font-display text-xs text-ink/60">{t('mockQuestionLabel')}</span>
          </div>

          <div className="mb-6">
            <ProgressBar value={0.36} />
          </div>

          <h3 className="mb-5 font-display text-lg leading-snug sm:text-xl">{t('mockQuestion')}</h3>

          <div className="mb-4 grid gap-2.5">
            <div className="flex items-center justify-between gap-2 border-[3px] border-forest bg-forest/15 px-4 py-3 text-left text-sm font-semibold">
              <span>{t('mockOption1')}</span>
              <Icon name="Check" size={16} className="flex-none text-forest" />
            </div>
            <div className="border-[3px] border-ink/15 px-4 py-3 text-left text-sm font-semibold text-ink/40">{t('mockOption2')}</div>
            <div className="border-[3px] border-ink/15 px-4 py-3 text-left text-sm font-semibold text-ink/40">{t('mockOption3')}</div>
          </div>

          <div className="border-[3px] border-ink bg-cream p-4">
            <p className="mb-1.5 font-display text-[11px] uppercase tracking-wide text-forest">{t('mockCorrectionLabel')}</p>
            <p className="text-sm leading-relaxed text-ink/80">{t('mockCorrectionText')}</p>
          </div>
        </motion.div>
      </div>
    </Container>
  )
}
