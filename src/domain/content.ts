import type { Language } from './language'
import type { Region } from './region'

/** Texte disponible dans toutes les langues supportées. Jamais de texte "en dur" mono-langue dans le contenu. */
export type LocalizedText = Record<Language, string>

/**
 * Un thème du code de la route (ex. "Priorités", "Signalisation", "Stationnement").
 * Reflète généralement un chapitre des PDF sources, sans y être couplé 1:1.
 */
export interface Theme {
  slug: string
  title: LocalizedText
  description: LocalizedText
  /** Nom d'icône Lucide (voir components/ui/Icon.tsx). */
  icon: string
  order: number
  /**
   * Régions où ce thème comporte des règles divergentes.
   * Liste vide = règle uniforme au niveau belge (region 'BE' partout).
   */
  regionalVariants: Region[]
}

/** Une ligne d'un tableau comparatif régional (ex. vitesse max par région). */
export interface RegionComparisonRow {
  label: LocalizedText
  valuesByRegion: Partial<Record<Region, LocalizedText>>
}

/** Tableau visuel comparant une même règle entre régions — pour rendre une divergence lisible d'un coup d'œil. */
export interface RegionComparisonTable {
  caption: LocalizedText
  rows: RegionComparisonRow[]
}

/** Encadré pédagogique : "à retenir" (renforcement) ou "attention" (piège fréquent / erreur à l'examen). */
export interface LessonCallout {
  kind: 'retenir' | 'attention'
  text: LocalizedText
}

/**
 * Un chapitre court de leçon. Volontairement plus riche qu'un simple bloc de
 * texte : c'est l'unité consommée à l'écran sur mobile (un chapitre = un
 * écran), donc chaque champ correspond à un élément visuel précis de
 * LessonRunner (composants/lesson/*).
 */
export interface LessonChapter {
  id: string
  title: LocalizedText
  /** 2-4 paragraphes courts maximum — jamais un pavé de texte. */
  paragraphs: LocalizedText[]
  examples?: LocalizedText[]
  callouts?: LessonCallout[]
  table?: RegionComparisonTable
  /** Faits vérifiés (domain/source.ts) qui justifient ce chapitre. */
  factIds: string[]
  /** Questions (domain/quiz.ts) utilisées comme mini-quiz de fin de chapitre. */
  miniQuizQuestionIds: string[]
}

/** Une leçon : unité consommée par l'utilisateur dans le parcours "Apprendre". */
export interface Lesson {
  slug: string
  themeSlug: Theme['slug']
  title: LocalizedText
  intro: LocalizedText
  objectives: LocalizedText[]
  estimatedMinutes: number
  chapters: LessonChapter[]
  summary: LocalizedText
}
