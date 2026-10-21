import Link from 'next/link'
import { Navbar } from '@/components/site/Navbar'
import { Footer } from '@/components/site/Footer'
import { MODULE_5 } from '@/content/learning/module-5'
import '../learning.css'
import { pageMetadata } from '@/lib/seo'
import type { AppLocale } from '@/i18n/request'

export function generateMetadata({ params: { locale } }: { params: { locale: AppLocale } }) {
  return pageMetadata({ locale, path: '/apprendre/module-5', title: 'Module 5 — Arrêt et stationnement', description: 'Cours interactif consacré à l’arrêt et au stationnement en Belgique.', indexable: false, languageAlternates: false })
}

export default function ModuleFivePage() {
  return <><Navbar /><main className="learn-shell"><div className="learn-lesson-heading"><span className="learn-kicker">{MODULE_5.number}</span><h1>{MODULE_5.title}</h1><p>{MODULE_5.description}</p></div><section className="learn-module"><div className="learn-module-progress"><span><b>0%</b> · 0 leçon terminée</span><div><i style={{ width: '0%' }} /></div><small>7 leçons + défi final</small></div><div className="learn-lessons">{MODULE_5.lessons.map((lesson, index) => <Link href={`/apprendre/${lesson.id}`} className="learn-lesson-card" key={lesson.id}><span className="learn-lesson-number">{String(index + 1).padStart(2, '0')}</span><div><strong>{lesson.title}</strong><p>{lesson.description}</p><small>{lesson.xp} XP</small></div></Link>)}<Link href={`/apprendre/${MODULE_5.finalChallenge.id}`} className="learn-lesson-card"><span className="learn-lesson-number">FIN</span><div><strong>{MODULE_5.finalChallenge.title}</strong><p>{MODULE_5.finalChallenge.description}</p><small>{MODULE_5.finalChallenge.xp} XP</small></div></Link></div></section></main><Footer /></>
}
