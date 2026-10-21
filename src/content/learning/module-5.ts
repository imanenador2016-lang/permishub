export const MODULE_5 = {
  id: 'stopping-parking',
  number: 'MODULE 5',
  title: 'Arrêt & stationnement',
  description: 'Distinguer arrêt, stationnement et immobilisation, puis choisir un emplacement autorisé sans gêner ni mettre en danger.',
  lessons: [
    { id: 'distinguer-arret-stationnement-immobilisation', title: 'Arrêt, stationnement ou immobilisation ?', description: 'Identifier correctement la situation avant d’appliquer la règle.', xp: 20 },
    { id: 'bien-ranger-son-vehicule', title: 'Bien ranger son véhicule', description: 'Choisir le bon côté et conserver l’espace nécessaire aux autres usagers.', xp: 20 },
    { id: 'arret-et-stationnement-interdits', title: 'Arrêt et stationnement interdits', description: 'Reconnaître les endroits où même un arrêt volontaire est interdit.', xp: 25 },
    { id: 'stationnement-interdit', title: 'Stationnement interdit', description: 'Distinguer les interdictions qui ne concernent que le stationnement.', xp: 25 },
    { id: 'panneaux-arret-et-stationnement', title: 'Les panneaux d’arrêt et de stationnement', description: 'Lire les signaux E1, E3, E5, E7 et E9 sans confusion.', xp: 25 },
    { id: 'zone-bleue-et-stationnement-payant', title: 'Zone bleue & stationnement payant', description: 'Utiliser correctement le disque et respecter les modalités affichées.', xp: 20 },
    { id: 'emplacements-reserves-et-cas-complexes', title: 'Emplacements réservés & cas complexes', description: 'Analyser les places réservées, les zones particulières et les pièges combinés.', xp: 25 },
  ],
  finalChallenge: {
    id: 'defi-final-arret-stationnement',
    title: 'Défi final — Arrêt & stationnement',
    description: '15 situations pour évaluer les 7 leçons du module.',
    xp: 50,
  },
} as const

export const MODULE_5_VISUAL_ID_PREFIX = 'M5_'
