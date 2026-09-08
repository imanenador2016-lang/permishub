/**
 * Tunnel de qualification + capture email du test de niveau (voir
 * conversation du 2026-09-08 — brief en 2 temps : cette étape ne construit
 * QUE la qualification + l'email, le vrai test/quiz et l'écran de résultat
 * viennent après, remplaceront le step "test" ci-dessous).
 */

export type ExamenVise = 'theorique' | 'pratique' | 'les_deux'
export type Echeance = 'urgent' | 'bientot' | 'froid'
export type Tentatives = '0' | '1' | '2plus'
export type Segment = 'prioritaire' | 'chaud' | 'standard'

export interface QualifAnswers {
  examenVise: ExamenVise | null
  echeance: Echeance | null
  tentatives: Tentatives | null
}

export const EMPTY_QUALIF_ANSWERS: QualifAnswers = {
  examenVise: null,
  echeance: null,
  tentatives: null,
}

/**
 * Où placer l'écran de capture email par rapport au test — configurable
 * sans refactor, comme demandé. 'before_test' (défaut au démarrage) : email
 * demandé juste après la qualification (Q1-Q3), avant le test. 'after_test'
 * : le test se ferait d'abord, l'email serait demandé juste avant/avec le
 * résultat — le "test" n'existe pas encore dans cette étape (voir plus
 * haut), donc ce réglage prépare déjà l'ordre des écrans pour plus tard,
 * mais n'a pas encore d'effet visible sur un vrai test.
 */
export const EMAIL_GATE_POSITION: 'before_test' | 'after_test' = 'before_test'

/**
 * Étapes du tunnel dans l'ordre — dérivées de EMAIL_GATE_POSITION.
 * 'test' est un placeholder (voir QuizFunnel.tsx) : sera remplacé par le
 * vrai composant de test quand il sera construit, sans toucher à cet ordre.
 */
export type FunnelStep = 'q1' | 'q2' | 'q3' | 'email' | 'test'

export const FUNNEL_STEPS: FunnelStep[] =
  EMAIL_GATE_POSITION === 'before_test' ? ['q1', 'q2', 'q3', 'email', 'test'] : ['q1', 'q2', 'q3', 'test', 'email']
