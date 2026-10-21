import { Navbar } from '@/components/site/Navbar'
import { Footer } from '@/components/site/Footer'
import { MODULE_6 } from '@/content/learning/module-6'
import { Link } from '@/i18n/navigation'
import '../learning.css'
import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import type { AppLocale } from '@/i18n/request'

export function generateMetadata({ params: { locale } }: { params: { locale: AppLocale } }): Metadata {
  return pageMetadata({ locale, path: '/apprendre/module-6', title: 'Module 6 — Sécurité, alcool et accidents', description: 'Cours interactif consacré à la conduite sous influence et aux accidents en Belgique.', indexable: false, languageAlternates: false })
}

export default function ModuleSixPage() {
  return <><Navbar /><main className="learn-shell"><div className="learn-lesson-heading"><span className="learn-kicker">{MODULE_6.number}</span><h1>{MODULE_6.title}</h1><p>{MODULE_6.description}</p></div><section className="learn-module"><div className="learn-module-progress"><span><b>0%</b> · 0 leçon terminée</span><div><i style={{ width: '0%' }} /></div><small>7 leçons + défi final</small></div><div className="learn-lessons">{MODULE_6.lessons.map((lesson, index) => <Link href={`/apprendre/${lesson.id}`} className="learn-lesson-card" key={lesson.id}><span className="learn-lesson-number">{String(index + 1).padStart(2, '0')}</span><div><strong>{lesson.title}</strong><p>{lesson.description}</p><small>{lesson.xp} XP</small></div></Link>)}<Link href={`/apprendre/${MODULE_6.finalChallenge.id}`} className="learn-lesson-card"><span className="learn-lesson-number">FIN</span><div><strong>{MODULE_6.finalChallenge.title}</strong><p>{MODULE_6.finalChallenge.description}</p><small>{MODULE_6.finalChallenge.xp} XP</small></div></Link></div></section></main><Footer /></>
}
