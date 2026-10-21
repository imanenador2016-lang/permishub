import type { LearningLesson } from './types'

export const LESSON_34: LearningLesson = {
  id: 'panneaux-arret-et-stationnement',
  moduleId: 'stopping-parking',
  title: 'Les panneaux d’arrêt et de stationnement',
  description: 'Lire les signaux E1, E3, E5, E7 et E9 sans confusion.',
  xp: 25,
  steps: [
    { type: 'compare', visualId: 'M5_SIGN_E1_01', title: 'E1 ou E3 ?', body: 'Une seule barre rouge et une croix rouge n’imposent pas la même interdiction.', items: [{ label: 'E1 · une barre', result: 'STATIONNEMENT INTERDIT' }, { label: 'E3 · croix', result: 'ARRÊT ET STATIONNEMENT INTERDITS' }] },
    { type: 'scenario', visualId: 'M5_SIGN_E1_01', title: 'Signal E1', body: 'Le signal E1 est placé de ton côté de la voie.', question: 'Peux-tu stationner après ce signal ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Le signal E1 interdit le stationnement.' },
    { type: 'scenario', visualId: 'M5_SIGN_E3_01', title: 'Signal E3', body: 'Le signal présente une croix rouge sur fond bleu.', question: 'Peux-tu t’arrêter volontairement pour déposer un passager ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Le signal E3 interdit à la fois l’arrêt et le stationnement.' },
    { type: 'scenario', visualId: 'M5_SIGN_EFFECT_01', title: 'Où le signal agit-il ?', body: 'Le panneau se trouve du côté droit de la voie et aucun panneau ne met fin à la règle avant le prochain carrefour.', question: 'Quel côté est concerné ?', options: ['Le côté où le signal est placé', 'Les deux côtés automatiquement'], correct: 0, explanation: 'Les signaux concernés ont effet du côté où ils sont placés, à partir du signal jusqu’au prochain carrefour, sauf indication différente.' },
    { type: 'compare', visualId: 'M5_ALTERNATE_SIGNS_01', title: 'Stationnement alterné', body: 'Ces signaux concernent le côté où ils sont placés.', items: [{ label: 'E5', result: 'Interdit du 1er au 15' }, { label: 'E7', result: 'Interdit du 16 à la fin du mois' }] },
    { type: 'scenario', visualId: 'M5_ALTERNATE_SIGNS_01', title: 'Changer de côté', body: 'Le stationnement alterné est applicable et la période va changer.', question: 'Quand faut-il effectuer le changement de côté ?', options: ['Le dernier jour de la période entre 19 h 30 et 20 h', 'À minuit exactement', 'Le premier jour à midi'], correct: 0, explanation: 'Le changement de côté s’effectue le dernier jour de chaque période entre 19 h 30 et 20 h.' },
    { type: 'text', visualId: 'M5_SIGN_E9_01', title: 'Les signaux E9', body: 'Les signaux E9 autorisent ou réglementent le stationnement. Le symbole, l’inscription ou le panneau additionnel précise les véhicules concernés et la manière de se ranger.', callout: 'LIS LE PANNEAU COMPLET, PAS SEULEMENT LE P BLEU.' },
    { type: 'summary', title: 'À retenir', items: ['E1 : stationnement interdit.', 'E3 : arrêt et stationnement interdits.', 'E5 : stationnement interdit du 1er au 15.', 'E7 : stationnement interdit du 16 à la fin du mois.', 'Le signal agit du côté où il est placé.', 'Lis les flèches, horaires, distances et catégories indiquées.'] },
  ],
  quiz: [
    { visualId: 'M5_SIGN_E1_01', question: 'Que signifie E1 ?', options: ['Stationnement interdit', 'Arrêt et stationnement interdits'], correct: 0, explanation: 'E1 interdit uniquement le stationnement.' },
    { visualId: 'M5_SIGN_E3_01', question: 'Que signifie E3 ?', options: ['Stationnement interdit', 'Arrêt et stationnement interdits'], correct: 1, explanation: 'La croix rouge correspond à l’interdiction des deux.' },
    { question: 'E5 interdit le stationnement…', options: ['Du 1er au 15', 'Du 16 à la fin du mois'], correct: 0, explanation: 'E5 concerne la première partie du mois.' },
    { question: 'E7 interdit le stationnement…', options: ['Du 1er au 15', 'Du 16 à la fin du mois'], correct: 1, explanation: 'E7 concerne la seconde partie du mois.' },
    { question: 'Un signal E1 placé à droite interdit-il automatiquement le stationnement à gauche ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Il agit du côté où il est placé.' },
  ],
}
