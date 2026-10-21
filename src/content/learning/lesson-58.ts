import type { LearningLesson } from './types'

export const LESSON_58: LearningLesson = {
  id: 'autoroute-acces-et-vitesses', moduleId: 'motorway-special-roads', title: 'Autoroute : accès & vitesses',
  description: 'Reconnaître l’autoroute, savoir qui peut y entrer et appliquer ses limites.', xp: 25,
  steps: [
    { type: 'text', visualId: 'M9_MOTORWAY_ENTRY_01', title: 'Le signal crée le régime', body: 'L’autoroute commence au signal F5 et se termine au signal F7. Elle ne comporte ni carrefour à priorité ni feu de circulation.', callout: 'IDENTIFIE D’ABORD LE TYPE DE ROUTE.' },
    { type: 'scenario', visualId: 'M9_MOTORWAY_SPEED_01', title: 'Vitesse maximale', body: 'Tu circules sur une autoroute belge sans limitation locale plus basse et les conditions sont bonnes.', question: 'Quelle est la vitesse maximale pour une voiture ?', options: ['90 km/h', '120 km/h', '130 km/h'], correct: 1, explanation: 'La limite générale est de 120 km/h, sauf signalisation plus restrictive ou circonstances imposant de ralentir.' },
    { type: 'scenario', visualId: 'M9_MOTORWAY_ENTRY_01', title: 'Vitesse minimale', body: 'La circulation est fluide et les conditions permettent de rouler normalement.', question: 'Un véhicule incapable d’atteindre 70 km/h en palier peut-il emprunter l’autoroute ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Il n’y est pas admis. La règle des 70 km/h s’apprécie lorsque les conditions permettent cette vitesse.' },
    { type: 'compare', visualId: 'M9_FORBIDDEN_VEHICLES_01', title: 'Véhicules exclus', body: 'Ces catégories ne peuvent pas emprunter l’autoroute.', items: [{ label: 'Cyclomoteur', result: 'Interdit' }, { label: 'Véhicule agricole', result: 'Interdit' }, { label: 'Quadricycle sans habitacle', result: 'Interdit' }, { label: 'Train forain', result: 'Interdit' }] },
    { type: 'scenario', visualId: 'M9_MOTORWAY_ENTRY_01', title: 'Permis provisoire', body: 'Un candidat répond aux conditions de son permis provisoire et conduit un véhicule autorisé.', question: 'Peut-il circuler sur l’autoroute ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Le permis provisoire n’interdit pas, à lui seul, l’autoroute. Les autres conditions du permis restent applicables.' },
    { type: 'text', visualId: 'M9_RUSH_HOUR_LANE_01', title: 'La signalisation locale prime', body: 'Une limitation affichée au-dessus d’une bande ou sur un panneau s’applique même si la limite générale est plus élevée. La météo, la visibilité et le trafic peuvent aussi imposer une vitesse inférieure.', callout: '120 EST UN MAXIMUM, PAS UNE VITESSE À ATTEINDRE.' },
    { type: 'summary', title: 'À retenir', items: ['F5 : commencement d’autoroute ; F7 : fin.', 'Maximum général : 120 km/h.', 'Minimum de 70 km/h lorsque les conditions le permettent.', 'Les véhicules incapables d’atteindre 70 km/h en palier sont exclus.', 'La signalisation et les circonstances peuvent imposer de ralentir.'] },
  ],
  quiz: [
    { visualId: 'M9_MOTORWAY_SPEED_01', question: 'Sans autre signalisation, quelle est la vitesse maximale d’une voiture sur autoroute belge ?', options: ['90 km/h', '120 km/h', '130 km/h'], correct: 1, explanation: 'La limite générale est 120 km/h.' },
    { visualId: 'M9_FORBIDDEN_VEHICLES_01', question: 'Un tracteur agricole peut-il emprunter l’autoroute ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Les véhicules agricoles y sont interdits.' },
    { visualId: 'M9_MOTORWAY_ENTRY_01', question: 'La présence du signal F5 marque-t-elle le début du régime autoroutier ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Le signal F5 marque le commencement de l’autoroute.' },
    { visualId: 'M9_MOTORWAY_ENTRY_01', question: 'La règle des 70 km/h reste-t-elle absolue dans un embouteillage ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Elle vaut lorsque les conditions permettent de rouler à cette vitesse.' },
    { visualId: 'M9_RUSH_HOUR_LANE_01', question: 'Une limitation locale plus basse remplace-t-elle la limite générale de 120 km/h ?', options: ['Oui', 'Non'], correct: 0, explanation: 'La signalisation locale prime.' },
  ], nextLessonLabel: 'Suivant : insertion & sortie →',
}
