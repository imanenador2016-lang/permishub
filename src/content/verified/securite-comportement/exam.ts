import type { ExamBlueprint } from '@/domain/quiz'

export const SECURITE_COMPORTEMENT_EXAM_BLUEPRINT: ExamBlueprint = {
  id: 'securite-comportement-exam',
  title: { fr: 'Examen blanc — Sécurité, alcool et accidents', nl: 'Proefexamen — Veiligheid, alcohol en ongevallen' },
  questionCount: 10,
  durationMinutes: 9,
  maxErrorsAllowed: 1,
  themeDistribution: { 'securite-comportement': 10 },
}
