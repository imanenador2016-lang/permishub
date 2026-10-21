import { Navbar } from '@/components/site/Navbar'
import { Footer } from '@/components/site/Footer'
import { MODULE_7 } from '@/content/learning/module-7'
import { Link } from '@/i18n/navigation'
import '../learning.css'
import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import type { AppLocale } from '@/i18n/request'

export function generateMetadata({ params: { locale } }: { params: { locale: AppLocale } }): Metadata {
  return pageMetadata({ locale, path: '/apprendre/module-7', title: 'Module 7 — Véhicule et sécurité technique', description: 'Cours interactif sur les masses, le chargement et la sécurité technique du véhicule en Belgique.', indexable: false, languageAlternates: false })
}

export default function ModuleSevenPage() {
  return <><Navbar /><main className="learn-shell"><div className="learn-lesson-heading"><span className="learn-kicker">{MODULE_7.number}</span><h1>{MODULE_7.title}</h1><p>{MODULE_7.description}</p></div><section className="learn-module"><div className="learn-module-progress"><span><b>0%</b> · 0 leçon terminée</span><div><i style={{ width: '0%' }} /></div><small>7 leçons + défi final</small></div><div className="learn-lessons">{MODULE_7.lessons.map((lesson, index) => <Link href={`/apprendre/${lesson.id}`} className="learn-lesson-card" key={lesson.id}><span className="learn-lesson-number">{String(index + 1).padStart(2, '0')}</span><div><strong>{lesson.title}</strong><p>{lesson.description}</p><small>{lesson.xp} XP</small></div></Link>)}<Link href={`/apprendre/${MODULE_7.finalChallenge.id}`} className="learn-lesson-card"><span className="learn-lesson-number">FIN</span><div><strong>{MODULE_7.finalChallenge.title}</strong><p>{MODULE_7.finalChallenge.description}</p><small>{MODULE_7.finalChallenge.xp} XP</small></div></Link></div></section></main><Footer /></>
}
