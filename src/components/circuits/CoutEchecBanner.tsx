import { useTranslations, useLocale } from 'next-intl'
import { COUT_ECHEC_BANNER } from '@/content/circuits-config'

/**
 * Bandeau "coût de l'échec" — brief v2 §Monétisation. Le texte cite une
 * règle (formation de 6h après 2 échecs) donnée par le client, sans lien
 * source officiel vérifié (jamais inventé un lien GOCA/SPF Mobilité). Le
 * badge "Source à confirmer" visible aux visiteurs a été retiré à la
 * demande du client (conversation du 2026-08-28) — la donnée reste non
 * vérifiée en interne (voir docs/CONTENT_PIPELINE.md), donc si une source
 * officielle est trouvée un jour, renseigner `sourceUrl` dans
 * content/circuits-config.ts pour faire réapparaître un vrai lien.
 */
export function CoutEchecBanner() {
  const t = useTranslations('circuits')
  const locale = useLocale() as 'fr' | 'nl'
  const text = locale === 'nl' ? COUT_ECHEC_BANNER.textNl : COUT_ECHEC_BANNER.textFr

  return (
    <div className="panel mb-5 !shadow-hard-xs bg-yellow/20 p-4 sm:p-5">
      <p className="text-sm font-semibold leading-relaxed text-ink sm:text-[15px]">{text}</p>
      {COUT_ECHEC_BANNER.sourceUrl && (
        <a href={COUT_ECHEC_BANNER.sourceUrl} className="mt-2 inline-block text-xs font-bold text-brick underline">
          {t('coutEcheeSourceLink')}
        </a>
      )}
    </div>
  )
}
