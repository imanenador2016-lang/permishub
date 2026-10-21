import type { LearningLesson } from './types'

export const LESSON_30: LearningLesson = {
  id: 'distinguer-arret-stationnement-immobilisation',
  moduleId: 'stopping-parking',
  title: 'Arrêt, stationnement ou immobilisation ?',
  description: 'Identifier correctement la situation avant d’appliquer la règle.',
  xp: 20,
  steps: [
    { type: 'text', visualId: 'M5_STOP_VS_PARK_01', title: 'La durée ne suffit pas', body: 'Ce n’est pas le nombre de minutes qui décide. Il faut regarder pourquoi le véhicule est immobilisé.', callout: 'POSE-TOI UNE QUESTION : POURQUOI LE VÉHICULE EST-IL IMMOBILISÉ ?' },
    { type: 'scenario', visualId: 'M5_PASSENGER_STOP_01', title: 'Un passager descend', body: 'La voiture reste immobilisée uniquement pendant le temps nécessaire pour laisser descendre un passager.', question: 'S’agit-il d’un arrêt ou d’un stationnement ?', options: ['Un arrêt', 'Un stationnement', 'Une panne'], correct: 0, explanation: 'L’embarquement ou le débarquement d’une personne pendant le temps nécessaire correspond à un arrêt.' },
    { type: 'scenario', visualId: 'M5_LOADING_STOP_01', title: 'Décharger immédiatement', body: 'Le conducteur décharge directement une caisse puis repart.', question: 'Comment cette situation est-elle qualifiée ?', options: ['Arrêt', 'Stationnement', 'Immobilisation imposée'], correct: 0, explanation: 'Le chargement ou le déchargement de choses pendant le temps strictement nécessaire correspond à un arrêt.' },
    { type: 'scenario', visualId: 'M5_WAITING_PARK_01', title: 'Attendre quelqu’un', body: 'Le conducteur reste dans sa voiture et attend un ami qui n’est pas encore arrivé.', question: 'Même si le moteur tourne, s’agit-il d’un stationnement ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Attendre une personne dépasse le temps nécessaire à son embarquement : le véhicule est en stationnement.' },
    { type: 'scenario', visualId: 'M5_REFUEL_PARKING_01', title: 'Faire le plein ou recharger', body: 'Le véhicule est immobilisé pour faire le plein ou charger sa batterie.', question: 'Le Code considère-t-il cela comme du stationnement ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Faire le plein ou charger la batterie d’un véhicule électrique ou hybride est considéré comme du stationnement.' },
    { type: 'scenario', visualId: 'M5_TRAFFIC_IMMOBILIZED_01', title: 'Feu rouge ou embouteillage', body: 'Le véhicule est immobilisé parce que le feu est rouge ou parce que la circulation est bloquée.', question: 'S’agit-il d’un arrêt volontaire au sens des règles de stationnement ?', options: ['Oui', 'Non, c’est une immobilisation imposée par la circulation'], correct: 1, explanation: 'Le véhicule est immobilisé pour respecter la circulation ou la signalisation ; ce n’est ni un arrêt volontaire ni un stationnement.' },
    { type: 'compare', title: 'Le réflexe en trois catégories', body: 'Classe la situation selon sa cause réelle.', items: [{ label: 'Personne ou chose', result: 'Temps strictement nécessaire = ARRÊT' }, { label: 'Attente, plein, recharge', result: 'STATIONNEMENT' }, { label: 'Feu, bouchon, agent', result: 'IMMOBILISATION IMPOSÉE' }] },
    { type: 'summary', title: 'À retenir', items: ['La durée seule ne distingue pas l’arrêt du stationnement.', 'Embarquer, débarquer, charger ou décharger : arrêt pendant le temps nécessaire.', 'Attendre quelqu’un : stationnement.', 'Faire le plein ou recharger : stationnement.', 'Feu rouge ou circulation bloquée : immobilisation imposée.'] },
  ],
  quiz: [
    { question: 'Tu attends cinq minutes une personne qui n’est pas encore là. Quelle est la situation ?', options: ['Arrêt', 'Stationnement'], correct: 1, explanation: 'L’attente ne correspond pas au temps nécessaire à un embarquement en cours.' },
    { question: 'Un passager descend immédiatement de la voiture. Quelle est la situation ?', options: ['Arrêt', 'Stationnement'], correct: 0, explanation: 'Le débarquement pendant le temps nécessaire est un arrêt.' },
    { question: 'La voiture attend devant un feu rouge. Est-elle en stationnement ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Elle est immobilisée par la signalisation.' },
    { question: 'Faire le plein est considéré comme…', options: ['Un arrêt', 'Un stationnement'], correct: 1, explanation: 'Le Code le considère comme du stationnement.' },
    { question: 'Les feux de détresse transforment-ils un stationnement en arrêt ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Les feux de détresse ne changent pas la nature de la situation.' },
  ],
}
