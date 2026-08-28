import type { ExamBlueprint } from '@/domain/quiz'

export const VEHICULE_TECHNIQUE_EXAM_BLUEPRINT: ExamBlueprint = {
  id: 'vehicule-technique-exam',
  title: { fr: 'Examen blanc — Véhicule, charge et technique', nl: 'Proefexamen — Voertuig, lading en techniek' },
  questionCount: 9,
  durationMinutes: 8,
  maxErrorsAllowed: 1,
  themeDistribution: { 'vehicule-technique': 9 },
}
