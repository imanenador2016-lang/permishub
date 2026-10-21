import type { LearningLesson } from './types'

export const LESSON_47: LearningLesson = {
  id: 'equipements-et-documents-obligatoires', moduleId: 'vehicle-technical-safety', title: 'Équipements & documents obligatoires',
  description: 'Savoir ce qui doit accompagner le conducteur et la voiture.', xp: 20,
  steps: [
    { type: 'hierarchy', visualId: 'M7_EQUIPMENT_01', title: 'Le quatuor obligatoire', body: 'Une voiture doit contenir les équipements de sécurité prescrits.', items: ['Triangle de danger', 'Trousse de secours', 'Extincteur homologué et valide', 'Gilet de sécurité réfléchissant'], memory: 'TRIANGLE · TROUSSE · EXTINCTEUR · GILET' },
    { type: 'scenario', visualId: 'M7_EXTINGUISHER_01', title: 'Extincteur accessible', body: 'L’extincteur est périmé et enfoui sous des bagages dans le coffre.', question: 'Est-il correctement disponible ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Il doit être valide, solidement fixé et rapidement accessible au conducteur.' },
    { type: 'scenario', visualId: 'M7_EQUIPMENT_01', title: 'Gilet avant de sortir', body: 'Le conducteur tombe en panne sur une autoroute.', question: 'Doit-il enfiler le gilet avant de quitter la voiture ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Le conducteur doit pouvoir le porter avant de s’exposer à la circulation.' },
    { type: 'compare', visualId: 'M7_DOCUMENTS_01', title: 'Conducteur ou véhicule ?', body: 'Certaines pièces concernent la personne, les autres la voiture.', items: [{ label: 'Conducteur', result: 'Carte d’identité et permis de conduire' }, { label: 'Véhicule', result: 'Immatriculation, conformité, assurance et contrôle technique si applicable' }] },
    { type: 'scenario', visualId: 'M7_DOCUMENTS_01', title: 'Assurance numérique', body: 'Le conducteur présente une copie électronique valable de son certificat d’assurance.', question: 'Ce format peut-il être admis ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Le certificat d’assurance peut être présenté sous forme électronique valable.' },
    { type: 'text', visualId: 'M7_EQUIPMENT_01', title: 'Contrôle avant le départ', body: 'Vérifie régulièrement la présence, l’état, la date de validité et l’accessibilité des équipements. Un objet obligatoire inutilisable ne protège personne.', callout: 'PRÉSENT · VALIDE · ACCESSIBLE.' },
    { type: 'summary', title: 'À retenir', items: ['Triangle, trousse, extincteur et gilet dans la voiture.', 'Extincteur valide, fixé et accessible.', 'Gilet accessible avant de sortir.', 'Carte d’identité et permis pour le conducteur.', 'Documents officiels liés au véhicule disponibles.'] },
  ],
  quiz: [
    { visualId: 'M7_EQUIPMENT_01', question: 'Lequel est obligatoire ?', options: ['Triangle de danger', 'Couverture de pique-nique'], correct: 0, explanation: 'Le triangle fait partie de l’équipement obligatoire.' },
    { visualId: 'M7_EXTINGUISHER_01', question: 'L’extincteur peut-il être inaccessible sous les bagages ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Il doit pouvoir être saisi rapidement.' },
    { visualId: 'M7_EQUIPMENT_01', question: 'Quel équipement enfile-t-on avant de sortir en panne sur autoroute ?', options: ['Le gilet réfléchissant', 'Le triangle'], correct: 0, explanation: 'Le triangle se place ensuite à distance.' },
    { visualId: 'M7_DOCUMENTS_01', question: 'Le permis de conduire concerne-t-il le conducteur ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Il atteste le droit de conduire de la personne.' },
    { visualId: 'M7_DOCUMENTS_01', question: 'Le certificat d’immatriculation concerne-t-il le véhicule ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Il identifie le véhicule immatriculé.' },
  ], nextLessonLabel: 'Suivant : pneus →',
}
