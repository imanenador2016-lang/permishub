import type { QualifAnswers, Segment } from './quiz-funnel-config'

/**
 * Règle de segmentation fournie par l'utilisateur (conversation du
 * 2026-09-08) — sert à choisir l'offre affichée sur la future page de
 * résultat (pas construite ici) :
 * - urgent + 2plus  → prioritaire (2 échecs au théorique = 12h d'auto-école
 *   légalement obligatoires, 100-150€ — le segment qui convertit le mieux)
 * - urgent + (0 ou 1) → chaud
 * - bientot + 2plus  → chaud
 * - tout le reste    → standard
 */
export function computeSegment({ echeance, tentatives }: Pick<QualifAnswers, 'echeance' | 'tentatives'>): Segment {
  if (echeance === 'urgent' && tentatives === '2plus') return 'prioritaire'
  if (echeance === 'urgent') return 'chaud'
  if (echeance === 'bientot' && tentatives === '2plus') return 'chaud'
  return 'standard'
}
