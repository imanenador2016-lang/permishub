import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/site/Navbar'
import { Footer } from '@/components/site/Footer'
import { LessonPlayer } from '@/components/learning/LessonPlayer'
import { LEARNING_LESSONS } from '@/content/learning/lesson-1'
import { MODULE_3 } from '@/content/learning/module-3'
import { MODULE_4 } from '@/content/learning/module-4'
import '../learning.css'
import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import type { AppLocale } from '@/i18n/request'

export function generateMetadata({ params: { locale, lessonId } }: { params: { locale: AppLocale; lessonId: string } }): Metadata {
  const lesson = LEARNING_LESSONS.find((item) => item.id === lessonId) ?? MODULE_3.lessons.find((item) => item.id === lessonId) ?? MODULE_4.lessons.find((item) => item.id === lessonId)
  const challenge = lessonId === MODULE_3.finalChallenge.id ? MODULE_3.finalChallenge : lessonId === MODULE_4.finalChallenge.id ? MODULE_4.finalChallenge : undefined
  const title = lesson?.title ?? challenge?.title ?? 'Leçon de conduite'
  const description = lesson?.description ?? challenge?.description ?? 'Leçon de préparation au permis de conduire.'
  return pageMetadata({ locale, path: `/apprendre/${lessonId}`, title, description, indexable: false, languageAlternates: false })
}

export default function LessonPage({ params: { lessonId } }: { params: { lessonId: string } }) {
  const index = LEARNING_LESSONS.findIndex((item) => item.id === lessonId)
  const moduleThreeLesson = MODULE_3.lessons.find((item) => item.id === lessonId)
  const moduleFourLesson = MODULE_4.lessons.find((item) => item.id === lessonId)
  const moduleThreeFinal = lessonId === MODULE_3.finalChallenge.id
  const moduleFourFinal = lessonId === MODULE_4.finalChallenge.id
  if (index === -1 && !moduleThreeLesson && !moduleThreeFinal && !moduleFourLesson && !moduleFourFinal) notFound()
  if ((moduleThreeLesson || moduleThreeFinal || moduleFourLesson || moduleFourFinal) && index === -1) return <><Navbar /><main className="learn-shell"><section className="learn-result"><span className="learn-kicker">MODULE 3 · VITESSE & POSITION</span><h1>{moduleThreeFinal ? MODULE_3.finalChallenge.title : moduleFourFinal ? MODULE_4.finalChallenge.title : moduleThreeLesson?.title ?? moduleFourLesson?.title}</h1><p>{moduleThreeFinal || moduleFourFinal ? 'Le défi final sera ajouté dans la prochaine étape.' : 'Cette leçon est verrouillée et son contenu pédagogique sera ajouté dans la prochaine étape.'}</p><Link className="learn-primary" href="/apprendre/module-3">Retour au module 3</Link></section></main><Footer /></>
  const lesson = LEARNING_LESSONS[index]
  const nextLesson = LEARNING_LESSONS[index + 1]
  const moduleLabel = lesson.moduleId === 'manoeuvres-overtaking' ? 'MODULE 4 · MANŒUVRES & DÉPASSEMENT' : lesson.moduleId === 'speed-road-position' ? 'MODULE 3 · VITESSE & POSITION' : lesson.moduleId === 'priorities-intersections' ? 'MODULE 2 · PRIORITÉS & CARREFOURS' : 'MODULE 1 · SIGNALISATION'
  return <><Navbar /><main className="learn-shell learn-lesson-page">{<><div className="learn-lesson-heading"><span className="learn-kicker">{moduleLabel}</span><h1>{lesson.title}</h1><p>{lesson.description}</p></div><LessonPlayer lesson={lesson} nextLessonId={nextLesson?.moduleId === lesson.moduleId ? nextLesson.id : undefined} nextHref={lesson.id === 'carrefours-complexes' ? '/apprendre/defi-final-priorites-carrefours' : lesson.id === 'situations-complexes-vitesse-position' ? '/apprendre/defi-final-vitesse-position' : undefined} /></>}</main><Footer /></>
}




