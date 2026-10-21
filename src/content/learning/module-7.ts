export const MODULE_7 = {
  id: 'vehicle-technical-safety',
  number: 'MODULE 7',
  title: 'Véhicule & sécurité technique',
  description: 'Comprendre les masses, le chargement et les équipements qui rendent un véhicule sûr et conforme.',
  lessons: [
    { id: 'masses-mma-mec-et-permis-b', title: 'Masses : MMA, MEC & permis B', description: 'Distinguer la limite administrative du poids réel du véhicule.', xp: 20 },
    { id: 'chargement-dimensions-et-stabilite', title: 'Chargement : dimensions & stabilité', description: 'Charger sans masquer, déséquilibrer ni dépasser les limites.', xp: 25 },
    { id: 'remorques-et-porte-velos', title: 'Remorques & porte-vélos', description: 'Vérifier le permis, les masses et la visibilité arrière.', xp: 25 },
    { id: 'equipements-et-documents-obligatoires', title: 'Équipements & documents obligatoires', description: 'Savoir ce qui doit accompagner le conducteur et la voiture.', xp: 20 },
    { id: 'pneus-pression-et-usure', title: 'Pneus : pression & usure', description: 'Contrôler le seul contact entre la voiture et la route.', xp: 25 },
    { id: 'freins-abs-et-adherence', title: 'Freins, ABS & adhérence', description: 'Freiner correctement et réagir sans aggraver un dérapage.', xp: 25 },
    { id: 'feux-visibilite-et-klaxon', title: 'Feux, visibilité & klaxon', description: 'Voir, être vu et avertir uniquement quand la règle le permet.', xp: 25 },
  ],
  finalChallenge: {
    id: 'defi-final-vehicule-securite-technique',
    title: 'Défi final — Véhicule & sécurité technique',
    description: '15 situations pour évaluer les 7 leçons du module.',
    xp: 50,
  },
} as const

export const MODULE_7_VISUAL_ID_PREFIX = 'M7_'
