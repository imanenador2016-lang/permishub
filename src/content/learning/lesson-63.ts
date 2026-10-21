import type { LearningLesson } from './types'

export const LESSON_63: LearningLesson = {
  id: 'route-pour-automobiles', moduleId: 'motorway-special-roads', title: 'Route pour automobiles',
  description: 'La distinguer de l’autoroute et calculer la vitesse selon la Région et l’aménagement.', xp: 25,
  steps: [
    { type: 'scenario', visualId: 'M9_MOTOR_ROAD_INTERSECTION_01', title: 'Pas une autoroute', body: 'Le signal F9 annonce une route pour automobiles. Plus loin, la route comporte un carrefour avec des feux.', question: 'Cette configuration est-elle possible ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Contrairement à l’autoroute, une route pour automobiles peut comporter des carrefours et des feux.' },
    { type: 'scenario', visualId: 'M9_FORBIDDEN_VEHICLES_01', title: 'Accès', body: 'Un cyclomoteur arrive devant le signal F9.', question: 'Peut-il continuer ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Les mêmes catégories lentes exclues de l’autoroute sont exclues de la route pour automobiles.' },
    { type: 'scenario', visualId: 'M9_MOTOR_ROAD_DIVIDED_01', title: 'Deux chaussées séparées', body: 'Hors agglomération, chaque sens compte au moins deux bandes et les sens sont séparés par une berme centrale. Aucun panneau ne limite davantage.', question: 'Quelle est la vitesse maximale d’une voiture ?', options: ['70 km/h', '90 km/h', '120 km/h'], correct: 2, explanation: 'Sur cette configuration séparée physiquement, la limite générale peut atteindre 120 km/h.' },
    { type: 'scenario', visualId: 'M9_MOTOR_ROAD_WALLONIA_01', title: 'En Wallonie', body: 'Hors agglomération en Région wallonne, les deux sens ne sont séparés que par des lignes au sol et aucun panneau n’impose une autre limite.', question: 'Quelle est la vitesse maximale ?', options: ['70 km/h', '90 km/h', '120 km/h'], correct: 1, explanation: 'Dans cette configuration en Wallonie, la limite générale est 90 km/h.' },
    { type: 'compare', visualId: 'M9_MOTOR_ROAD_WALLONIA_01', title: 'Même route, autre Région', body: 'Hors agglomération, sans berme centrale et sans signal différent.', items: [{ label: 'Région wallonne', result: '90 km/h' }, { label: 'Région flamande', result: '70 km/h' }, { label: 'Bruxelles-Capitale', result: '70 km/h' }] },
    { type: 'text', visualId: 'M9_MOTOR_ROAD_INTERSECTION_01', title: 'Minimum et panne', body: 'Il n’existe pas de vitesse minimale propre à cette route, mais gêner sans raison en roulant anormalement lentement reste interdit. En panne, le triangle se place à 30 m et doit être visible à 50 m.', callout: 'ROUTE POUR AUTOMOBILES ≠ AUTOROUTE.' },
    { type: 'summary', title: 'À retenir', items: ['Signal F9 : route pour automobiles.', 'Des carrefours et des feux peuvent exister.', 'Berme centrale + au moins deux bandes par sens hors agglomération : jusqu’à 120 km/h.', 'Sans berme hors agglomération : 90 en Wallonie, 70 en Flandre et à Bruxelles.', 'Pas de minimum légal propre, mais pas de lenteur injustifiée.'] },
  ],
  quiz: [
    { visualId: 'M9_MOTOR_ROAD_INTERSECTION_01', question: 'Une route pour automobiles peut-elle comporter un feu ?', options: ['Oui', 'Non'], correct: 0, explanation: 'C’est une différence importante avec l’autoroute.' },
    { visualId: 'M9_FORBIDDEN_VEHICLES_01', question: 'Un véhicule agricole est-il admis sur une route pour automobiles ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Il en est exclu.' },
    { visualId: 'M9_MOTOR_ROAD_DIVIDED_01', question: 'Hors agglomération, avec berme centrale et au moins deux bandes par sens, quelle limite générale ?', options: ['70 km/h', '90 km/h', '120 km/h'], correct: 2, explanation: 'Cette configuration permet jusqu’à 120 km/h sans restriction locale.' },
    { visualId: 'M9_MOTOR_ROAD_WALLONIA_01', question: 'En Wallonie, hors agglomération et sans berme centrale, quelle limite générale ?', options: ['70 km/h', '90 km/h', '120 km/h'], correct: 1, explanation: 'La réponse dépend ici de la Région : 90 km/h en Wallonie.' },
    { visualId: 'M9_MOTOR_ROAD_WALLONIA_01', question: 'En Flandre, dans la même configuration sans berme, quelle limite générale ?', options: ['70 km/h', '90 km/h'], correct: 0, explanation: 'Elle est de 70 km/h en Région flamande.' },
  ], nextLessonLabel: 'Suivant : zones & voies spéciales →',
}
