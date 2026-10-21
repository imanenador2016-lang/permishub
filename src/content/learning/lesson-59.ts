import type { LearningLesson } from './types'

export const LESSON_59: LearningLesson = {
  id: 'autoroute-insertion-et-sortie', moduleId: 'motorway-special-roads', title: 'Autoroute : insertion & sortie',
  description: 'S’insérer sans imposer un freinage et quitter l’autoroute sans manœuvre tardive.', xp: 25,
  steps: [
    { type: 'text', visualId: 'M9_MOTORWAY_ENTRY_01', title: 'La bande d’accélération', body: 'Elle sert à adapter ta vitesse, contrôler les rétroviseurs et l’angle mort, annoncer ton déplacement puis rejoindre un intervalle disponible.', callout: 'PRÉPARE TON INSERTION AVANT LA FIN DE LA BANDE.' },
    { type: 'scenario', visualId: 'M9_MOTORWAY_ENTRY_01', title: 'Qui cède ?', body: 'Tu arrives par la bande d’accès. Une voiture circule déjà sur la bande de droite de l’autoroute.', question: 'Qui doit céder le passage ?', options: ['La voiture déjà sur l’autoroute', 'Le conducteur qui s’insère'], correct: 1, explanation: 'L’entrée sur l’autoroute est une manœuvre : le conducteur qui s’insère cède le passage.' },
    { type: 'scenario', visualId: 'M9_MOTORWAY_ENTRY_01', title: 'Pas de tirette', body: 'Le trafic reste fluide au niveau de la bande d’accélération.', question: 'Le principe de la tirette donne-t-il priorité au véhicule qui entre ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Non. La tirette ne transforme pas une bande d’accès en bande prioritaire.' },
    { type: 'compare', visualId: 'M9_MOTORWAY_ENTRY_01', title: 'Bonne séquence', body: 'Une insertion sûre se prépare progressivement.', items: [{ label: '1', result: 'Observer et accélérer' }, { label: '2', result: 'Clignotant et angle mort' }, { label: '3', result: 'Céder puis s’insérer' }] },
    { type: 'scenario', visualId: 'M9_MOTORWAY_EXIT_01', title: 'Quitter l’autoroute', body: 'La bande de sortie est libre et commence à droite.', question: 'Quand ralentir nettement ?', options: ['Avant de rejoindre la bande de sortie', 'Une fois engagé dans la bande de sortie'], correct: 1, explanation: 'Entre d’abord dans la bande de sortie puis adapte ta vitesse, afin de ne pas surprendre le trafic de la voie principale.' },
    { type: 'scenario', visualId: 'M9_MOTORWAY_EXIT_01', title: 'Sortie manquée', body: 'Tu dépasses involontairement ta sortie.', question: 'Peux-tu reculer sur la bande d’arrêt d’urgence ?', options: ['Oui, avec les feux de détresse', 'Non, je poursuis jusqu’à la prochaine sortie'], correct: 1, explanation: 'La marche arrière et le demi-tour sont interdits. Continue jusqu’à la prochaine possibilité légale.' },
    { type: 'summary', title: 'À retenir', items: ['Celui qui entre cède le passage.', 'La tirette ne s’applique pas à une insertion fluide.', 'Adapte ta vitesse dans la bande d’accélération.', 'Contrôle rétroviseurs et angle mort.', 'Ralentis franchement après avoir rejoint la bande de sortie.'] },
  ],
  quiz: [
    { visualId: 'M9_MOTORWAY_ENTRY_01', question: 'À l’insertion, qui a la priorité ?', options: ['Le trafic déjà sur l’autoroute', 'Le véhicule sur la bande d’accès'], correct: 0, explanation: 'Le conducteur qui entre effectue une manœuvre.' },
    { visualId: 'M9_MOTORWAY_ENTRY_01', question: 'Le clignotant donne-t-il la priorité pour s’insérer ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Il annonce l’intention, sans créer de priorité.' },
    { visualId: 'M9_MOTORWAY_ENTRY_01', question: 'Faut-il vérifier l’angle mort avant de rejoindre la bande de droite ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Le contrôle direct complète les rétroviseurs.' },
    { visualId: 'M9_MOTORWAY_EXIT_01', question: 'Où faut-il commencer le ralentissement marqué pour sortir ?', options: ['Sur la voie principale', 'Dans la bande de sortie'], correct: 1, explanation: 'Le ralentissement prononcé s’effectue après l’engagement dans la sortie.' },
    { visualId: 'M9_MOTORWAY_EXIT_01', question: 'Après une sortie manquée, peux-tu faire marche arrière ?', options: ['Oui', 'Non'], correct: 1, explanation: 'La marche arrière est interdite sur autoroute.' },
  ], nextLessonLabel: 'Suivant : placement & dépassement →',
}
