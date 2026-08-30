'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { ChevronDown } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { FAQ_ITEMS } from '@/content/faq'

/**
 * FAQ home — remplace l'ancienne section témoignages en bas de page (voir
 * conversation du 2026-08-31). Accordéon simple, une seule question ouverte
 * à la fois. Le schema JSON-LD FAQPage correspondant est généré à partir de
 * la même source (FAQ_ITEMS) directement dans page.tsx, pour ne jamais
 * désynchroniser contenu affiché et données structurées.
 */
export function FaqSection() {
  const t = useTranslations('faq')
  const locale = useLocale() as 'fr' | 'nl'
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <Container className="pb-16">
      <h2 className="mb-6 text-center font-display text-2xl tracking-tight text-ink sm:text-3xl">{t('title')}</h2>

      <div className="mx-auto flex max-w-2xl flex-col gap-3">
        {FAQ_ITEMS.map((item, i) => {
          const open = openIndex === i
          return (
            <div key={item.question[locale]} className="panel !shadow-hard-xs overflow-hidden !p-0">
              <button
                onClick={() => setOpenIndex(open ? null : i)}
                aria-expanded={open}
                className="flex w-full items-center justify-between gap-3 p-4 text-left font-display text-sm sm:text-base"
              >
                {item.question[locale]}
                <ChevronDown size={18} className={`flex-none transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="border-t-2 border-ink/10 p-4 pt-3 text-sm leading-relaxed text-ink/75">{item.answer[locale]}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </Container>
  )
}
