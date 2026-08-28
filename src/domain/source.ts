import type { Language } from './language'
import type { Region } from './region'

/**
 * Traçabilité du contenu — le cœur de la pipeline documentaire.
 *
 *   PDF source → fait vérifié → cours / question / examen
 *
 * Règle non négociable : aucune information réglementaire ne doit être
 * publiée sans pouvoir remonter jusqu'à un SourceDocument + une page.
 * Voir docs/CONTENT_PIPELINE.md pour le processus complet.
 */

/** Un document PDF de référence, tel que catalogué dans le registre des sources. */
export interface SourceDocument {
  /** Identifiant stable, ex. "voie-publique-01" */
  id: string
  /** Nom de fichier original dans le dossier /sources/ (documents-permis). */
  filename: string
  /** Titre lisible du document. */
  title: string
  /** Nombre de pages, si connu. */
  pageCount?: number
  /**
   * Statut de traitement dans la pipeline documentaire.
   * - "non_traite"   : catalogué, pas encore lu/exploité
   * - "en_cours"     : en cours d'extraction/vérification
   * - "traite"       : des faits vérifiés en ont été extraits
   */
  status: 'non_traite' | 'en_cours' | 'traite'
  /** Notes libres (ex. doublon détecté avec un autre fichier). */
  notes?: string
}

/**
 * Pointeur précis vers l'endroit exact, dans une source, qui justifie
 * une information. C'est l'unité de vérifiabilité de tout le contenu.
 */
export interface SourceReference {
  sourceId: SourceDocument['id']
  /** Numéro de page dans le PDF. */
  page: number
  /** Région à laquelle cette information s'applique. */
  region: Region
  /** Langue du contenu source consulté. */
  language: Language
  /** Date ISO à laquelle l'information a été vérifiée par un humain. */
  verifiedAt: string
  /** Qui a vérifié (nom, initiales, ou "auto" en attente de relecture humaine). */
  verifiedBy: string
}

/**
 * Un fait pédagogique atomique et vérifié, prêt à être utilisé pour rédiger
 * un cours ou une question. C'est la seule unité qui a le droit de nourrir
 * du contenu présenté comme officiel.
 */
export interface VerifiedFact {
  id: string
  /** Thème auquel se rattache ce fait (voir domain/content.ts -> Theme.slug). */
  themeSlug: string
  /** Énoncé du fait, dans la langue de la référence. */
  statement: string
  reference: SourceReference
}
