import type { LearningLesson } from './types'

export const LESSON_53: LearningLesson = {
  id: 'cyclistes-pistes-et-passages', moduleId: 'vulnerable-users-passengers', title: 'Cyclistes : pistes & passages',
  description: 'Distinguer piste, passage cycliste, passage piéton et zone cyclable.', xp: 25,
  steps: [
    { type: 'text', visualId: 'M8_CYCLE_PATH_01', title: 'La piste cyclable', body: 'Une piste cyclable signalée ou délimitée par deux lignes blanches discontinues parallèles doit être utilisée par le cycliste lorsqu’elle est praticable. Une simple bande colorée ne suffit pas à créer une piste.', callout: 'COULEUR SEULE ≠ PISTE CYCLABLE.' },
    { type: 'scenario', visualId: 'M8_CYCLE_PATH_01', title: 'Partie distincte de la voie publique', body: 'Le cycliste circule sur une piste séparée, parallèle à la chaussée.', question: 'La voiture peut-elle s’y arrêter pour déposer un passager ?', options: ['Oui, brièvement', 'Non'], correct: 1, explanation: 'La piste cyclable ne fait pas partie de la chaussée. Il est interdit d’y circuler, de s’y arrêter ou d’y stationner en voiture.' },
    { type: 'scenario', visualId: 'M8_CYCLE_CROSSING_01', title: 'Passage pour cyclistes', body: 'La cycliste attend avant les blocs blancs du passage. Des voitures circulent sur la chaussée.', question: 'Doit-elle céder le passage avant de s’engager ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Avant de s’engager sur le passage cycliste, elle doit céder le passage aux conducteurs qui circulent sur la chaussée.' },
    { type: 'scenario', visualId: 'M8_CYCLE_CROSSING_01', title: 'Une fois engagée', body: 'La cycliste est déjà engagée sur le passage et termine normalement sa traversée.', question: 'Le conducteur peut-il la gêner ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Le conducteur s’approche à allure modérée et ne met pas en danger un cycliste déjà engagé.' },
    { type: 'compare', visualId: 'M8_PUSHING_BICYCLE_01', title: 'Deux passages, deux logiques', body: 'Le statut et le marquage déterminent la priorité.', items: [{ label: 'Passage cycliste, cycliste avant de s’engager', result: 'Le cycliste cède le passage' }, { label: 'Passage piéton, vélo poussé à pied', result: 'La personne est piétonne' }] },
    { type: 'scenario', visualId: 'M4_CYCLING_ZONE_01', title: 'Zone cyclable', body: 'Une voiture suit un cycliste dans une zone cyclable.', question: 'Peut-elle le dépasser si elle laisse assez d’espace ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Dans une zone cyclable, les véhicules motorisés ne peuvent pas dépasser les cyclistes. La vitesse maximale y est de 30 km/h.' },
    { type: 'summary', title: 'À retenir', items: ['Piste praticable : le cycliste l’utilise.', 'Une couleur seule ne crée pas une piste cyclable.', 'Pas d’arrêt ni de stationnement sur une piste cyclable.', 'Avant un passage cycliste, le cycliste cède le passage.', 'Un cycliste déjà engagé ne peut pas être gêné.', 'Zone cyclable : maximum 30 km/h et pas de dépassement du cycliste.'] },
  ],
  quiz: [
    { visualId: 'M8_CYCLE_PATH_01', question: 'Une voiture peut-elle s’arrêter sur la piste pour déposer quelqu’un ?', options: ['Oui', 'Non'], correct: 1, explanation: 'L’arrêt y est interdit.' },
    { visualId: 'M8_CYCLE_CROSSING_01', question: 'Qui cède le passage avant que la cycliste s’engage ?', options: ['La cycliste', 'Toujours la voiture'], correct: 0, explanation: 'Le passage cycliste ne donne pas la priorité avant l’engagement.' },
    { visualId: 'M8_PUSHING_BICYCLE_01', question: 'À pied avec son vélo sur le passage piéton, la personne est…', options: ['Piétonne', 'Conductrice'], correct: 0, explanation: 'Elle pousse son vélo et bénéficie du statut de piéton.' },
    { visualId: 'M8_CYCLIST_ZEBRA_01', question: 'En selle sur le passage piéton, le cycliste obtient-il la priorité du piéton ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Il doit descendre pour devenir piéton.' },
    { visualId: 'M4_CYCLING_ZONE_01', question: 'Peut-on dépasser un cycliste dans une zone cyclable ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Le dépassement par un véhicule motorisé y est interdit.' },
  ], nextLessonLabel: 'Suivant : enfants & usagers fragiles →',
}
