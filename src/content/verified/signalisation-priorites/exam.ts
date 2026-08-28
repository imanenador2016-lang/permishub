import type { ExamBlueprint } from '@/domain/quiz'

export const SIGNALISATION_PRIORITES_EXAM_BLUEPRINT: ExamBlueprint = {
  id: 'signalisation-priorites-exam',
  title: { fr: 'Examen blanc — Signalisation et priorités', nl: 'Proefexamen — Signalisatie en voorrang' },
  questionCount: 12,
  durationMinutes: 10,
  maxErrorsAllowed: 2,
  themeDistribution: { 'signalisation-priorites': 12 },
}
