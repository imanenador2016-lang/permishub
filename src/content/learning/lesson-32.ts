import type { LearningLesson } from './types'

export const LESSON_32: LearningLesson = {
  id: 'arret-et-stationnement-interdits',
  moduleId: 'stopping-parking',
  title: 'Arrêt et stationnement interdits',
  description: 'Reconnaître les endroits où même un arrêt volontaire est interdit.',
  xp: 25,
  steps: [
    { type: 'text', visualId: 'M5_DANGER_OVERVIEW_01', title: 'La règle de sécurité', body: 'Même sans panneau, il est interdit de s’arrêter ou de stationner là où le véhicule constitue manifestement un danger ou une gêne sans nécessité.', callout: 'PAS DE PANNEAU NE SIGNIFIE PAS TOUJOURS AUTORISÉ.' },
    { type: 'scenario', visualId: 'M5_CYCLEPATH_BLOCK_01', title: 'Trottoir ou piste cyclable', body: 'La voiture occupe une piste cyclable et oblige le cycliste à se déporter.', question: 'Un arrêt très court est-il autorisé ?', options: ['Oui, avec les feux de détresse', 'Non'], correct: 1, explanation: 'L’arrêt et le stationnement sont interdits sur une piste cyclable. Les feux de détresse ne créent aucune autorisation.' },
    { type: 'scenario', visualId: 'M5_CROSSWALK_5M_01', title: 'Avant un passage pour piétons', body: 'La voiture est placée sur la chaussée, trois mètres avant le passage.', question: 'Peut-elle s’y arrêter pour déposer quelqu’un ?', options: ['Oui', 'Non'], correct: 1, explanation: 'L’arrêt et le stationnement sont interdits sur le passage et sur la chaussée à moins de 5 m en deçà.' },
    { type: 'scenario', visualId: 'M5_INTERSECTION_5M_01', title: 'Près d’un carrefour', body: 'La voiture se trouve à trois mètres du prolongement du bord de la chaussée transversale.', question: 'L’arrêt est-il autorisé en l’absence de règle locale contraire ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Aux abords d’un carrefour, l’arrêt et le stationnement sont interdits à moins de 5 m de ce repère, sauf réglementation locale.' },
    { type: 'scenario', visualId: 'M5_LEVEL_CROSSING_STOP_01', title: 'Passage à niveau', body: 'Le conducteur veut déposer un passager sur le passage à niveau.', question: 'Peut-il le faire rapidement ?', options: ['Oui', 'Non'], correct: 1, explanation: 'L’arrêt et le stationnement sont interdits sur un passage à niveau.' },
    { type: 'scenario', visualId: 'M5_BLIND_CURVE_STOP_01', title: 'Virage sans visibilité', body: 'La voiture serait arrêtée sur la chaussée dans un virage où la visibilité est insuffisante.', question: 'Est-ce autorisé ?', options: ['Oui si l’arrêt dure moins d’une minute', 'Non'], correct: 1, explanation: 'L’arrêt et le stationnement sont interdits sur la chaussée dans un virage lorsque la visibilité est insuffisante.' },
    { type: 'scenario', visualId: 'M5_RAISED_DEVICE_STOP_01', title: 'Dispositif surélevé', body: 'La voiture veut s’arrêter volontairement sur le dispositif surélevé.', question: 'Est-ce permis sans réglementation locale qui l’autorise ?', options: ['Oui', 'Non'], correct: 1, explanation: 'L’arrêt et le stationnement sont interdits sur les dispositifs surélevés, sauf réglementation locale.' },
    { type: 'summary', title: 'À retenir', items: ['Trottoir et piste cyclable : arrêt et stationnement interdits selon les règles étudiées.', 'Passage piéton ou cycliste : interdits dessus et sur la chaussée à moins de 5 m avant.', 'Carrefour : garde au moins 5 m, sauf réglementation locale.', 'Passage à niveau : jamais d’arrêt volontaire.', 'Virage ou sommet sans visibilité : pas d’arrêt sur la chaussée.', 'Dispositif surélevé : interdit sauf réglementation locale.'] },
  ],
  quiz: [
    { question: 'Peux-tu t’arrêter sur une piste cyclable pour déposer rapidement un passager ?', options: ['Oui', 'Non'], correct: 1, explanation: 'L’arrêt y est interdit.' },
    { question: 'La voiture est placée 3 m avant un passage pour piétons, sur la chaussée. Est-ce autorisé ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Il faut rester à au moins 5 m en deçà du passage.' },
    { question: 'Peux-tu t’arrêter sur un passage à niveau si aucune barrière ne se ferme ?', options: ['Oui', 'Non'], correct: 1, explanation: 'L’interdiction d’arrêt et de stationnement subsiste.' },
    { question: 'Un arrêt dans un virage à visibilité insuffisante est-il permis sur la chaussée ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Il est interdit en raison du danger.' },
    { question: 'L’absence de panneau garantit-elle que l’arrêt est autorisé ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Les interdictions générales du Code s’appliquent aussi sans panneau.' },
  ],
}
