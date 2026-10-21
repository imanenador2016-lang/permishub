import { Navbar } from '@/components/site/Navbar'
import { Footer } from '@/components/site/Footer'
import { MODULE_9 } from '@/content/learning/module-9'
import { Link } from '@/i18n/navigation'
import '../learning.css'
import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import type { AppLocale } from '@/i18n/request'

export function generateMetadata({ params: { locale } }: { params: { locale: AppLocale } }): Metadata {
  return pageMetadata({ locale, path: '/apprendre/module-9', title: 'Module 9 — Autoroute et routes spéciales', description: 'Cours interactif sur l’autoroute, les routes pour automobiles et les zones spéciales en Belgique.', indexable: false, languageAlternates: false })
}

export default function ModuleNinePage() {
  return <><Navbar /><main className="learn-shell"><div className="learn-lesson-heading"><span className="learn-kicker">{MODULE_9.number}</span><h1>{MODULE_9.title}</h1><p>{MODULE_9.description}</p></div><section className="learn-module"><div className="learn-module-progress"><span><b>0%</b> · 0 leçon terminée</span><div><i style={{ width: '0%' }} /></div><small>7 leçons + défi final</small></div><div className="learn-lessons">{MODULE_9.lessons.map((lesson, index) => <Link href={`/apprendre/${lesson.id}`} className="learn-lesson-card" key={lesson.id}><span className="learn-lesson-number">{String(index + 1).padStart(2, '0')}</span><div><strong>{lesson.title}</strong><p>{lesson.description}</p><small>{lesson.xp} XP</small></div></Link>)}<Link href={`/apprendre/${MODULE_9.finalChallenge.id}`} className="learn-lesson-card"><span className="learn-lesson-number">FIN</span><div><strong>{MODULE_9.finalChallenge.title}</strong><p>{MODULE_9.finalChallenge.description}</p><small>{MODULE_9.finalChallenge.xp} XP</small></div></Link></div></section></main><Footer /></>
}
