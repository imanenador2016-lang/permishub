import type { Theme, Lesson } from '@/domain/content'
import type { Question, ExamBlueprint } from '@/domain/quiz'
import type { Region } from '@/domain/region'
import type { SourceDocument, VerifiedFact } from '@/domain/source'
import { SOURCE_DOCUMENTS } from './sources-registry'
import {
  VOIE_PUBLIQUE_THEME,
  VOIE_PUBLIQUE_LESSON,
  VOIE_PUBLIQUE_LESSONS_MORE,
  VOIE_PUBLIQUE_QUESTIONS,
  VOIE_PUBLIQUE_EXAM_BLUEPRINT,
  VOIE_PUBLIQUE_FACTS,
} from './verified/voie-publique'
import {
  CIRCULATION_VITESSE_THEME,
  CIRCULATION_VITESSE_LESSONS,
  CIRCULATION_VITESSE_QUESTIONS,
  CIRCULATION_VITESSE_EXAM_BLUEPRINT,
  CIRCULATION_VITESSE_FACTS,
} from './verified/circulation-vitesse'
import {
  SIGNALISATION_PRIORITES_THEME,
  SIGNALISATION_PRIORITES_LESSONS,
  SIGNALISATION_PRIORITES_QUESTIONS,
  SIGNALISATION_PRIORITES_EXAM_BLUEPRINT,
  SIGNALISATION_PRIORITES_FACTS,
} from './verified/signalisation-priorites'
import {
  STATIONNEMENT_THEME,
  STATIONNEMENT_LESSONS,
  STATIONNEMENT_QUESTIONS,
  STATIONNEMENT_EXAM_BLUEPRINT,
  STATIONNEMENT_FACTS,
} from './verified/stationnement'
import {
  VEHICULE_TECHNIQUE_THEME,
  VEHICULE_TECHNIQUE_LESSONS,
  VEHICULE_TECHNIQUE_QUESTIONS,
  VEHICULE_TECHNIQUE_EXAM_BLUEPRINT,
  VEHICULE_TECHNIQUE_FACTS,
} from './verified/vehicule-technique'
import {
  SECURITE_COMPORTEMENT_THEME,
  SECURITE_COMPORTEMENT_LESSONS,
  SECURITE_COMPORTEMENT_QUESTIONS,
  SECURITE_COMPORTEMENT_EXAM_BLUEPRINT,
  SECURITE_COMPORTEMENT_FACTS,
} from './verified/securite-comportement'
import { DOCUMENTS_PERMIS_QUESTIONS } from './imported/documents-permis-quiz'
import { SYNTHESE_B_QUESTIONS, SYNTHESE_B_FACTS } from './verified/synthese-b'

/**
 * Point d'accès unique au contenu pédagogique. Les 6 thèmes ci-dessous sont
 * du contenu réel, extrait des PDF listés dans src/content/sources-registry.ts
 * avec citation de page pour chaque fait (voir src/content/verified/* et
 * docs/CONTENT_PIPELINE.md) — première passe encore en attente de relecture
 * humaine croisée avant d'être considérée définitivement validée.
 *
 * Une fois d'autres PDF traités, il suffit d'ajouter leurs thèmes/leçons/
 * questions/faits ici — les pages qui consomment ce module n'ont pas à
 * changer.
 */

const THEMES: Theme[] = [
  VOIE_PUBLIQUE_THEME,
  CIRCULATION_VITESSE_THEME,
  SIGNALISATION_PRIORITES_THEME,
  STATIONNEMENT_THEME,
  VEHICULE_TECHNIQUE_THEME,
  SECURITE_COMPORTEMENT_THEME,
]

const LESSONS: Lesson[] = [
  VOIE_PUBLIQUE_LESSON,
  ...VOIE_PUBLIQUE_LESSONS_MORE,
  ...CIRCULATION_VITESSE_LESSONS,
  ...SIGNALISATION_PRIORITES_LESSONS,
  ...STATIONNEMENT_LESSONS,
  ...VEHICULE_TECHNIQUE_LESSONS,
  ...SECURITE_COMPORTEMENT_LESSONS,
]

