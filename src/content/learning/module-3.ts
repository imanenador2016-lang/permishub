export const MODULE_3 = {
  id: 'speed-road-position',
  number: 'MODULE 3',
  title: 'Vitesse & position sur la chaussée',
  description: 'Choisir sa vitesse et sa position avec méthode.',
  lessons: [
    { id: 'comprendre-les-limitations-de-vitesse', title: 'Comprendre les limitations de vitesse', description: 'Observer les éléments qui déterminent la vitesse applicable.', xp: 20 },
    { id: 'zones-particulieres-et-vitesse', title: 'Zones particulières et vitesse', description: 'Reconnaître les zones et adapter son allure.', xp: 20 },
    { id: 'adapter-sa-vitesse-a-la-situation', title: 'Adapter sa vitesse à la situation', description: 'Anticiper les dangers et adapter son allure.', xp: 20 },
    { id: 'position-sur-la-chaussee', title: 'Position sur la chaussée', description: 'Choisir une position correcte sur la chaussée.', xp: 20 },
    { id: 'bandes-de-circulation-et-choix-de-bande', title: 'Bandes de circulation & choix de bande', description: 'Lire les marquages et choisir une bande adaptée.', xp: 20 },
    { id: 'croisement-et-situations-particulieres', title: 'Croisement et situations particulières', description: 'Lire l’espace, les obstacles et la signalisation avant de croiser.', xp: 20 },
    { id: 'situations-complexes-vitesse-position', title: 'Situations complexes : vitesse + position', description: 'Combiner vitesse, position, dangers et signalisation.', xp: 25 },
  ],
  finalChallenge: { id: 'defi-final-vitesse-position', title: 'Défi final — Vitesse & position', description: 'Verrouillé jusqu’à la fin des 7 leçons.', xp: 50 },
} as const

// Les futurs assets du Module 3 seront ajoutés à LEARNING_SCENES avec un identifiant M3_ stable.
export const MODULE_3_VISUAL_ID_PREFIX = 'M3_'








