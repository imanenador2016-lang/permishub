import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { QuestionAttemptRecord, ThemeStat, UserProgress } from '@/domain/progress'
import type { ExamAttempt } from '@/domain/quiz'

interface ProgressState extends UserProgress {
  recordQuestionAttempt: (record: QuestionAttemptRecord) => void
  recordExamAttempt: (attempt: ExamAttempt) => void
  getThemeStats: () => ThemeStat[]
  getWeakThemes: (limit?: number) => ThemeStat[]
  reset: () => void
}

function computeThemeStats(history: QuestionAttemptRecord[]): ThemeStat[] {
  const byTheme = new Map<string, { attempts: number; correct: number }>()
  for (const record of history) {
    const current = byTheme.get(record.themeSlug) ?? { attempts: 0, correct: 0 }
    current.attempts += 1
    if (record.correct) current.correct += 1
    byTheme.set(record.themeSlug, current)
  }
  return [...byTheme.entries()].map(([themeSlug, v]) => ({
    themeSlug,
    attempts: v.attempts,
    correct: v.correct,
    successRate: v.attempts > 0 ? v.correct / v.attempts : 0,
  }))
}

/**
 * Implémentation locale (localStorage) du port `ProgressRepository`
 * (domain/progress.ts). Destinée à être remplacée par une implémentation
 * Supabase le jour venu, sans changer la manière dont les pages lisent la
 * progression (même forme de données).
 */
export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      userId: 'local',
      region: 'BE',
      language: 'fr',
      history: [],
      examAttempts: [],
      recordQuestionAttempt: (record) => set((s) => ({ history: [...s.history, record] })),
      recordExamAttempt: (attempt) => set((s) => ({ examAttempts: [...s.examAttempts, attempt] })),
      getThemeStats: () => computeThemeStats(get().history),
      getWeakThemes: (limit = 3) =>
        computeThemeStats(get().history)
          .filter((t) => t.attempts > 0)
          .sort((a, b) => a.successRate - b.successRate)
          .slice(0, limit),
      reset: () => set({ history: [], examAttempts: [] }),
    }),
    { name: 'permishub.progress' },
  ),
)
