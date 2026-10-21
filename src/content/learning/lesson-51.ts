import type { LearningLesson } from './types'

export const LESSON_51: LearningLesson = {
  id: 'pieton-ou-conducteur', moduleId: 'vulnerable-users-passengers', title: 'Piéton ou conducteur ?',
  description: 'Identifier le statut de chaque usager avant d’appliquer une règle.', xp: 20,
  steps: [
    { type: 'text', visualId: 'M8_PUSHING_BICYCLE_01', title: 'Le statut change la règle', body: 'Le mot « usager » vise toute personne qui utilise la voie publique. Le mot « conducteur » ne comprend pas les piétons. Avant de chercher une priorité, identifie donc le statut de la personne.', callout: 'USAGER = PIÉTON OU CONDUCTEUR.' },
    { type: 'scenario', visualId: 'M8_PUSHING_BICYCLE_01', title: 'Vélo à la main', body: 'La personne traverse à pied en poussant son vélo sur un passage pour piétons.', question: 'Est-elle considérée comme piéton ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Une personne qui pousse un vélo est un piéton. Sur le passage, les conducteurs doivent lui céder le passage.' },
    { type: 'scenario', visualId: 'M8_CYCLIST_ZEBRA_01', title: 'Même passage, autre statut', body: 'Cette fois, la personne reste en selle et roule sur le passage pour piétons.', question: 'Bénéficie-t-elle de la priorité accordée au piéton ?', options: ['Oui', 'Non'], correct: 1, explanation: 'En roulant, elle reste conductrice d’un vélo. Pour bénéficier du statut de piéton, elle doit descendre et pousser son vélo.' },
    { type: 'compare', visualId: 'M8_PUSHING_BICYCLE_01', title: 'Pousser ou rouler', body: 'La même personne peut changer de catégorie selon son comportement.', items: [{ label: 'Vélo poussé à la main', result: 'Piéton' }, { label: 'Vélo conduit en selle', result: 'Conducteur' }] },
    { type: 'scenario', visualId: 'M8_PUSHING_MOTORCYCLE_01', title: 'Motocyclette poussée', body: 'Un homme pousse une motocyclette à pied le long de la chaussée.', question: 'Reste-t-il un conducteur ?', options: ['Oui', 'Non'], correct: 0, explanation: 'La personne qui pousse une motocyclette reste un conducteur. Elle doit notamment porter le casque et se déplacer sur la chaussée.' },
    { type: 'text', visualId: 'M8_PEDESTRIAN_ZONE_01', title: 'Engins de déplacement', body: 'Une personne utilisant un engin de déplacement à l’allure du pas est assimilée à un piéton. Si elle va plus vite que l’allure du pas, elle est assimilée à un cycliste.', callout: 'L’ALLURE DU PAS DÉTERMINE LE STATUT.' },
    { type: 'summary', title: 'À retenir', items: ['Toute personne sur la voie publique est un usager.', 'Un conducteur n’est pas un piéton.', 'Pousser un vélo ou un cyclomoteur = piéton.', 'Pousser une motocyclette ou une voiture = conducteur.', 'Engin de déplacement : allure du pas = piéton ; plus vite = cycliste.'] },
  ],
  quiz: [
    { visualId: 'M8_PUSHING_BICYCLE_01', question: 'La personne qui pousse son vélo est-elle un piéton ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Elle se déplace à pied avec son vélo à la main.' },
    { visualId: 'M8_CYCLIST_ZEBRA_01', question: 'Le cycliste qui roule sur un passage piéton possède-t-il la priorité du piéton ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Il reste conducteur tant qu’il roule.' },
    { visualId: 'M8_PUSHING_MOTORCYCLE_01', question: 'La personne qui pousse une motocyclette est-elle un conducteur ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Le Code la considère comme conducteur.' },
    { visualId: 'M8_PEDESTRIAN_ZONE_01', question: 'Un fauteuil roulant qui avance à l’allure du pas est assimilé à…', options: ['Un piéton', 'Un automobiliste'], correct: 0, explanation: 'À l’allure du pas, l’utilisateur est assimilé à un piéton.' },
    { visualId: 'M8_PUSHING_BICYCLE_01', question: 'Le terme « usager » comprend-il les piétons et les conducteurs ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Le terme usager est la catégorie la plus large.' },
  ], nextLessonLabel: 'Suivant : passages pour piétons →',
}
