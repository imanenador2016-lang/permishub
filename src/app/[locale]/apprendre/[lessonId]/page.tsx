import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/site/Navbar'
import { Footer } from '@/components/site/Footer'
import { LessonPlayer } from '@/components/learning/LessonPlayer'
import { LEARNING_LESSONS } from '@/content/learning/lesson-1'
import { MODULE_3 } from '@/content/learning/module-3'
import { MODULE_4 } from '@/content/learning/module-4'
import { MODULE_5 } from '@/content/learning/module-5'
import { MODULE_6 } from '@/content/learning/module-6'
import { MODULE_7 } from '@/content/learning/module-7'
import { MODULE_8 } from '@/content/learning/module-8'
import { MODULE_9 } from '@/content/learning/module-9'
import { MODULE_10 } from '@/content/learning/module-10'
import '../learning.css'
import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import type { AppLocale } from '@/i18n/request'

export function generateMetadata({ params: { locale, lessonId } }: { params: { locale: AppLocale; lessonId: string } }): Metadata {
  const lesson = LEARNING_LESSONS.find((item) => item.id === lessonId) ?? MODULE_3.lessons.find((item) => item.id === lessonId) ?? MODULE_4.lessons.find((item) => item.id === lessonId) ?? MODULE_5.lessons.find((item) => item.id === lessonId) ?? MODULE_6.lessons.find((item) => item.id === lessonId) ?? MODULE_7.lessons.find((item) => item.id === lessonId) ?? MODULE_8.lessons.find((item) => item.id === lessonId) ?? MODULE_9.lessons.find((item) => item.id === lessonId) ?? MODULE_10.lessons.find((item) => item.id === lessonId)
  const challenge = lessonId === MODULE_3.finalChallenge.id ? MODULE_3.finalChallenge : lessonId === MODULE_4.finalChallenge.id ? MODULE_4.finalChallenge : lessonId === MODULE_5.finalChallenge.id ? MODULE_5.finalChallenge : lessonId === MODULE_6.finalChallenge.id ? MODULE_6.finalChallenge : lessonId === MODULE_7.finalChallenge.id ? MODULE_7.finalChallenge : lessonId === MODULE_8.finalChallenge.id ? MODULE_8.finalChallenge : lessonId === MODULE_9.finalChallenge.id ? MODULE_9.finalChallenge : lessonId === MODULE_10.finalChallenge.id ? MODULE_10.finalChallenge : undefined
  const title = lesson?.title ?? challenge?.title ?? 'Leçon de conduite'
  const description = lesson?.description ?? challenge?.description ?? 'Leçon de préparation au permis de conduire.'
  return pageMetadata({ locale, path: `/apprendre/${lessonId}`, title, description, indexable: false, languageAlternates: false })
}

