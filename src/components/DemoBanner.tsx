import { useTranslations } from 'next-intl'
import { Icon } from './ui/Icon'

/** Bandeau affiché sur tout écran exposant du contenu de src/content/fixtures. Ne doit jamais pouvoir être confondu avec un écran de contenu vérifié. */
export function DemoBanner() {
  // TODO: ajouter la clé `common.demoBanner` à messages/{fr,nl}.json en branchant /cours.
  const t = useTranslations()
  return (
    <div className="flex items-start gap-3 rounded-xl border border-[#e3c98a] bg-[#fbf3df] px-4 py-3 text-sm text-[#7a5620]">
      <Icon name="FlaskConical" size={18} className="mt-0.5 shrink-0" />
      <p>{t('common.demoBanner')}</p>
    </div>
  )
}
