import type { LocalizedText } from './content'
import type { Region } from './region'

/**
 * Un centre d'examen pratique. Chaque centre est vendu séparément (pas
 * d'abonnement global) : payer pour un centre ne donne accès qu'aux
 * circuits de CE centre — voir docs/PRICING.md.
 */
export interface ExamCenter {
  id: string
  slug: string
  name: string
  region: Region
  /** Prix en centimes, pour éviter les erreurs d'arrondi flottant (2499 = 24,99 €). */
  priceCents: number
  /**
   * Coordonnées approximatives du centre-ville (géographie publique), PAS
   * l'adresse exacte du centre d'examen GOCA — à remplacer une fois les
   * vraies adresses confirmées. Servent à construire un lien Google Maps
   * fonctionnel avant que le tracé réel du circuit ne soit prêt.
   */
  lat?: number
  lng?: number
  /** Centre pas encore ouvert à la vente (circuits pas encore prêts) — affiché verrouillé "Bientôt". */
  comingSoon?: boolean
  /**
   * Résumé du centre en général (ambiance, type de circulation dominante),
   * affiché en tête de la page centre — 2 lignes max. Absent = un
   * placeholder "à compléter" est affiché, jamais de texte inventé.
   */
  summary?: LocalizedText
  /**
   * Exigence des examinateurs de ce centre, de 0 (souple) à 100 (strict).
   * Absent = valeur neutre par défaut affichée (DEFAULT_EXAMINER_STRICTNESS),
   * jamais une estimation inventée.
   */
  examinerStrictness?: number
  /** Pièges spécifiques à ce centre (2-4 puces). Absent/vide = section masquée. */
  pitfalls?: LocalizedText[]
  /** Compétences clés à maîtriser pour ce centre, en tags (pas de description). Absent/vide = section masquée. */
  masteryTags?: LocalizedText[]
}

/** Valeur neutre affichée quand `ExamCenter.examinerStrictness` n'a pas encore été renseigné. */
export const DEFAULT_EXAMINER_STRICTNESS = 50

export type StrictnessLevel = 'souple' | 'modere' | 'strict'

/** Mappe une valeur 0-100 sur les 3 paliers affichés au-dessus du curseur de la barre d'exigence. */
export function getStrictnessLevel(value: number): StrictnessLevel {
  if (value < 34) return 'souple'
  if (value < 67) return 'modere'
  return 'strict'
}

/**
 * Un itinéraire d'entraînement autour d'un centre d'examen. Le contenu réel
 * (tracé GPS précis, lien Google Maps) n'est pas encore disponible : ces
 * entrées sont des emplacements de contenu prêts à être complétés une fois
 * les circuits réels vérifiés — jamais présentés comme le tracé officiel de
 * l'examen tant qu'ils n'ont pas été vérifiés.
 */
export type CircuitDifficulty = 'facile' | 'moyen' | 'difficile'

export interface PracticeCircuit {
  id: string
  centerSlug: ExamCenter['slug']
  title: LocalizedText
  description: LocalizedText
  /** Lien Google Maps vers le tracé — absent tant que le contenu réel n'a pas été préparé. */
  mapsUrl?: string
  durationMinutes?: number
  /** Vendu à l'unité (brief v2 §Monétisation) — en centimes, comme ExamCenter.priceCents. */
  priceCents?: number
  distanceKm?: number
  attentionPointsCount?: number
  /**
   * Placeholder en attendant une méthode de calcul réelle (nombre de
   * ronds-points, retours élèves/auto-écoles — voir brief v2). Champ pensé
   * pour être éditable en base, jamais une valeur arbitraire figée dans le
   * code une fois le vrai calcul en place.
   */
  difficulty?: CircuitDifficulty
}

export function formatPrice(priceCents: number, locale: 'fr' | 'nl'): string {
  return new Intl.NumberFormat(locale === 'fr' ? 'fr-BE' : 'nl-BE', {
    style: 'currency',
    currency: 'EUR',
  }).format(priceCents / 100)
}
