export const MODULE_4 = {
  id: 'manoeuvres-overtaking',
  number: 'MODULE 4',
  title: 'Manœuvres & dépassement',
  description: 'Changer de direction, dépasser et effectuer une manœuvre sans mettre les autres usagers en danger.',
  lessons: [
    { id: 'comprendre-le-depassement', title: 'Comprendre le dépassement', description: 'Distinguer dépassement et croisement, puis observer avant d’agir.', xp: 20 },
    { id: 'depasser-en-toute-securite', title: 'Dépasser en toute sécurité', description: 'Observer la visibilité, l’espace et les autres usagers.', xp: 20 },
    { id: 'quand-le-depassement-est-interdit', title: 'Quand le dépassement est interdit', description: 'Reconnaître les situations où dépasser devient interdit ou dangereux.', xp: 20 },
    { id: 'panneaux-lies-au-depassement', title: 'Les panneaux liés au dépassement', description: 'Lire les signaux qui organisent le dépassement.', xp: 20 },
    { id: 'depasser-cyclistes-et-autres-usagers', title: 'Dépasser les cyclistes et autres usagers', description: 'Adapter son comportement aux usagers dépassés.', xp: 20 },
    { id: 'tram-et-vehicules-sur-rails', title: 'Tram et véhicules sur rails', description: 'Analyser les règles et exceptions propres aux véhicules sur rails.', xp: 20 },
    { id: 'manoeuvres-et-situations-complexes', title: 'Manœuvres & situations complexes', description: 'Combiner observation, position, visibilité et signalisation.', xp: 25 },
  ],
  finalChallenge: { id: 'defi-final-manoeuvres-depassement', title: 'Défi final — Manœuvres & dépassement', description: 'Verrouillé jusqu’à la fin des 7 leçons.', xp: 50 },
} as const

export const MODULE_4_VISUAL_ID_PREFIX = 'M4_'
export const MODULE_4_PLANNED_VISUAL_IDS = [
  'M4_OVERTAKE_BASIC_01', 'M4_OVERTAKE_VISIBILITY_01', 'M4_OVERTAKE_CURVE_01',
  'M4_OVERTAKE_HILL_01', 'M4_OVERTAKE_CYCLIST_01', 'M4_OVERTAKE_SIGN_01',
  'M4_OVERTAKE_LEVEL_CROSSING_01', 'M4_OVERTAKE_PEDESTRIAN_CROSSING_01',
  'M4_TRAM_OVERTAKE_01', 'M4_MANEUVER_DIRECTION_01',
] as const

