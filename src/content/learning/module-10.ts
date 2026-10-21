export const MODULE_10 = {
  id: 'public-transport-level-crossings',
  number: 'MODULE 10',
  title: 'Trams, bus & passages à niveau',
  description: 'Maîtriser les passages à niveau, la priorité des trams, les voies réservées et le comportement aux arrêts de transport public.',
  lessons: [
    { id: 'passages-a-niveau-signaux', title: 'Passages à niveau : les signaux', description: 'Lire les feux, barrières et signaux qui protègent la traversée des voies.', xp: 25 },
    { id: 'passages-a-niveau-comportement', title: 'Passages à niveau : le bon comportement', description: 'S’engager seulement si la sortie est libre et réagir correctement en cas d’urgence.', xp: 25 },
    { id: 'tram-priorite-et-carrefours', title: 'Tram : priorité & carrefours', description: 'Comprendre la priorité particulière du tram et les ordres qui la remplacent.', xp: 25 },
    { id: 'depasser-et-croiser-un-tram', title: 'Dépasser & croiser un tram', description: 'Choisir le bon côté et renoncer dès que la visibilité ou l’espace manque.', xp: 25 },
    { id: 'bandes-bus-et-sites-reserves', title: 'Bandes bus & sites réservés', description: 'Distinguer une bande bus d’un site spécial franchissable et connaître les exceptions.', xp: 25 },
    { id: 'arrets-de-bus-et-de-tram', title: 'Arrêts de bus & de tram', description: 'Faire la différence entre arrêt et stationnement tout en protégeant les voyageurs.', xp: 25 },
    { id: 'bus-quitte-son-arret', title: 'Quand le bus quitte son arrêt', description: 'Appliquer la règle en agglomération, hors agglomération et face au transport scolaire.', xp: 25 },
  ],
  finalChallenge: {
    id: 'defi-final-trams-bus-passages-a-niveau',
    title: 'Défi final — Trams, bus & passages à niveau',
    description: '15 situations pour évaluer les 7 leçons du module.',
    xp: 50,
  },
} as const

export const MODULE_10_VISUAL_ID_PREFIX = 'M10_'
