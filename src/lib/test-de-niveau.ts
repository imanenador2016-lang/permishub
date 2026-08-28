import { TEST_DE_NIVEAU_PHOTO_QUESTIONS } from '@/content/test-de-niveau-questions'
import type { Question } from '@/domain/quiz'
import type { Region } from '@/domain/region'

export type Niveau = 'DEBUTANT' | 'INTERMEDIAIRE' | 'PRET'

/**
 * Les 11 questions avec photo fournies par l'utilisateur (voir
 * content/test-de-niveau-questions.ts et conversation du 2026-08-28) —
 * remplace l'ancien pool généré par thème (2 questions/thème piochées dans
 * content/verified/*). `region` gardé en paramètre pour ne pas casser les
 * appelants existants, mais ce pool fixe ne varie pas par région.
 */
export function getTestDeNiveauQuestions(_region: Region = 'BE'): Question[] {
  return TEST_DE_NIVEAU_PHOTO_QUESTIONS
}

export interface TestAnswer {
  questionId: string
  optionId: string
}

export interface TestResult {
  scoreByTheme: Record<string, number> // 0-100
  overallScore: number // 0-100
  /** Score brut ramené sur 10 (arrondi) — affiché à l'utilisateur, voir conversation du 2026-08-28. */
  score10: number
  correctCount: number
  totalCount: number
  level: Niveau
  weakestThemeSlugs: string[]
}

export function computeTestResult(answers: TestAnswer[], questions: Question[]): TestResult {
  const byTheme = new Map<string, { correct: number; total: number }>()

  for (const q of questions) {
    const entry = byTheme.get(q.themeSlug) ?? { correct: 0, total: 0 }
    const answer = answers.find((a) => a.questionId === q.id)
    const chosen = answer ? q.options.find((o) => o.id === answer.optionId) : undefined
    entry.total += 1
    if (chosen?.correct) entry.correct += 1
    byTheme.set(q.themeSlug, entry)
  }

  const scoreByTheme: Record<string, number> = {}
  for (const [slug, { correct, total }] of byTheme) {
    scoreByTheme[slug] = total > 0 ? Math.round((correct / total) * 100) : 0
  }

  const totalCorrect = [...byTheme.values()].reduce((sum, t) => sum + t.correct, 0)
  const totalCount = [...byTheme.values()].reduce((sum, t) => sum + t.total, 0)
  const overallScore = totalCount > 0 ? Math.round((totalCorrect / totalCount) * 100) : 0
  const score10 = totalCount > 0 ? Math.round((totalCorrect / totalCount) * 10) : 0

  const level: Niveau = overallScore >= 80 ? 'PRET' : overallScore >= 50 ? 'INTERMEDIAIRE' : 'DEBUTANT'

  // Ne remonte que de vrais thèmes faibles (score < 100) — sinon un score parfait affiche quand même 2 thèmes
  // "faibles" ex-æquo à 100%, ce qui contredit le message "tu connais déjà bien les règles" (voir conversation
  // du 2026-08-28).
  const weakestThemeSlugs = Object.entries(scoreByTheme)
    .filter(([, score]) => score < 100)
    .sort((a, b) => a[1] - b[1])
    .slice(0, 2)
    .map(([slug]) => slug)

  return { scoreByTheme, overallScore, score10, correctCount: totalCorrect, totalCount, level, weakestThemeSlugs }
}
