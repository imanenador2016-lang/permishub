import type { ExamBlueprint } from '@/domain/quiz'

export const STATIONNEMENT_EXAM_BLUEPRINT: ExamBlueprint = {
  id: 'stationnement-exam',
  title: { fr: 'Examen blanc — Arrêt et stationnement', nl: 'Proefexamen — Stilstaan en parkeren' },
  questionCount: 7,
  durationMinutes: 6,
  maxErrorsAllowed: 1,
  themeDistribution: { stationnement: 7 },
}
