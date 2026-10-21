import type { LearningLesson } from './types'

export const LESSON_56: LearningLesson = {
  id: 'enfants-et-dispositifs-de-retenue', moduleId: 'vulnerable-users-passengers', title: 'Enfants & dispositifs de retenue',
  description: 'Choisir la protection adaptée à la taille et neutraliser les risques.', xp: 25,
  steps: [
    { type: 'text', visualId: 'M8_CHILD_SEAT_01', title: 'Le seuil à retenir', body: 'Un enfant de moins de 18 ans mesurant moins de 1,35 m voyage dans un dispositif de retenue adapté et homologué. À partir de 1,35 m, il peut utiliser la ceinture de sécurité.', callout: 'MOINS DE 18 ANS + MOINS DE 1,35 M = DRA.' },
    { type: 'scenario', visualId: 'M8_CHILD_SEAT_01', title: 'Enfant de 1,20 m', body: 'Un enfant de 8 ans mesure 1,20 m.', question: 'La ceinture seule suffit-elle dans une situation ordinaire ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Il a moins de 18 ans et mesure moins de 1,35 m : un dispositif adapté est obligatoire.' },
    { type: 'scenario', visualId: 'M8_CHILD_SEAT_01', title: 'Enfant de 1,40 m', body: 'Un enfant de 12 ans mesure 1,40 m et la ceinture est correctement positionnée.', question: 'Peut-il utiliser la ceinture sans rehausseur ?', options: ['Oui', 'Non'], correct: 0, explanation: 'À partir de 1,35 m, la ceinture peut être utilisée sans dispositif enfant.' },
    { type: 'scenario', visualId: 'M8_REAR_FACING_AIRBAG_01', title: 'Dos à la route à l’avant', body: 'Un siège enfant dos à la route est installé sur le siège passager avant.', question: 'Le coussin frontal peut-il rester actif ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Un siège dos à la route ne peut être placé devant un airbag frontal actif. Il faut le désactiver de manière fiable.' },
    { type: 'text', visualId: 'M8_CHILD_SEAT_01', title: 'Installation correcte', body: 'Le dispositif doit être adapté à l’enfant, homologué, solidement installé et utilisé selon sa notice. Les sangles restent ajustées et la partie basse ne doit pas remonter sur l’abdomen.', callout: 'ADAPTÉ · HOMOLOGUÉ · BIEN FIXÉ.' },
    { type: 'scenario', visualId: 'M8_CHILD_EXCEPTION_01', title: 'Exception très encadrée', body: 'Un enfant de plus de 3 ans et de moins de 1,35 m effectue exceptionnellement un court trajet à l’arrière dans la voiture d’une personne qui n’est pas son parent. Aucun dispositif n’est disponible.', question: 'Peut-il exceptionnellement utiliser la ceinture ?', options: ['Oui, si toutes ces conditions sont réunies', 'Non, jamais'], correct: 0, explanation: 'Cette exception existe pour un transport occasionnel, court, par une personne autre qu’un parent, et uniquement à l’arrière.' },
    { type: 'summary', title: 'À retenir', items: ['Moins de 18 ans et moins de 1,35 m : dispositif adapté obligatoire.', 'À partir de 1,35 m : ceinture ou dispositif adapté.', 'Dos à la route devant : airbag frontal désactivé.', 'Respecte l’homologation et la notice du siège.', 'L’exception de court trajet est rare, encadrée et réservée à l’arrière.'] },
  ],
  quiz: [
    { visualId: 'M8_CHILD_SEAT_01', question: 'Un enfant de 1,25 m peut-il utiliser seulement la ceinture dans un trajet ordinaire ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Sous 1,35 m, il faut un dispositif adapté.' },
    { visualId: 'M8_CHILD_SEAT_01', question: 'Un enfant de 1,38 m peut-il utiliser la ceinture correctement ajustée ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Il atteint le seuil de 1,35 m.' },
    { visualId: 'M8_REAR_FACING_AIRBAG_01', question: 'Siège dos à la route à l’avant : l’airbag frontal doit-il être désactivé ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Un airbag actif serait dangereux pour l’enfant.' },
    { visualId: 'M8_CHILD_SEAT_01', question: 'Un siège enfant doit-il être homologué ?', options: ['Oui', 'Non'], correct: 0, explanation: 'L’homologation et l’adaptation à l’enfant sont indispensables.' },
    { visualId: 'M8_CHILD_EXCEPTION_01', question: 'L’exception de court trajet permet-elle d’installer l’enfant à l’avant ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Cette exception ne vaut qu’à l’arrière.' },
  ], nextLessonLabel: 'Suivant : angles morts →',
}
