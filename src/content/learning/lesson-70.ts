import type { LearningLesson } from './types'

export const LESSON_70: LearningLesson = {
  id: 'arrets-de-bus-et-de-tram', moduleId: 'public-transport-level-crossings', title: 'Arrêts de bus & de tram',
  description: 'Faire la différence entre arrêt et stationnement tout en protégeant les voyageurs.', xp: 25,
  steps: [
    { type: 'scenario', visualId: 'M10_BUS_STOP_DROPOFF_01', title: 'Débarquement immédiat', body: 'Le conducteur reste au volant pendant qu’une passagère descend immédiatement, sans bloquer un transport public.', question: 'S’agit-il d’un arrêt ?', options: ['Oui', 'Non, c’est toujours un stationnement'], correct: 0, explanation: 'Une immobilisation limitée au temps nécessaire pour embarquer ou débarquer est un arrêt.' },
    { type: 'scenario', visualId: 'M10_BUS_STOP_PARKED_01', title: 'Voiture abandonnée', body: 'La voiture est laissée dans la zone d’arrêt et empêche le bus d’approcher du trottoir.', question: 'Ce stationnement est-il autorisé ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Le stationnement est interdit dans la zone réservée à l’arrêt.' },
    { type: 'text', visualId: 'M10_BUS_STOP_PARKED_01', title: 'La règle des 15 mètres', body: 'Lorsqu’aucun marquage ne délimite l’arrêt, le stationnement est interdit à moins de 15 mètres de part et d’autre du poteau d’arrêt de bus ou de tram.', callout: '15 M AVANT ET 15 M APRÈS LE POTEAU.' },
    { type: 'scenario', visualId: 'M10_TRAM_BOARDING_01', title: 'Tram sans refuge', body: 'Les voyageurs doivent traverser la chaussée entre le trottoir et le tram.', question: 'Dois-tu t’arrêter derrière eux ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Tu dois leur permettre d’embarquer ou de descendre sans danger.' },
    { type: 'scenario', visualId: 'M10_BUS_HIDDEN_PEDESTRIAN_01', title: 'Piéton masqué', body: 'Un bus arrêté cache une personne qui apparaît près du passage.', question: 'Quelle attitude est correcte ?', options: ['Accélérer avant qu’elle traverse', 'Ralentir et être prêt à s’arrêter'], correct: 1, explanation: 'Un véhicule volumineux peut masquer un piéton. Il faut réduire la vitesse et anticiper.' },
    { type: 'compare', visualId: 'M10_BUS_STOP_DROPOFF_01', title: 'Arrêt ou stationnement', body: 'La durée ne suffit pas : c’est le motif qui compte.', items: [{ label: 'Passager descend immédiatement', result: 'Arrêt' }, { label: 'Attendre une personne absente', result: 'Stationnement' }, { label: 'Quitter la voiture', result: 'Stationnement' }] },
    { type: 'summary', title: 'À retenir', items: ['Embarquement ou débarquement immédiat : arrêt.', 'Attente ou abandon du véhicule : stationnement.', 'Sans marquage : stationnement interdit à moins de 15 m du poteau.', 'Ralentis près d’un bus ou d’un tram : des voyageurs peuvent être masqués.'] },
  ],
  quiz: [
    { visualId: 'M10_BUS_STOP_DROPOFF_01', question: 'Faire descendre immédiatement un passager est-il un arrêt ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Oui, si cela ne dure que le temps nécessaire.' },
    { visualId: 'M10_BUS_STOP_PARKED_01', question: 'Peux-tu laisser ta voiture dans la zone réservée au bus ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Le stationnement y est interdit.' },
    { visualId: 'M10_BUS_STOP_PARKED_01', question: 'Sans marquage, la protection de stationnement s’étend-elle à 15 m de part et d’autre du poteau ?', options: ['Oui', 'Non'], correct: 0, explanation: 'C’est la distance à retenir.' },
    { visualId: 'M10_TRAM_BOARDING_01', question: 'Sans refuge, dois-tu laisser passer les voyageurs du tram ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Leur sécurité prime.' },
    { visualId: 'M10_BUS_HIDDEN_PEDESTRIAN_01', question: 'Un bus arrêté peut-il masquer un piéton ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Il faut donc ralentir et anticiper.' },
  ], nextLessonLabel: 'Suivant : le bus quitte son arrêt →',
}
