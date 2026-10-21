import type { LearningLesson } from './types'

export const LESSON_41: LearningLesson = {
  id: 'securiser-un-accident', moduleId: 'safety-behaviour', title: 'Sécuriser un accident',
  description: 'Protéger la zone sans créer un second accident.', xp: 25,
  steps: [
    { type: 'hierarchy', visualId: 'M6_ACCIDENT_SECURE_01', title: 'La méthode essentielle', body: 'Agis dans cet ordre pour ne pas devenir une victime supplémentaire.', items: ['Protéger la zone et les personnes', 'Alerter les secours', 'Secourir sans aggraver'], memory: 'P → A → S' },
    { type: 'scenario', visualId: 'M6_TRIANGLE_ROAD_01', title: 'Route ordinaire', body: 'Le véhicule accidenté ne peut pas être rangé correctement.', question: 'À quelle distance minimale places-tu normalement le triangle ?', options: ['10 m', '30 m', '100 m'], correct: 1, explanation: 'Sur une route ordinaire, le triangle est placé à au moins 30 m, si la configuration le permet.' },
    { type: 'scenario', visualId: 'M6_TRIANGLE_MOTORWAY_01', title: 'Autoroute', body: 'La voiture est immobilisée sur la bande d’arrêt d’urgence.', question: 'À quelle distance places-tu le triangle ?', options: ['30 m', '50 m', '100 m'], correct: 2, explanation: 'Sur autoroute, le triangle se place à au moins 100 m.' },
    { type: 'scenario', visualId: 'M6_MOTORWAY_SAFETY_01', title: 'Quitter le véhicule', body: 'Le conducteur doit sortir sur autoroute.', question: 'Que doit-il enfiler avant de sortir ?', options: ['Le gilet fluorescent', 'Des gants', 'Rien de particulier'], correct: 0, explanation: 'Le gilet fluorescent est obligatoire pour le conducteur qui quitte son véhicule sur autoroute ou route pour automobiles.' },
    { type: 'text', visualId: 'M6_MOTORWAY_SAFETY_01', title: 'Se placer en sécurité', body: 'Allume les feux de détresse, quitte le véhicule du côté le plus sûr si possible et éloigne-toi de la circulation, derrière la glissière sur autoroute.', callout: 'NE RESTE PAS DANS LA TRAJECTOIRE DU TRAFIC.' },
    { type: 'scenario', visualId: 'M6_TRIANGLE_MOTORWAY_01', title: 'Ne pas se mettre en danger', body: 'Le trafic rend le placement du triangle immédiatement trop dangereux.', question: 'Dois-tu risquer ta vie pour respecter la distance ?', options: ['Oui', 'Non'], correct: 1, explanation: 'La protection des personnes reste prioritaire : mets-toi à l’abri et alerte les secours.' },
    { type: 'summary', title: 'À retenir', items: ['Commence par éviter le suraccident.', 'Feux de détresse et gilet augmentent la visibilité.', 'Triangle : 30 m sur route ordinaire, 100 m sur autoroute.', 'Sur autoroute, mets-toi derrière la glissière.', 'N’expose jamais ta vie pour placer le triangle.'] },
  ],
  quiz: [
    { question: 'Quel est le premier objectif ?', options: ['Déterminer le responsable', 'Éviter un suraccident'], correct: 1, explanation: 'La sécurité immédiate passe avant les démarches.' },
    { question: 'Triangle sur route ordinaire ?', options: ['30 m', '100 m'], correct: 0, explanation: 'Au moins 30 m si possible.' },
    { question: 'Triangle sur autoroute ?', options: ['30 m', '100 m'], correct: 1, explanation: 'Au moins 100 m.' },
    { question: 'Le conducteur doit-il porter le gilet en sortant sur autoroute ?', options: ['Oui', 'Non'], correct: 0, explanation: 'C’est obligatoire.' },
    { question: 'Où attendre sur autoroute ?', options: ['Dans la voiture', 'Derrière la glissière, à l’écart du trafic'], correct: 1, explanation: 'Il faut s’éloigner de la circulation.' },
  ], nextLessonLabel: 'Suivant : constat et police →',
}
