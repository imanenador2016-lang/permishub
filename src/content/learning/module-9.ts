export const MODULE_9 = {
  id: 'motorway-special-roads',
  number: 'MODULE 9',
  title: 'Autoroute & routes spéciales',
  description: 'Maîtriser l’accès, les vitesses, les déplacements et les urgences sur autoroute, puis reconnaître les routes et zones à régime particulier.',
  lessons: [
    { id: 'autoroute-acces-et-vitesses', title: 'Autoroute : accès & vitesses', description: 'Reconnaître l’autoroute, savoir qui peut y entrer et appliquer ses limites.', xp: 25 },
    { id: 'autoroute-insertion-et-sortie', title: 'Autoroute : insertion & sortie', description: 'S’insérer sans imposer un freinage et quitter l’autoroute sans manœuvre tardive.', xp: 25 },
    { id: 'autoroute-placement-et-depassement', title: 'Autoroute : placement & dépassement', description: 'Rester à droite, dépasser correctement et comprendre les files ralenties.', xp: 25 },
    { id: 'autoroute-circulation-dense-et-dangers', title: 'Circulation dense & dangers', description: 'Former le couloir de secours, lire les signaux de bande et réagir à un contresens.', xp: 25 },
    { id: 'autoroute-panne-et-securisation', title: 'Panne & sécurisation', description: 'Protéger les occupants et alerter sans créer de suraccident.', xp: 25 },
    { id: 'route-pour-automobiles', title: 'Route pour automobiles', description: 'La distinguer de l’autoroute et calculer la vitesse selon la Région et l’aménagement.', xp: 25 },
    { id: 'zones-et-voies-speciales', title: 'Zones & voies spéciales', description: 'Zone résidentielle, rue de jeu, rue scolaire, chemin réservé et site spécial franchissable.', xp: 25 },
  ],
  finalChallenge: {
    id: 'defi-final-autoroute-routes-speciales',
    title: 'Défi final — Autoroute & routes spéciales',
    description: '15 situations pour évaluer les 7 leçons du module.',
    xp: 50,
  },
} as const

export const MODULE_9_VISUAL_ID_PREFIX = 'M9_'
