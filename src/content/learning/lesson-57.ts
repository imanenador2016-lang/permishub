import type { LearningLesson } from './types'

export const LESSON_57: LearningLesson = {
  id: 'angles-morts-et-partage-de-la-route', moduleId: 'vulnerable-users-passengers', title: 'Angles morts & partage de la route',
  description: 'Contrôler ce que les rétroviseurs ne montrent pas et protéger les deux-roues.', xp: 25,
  steps: [
    { type: 'text', visualId: 'M8_TRUCK_BLIND_SPOT_01', title: 'Invisible ne veut pas dire absent', body: 'Chaque véhicule possède des zones invisibles dans les rétroviseurs. Elles sont beaucoup plus grandes autour d’un poids lourd, surtout près de la cabine et sur les côtés.', callout: 'RÉTROVISEUR + CONTRÔLE DIRECT.' },
    { type: 'scenario', visualId: 'M8_TRUCK_BLIND_SPOT_01', title: 'À droite du camion', body: 'Un cycliste se place très près du flanc droit d’un camion arrêté au carrefour.', question: 'Le conducteur du camion peut-il ne pas le voir ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Le cycliste se trouve dans une zone d’angle mort particulièrement dangereuse lors d’un virage à droite.' },
    { type: 'scenario', visualId: 'M8_SHOULDER_CHECK_01', title: 'Changer de bande', body: 'Une motocyclette se trouve près du montant arrière de la voiture.', question: 'Les rétroviseurs suffisent-ils avant de se déporter ?', options: ['Oui', 'Non, il faut aussi contrôler par-dessus l’épaule'], correct: 1, explanation: 'Le contrôle direct vérifie la zone que les rétroviseurs peuvent masquer.' },
    { type: 'scenario', visualId: 'M8_BLIND_SPOT_WARNING_01', title: 'Voyant d’angle mort', body: 'Le voyant du rétroviseur est allumé et un cycliste se trouve à côté du véhicule.', question: 'Peux-tu changer de bande immédiatement ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Attends que la zone soit libre et vérifie toi-même. L’assistance ne remplace pas l’observation.' },
    { type: 'text', visualId: 'M8_CYCLE_PATH_01', title: 'Avant de tourner ou d’ouvrir', body: 'Avant de tourner, de changer de bande ou d’ouvrir une portière, contrôle les rétroviseurs puis la zone latérale. Un cycliste peut arriver vite et rester caché jusqu’au dernier instant.', callout: 'RÉTRO · ÉPAULE · ACTION.' },
    { type: 'scenario', visualId: 'M4_CYCLIST_NARROW_ROAD_01', title: 'Pas assez d’espace', body: 'La chaussée est étroite, un cycliste est devant et un véhicule arrive en face.', question: 'Faut-il attendre avant de dépasser ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Tu dois respecter la distance latérale et ne pas mettre en danger la circulation venant en sens inverse.' },
    { type: 'summary', title: 'À retenir', items: ['Tout véhicule possède des angles morts.', 'Les zones autour des poids lourds sont particulièrement dangereuses.', 'Avant un déplacement latéral : rétroviseurs puis contrôle direct.', 'Un voyant d’angle mort aide mais ne remplace jamais le regard.', 'Avant de tourner ou d’ouvrir une portière, cherche les deux-roues.', 'Si l’espace manque pour dépasser en sécurité, attends.'] },
  ],
  quiz: [
    { visualId: 'M8_TRUCK_BLIND_SPOT_01', question: 'Le cycliste placé à droite du camion peut-il être invisible pour le chauffeur ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Il peut se trouver dans un angle mort.' },
    { visualId: 'M8_SHOULDER_CHECK_01', question: 'Avant un changement de bande, faut-il contrôler directement la zone latérale ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Le regard par-dessus l’épaule complète les rétroviseurs.' },
    { visualId: 'M8_BLIND_SPOT_WARNING_01', question: 'Le voyant est allumé. Peut-on se déporter ?', options: ['Oui', 'Non'], correct: 1, explanation: 'La zone n’est pas libre.' },
    { visualId: 'M8_BLIND_SPOT_WARNING_01', question: 'L’assistance d’angle mort remplace-t-elle les contrôles visuels ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Le conducteur reste responsable de l’observation.' },
    { visualId: 'M4_CYCLIST_NARROW_ROAD_01', question: 'L’espace est insuffisant avec une voiture en face. Que faire ?', options: ['Dépasser quand même', 'Attendre'], correct: 1, explanation: 'Aucun dépassement ne peut mettre les autres usagers en danger.' },
  ], nextLessonLabel: 'Commencer le défi final →',
}
