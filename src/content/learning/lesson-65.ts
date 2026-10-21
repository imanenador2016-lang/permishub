import type { LearningLesson } from './types'

export const LESSON_65: LearningLesson = {
  id: 'passages-a-niveau-signaux', moduleId: 'public-transport-level-crossings', title: 'Passages à niveau : les signaux',
  description: 'Lire les feux, barrières et signaux qui protègent la traversée des voies.', xp: 25,
  steps: [
    { type: 'text', visualId: 'M10_LEVEL_PASSIVE_01', title: 'Un danger ferroviaire', body: 'Un passage à niveau est une intersection entre une voie publique et une ou plusieurs voies ferrées. Approche lentement, observe dans les deux directions et reste prêt à t’arrêter.', callout: 'UN TRAIN NE PEUT PAS ÉVITER UN VÉHICULE.' },
    { type: 'scenario', visualId: 'M10_LEVEL_OPEN_WHITE_01', title: 'Feu blanc lunaire', body: 'Les barrières sont relevées et le feu blanc lunaire clignote.', question: 'Peux-tu franchir le passage si la sortie est libre ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Le feu blanc lunaire clignotant autorise le franchissement, à condition de pouvoir dégager entièrement les voies.' },
    { type: 'scenario', visualId: 'M10_LEVEL_RED_CLOSED_01', title: 'Feux rouges', body: 'Les feux rouges clignotent tandis qu’un train traverse.', question: 'Peux-tu avancer dès que le train est passé ?', options: ['Oui', 'Non, j’attends la fin des signaux'], correct: 1, explanation: 'Tu dois attendre que les feux rouges cessent et que le passage soit réellement rouvert.' },
    { type: 'scenario', visualId: 'M10_LEVEL_BARRIER_CLOSING_01', title: 'Barrières en mouvement', body: 'La barrière commence à descendre.', question: 'Peux-tu accélérer pour passer avant sa fermeture ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Il est interdit de s’engager lorsque les barrières sont en mouvement ou fermées.' },
    { type: 'scenario', visualId: 'M10_LEVEL_RED_CLOSED_01', title: 'Signal sonore', body: 'Tu entends la sonnerie mais les barrières semblent encore levées.', question: 'Dois-tu t’arrêter ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Le signal sonore interdit à lui seul de s’engager.' },
    { type: 'compare', visualId: 'M10_LEVEL_PASSIVE_01', title: 'Avec ou sans barrières', body: 'L’absence de barrière ne supprime jamais le danger.', items: [{ label: 'Feu blanc lunaire', result: 'Passage permis si la sortie est libre' }, { label: 'Feux rouges, sonnerie ou barrière', result: 'Arrêt obligatoire' }, { label: 'Passage non gardé', result: 'Observation renforcée' }] },
    { type: 'summary', title: 'À retenir', items: ['Feu blanc lunaire clignotant : passage permis avec prudence.', 'Feux rouges, signal sonore ou barrières en mouvement : interdiction de s’engager.', 'L’absence de barrière ne signifie jamais absence de train.', 'Toujours vérifier que la sortie est libre avant de traverser.'] },
  ],
  quiz: [
    { visualId: 'M10_LEVEL_OPEN_WHITE_01', question: 'Le feu blanc lunaire clignotant permet-il de franchir le passage si la sortie est libre ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Il autorise le franchissement avec prudence.' },
    { visualId: 'M10_LEVEL_RED_CLOSED_01', question: 'Les feux rouges clignotent. Peux-tu passer si aucun train n’est visible ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Les feux rouges interdisent le passage.' },
    { visualId: 'M10_LEVEL_BARRIER_CLOSING_01', question: 'Une barrière qui descend interdit-elle de s’engager ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Une barrière en mouvement impose l’arrêt.' },
    { visualId: 'M10_LEVEL_PASSIVE_01', question: 'Sans barrière, faut-il encore regarder des deux côtés ?', options: ['Oui', 'Non'], correct: 0, explanation: 'La prudence est indispensable à tout passage à niveau.' },
    { visualId: 'M10_LEVEL_RED_CLOSED_01', question: 'Faut-il attendre la fin de tous les signaux avant de repartir ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Le passage doit être complètement rouvert.' },
  ], nextLessonLabel: 'Suivant : comportement au passage à niveau →',
}
