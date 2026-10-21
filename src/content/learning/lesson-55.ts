import type { LearningLesson } from './types'

export const LESSON_55: LearningLesson = {
  id: 'ceinture-places-et-passagers', moduleId: 'vulnerable-users-passengers', title: 'Ceinture, places & passagers',
  description: 'Installer chaque occupant correctement et connaître les exceptions.', xp: 20,
  steps: [
    { type: 'text', visualId: 'M8_SEATBELT_01', title: 'Une ceinture présente se porte', body: 'Le conducteur et les passagers doivent porter la ceinture aux places qui en sont équipées. Elle passe sur l’épaule et reste basse sur le bassin.', callout: 'UNE PLACE · UN OCCUPANT · UNE CEINTURE.' },
    { type: 'scenario', visualId: 'M8_SEATBELT_01', title: 'Bonne position', body: 'La sangle diagonale passe sur l’épaule et la sangle basse repose sur le bassin.', question: 'Cette position est-elle correcte ?', options: ['Oui', 'Non'], correct: 0, explanation: 'La ceinture ne doit pas passer sous le bras ni sur le cou, et la sangle basse reste sur le bassin.' },
    { type: 'scenario', visualId: 'M8_PREGNANT_SEATBELT_01', title: 'Grossesse', body: 'Une passagère enceinte place la sangle basse sous le ventre et la diagonale entre les seins.', question: 'Doit-elle porter la ceinture ?', options: ['Oui', 'Non'], correct: 0, explanation: 'La grossesse ne dispense pas du port de la ceinture. Un positionnement correct protège la mère et l’enfant.' },
    { type: 'scenario', visualId: 'M8_SEATS_OCCUPANTS_01', title: 'Nombre de places', body: 'La voiture possède cinq places équipées et transporte exactement cinq personnes correctement attachées.', question: 'Le nombre d’occupants est-il correct ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Chaque personne dispose ici d’une place et de sa propre ceinture.' },
    { type: 'text', visualId: 'M8_SEATBELT_01', title: 'Appui-tête', body: 'Règle l’appui-tête pour que sa partie supérieure se situe approximativement à la hauteur du sommet de la tête. Il limite le mouvement de la tête lors d’un choc arrière.', callout: 'SOMMET DE L’APPUI-TÊTE ≈ SOMMET DE LA TÊTE.' },
    { type: 'scenario', visualId: 'M8_SEATBELT_01', title: 'Marche arrière', body: 'Le conducteur effectue réellement une marche arrière.', question: 'Fait-il partie des exceptions légales au port de la ceinture pendant cette manœuvre ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Le conducteur qui effectue une marche arrière fait partie des exceptions prévues. Dès la manœuvre terminée, la ceinture doit être remise.' },
    { type: 'summary', title: 'À retenir', items: ['Ceinture obligatoire lorsqu’elle est présente.', 'Sangle diagonale sur l’épaule, sangle basse sur le bassin.', 'Les femmes enceintes portent la ceinture.', 'Chaque occupant utilise une place adaptée et sa propre retenue.', 'Appui-tête réglé à hauteur du sommet de la tête.', 'Une exception ponctuelle ne dispense pas pour le reste du trajet.'] },
  ],
  quiz: [
    { visualId: 'M8_SEATBELT_01', question: 'La sangle diagonale doit-elle passer sous le bras ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Elle passe sur l’épaule.' },
    { visualId: 'M8_PREGNANT_SEATBELT_01', question: 'Une femme enceinte doit-elle porter la ceinture ?', options: ['Oui', 'Non'], correct: 0, explanation: 'La grossesse n’est pas une exemption.' },
    { visualId: 'M8_SEATS_OCCUPANTS_01', question: 'Peut-on installer deux personnes sur une seule place avec une même ceinture ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Chaque occupant doit disposer de sa place et de sa retenue.' },
    { visualId: 'M8_SEATBELT_01', question: 'Le haut de l’appui-tête doit se situer près du sommet de la tête ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Ce réglage améliore la protection cervicale.' },
    { visualId: 'M8_SEATBELT_01', question: 'L’exception pendant une marche arrière vaut-elle pour tout le trajet ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Elle ne concerne que la manœuvre de marche arrière.' },
  ], nextLessonLabel: 'Suivant : dispositifs pour enfants →',
}
