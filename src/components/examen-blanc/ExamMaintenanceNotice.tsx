import Link from 'next/link'
import type { AppLocale } from '@/i18n/request'

export function ExamMaintenanceNotice({ locale }: { locale: AppLocale }) {
  const copy = locale === 'nl'
    ? {
        badge: 'TIJDELIJKE UPDATE',
        title: 'De proefexamens zijn momenteel in onderhoud.',
        body: 'We werken alle vragen en afbeeldingen bij om de oefeningen duidelijker en betrouwbaarder te maken.',
        access: 'De toegang is tijdelijk onderbroken voor iedereen, ook als je al voor de proefexamens hebt betaald. Je toegangsrechten blijven bewaard en worden opnieuw actief zodra de update klaar is.',
        cta: 'Bekijk de samenvatting zonder blabla',
      }
    : {
        badge: 'MISE À JOUR EN COURS',
        title: 'Les examens blancs sont temporairement en maintenance.',
        body: 'Nous mettons à jour l’ensemble des questions et des visuels pour rendre l’entraînement plus clair et plus fiable.',
        access: 'L’accès est momentanément suspendu pour tout le monde, y compris si vous avez déjà payé les examens blancs. Vos droits restent enregistrés et seront réactivés dès la fin de la mise à jour.',
        cta: 'Voir le Résumé sans blabla',
      }

  return (
    <section className="panel mx-auto max-w-2xl overflow-hidden !p-0" aria-labelledby="exam-maintenance-title">
      <div className="border-b-[3px] border-ink bg-yellow px-5 py-4 sm:px-7">
        <p className="font-display text-xs uppercase tracking-[.16em] text-ink">{copy.badge}</p>
      </div>
      <div className="p-5 sm:p-8">
        <h1 id="exam-maintenance-title" className="font-display text-2xl leading-tight text-ink sm:text-3xl">{copy.title}</h1>
        <p className="mt-4 text-sm leading-relaxed text-ink/75 sm:text-base">{copy.body}</p>
        <p className="mt-4 border-l-4 border-forest bg-forest/10 p-4 text-sm font-medium leading-relaxed text-ink">{copy.access}</p>
        <Link href="/resume" className="btn-comic mt-6 inline-flex min-h-12 items-center justify-center px-5 py-3 text-center text-sm sm:text-base">{copy.cta}</Link>
      </div>
    </section>
  )
}
