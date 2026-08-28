import type { ExamAttempt } from './quiz'
import type { Language } from './language'
import type { Region } from './region'

export interface QuestionAttemptRecord {
  questionId: string
  themeSlug: string
  correct: boolean
  answeredAt: string
}

export interface ThemeStat {
  themeSlug: string
  attempts: number
  correct: number
  /** 0 à 1. */
  successRate: number
}

/**
 * Progression d'un utilisateur. `userId` vaut "local" tant qu'il n'y a pas
 * d'authentification (voir docs/ARCHITECTURE.md — remplacement prévu par
 * Supabase sans changer la forme de cet objet).
 */
export interface UserProgress {
  userId: string
  region: Region
  language: Language
  history: QuestionAttemptRecord[]
  examAttempts: ExamAttempt[]
}

/**
 * Port d'accès à la progression : le reste de l'app ne dépend que de cette
 * interface, jamais du mécanisme de stockage. Aujourd'hui implémentée par
 * un store localStorage (state/progress-store.ts) ; demain par Supabase,
 * sans toucher aux composants qui la consomment.
 */
export interface ProgressRepository {
  getProgress(): UserProgress
  recordQuestionAttempt(record: QuestionAttemptRecord): void
  recordExamAttempt(attempt: ExamAttempt): void
  getThemeStats(): ThemeStat[]
  /** Thèmes triés du plus faible au plus fort taux de réussite (pour les révisions ciblées). */
  getWeakThemes(limit?: number): ThemeStat[]
  reset(): void
}
