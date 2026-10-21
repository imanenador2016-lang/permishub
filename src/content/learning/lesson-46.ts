import type { LearningLesson } from './types'

export const LESSON_46: LearningLesson = {
  id: 'remorques-et-porte-velos', moduleId: 'vehicle-technical-safety', title: 'Remorques & porte-vélos',
  description: 'Vérifier le permis, les masses et la visibilité arrière.', xp: 25,
  steps: [
    { type: 'scenario', visualId: 'M7_TRAILER_01', title: 'Permis provisoire', body: 'Le candidat possède seulement un permis B provisoire.', question: 'Peut-il tracter une petite remorque ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Le permis B provisoire ne permet pas de tracter une remorque.' },
    { type: 'scenario', visualId: 'M7_TRAILER_01', title: 'Remorque légère', body: 'Le conducteur possède un permis B définitif et la remorque a une MMA de 750 kg.', question: 'Le permis B suffit-il ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Une remorque dont la MMA ne dépasse pas 750 kg peut être tractée avec un permis B définitif.' },
    { type: 'scenario', visualId: 'M7_TRAILER_01', title: 'Remorque plus lourde', body: 'La remorque dépasse 750 kg de MMA, mais la MMA de l’ensemble voiture-remorque ne dépasse pas 3 500 kg.', question: 'Le permis B définitif peut-il suffire ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Oui, si la MMA de l’ensemble reste au maximum à 3 500 kg et si les limites techniques sont respectées.' },
    { type: 'text', visualId: 'M7_TRAILER_HITCH_01', title: 'Atteler ne se résume pas à la boule', body: 'Verrouille l’attelage, raccorde la prise électrique, fixe le dispositif de sécurité prévu et vérifie feux, plaque, pneus et charge d’appui avant de partir.', callout: 'ATTELAGE · CÂBLE · PRISE · FEUX.' },
    { type: 'scenario', visualId: 'M7_BIKE_RACK_01', title: 'Porte-vélos', body: 'Les vélos cachent la plaque et les feux arrière de la voiture.', question: 'Peut-on partir sans dispositif complémentaire ?', options: ['Oui', 'Non'], correct: 1, explanation: 'La plaque et les feux doivent rester visibles ou être répétés sur un support conforme.' },
    { type: 'text', visualId: 'M7_TRAILER_01', title: 'Regarde l’ensemble', body: 'Pour choisir le permis et vérifier la conformité, utilise les MMA inscrites sur les documents. Respecte aussi la capacité de traction du véhicule et les limites propres à l’attelage.', callout: 'PERMIS AUTORISÉ ≠ VÉHICULE CAPABLE DE TOUT TRACTER.' },
    { type: 'summary', title: 'À retenir', items: ['Aucune remorque avec un permis B provisoire.', 'Permis B définitif : remorque jusqu’à 750 kg de MMA.', 'Au-delà de 750 kg, l’ensemble peut rester en catégorie B jusqu’à 3 500 kg de MMA.', 'Toujours respecter les limites techniques du véhicule.', 'Plaque et feux arrière doivent rester visibles.'] },
  ],
  quiz: [
    { visualId: 'M7_TRAILER_01', question: 'Le permis B provisoire permet-il une remorque de 500 kg ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Aucune remorque avec le permis provisoire.' },
    { visualId: 'M7_TRAILER_01', question: 'Avec un permis B définitif, une remorque de 750 kg de MMA est-elle admise ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Elle se situe à la limite prévue pour la remorque légère.' },
    { visualId: 'M7_TRAILER_01', question: 'Remorque de plus de 750 kg : quelle MMA d’ensemble permet encore la catégorie B ?', options: ['Maximum 3 500 kg', 'Maximum 5 000 kg'], correct: 0, explanation: 'Au-delà de 3 500 kg, le permis B seul ne suffit plus dans ce cas.' },
    { visualId: 'M7_TRAILER_HITCH_01', question: 'Faut-il contrôler la prise électrique avant de partir ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Elle alimente notamment la signalisation arrière.' },
    { visualId: 'M7_BIKE_RACK_01', question: 'Un porte-vélos peut-il masquer la plaque ?', options: ['Oui', 'Non'], correct: 1, explanation: 'La plaque doit rester lisible ou être répétée conformément aux règles.' },
  ], nextLessonLabel: 'Suivant : équipements & documents →',
}
