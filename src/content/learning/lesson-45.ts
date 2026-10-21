import type { LearningLesson } from './types'

export const LESSON_45: LearningLesson = {
  id: 'chargement-dimensions-et-stabilite', moduleId: 'vehicle-technical-safety', title: 'Chargement : dimensions & stabilité',
  description: 'Charger sans masquer, déséquilibrer ni dépasser les limites.', xp: 25,
  steps: [
    { type: 'text', visualId: 'M7_LOAD_SECURE_01', title: 'Un chargement doit rester maîtrisé', body: 'Il ne peut ni gêner les autres, ni se détacher, ni réduire la visibilité du conducteur, ni compromettre la stabilité du véhicule. Place les objets lourds bas et arrime-les.', callout: 'BAS · CENTRÉ · ARRIMÉ.' },
    { type: 'scenario', visualId: 'M7_LOAD_DIMENSIONS_01', title: 'Hauteur totale', body: 'Une voiture et son chargement atteignent ensemble plus de quatre mètres.', question: 'Peut-elle circuler comme un transport ordinaire ?', options: ['Oui', 'Non'], correct: 1, explanation: 'La hauteur totale ordinaire ne peut pas dépasser 4 m.' },
    { type: 'scenario', visualId: 'M7_LOAD_DIMENSIONS_01', title: 'Largeur totale', body: 'Toutes les saillies du chargement donnent une largeur supérieure à 2,55 m.', question: 'La limite ordinaire est-elle dépassée ?', options: ['Oui', 'Non'], correct: 0, explanation: 'La largeur ordinaire maximale est de 2,55 m, sauf régime particulier.' },
    { type: 'scenario', visualId: 'M7_LONG_LOAD_01', title: 'Dépassement à l’avant', body: 'Une échelle dépasse l’extrémité avant de la carrosserie.', question: 'Est-ce autorisé ?', options: ['Oui, jusqu’à 1 m', 'Non'], correct: 1, explanation: 'Le chargement ne peut jamais dépasser l’extrémité avant du véhicule.' },
    { type: 'scenario', visualId: 'M7_LONG_LOAD_01', title: 'Dépassement à l’arrière', body: 'Une charge indivisible de grande longueur dépasse nettement l’arrière et porte le panneau réglementaire.', question: 'Le dépassement peut-il atteindre 3 m ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Une charge indivisible peut dépasser jusqu’à 3 m à l’arrière si elle est correctement signalée.' },
    { type: 'text', visualId: 'M7_LOAD_SECURE_01', title: 'Ne masque rien', body: 'Les feux, la plaque d’immatriculation et la visibilité du conducteur doivent rester dégagés. Si un dispositif arrière les cache, il faut une répétition réglementaire.', callout: 'FEUX ET PLAQUE TOUJOURS VISIBLES.' },
    { type: 'summary', title: 'À retenir', items: ['Hauteur totale ordinaire : maximum 4 m.', 'Largeur ordinaire : maximum 2,55 m.', 'Aucun dépassement du chargement à l’avant.', 'Maximum 1 m à l’arrière, jusqu’à 3 m pour une charge indivisible signalée.', 'Objets lourds bas, charge arrimée, feux et plaque visibles.'] },
  ],
  quiz: [
    { visualId: 'M7_LOAD_DIMENSIONS_01', question: 'Quelle est la hauteur totale ordinaire maximale ?', options: ['3 m', '4 m', '5 m'], correct: 1, explanation: 'Véhicule et chargement ne dépassent pas 4 m.' },
    { visualId: 'M7_LOAD_DIMENSIONS_01', question: 'Quelle est la largeur ordinaire maximale ?', options: ['2,25 m', '2,55 m', '3 m'], correct: 1, explanation: 'Toutes saillies comprises : 2,55 m.' },
    { visualId: 'M7_LONG_LOAD_01', question: 'Un chargement peut-il dépasser l’avant ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Jamais à l’avant.' },
    { visualId: 'M7_LONG_LOAD_01', question: 'Une charge indivisible correctement signalée peut dépasser l’arrière de…', options: ['3 m maximum', '5 m maximum'], correct: 0, explanation: 'La limite spécifique est 3 m.' },
    { visualId: 'M7_LOAD_SECURE_01', question: 'Où placer de préférence les objets les plus lourds ?', options: ['Sur le toit', 'Bas dans le véhicule'], correct: 1, explanation: 'Cela préserve la stabilité.' },
  ], nextLessonLabel: 'Suivant : remorques & porte-vélos →',
}
