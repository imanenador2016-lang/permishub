import type { ExamBlueprint } from '@/domain/quiz'

/**
 * `maxErrorsAllowed` n'est PAS le seuil officiel réel de l'examen
 * théorique belge (ce PDF ne le mentionne pas) — valeur provisoire, à
 * remplacer dès qu'une source officielle le confirme (voir
 * docs/CONTENT_PIPELINE.md).
 */
export const VOIE_PUBLIQUE_EXAM_BLUEPRINT: ExamBlueprint = {
  id: 'voie-publique-exam',
  title: { fr: 'Examen blanc — La voie publique et la chaussée', nl: 'Proefexamen — De openbare weg en de rijbaan' },
  questionCount: 9,
  durationMinutes: 8,
  maxErrorsAllowed: 1,
  themeDistribution: { 'voie-publique': 9 },
}
