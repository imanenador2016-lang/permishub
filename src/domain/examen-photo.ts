/**
 * Questions de l'examen blanc "photo" — extraites de examens 2.docx (voir
 * data/examen-blanc.json, généré par scripts/build-examen-blanc-data.mjs et
 * scripts/process-exam-blanc-images.mjs). Contenu français uniquement (pas
 * de version NL disponible dans la source) — distinct du modèle `Question`
 * bilingue de src/domain/quiz.ts utilisé pour le reste du site.
 */

export type ExamenPhotoQuestionType = 'choix_multiple' | 'oui_non' | 'numerique'
export type ExamenPhotoGravite = 'normale' | 'grave'

export interface ExamenPhotoQuestion {
  id: number
  type: ExamenPhotoQuestionType
  /** 'grave' = faute grave (pénalité plus lourde), voir src/lib/examen-blanc.ts */
  gravite: ExamenPhotoGravite
  question: string
  /** Options au format "A. ...", "B. ..." — vide pour oui_non/numerique. */
  choix: string[]
  /** Lettre ("A"), "OUI"/"NON", ou nombre en chaîne selon `type`. */
  reponse: string
  explication: string
  /** Chemin public de la photo (voir public/examen-blanc/). */
  image: string
}
