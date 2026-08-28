import examen1Raw from '../../data/examen-blanc.json'
import examen2Raw from '../../data/examens-blancs/examen-2.json'
import examen3Raw from '../../data/examens-blancs/examen-3.json'
import examen4Raw from '../../data/examens-blancs/examen-4.json'
import examen5Raw from '../../data/examens-blancs/examen-5.json'
import examen6Raw from '../../data/examens-blancs/examen-6.json'
import examen7Raw from '../../data/examens-blancs/examen-7.json'
import type { ExamenPhotoQuestion } from '@/domain/examen-photo'

/**
 * Registre des examens blancs "photo" du site — à terme un seul gratuit
 * (le premier intégré, voir conversation du 2026-08-24), les suivants
 * réservés au pack "Examens illimités" (voir src/content/pricing-config.ts).
 *
 * Verrou volontairement "à l'affichage" uniquement (voir conversation du
 * 2026-08-26) : le site n'a pas de compte/session pour vérifier un achat,
 * donc `free: false` masque juste le lien direct et route vers l'achat —
 * ça n'empêche pas techniquement quelqu'un qui devine l'URL d'un examen
 * payant d'y accéder. Un vrai contrôle d'accès demanderait un système de
 * compte ou un jeton post-paiement Stripe, pas encore construit.
 *
 * `hideCorrection` est un flag séparé de `free` : c'est lui qui masque la
 * correction détaillée en fin d'examen (voir ExamenBlanc.tsx), pas le
 * statut payant en lui-même — ça permet de laisser 2 et 3 temporairement
 * accessibles (voir ci-dessous) sans pour autant cacher leur correction,
 * utile pour relire le contenu.
 *
 * ⚠️ TEMPORAIRE (2026-08-26, étendu le 2026-08-27 aux examens 4-7) :
 * examen-2 à examen-7 passés en `free: true` à la demande de l'utilisateur,
 * le temps qu'il relise le contenu. Remettre `free: false` avant la mise
 * en ligne définitive du verrou payant.
 */
export interface ExamenBlancEntry {
  slug: string
  title: string
  free: boolean
  /** Masque la correction détaillée en fin d'examen — indépendant de `free`, voir plus haut. */
  hideCorrection?: boolean
  questions: ExamenPhotoQuestion[]
}

export const EXAMENS_BLANCS: ExamenBlancEntry[] = [
  { slug: 'examen-1', title: 'Examen 1', free: true, hideCorrection: true, questions: examen1Raw as ExamenPhotoQuestion[] },
  { slug: 'examen-2', title: 'Examen 2', free: true, questions: examen2Raw as ExamenPhotoQuestion[] },
  { slug: 'examen-3', title: 'Examen 3', free: true, questions: examen3Raw as ExamenPhotoQuestion[] },
  { slug: 'examen-4', title: 'Examen 4', free: true, questions: examen4Raw as ExamenPhotoQuestion[] },
  { slug: 'examen-5', title: 'Examen 5', free: true, questions: examen5Raw as ExamenPhotoQuestion[] },
  { slug: 'examen-6', title: 'Examen 6', free: true, questions: examen6Raw as ExamenPhotoQuestion[] },
  { slug: 'examen-7', title: 'Examen 7', free: true, questions: examen7Raw as ExamenPhotoQuestion[] },
]

export function getExamenBlanc(slug: string): ExamenBlancEntry | undefined {
  return EXAMENS_BLANCS.find((e) => e.slug === slug)
}

/** Résumé léger d'un examen — pour la liste (voir ExamenBlancPicker.tsx), qui n'a besoin ni du texte des questions ni des photos, seulement du compte. Évite d'envoyer au client les ~200 Ko de contenu des 7 examens juste pour afficher 3 cartes — voir audit performance du 2026-08-28. */
export interface ExamenBlancSummary {
  slug: string
  title: string
  free: boolean
  questionCount: number
}

export function getExamensBlancsSummary(): ExamenBlancSummary[] {
  return EXAMENS_BLANCS.map((e) => ({ slug: e.slug, title: e.title, free: e.free, questionCount: e.questions.length }))
}
