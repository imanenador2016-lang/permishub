/**
 * Questions de l'examen blanc "photo" — extraites de examens 2.docx (voir
 * data/examen-blanc.json, généré par scripts/build-examen-blanc-data.mjs et
 * scripts/process-exam-blanc-images.mjs). Contenu français uniquement (pas
 * de version NL disponible dans la source) — distinct du modèle `Question`
 * bilingue de src/domain/quiz.ts utilisé pour le reste du site.
 */

export type ExamenPhotoQuestionType = 'choix_multiple' | 'oui_non' | 'numerique'
export type ExamenPhotoGravite = 'normale' | 'grave'

export interface ExamenPhotoVisualAnnotation {
  /** Lettre affichee dans la pastille (A, B, C ou D). */
  label: string
  /** Position horizontale en pourcentage de la largeur de l'image source. */
  x: number
  /** Position verticale en pourcentage de la hauteur de l'image source. */
  y: number
}

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
  /** Nouveau visuel PermisHub. Absent tant que l'illustration n'a pas ete creee. */
  image?: string
  /** La question ne peut pas etre comprise correctement sans support visuel. */
  needsNewImage?: boolean
  /** Cahier des charges autonome du futur visuel, sans reference a l'ancienne image. */
  imageBrief?: string
  /** Code du signal belge a prendre dans la bibliotheque centralisee. */
  signRef?: string
  /** Dimensions de reference utilisees pour conserver les annotations au bon endroit a toutes les tailles d'ecran. */
  imageWidth?: number
  imageHeight?: number
  /** Pastilles liees aux vehicules lorsque la question les designe par lettre. */
  visualAnnotations?: ExamenPhotoVisualAnnotation[]
  /** A verifier par un juriste ou lorsque l'ancien visuel ne permet pas de valider la correction. */
  needsLegalReview?: boolean
}
