import Link from 'next/link'
import { Navbar } from '@/components/site/Navbar'
import { Footer } from '@/components/site/Footer'
import { MODULE_3 } from '@/content/learning/module-3'
import '../learning.css'
import { pageMetadata } from '@/lib/seo'
import type { AppLocale } from '@/i18n/request'

export function generateMetadata({ params: { locale } }: { params: { locale: AppLocale } }) {
  return pageMetadata({ locale, path: '/apprendre/module-3', title: 'Module 3 — Vitesse et position', description: 'Structure de formation consacrée à la vitesse et à la position sur la chaussée.', indexable: false, languageAlternates: false })
}

export default function ModuleThreePage() {
  return <><Navbar /><main className="learn-shell"><div className="learn-lesson-heading"><span className="learn-kicker">{MODULE_3.number}</span><h1>{MODULE_3.title}</h1><p>{MODULE_3.description}</p></div><section className="learn-module"><div className="learn-module-progress"><span><b>0%</b> · 0 leçon terminée</span><div><i style={{ width: '0%' }} /></div><small>7 leçons + défi final</small></div><div className="learn-lessons">{MODULE_3.lessons.map((lesson, index) => <Link href={`/apprendre/${lesson.id}`} className={index < 7 ? 'learn-lesson-card' : 'learn-lesson-card is-locked'} key={lesson.id}><span className="learn-lesson-number">{String(index + 1).padStart(2, '0')}</span><div><strong>{lesson.title}</strong><p>{lesson.description}</p><small>{index < 7 ? `${lesson.xp} XP` : `Verrouillé · ${lesson.xp} XP`}</small></div></Link>)}<Link href={`/apprendre/${MODULE_3.finalChallenge.id}`} className="learn-lesson-card is-locked" aria-disabled="true"><span className="learn-lesson-number">FIN</span><div><strong>{MODULE_3.finalChallenge.title}</strong><p>{MODULE_3.finalChallenge.description}</p><small>Verrouillé · {MODULE_3.finalChallenge.xp} XP</small></div></Link></div></section></main><Footer /></>
}







