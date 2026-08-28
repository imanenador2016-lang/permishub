import type { ExamenPhotoQuestion } from '@/domain/examen-photo'

/**
 * Budget de pénalité toléré avant échec — calqué sur examens 2/3/4.docx
 * (voir conversation du 2026-08-24/26) : l'examen théorique belge réel
 * compte 50 questions et tolère 9 points de pénalité avant échec (41/50
 * pour réussir — confirmé par l'utilisateur, cohérent avec les
 * récapitulatifs de score trouvés dans chacun des 3 documents sources,
 * formule vérifiée à chaque fois : score = total - fautes graves×5 -
 * fautes normales×1).
 *
 * Chaque examen du site n'a pas forcément 50 questions (certaines étaient
 * incomplètes dans le .docx source et ont été retirées) — on garde donc ce
 * même budget de 9 points plutôt qu'un seuil brut de 41, pour rester
 * cohérent quel que soit le total réel de questions.
 */
export const EXAMEN_BLANC_PENALTY_BUDGET = 9
export const POINTS_PER_NORMALE_FAULT = 1
export const POINTS_PER_GRAVE_FAULT = 5

export function getExamenBlancScoring(totalQuestions: number) {
  return {
    totalPoints: totalQuestions,
    passThreshold: totalQuestions - EXAMEN_BLANC_PENALTY_BUDGET,
  }
}

export interface ExamenBlancAnswer {
  questionId: number
  /** Lettre choisie, "OUI"/"NON", ou la valeur saisie pour une question numérique. */
  value: string
}

export interface ExamenBlancQuestionResult {
  question: ExamenPhotoQuestion
  answer?: string
  correct: boolean
}

export interface ExamenBlancResult {
  score: number
  total: number
  passed: boolean
  gravesFautes: number
  normalesFautes: number
  perQuestion: ExamenBlancQuestionResult[]
}

function normalize(value: string): string {
  return value.trim().toUpperCase()
}

export function isAnswerCorrect(question: ExamenPhotoQuestion, value: string | undefined): boolean {
  if (!value) return false
  return normalize(value) === normalize(question.reponse)
}

export function computeExamenBlancResult(answers: ExamenBlancAnswer[], questions: ExamenPhotoQuestion[]): ExamenBlancResult {
  const { totalPoints, passThreshold } = getExamenBlancScoring(questions.length)

  let gravesFautes = 0
  let normalesFautes = 0

  const perQuestion: ExamenBlancQuestionResult[] = questions.map((question) => {
    const answer = answers.find((a) => a.questionId === question.id)?.value
    const correct = isAnswerCorrect(question, answer)
    if (!correct) {
      if (question.gravite === 'grave') gravesFautes += 1
      else normalesFautes += 1
    }
    return { question, answer, correct }
  })

  const score = totalPoints - gravesFautes * POINTS_PER_GRAVE_FAULT - normalesFautes * POINTS_PER_NORMALE_FAULT

  return {
    score,
    total: totalPoints,
    passed: score >= passThreshold,
    gravesFautes,
    normalesFautes,
    perQuestion,
  }
}
