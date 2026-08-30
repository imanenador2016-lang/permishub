import { getTranslations } from 'next-intl/server'
import { CLIENT_REVIEWS } from '@/content/reviews'
import type { AppLocale } from '@/i18n/request'

/** Vert Trustpilot officiel — repris pour l'esprit visuel "avis vérifiés", voir ReviewsPanel. */
const TRUSTPILOT_GREEN = '#00B67A'

/**
 * Colonne "avis clients", à côté de la FAQ (voir page.tsx) — style inspiré
 * de Trustpilot (étoiles vertes, cartes compactes) à la demande du client
 * (conversation du 2026-08-31), mais SANS le logo/nom "Trustpilot" : le
 * compte Trustpilot réel de PermisHub n'a pas été connecté (ni widget
 * officiel, ni lien vérifiable vers une page Trustpilot), donc apposer leur
 * marque donnerait l'impression d'un profil vérifié par eux alors que ce
 * n'est pas le cas. Les avis eux-mêmes sont réels (fournis par le client),
 * juste présentés ici sans badge de marque tierce.
 */
export async function ReviewsPanel({ locale }: { locale: AppLocale }) {
  const t = await getTranslations('reviewsPanel')

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <span className="font-display text-2xl tracking-tight text-ink sm:text-3xl">{t('title')}</span>
      </div>
      <div className="mb-5 flex items-center gap-2">
        <span className="text-lg tracking-widest" style={{ color: TRUSTPILOT_GREEN }}>
          ★★★★★
        </span>
        <span className="text-xs font-semibold text-ink/60">{t('subtitle')}</span>
      </div>

      <div className="flex flex-col gap-3">
        {CLIENT_REVIEWS.map((review) => (
          <div key={review.name} className="panel !shadow-hard-xs p-4">
            <div className="mb-2 flex items-center justify-between gap-2">
              <p className="font-display text-sm">{review.name}</p>
              <span className="tracking-widest" style={{ color: TRUSTPILOT_GREEN, fontSize: '13px' }}>
                {'★'.repeat(review.stars)}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-ink/75">“{review.quote[locale]}”</p>
          </div>
        ))}
      </div>
    </div>
  )
}
