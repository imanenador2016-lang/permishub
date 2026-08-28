import { useTranslations, useLocale } from 'next-intl'
import { COUT_ECHEC_BANNER } from '@/content/circuits-config'

/**
 * Bandeau "coût de l'échec" — brief v2 §Monétisation. Le texte cite une
 * règle (formation de 6h après 2 échecs) que le client n'a pas pu vérifier
 * via une source officielle : on l'affiche quand même (donnée fournie par
 * le client) mais on marque clairement la source comme à confirmer plutôt
 * que d'inventer un lien GOCA/SPF Mobilité.
 */
export function CoutEchecBanner() {
  const t = useTranslations('circuits')
  const locale = useLocale() as 'fr' | 'nl'
  const text = locale === 'nl' ? COUT_ECHEC_BANNER.textNl : COUT_ECHEC_BANNER.textFr

  return (
    <div className="panel mb-5 !shadow-hard-xs bg-yellow/20 p-4 sm:p-5">
      <p className="text-sm font-semibold leading-relaxed text-ink sm:text-[15px]">{text}</p>
      {COUT_ECHEC_BANNER.sourceUrl ? (
        <a href={COUT_ECHEC_BANNER.sourceUrl} className="mt-2 inline-block text-xs font-bold text-brick underline">
          {t('coutEcheeSourceLink')}
        </a>
      ) : (
        <p className="mt-2 text-xs italic text-ink/50">{t('coutEcheeSourcePending')}</p>
      )}
    </div>
  )
}
