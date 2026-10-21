import { Navbar } from '@/components/site/Navbar'
import { Footer } from '@/components/site/Footer'
import { MODULE_8 } from '@/content/learning/module-8'
import { Link } from '@/i18n/navigation'
import '../learning.css'
import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import type { AppLocale } from '@/i18n/request'

export function generateMetadata({ params: { locale } }: { params: { locale: AppLocale } }): Metadata {
  return pageMetadata({ locale, path: '/apprendre/module-8', title: 'Module 8 — Usagers vulnérables et passagers', description: 'Cours interactif sur les piétons, cyclistes, enfants, ceintures et angles morts en Belgique.', indexable: false, languageAlternates: false })
}

export default function ModuleEightPage() {
  return <><Navbar /><main className="learn-shell"><div className="learn-lesson-heading"><span className="learn-kicker">{MODULE_8.number}</span><h1>{MODULE_8.title}</h1><p>{MODULE_8.description}</p></div><section className="learn-module"><div className="learn-module-progress"><span><b>0%</b> · 0 leçon terminée</span><div><i style={{ width: '0%' }} /></div><small>7 leçons + défi final</small></div><div className="learn-lessons">{MODULE_8.lessons.map((lesson, index) => <Link href={`/apprendre/${lesson.id}`} className="learn-lesson-card" key={lesson.id}><span className="learn-lesson-number">{String(index + 1).padStart(2, '0')}</span><div><strong>{lesson.title}</strong><p>{lesson.description}</p><small>{lesson.xp} XP</small></div></Link>)}<Link href={`/apprendre/${MODULE_8.finalChallenge.id}`} className="learn-lesson-card"><span className="learn-lesson-number">FIN</span><div><strong>{MODULE_8.finalChallenge.title}</strong><p>{MODULE_8.finalChallenge.description}</p><small>{MODULE_8.finalChallenge.xp} XP</small></div></Link></div></section></main><Footer /></>
}
