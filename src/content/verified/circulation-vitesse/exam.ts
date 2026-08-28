import type { ExamBlueprint } from '@/domain/quiz'

/** `maxErrorsAllowed` : valeur provisoire, non officielle — voir docs/CONTENT_PIPELINE.md. */
export const CIRCULATION_VITESSE_EXAM_BLUEPRINT: ExamBlueprint = {
  id: 'circulation-vitesse-exam',
  title: { fr: 'Examen blanc — Circulation, vitesse et dépassement', nl: 'Proefexamen — Verkeer, snelheid en inhalen' },
  questionCount: 17,
  durationMinutes: 15,
  maxErrorsAllowed: 2,
  themeDistribution: { 'circulation-vitesse': 17 },
}
