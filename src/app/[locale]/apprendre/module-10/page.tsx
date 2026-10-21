import { Navbar } from '@/components/site/Navbar'
import { Footer } from '@/components/site/Footer'
import { MODULE_10 } from '@/content/learning/module-10'
import { Link } from '@/i18n/navigation'
import '../learning.css'
import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import type { AppLocale } from '@/i18n/request'

export function generateMetadata({ params: { locale } }: { params: { locale: AppLocale } }): Metadata {
  return pageMetadata({ locale, path: '/apprendre/module-10', title: 'Module 10 — Trams, bus et passages à niveau', description: 'Cours interactif sur les passages à niveau, les trams, les bus et les voies réservées en Belgique.', indexable: false, languageAlternates: false })
}

export default function ModuleTenPage() {
  return <><Navbar /><main className="learn-shell"><div className="learn-lesson-heading"><span className="learn-kicker">{MODULE_10.number}</span><h1>{MODULE_10.title}</h1><p>{MODULE_10.description}</p></div><section className="learn-module"><div className="learn-module-progress"><span><b>0%</b> · 0 leçon terminée</span><div><i style={{ width: '0%' }} /></div><small>7 leçons + défi final</small></div><div className="learn-lessons">{MODULE_10.lessons.map((lesson, index) => <Link href={`/apprendre/${lesson.id}`} className="learn-lesson-card" key={lesson.id}><span className="learn-lesson-number">{String(index + 1).padStart(2, '0')}</span><div><strong>{lesson.title}</strong><p>{lesson.description}</p><small>{lesson.xp} XP</small></div></Link>)}<Link href={`/apprendre/${MODULE_10.finalChallenge.id}`} className="learn-lesson-card"><span className="learn-lesson-number">FIN</span><div><strong>{MODULE_10.finalChallenge.title}</strong><p>{MODULE_10.finalChallenge.description}</p><small>{MODULE_10.finalChallenge.xp} XP</small></div></Link></div></section></main><Footer /></>
}