const QUESTIONS: Question[] = [
  // En tête : contenu réellement vérifié (page PDF citée) de syntheseB.pdf
  // — voir verified/synthese-b/. Puis le contenu transcrit (sans page
  // précise) de documents-permis/permisssssss.md — voir
  // content/imported/documents-permis-quiz.ts. Cet ordre fait que
  // getQuestionsByTheme()/le test de niveau servent le mieux sourcé en premier.
  ...SYNTHESE_B_QUESTIONS,
  ...DOCUMENTS_PERMIS_QUESTIONS,
  ...VOIE_PUBLIQUE_QUESTIONS,
  ...CIRCULATION_VITESSE_QUESTIONS,
  ...SIGNALISATION_PRIORITES_QUESTIONS,
  ...STATIONNEMENT_QUESTIONS,
  ...VEHICULE_TECHNIQUE_QUESTIONS,
  ...SECURITE_COMPORTEMENT_QUESTIONS,
]

const EXAM_BLUEPRINTS: ExamBlueprint[] = [
  VOIE_PUBLIQUE_EXAM_BLUEPRINT,
  CIRCULATION_VITESSE_EXAM_BLUEPRINT,
  SIGNALISATION_PRIORITES_EXAM_BLUEPRINT,
  STATIONNEMENT_EXAM_BLUEPRINT,
  VEHICULE_TECHNIQUE_EXAM_BLUEPRINT,
  SECURITE_COMPORTEMENT_EXAM_BLUEPRINT,
]

const FACTS: VerifiedFact[] = [
  ...SYNTHESE_B_FACTS,
  ...VOIE_PUBLIQUE_FACTS,
  ...CIRCULATION_VITESSE_FACTS,
  ...SIGNALISATION_PRIORITES_FACTS,
  ...STATIONNEMENT_FACTS,
  ...VEHICULE_TECHNIQUE_FACTS,
  ...SECURITE_COMPORTEMENT_FACTS,
]

/** Pas de contenu de démonstration branché actuellement — tout ce qui est publié est du contenu réel sourcé. */
export function isDemoTheme(_slug: string): boolean {
  return false
}

export function getThemes(): Theme[] {
  return [...THEMES].sort((a, b) => a.order - b.order)
}

export function getTheme(slug: string): Theme | undefined {
  return THEMES.find((t) => t.slug === slug)
}

export function getLessonsByTheme(themeSlug: string): Lesson[] {
  return LESSONS.filter((l) => l.themeSlug === themeSlug)
}

export function getLesson(themeSlug: string, lessonSlug: string): Lesson | undefined {
  return LESSONS.find((l) => l.themeSlug === themeSlug && l.slug === lessonSlug)
}

/** Questions d'un thème, valables pour la région donnée (BE = valable partout). */
export function getQuestionsByTheme(themeSlug: string, region: Region): Question[] {
  return QUESTIONS.filter((q) => q.themeSlug === themeSlug && (q.region === 'BE' || q.region === region))
}

export function getQuestionsByIds(ids: string[]): Question[] {
  return ids.map((id) => QUESTIONS.find((q) => q.id === id)).filter((q): q is Question => !!q)
}

export function getExamBlueprints(): ExamBlueprint[] {
  return EXAM_BLUEPRINTS
}

export function getExamBlueprint(id: string): ExamBlueprint | undefined {
  return EXAM_BLUEPRINTS.find((b) => b.id === id)
}

/**
 * Construit le pool de questions d'un examen en respectant la répartition
 * par thème du blueprint (blueprint.themeDistribution) — chaque thème ne
 * fournit que ses propres questions, dans la proportion demandée, au lieu
 * de piocher dans un pool global qui mélangerait les thèmes.
 */
export function getQuestionsForExam(blueprint: ExamBlueprint, region: Region): Question[] {
  const eligible = (themeSlug: string) =>
    QUESTIONS.filter((q) => q.themeSlug === themeSlug && (q.region === 'BE' || q.region === region))

  const distribution = blueprint.themeDistribution ?? {}
  const entries = Object.entries(distribution)

  if (entries.length === 0) {
    // Pas de répartition déclarée : on retombe sur les questions du thème
    // implicite dérivé de l'id du blueprint (ex. "voie-publique-exam").
    const fallbackTheme = blueprint.id.replace(/-exam$/, '')
    return eligible(fallbackTheme).slice(0, blueprint.questionCount)
  }

  return entries.flatMap(([themeSlug, count]) => eligible(themeSlug).slice(0, count))
}

export function getSourceDocument(id: string): SourceDocument | undefined {
  return SOURCE_DOCUMENTS.find((d) => d.id === id)
}

export function getFacts(ids: string[]): VerifiedFact[] {
  return ids.map((id) => FACTS.find((f) => f.id === id)).filter((f): f is VerifiedFact => !!f)
}
