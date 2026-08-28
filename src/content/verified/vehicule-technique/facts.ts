import type { SourceReference, VerifiedFact } from '@/domain/source'
import type { Region } from '@/domain/region'

/** Faits extraits des PDF 9, 10, 30, 31 — voir docs/CONTENT_PIPELINE.md. */
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

export const VEHICULE_TECHNIQUE_FACTS: VerifiedFact[] = [
  // --- 9-masse-maximale-autorisée.pdf ---
  {
    id: 'vt9-mma-def',
    themeSlug: 'vehicule-technique',
    statement: "La masse maximale autorisée (MMA) est le poids total maximal qu'un véhicule peut atteindre (carburant, conducteur, passagers, chargement compris), fixé par le fabricant. Avec un permis B, tu peux conduire tout véhicule dont la MMA n'excède pas 3 500 kg.",
    reference: refFrom('09-masse-maximale-autorisee', 48),
  },
  {
    id: 'vt9-mec-def',
    themeSlug: 'vehicule-technique',
    statement: "La masse en charge (MEC) est le poids réel du véhicule à un instant donné, mesuré sur une balance — toujours inférieure ou égale à la MMA. Les panneaux de restriction peuvent viser l'une ou l'autre : lis bien de quoi il s'agit.",
    reference: refFrom('09-masse-maximale-autorisee', 50),
  },
  {
    id: 'vt9-documents-obligatoires',
    themeSlug: 'vehicule-technique',
    statement: "À bord, il faut un triangle de danger, une trousse de secours, un extincteur (1 kg de poudre, accessible en 10 secondes) et un gilet fluorescent dans l'habitacle. Le conducteur doit être titulaire et porteur de sa carte d'identité et de son permis ; le véhicule doit avoir son certificat d'immatriculation, de conformité et d'assurance (celui-ci peut être une copie numérique).",
    reference: refFrom('09-masse-maximale-autorisee', 51),
  },

  // --- 10-chargement-de-véhicules.pdf ---
  {
    id: 'vt10-regles-generales',
    themeSlug: 'vehicule-technique',
    statement: "Un chargement ne peut jamais gêner les autres usagers, endommager des biens, nuire à la visibilité, se détacher, ou compromettre la stabilité du véhicule. Sa hauteur totale (chargement compris) ne dépasse pas 4 m, sa largeur 2,55 m — au-delà, c'est un « transport exceptionnel ».",
    reference: refFrom('10-chargement-de-vehicules', 1),
  },
  {
    id: 'vt10-longueur',
    themeSlug: 'vehicule-technique',
    statement: "À l'avant, le chargement ne peut jamais dépasser la carrosserie. À l'arrière, il peut dépasser d'1 m maximum — ou 3 m pour une charge indivisible signalée par un panneau spécifique (feu rouge et catadioptres si l'éclairage est requis).",
    reference: refFrom('10-chargement-de-vehicules', 3),
  },
  {
    id: 'vt10-remorque',
    themeSlug: 'vehicule-technique',
    statement: "Un permis B provisoire ne permet pas de tracter de remorque. Avec un permis B définitif, tu peux tracter une remorque de MMA max. 750 kg, ou plus lourde si la MMA voiture + remorque combinée ne dépasse pas 3 500 kg.",
    reference: refFrom('10-chargement-de-vehicules', 9),
  },

  // --- 30-consommation-du-carburant.pdf ---
  {
    id: 'vt30-poids-vitres',
    themeSlug: 'vehicule-technique',
    statement: "Un chargement inutile, une galerie de toit vide ou des vitres entrouvertes augmentent tous la consommation de carburant — le régime conseillé pour changer de vitesse est d'environ 2 000-2 500 tours en essence, 1 500-2 000 en diesel.",
    reference: refFrom('30-consommation-carburant', 1),
  },
  {
    id: 'vt30-couper-moteur-emissions',
    themeSlug: 'vehicule-technique',
    statement: "En cas d'immobilisation prolongée (file, passage à niveau...), le Code impose de couper le moteur. Certaines villes belges (dont Anvers, Bruxelles, Gand) délimitent des zones de basses émissions aux règles d'accès propres à chacune.",
    reference: refFrom('30-consommation-carburant', 5),
  },

  // --- 31-la-technique.pdf ---
  {
    id: 'vt31-pneus-legal',
    themeSlug: 'vehicule-technique',
    statement: "La profondeur légale minimale des rainures principales d'un pneu est de 1,6 mm — mais la sécurité réelle (aquaplaning) est déjà compromise sous les 2 mm. Il est interdit de recreuser ou rechaper des pneus usés.",
    reference: refFrom('31-la-technique', 1),
  },
  {
    id: 'vt31-pneus-hiver-cloutes',
    themeSlug: 'vehicule-technique',
    statement: "Sous 7°C, les pneus hiver améliorent l'adhérence (à remplacer dès fin mars). Les pneus cloutés ne sont autorisés que du 1er novembre au 31 mars (véhicules ≤ 3,5 t), à vitesse limitée (90 km/h autoroute, 60 km/h route ordinaire).",
    reference: refFrom('31-la-technique', 2),
  },
  {
    id: 'vt31-pneus-symetrie-wallonie',
    themeSlug: 'vehicule-technique',
    statement: "En Région wallonne, les pneus d'un même essieu doivent avoir les mêmes caractéristiques et dimensions (sauf agrément contraire), avec une différence d'usure gauche-droite maximale de 3 mm.",
    reference: refFrom('31-la-technique', 3, 'WALLONIE'),
  },
  {
    id: 'vt31-pneus-symetrie-flandre',
    themeSlug: 'vehicule-technique',
    statement: "Depuis le 1er décembre 2024, en Région flamande, les pneus d'un même essieu doivent seulement partager la même structure (radiale ou diagonale) et la même dimension — une règle assouplie par rapport à la Wallonie.",
    reference: refFrom('31-la-technique', 3, 'FLANDRE'),
  },
  {
    id: 'vt31-freins-derapage',
    themeSlug: 'vehicule-technique',
    statement: "En cas de dérapage de l'arrière (survirage), il faut contre-braquer dans le sens du dérapage, débrayer et lâcher l'accélérateur — jamais freiner fort. En cas d'aquaplaning, diriger le volant vers la direction voulue sans freiner. L'ABS ne raccourcit pas forcément la distance de freinage, il garde le véhicule dirigeable.",
    reference: refFrom('31-la-technique', 8),
  },
  {
    id: 'vt31-appareils-electroniques',
    themeSlug: 'vehicule-technique',
    statement: "Il est interdit de tenir ou manipuler un appareil électronique à écran en conduisant, sauf s'il est fixé dans un support adapté (utilisable alors comme GPS). C'est permis seulement à l'arrêt réel ou en stationnement — jamais à un feu rouge ou dans un embouteillage.",
    reference: refFrom('31-la-technique', 11),
  },
]
