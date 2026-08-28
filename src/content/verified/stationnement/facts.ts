import type { SourceReference, VerifiedFact } from '@/domain/source'
import type { Region } from '@/domain/region'

/** Faits extraits des PDF 25, 26, 27 — voir docs/CONTENT_PIPELINE.md. */
function refFrom(sourceId: string, page: number, region: Region = 'BE'): SourceReference {
  return {
    sourceId,
    page,
    region,
    language: 'fr',
    verifiedAt: '2026-08-18',
    verifiedBy: 'Claude (lecture directe du PDF) — relecture humaine à faire',
  }
}

export const STATIONNEMENT_FACTS: VerifiedFact[] = [
  // --- 25-arrêt-et-stationnement.pdf ---
  {
    id: 'st25-definitions',
    themeSlug: 'stationnement',
    statement: "L'arrêt est le temps nécessaire pour (dé)charger des personnes ou des choses ; au-delà, c'est un stationnement. Un véhicule immobilisé par la circulation (feu rouge, embouteillage) ou en panne n'est ni à l'arrêt ni en stationnement au sens du Code.",
    reference: refFrom('25-arret-et-stationnement', 1),
  },
  {
    id: 'st25-ou-stationner',
    themeSlug: 'stationnement',
    statement: "Priorité : l'accotement ou la bande de stationnement. Si impossible, une voiture peut stationner sur la chaussée, le plus près possible du bord droit, en laissant au moins 1 mètre entre deux véhicules — jamais en double file.",
    reference: refFrom('25-arret-et-stationnement', 3),
  },
  {
    id: 'st25-interdits-partout',
    themeSlug: 'stationnement',
    statement: "Arrêt et stationnement sont interdits partout où le véhicule créerait un danger, sur l'autoroute et la route pour automobiles (hors bande d'arrêt d'urgence en cas de nécessité), sur un trottoir, un dispositif surélevé, une piste cyclable, des marques en damier, une zone d'évitement, un îlot directionnel, des voies de tram ou un passage à niveau.",
    reference: refFrom('25-arret-et-stationnement', 4),
  },
  {
    id: 'st25-distances-carrefour',
    themeSlug: 'stationnement',
    statement: "Interdit de s'arrêter/stationner sur un passage pour piétons/cyclistes, à moins de 5 m avant celui-ci, à moins de 5 m d'un carrefour sans feux, ou à moins de 20 m avant un carrefour à feux ou un signal routier (sauf si le signal est à plus de 2 m de haut et le véhicule à moins de 1,65 m).",
    reference: refFrom('25-arret-et-stationnement', 7),
  },
  {
    id: 'st25-visibilite',
    themeSlug: 'stationnement',
    statement: "Sur la chaussée, interdit de s'arrêter/stationner sous un pont, dans un tunnel, près du sommet d'une côte, ou avant/dans un virage sans visibilité suffisante — des zones où ta présence surprendrait les autres trop tard.",
    reference: refFrom('25-arret-et-stationnement', 9),
  },

  // --- 26-stationnement-interdit.pdf ---
  {
    id: 'st26-arret-ok-stationnement-non',
    themeSlug: 'stationnement',
    statement: "Certains endroits interdisent le stationnement mais autorisent l'arrêt bref : sans 1 m d'espace libre avant/arrière, à moins de 15 m d'un arrêt de tram/bus, devant un accès carrossable ou une porte de garage (sauf plaque du riverain visible dessus), ou là où un obstacle forcerait cyclistes/piétons vers la chaussée.",
    reference: refFrom('26-stationnement-interdit', 2),
  },
  {
    id: 'st26-chaussee-etroite-oppose',
    themeSlug: 'stationnement',
    statement: "Stationnement interdit (arrêt bref permis) si la chaussée devient trop étroite (moins de 3 m de passage restant), ou si stationner en face d'un véhicule déjà garé gênerait le croisement d'autres véhicules.",
    reference: refFrom('26-stationnement-interdit', 3),
  },
  {
    id: 'st26-voie-prioritaire-bandes',
    themeSlug: 'stationnement',
    statement: "Hors agglomération, le stationnement est interdit sur la chaussée d'une voie prioritaire (l'arrêt reste permis) ; en agglomération, stationnement et arrêt y sont autorisés. Stationner est aussi interdit sur une chaussée divisée en bandes de circulation, sauf indication contraire.",
    reference: refFrom('26-stationnement-interdit', 4),
  },
  {
    id: 'st26-signaux-fleches',
    themeSlug: 'stationnement',
    statement: "Un signal rond barré d'une diagonale interdit le stationnement ; barré de deux diagonales, il interdit stationnement ET arrêt — dans les deux cas, du signal jusqu'au carrefour suivant. Une flèche vers le haut sous le signal indique que l'interdiction commence après lui ; vers le bas, qu'elle s'applique jusqu'à lui.",
    reference: refFrom('26-stationnement-interdit', 7),
  },
  {
    id: 'st26-alterne-semi-mensuel',
    themeSlug: 'stationnement',
    statement: "Le stationnement alterné semi-mensuel (signal « 1-15 » ou « 16-31 ») ne s'applique qu'à la chaussée, jamais à l'accotement. Il faut changer de côté le dernier jour de la période, entre 19h30 et 20h.",
    reference: refFrom('26-stationnement-interdit', 8),
  },

  // --- 27-règles-concernant-le-stationnement.pdf ---
  {
    id: 'st27-zone-bleue',
    themeSlug: 'stationnement',
    statement: "Dans une zone de stationnement à durée limitée (« zone bleue »), le disque de stationnement est obligatoire les jours ouvrables de 9h à 18h (sauf autres horaires indiqués), pour une durée maximale de deux heures — il est interdit de modifier l'heure affichée pour prolonger.",
    reference: refFrom('27-regles-stationnement', 1),
  },
  {
    id: 'st27-signaux-p',
    themeSlug: 'stationnement',
    statement: "Un panneau P avec une voiture dessous autorise voitures, voitures mixtes, minibus et motocyclettes — mais pas les camionnettes. Un P avec un dessin de roues indique une obligation de stationner sur l'accotement (ou la chaussée, ou moitié-moitié) selon le pictogramme.",
    reference: refFrom('27-regles-stationnement', 3),
  },
  {
    id: 'st27-descendre-vehicule',
    themeSlug: 'stationnement',
    statement: "Avant de descendre : frein à main, vitres et toit fermés, moteur coupé, clé retirée, portes verrouillées. Il vaut mieux descendre par l'arrière du véhicule et remonter par l'avant, pour toujours voir la circulation venir.",
    reference: refFrom('27-regles-stationnement', 5),
  },
  {
    id: 'st27-longue-duree',
    themeSlug: 'stationnement',
    statement: "Un véhicule en panne ne peut rester plus de 24 heures sur la voie publique. Un véhicule publicitaire, pas plus de 3 heures. Mettre un véhicule en vente ou en location sur la voie publique est interdit.",
    reference: refFrom('27-regles-stationnement', 6),
  },
]