export default function LessonPage({ params: { lessonId } }: { params: { lessonId: string } }) {
  const index = LEARNING_LESSONS.findIndex((item) => item.id === lessonId)
  const moduleThreeLesson = MODULE_3.lessons.find((item) => item.id === lessonId)
  const moduleFourLesson = MODULE_4.lessons.find((item) => item.id === lessonId)
  const moduleFiveLesson = MODULE_5.lessons.find((item) => item.id === lessonId)
  const moduleSixLesson = MODULE_6.lessons.find((item) => item.id === lessonId)
  const moduleSevenLesson = MODULE_7.lessons.find((item) => item.id === lessonId)
  const moduleEightLesson = MODULE_8.lessons.find((item) => item.id === lessonId)
  const moduleNineLesson = MODULE_9.lessons.find((item) => item.id === lessonId)
  const moduleTenLesson = MODULE_10.lessons.find((item) => item.id === lessonId)
  const moduleThreeFinal = lessonId === MODULE_3.finalChallenge.id
  const moduleFourFinal = lessonId === MODULE_4.finalChallenge.id
  const moduleFiveFinal = lessonId === MODULE_5.finalChallenge.id
  const moduleSixFinal = lessonId === MODULE_6.finalChallenge.id
  const moduleSevenFinal = lessonId === MODULE_7.finalChallenge.id
  const moduleEightFinal = lessonId === MODULE_8.finalChallenge.id
  const moduleNineFinal = lessonId === MODULE_9.finalChallenge.id
  const moduleTenFinal = lessonId === MODULE_10.finalChallenge.id
  if (index === -1 && !moduleThreeLesson && !moduleThreeFinal && !moduleFourLesson && !moduleFourFinal && !moduleFiveLesson && !moduleFiveFinal && !moduleSixLesson && !moduleSixFinal && !moduleSevenLesson && !moduleSevenFinal && !moduleEightLesson && !moduleEightFinal && !moduleNineLesson && !moduleNineFinal && !moduleTenLesson && !moduleTenFinal) notFound()
  if ((moduleThreeLesson || moduleThreeFinal || moduleFourLesson || moduleFourFinal || moduleFiveLesson || moduleFiveFinal || moduleSixLesson || moduleSixFinal || moduleSevenLesson || moduleSevenFinal || moduleEightLesson || moduleEightFinal || moduleNineLesson || moduleNineFinal || moduleTenLesson || moduleTenFinal) && index === -1) return <><Navbar /><main className="learn-shell"><section className="learn-result"><span className="learn-kicker">COURS THÉORIQUE</span><h1>{moduleThreeFinal ? MODULE_3.finalChallenge.title : moduleFourFinal ? MODULE_4.finalChallenge.title : moduleFiveFinal ? MODULE_5.finalChallenge.title : moduleSixFinal ? MODULE_6.finalChallenge.title : moduleSevenFinal ? MODULE_7.finalChallenge.title : moduleEightFinal ? MODULE_8.finalChallenge.title : moduleNineFinal ? MODULE_9.finalChallenge.title : moduleTenFinal ? MODULE_10.finalChallenge.title : moduleThreeLesson?.title ?? moduleFourLesson?.title ?? moduleFiveLesson?.title ?? moduleSixLesson?.title ?? moduleSevenLesson?.title ?? moduleEightLesson?.title ?? moduleNineLesson?.title ?? moduleTenLesson?.title}</h1><p>{moduleThreeFinal || moduleFourFinal || moduleFiveFinal || moduleSixFinal || moduleSevenFinal || moduleEightFinal || moduleNineFinal || moduleTenFinal ? 'Le défi final sera ajouté dans la prochaine étape.' : 'Cette leçon est verrouillée et son contenu pédagogique sera ajouté dans la prochaine étape.'}</p><Link className="learn-primary" href="/apprendre">Retour aux modules</Link></section></main><Footer /></>
  const lesson = LEARNING_LESSONS[index]
  const nextLesson = LEARNING_LESSONS[index + 1]
  const moduleLabel = lesson.moduleId === 'public-transport-level-crossings' ? 'MODULE 10 · TRAMS, BUS & PASSAGES À NIVEAU' : lesson.moduleId === 'motorway-special-roads' ? 'MODULE 9 · AUTOROUTE & ROUTES SPÉCIALES' : lesson.moduleId === 'vulnerable-users-passengers' ? 'MODULE 8 · USAGERS VULNÉRABLES & PASSAGERS' : lesson.moduleId === 'vehicle-technical-safety' ? 'MODULE 7 · VÉHICULE & SÉCURITÉ TECHNIQUE' : lesson.moduleId === 'safety-behaviour' ? 'MODULE 6 · SÉCURITÉ, ALCOOL & ACCIDENTS' : lesson.moduleId === 'stopping-parking' ? 'MODULE 5 · ARRÊT & STATIONNEMENT' : lesson.moduleId === 'manoeuvres-overtaking' ? 'MODULE 4 · MANŒUVRES & DÉPASSEMENT' : lesson.moduleId === 'speed-road-position' ? 'MODULE 3 · VITESSE & POSITION' : lesson.moduleId === 'priorities-intersections' ? 'MODULE 2 · PRIORITÉS & CARREFOURS' : 'MODULE 1 · SIGNALISATION'
  return <><Navbar /><main className="learn-shell learn-lesson-page">{<><div className="learn-lesson-heading"><Link className="learn-back-to-modules" href="/apprendre">← Retour aux modules</Link><span className="learn-kicker">{moduleLabel}</span><h1>{lesson.title}</h1><p>{lesson.description}</p></div><LessonPlayer lesson={lesson} nextLessonId={nextLesson?.moduleId === lesson.moduleId ? nextLesson.id : undefined} nextHref={lesson.id === 'carrefours-complexes' ? '/apprendre/defi-final-priorites-carrefours' : lesson.id === 'situations-complexes-vitesse-position' ? '/apprendre/defi-final-vitesse-position' : lesson.id === 'manoeuvres-et-situations-complexes' ? '/apprendre/defi-final-manoeuvres-depassement' : lesson.id === 'emplacements-reserves-et-cas-complexes' ? '/apprendre/defi-final-arret-stationnement' : lesson.id === 'porter-secours-et-rester-sur-place' ? '/apprendre/defi-final-securite-alcool-accidents' : lesson.id === 'feux-visibilite-et-klaxon' ? '/apprendre/defi-final-vehicule-securite-technique' : lesson.id === 'angles-morts-et-partage-de-la-route' ? '/apprendre/defi-final-usagers-vulnerables-passagers' : lesson.id === 'zones-et-voies-speciales' ? '/apprendre/defi-final-autoroute-routes-speciales' : lesson.id === 'bus-quitte-son-arret' ? '/apprendre/defi-final-trams-bus-passages-a-niveau' : undefined} /></>}</main><Footer /></>
}




