import type { LearningLesson } from './types'

export const LESSON_62: LearningLesson = {
  id: 'autoroute-panne-et-securisation', moduleId: 'motorway-special-roads', title: 'Panne & sécurisation',
  description: 'Protéger les occupants et alerter sans créer de suraccident.', xp: 25,
  steps: [
    { type: 'scenario', visualId: 'M9_MOTORWAY_BREAKDOWN_01', title: 'Immobilisation forcée', body: 'Une panne t’oblige à t’arrêter.', question: 'Où places-tu le véhicule si tu peux encore le déplacer ?', options: ['Le plus loin possible de la circulation, sur la bande d’arrêt d’urgence', 'Sur la bande de droite'], correct: 0, explanation: 'Dégage au maximum la chaussée et allume immédiatement les feux de détresse.' },
    { type: 'text', visualId: 'M9_MOTORWAY_BREAKDOWN_01', title: 'Avant de sortir', body: 'Le conducteur enfile le gilet réfléchissant avant de quitter le véhicule. Si possible, les occupants sortent du côté opposé au trafic.', callout: 'LE GILET SE MET AVANT DE S’EXPOSER.' },
    { type: 'scenario', visualId: 'M9_MOTORWAY_BREAKDOWN_01', title: 'Triangle', body: 'La situation permet de placer le triangle sans danger supplémentaire.', question: 'À quelle distance minimale le places-tu sur autoroute ?', options: ['30 m', '50 m', '100 m'], correct: 2, explanation: 'Sur autoroute, le triangle se place au moins 100 m avant le véhicule, s’il est possible de le faire en sécurité.' },
    { type: 'scenario', visualId: 'M9_MOTORWAY_BREAKDOWN_01', title: 'Où attendre ?', body: 'Le véhicule est immobilisé et signalé.', question: 'Où les occupants doivent-ils attendre ?', options: ['Dans la voiture', 'Derrière la glissière, loin du trafic'], correct: 1, explanation: 'La glissière offre une séparation avec la circulation. Il ne faut pas rester près du véhicule.' },
    { type: 'text', visualId: 'M9_MOTORWAY_BREAKDOWN_01', title: 'Alerter précisément', body: 'Appelle le 112 si la situation l’exige et indique l’autoroute, le sens, la borne ou le point kilométrique et les dangers présents.', callout: 'LOCALISATION + SENS + NATURE DU DANGER.' },
    { type: 'scenario', visualId: 'M9_MOTORWAY_BREAKDOWN_01', title: 'Remorquage improvisé', body: 'Un autre conducteur propose de tracter la voiture avec une corde jusqu’à la prochaine sortie.', question: 'Est-ce autorisé sur autoroute ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Le remorquage avec une attache de fortune est interdit sur autoroute.' },
    { type: 'summary', title: 'À retenir', items: ['Dégage le véhicule et active les feux de détresse.', 'Enfile le gilet avant de sortir.', 'Triangle : au moins 100 m sur autoroute, si le placement est sûr.', 'Attends derrière la glissière.', 'Pas de remorquage improvisé avec une corde.'] },
  ],
  quiz: [
    { visualId: 'M9_MOTORWAY_BREAKDOWN_01', question: 'Le conducteur met-il son gilet avant de sortir ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Il doit être visible dès qu’il s’expose.' },
    { visualId: 'M9_MOTORWAY_BREAKDOWN_01', question: 'Triangle sur autoroute : distance minimale ?', options: ['30 m', '100 m'], correct: 1, explanation: 'Au moins 100 m si cela peut se faire sans danger.' },
    { visualId: 'M9_MOTORWAY_BREAKDOWN_01', question: 'Faut-il attendre derrière la glissière ?', options: ['Oui', 'Non'], correct: 0, explanation: 'On s’éloigne de la trajectoire du trafic.' },
    { visualId: 'M9_MOTORWAY_BREAKDOWN_01', question: 'Peux-tu t’arrêter sur la bande d’urgence pour téléphoner sans panne ?', options: ['Oui', 'Non'], correct: 1, explanation: 'La bande d’arrêt d’urgence n’est pas une aire de pause.' },
    { visualId: 'M9_MOTORWAY_BREAKDOWN_01', question: 'Une corde de remorquage improvisée est-elle autorisée sur autoroute ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Ce remorquage y est interdit.' },
  ], nextLessonLabel: 'Suivant : route pour automobiles →',
}
