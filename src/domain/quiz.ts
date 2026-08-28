import type { LocalizedText } from './content'
import type { Region } from './region'

export type Difficulty = 'facile' | 'moyen' | 'difficile'

export interface AnswerOption {
  id: string
  text: LocalizedText
  correct: boolean
}

/** Une question d'entraînement ou d'examen, toujours adossée à des faits vérifiés. */
export interface Question {
  id: string
  themeSlug: string
  /** 'BE' si la question est valable partout ; sinon la région précise où elle s'applique. */
  region: Region
  prompt: LocalizedText
  /** Photo illustrant la question (ex. panneau, situation de circulation) — chemin sous /public. Optionnel : la plupart des questions restent uniquement textuelles. */
  imageUrl?: string
  options: AnswerOption[]
  explanation: LocalizedText
  factIds: string[]
  difficulty: Difficulty
}

/** Modèle d'examen blanc (nombre de questions, durée, seuil de réussite). */
export interface ExamBlueprint {
  id: string
  title: LocalizedText
  questionCount: number
  durationMinutes: number
  /** Nombre d'erreurs/points de pénalité tolérés avant échec. À aligner sur la règle officielle une fois vérifiée. */
  maxErrorsAllowed: number
  /** Répartition indicative de questions par thème (slug -> nombre). Optionnel pour le MVP. */
  themeDistribution?: Partial<Record<string, number>>
}

export interface ExamAnswer {
  questionId: string
  optionId: string
  correct: boolean
}

export interface ExamAttempt {
  id: string
  blueprintId: ExamBlueprint['id']
  region: Region
  language: 'fr' | 'nl'
  startedAt: string
  finishedAt?: string
  answers: ExamAnswer[]
  /** Score final, 0 à 1. */
  score: number
  passed: boolean
}
