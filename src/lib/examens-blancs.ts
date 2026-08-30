import examen1Raw from '../../data/examen-blanc.json'
import examen2Raw from '../../data/examens-blancs/examen-2.json'
import examen3Raw from '../../data/examens-blancs/examen-3.json'
import examen4Raw from '../../data/examens-blancs/examen-4.json'
import examen5Raw from '../../data/examens-blancs/examen-5.json'
import examen6Raw from '../../data/examens-blancs/examen-6.json'
import examen7Raw from '../../data/examens-blancs/examen-7.json'
import type { ExamenPhotoQuestion } from '@/domain/examen-photo'

/**
 * Registre des examens blancs "photo" du site — tous réservés au pack
 * "Examens illimités" (voir src/content/pricing-config.ts), plus aucun
 * gratuit (voir conversation du 2026-08-30 : le client a retiré le teaser
 * examen-1, jugé pas assez incitatif à l'achat).
 *
 * Verrou volontairement "à l'affichage + à l'entrée" (ExamAccessGate.tsx
 * sur la page [slug]), pas un vrai contrôle d'accès serveur : le site n'a
 * pas de compte/session pour vérifier un achat, donc `free: false` cache le
 * lien direct dans le picker ET bloque l'entrée côté client (localStorage,
 * posé après vérification Stripe sur packs/succes) — ça n'empêche pas
 * techniquement quelqu'un d'inspecter le payload réseau d'un examen payant.
 * Un vrai contrôle d'accès demanderait un système de compte ou un jeton
 * post-paiement Stripe, pas encore construit.
 *
 * `hideCorrection` est un flag séparé de `free` : c'est lui qui masque la
 * correction détaillée en fin d'examen (voir ExamenBlanc.tsx), pas le
 * statut payant en lui-même.
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
  { slug: 'examen-1', title: 'Examen 1', free: false, hideCorrection: true, questions: examen1Raw as ExamenPhotoQuestion[] },
  { slug: 'examen-2', title: 'Examen 2', free: false, questions: examen2Raw as ExamenPhotoQuestion[] },
  { slug: 'examen-3', title: 'Examen 3', free: false, questions: examen3Raw as ExamenPhotoQuestion[] },
  { slug: 'examen-4', title: 'Examen 4', free: false, questions: examen4Raw as ExamenPhotoQuestion[] },
  { slug: 'examen-5', title: 'Examen 5', free: false, questions: examen5Raw as ExamenPhotoQuestion[] },
  { slug: 'examen-6', title: 'Examen 6', free: false, questions: examen6Raw as ExamenPhotoQuestion[] },
  { slug: 'examen-7', title: 'Examen 7', free: false, questions: examen7Raw as ExamenPhotoQuestion[] },
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
