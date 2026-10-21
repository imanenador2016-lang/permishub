import type { LearningLesson } from './types'

export const LESSON_61: LearningLesson = {
  id: 'autoroute-circulation-dense-et-dangers', moduleId: 'motorway-special-roads', title: 'Circulation dense & dangers',
  description: 'Former le couloir de secours, lire les signaux de bande et réagir à un contresens.', xp: 25,
  steps: [
    { type: 'text', visualId: 'M9_EMERGENCY_CORRIDOR_TWO_01', title: 'Le couloir de secours', body: 'Dès que des files commencent à se former, libère un passage pour les secours sans attendre d’entendre une sirène.', callout: 'LE COULOIR SE FORME AVANT L’ARRIVÉE DES SECOURS.' },
    { type: 'scenario', visualId: 'M9_EMERGENCY_CORRIDOR_TWO_01', title: 'Deux bandes', body: 'La chaussée comporte deux bandes dans ton sens.', question: 'Où se forme le couloir ?', options: ['Entre les deux bandes', 'Sur la bande d’arrêt d’urgence', 'Le long de la berme centrale uniquement'], correct: 0, explanation: 'La file de gauche serre à gauche et celle de droite serre à droite.' },
    { type: 'scenario', visualId: 'M9_EMERGENCY_CORRIDOR_THREE_01', title: 'Trois bandes', body: 'La chaussée comporte trois bandes dans ton sens.', question: 'Quelle file se déplace vers la gauche ?', options: ['La file la plus à gauche', 'La file du milieu', 'La file la plus à droite'], correct: 0, explanation: 'La file la plus à gauche serre à gauche ; toutes les autres serrent à droite.' },
    { type: 'scenario', visualId: 'M9_RUSH_HOUR_LANE_01', title: 'Bande d’heure de pointe', body: 'Une flèche verte est allumée au-dessus de la bande temporaire.', question: 'La bande est-elle ouverte à la circulation ?', options: ['Oui', 'Non'], correct: 0, explanation: 'La flèche verte autorise son utilisation. Une croix rouge la ferme.' },
    { type: 'scenario', visualId: 'M9_WRONG_WAY_01', title: 'Conducteur fantôme', body: 'Un véhicule arrive à contresens sur ta chaussée.', question: 'Quelle réaction est la plus sûre ?', options: ['Accélérer et le dépasser à gauche', 'Ralentir, serrer à droite et appeler le 112 dès que possible'], correct: 1, explanation: 'Réduis la vitesse, tiens-toi à droite et utilise la bande d’arrêt d’urgence si nécessaire. Alerte ensuite les secours sans te mettre en danger.' },
    { type: 'text', visualId: 'M9_MOTORWAY_EXIT_01', title: 'Manœuvres absolues interdites', body: 'Sur autoroute, pas de marche arrière, pas de demi-tour, pas de circulation à contresens et pas de traversée de la berme centrale.', callout: 'UNE ERREUR DE SORTIE NE SE CORRIGE JAMAIS PAR UNE MANŒUVRE DANGEREUSE.' },
    { type: 'summary', title: 'À retenir', items: ['Couloir de secours dès la formation des files.', 'Deux bandes : passage entre les deux.', 'Trois bandes ou plus : passage entre la bande de gauche et les autres.', 'Flèche verte : bande ouverte ; croix rouge : fermée.', 'Contresens : ralentir, serrer à droite, s’écarter si nécessaire et appeler le 112.'] },
  ],
  quiz: [
    { visualId: 'M9_EMERGENCY_CORRIDOR_TWO_01', question: 'Dois-tu attendre la sirène pour former le couloir de secours ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Il se forme dès le début des files.' },
    { visualId: 'M9_EMERGENCY_CORRIDOR_THREE_01', question: 'Sur trois bandes, le couloir se forme entre quelles files ?', options: ['Entre la gauche et le milieu', 'Entre le milieu et la droite'], correct: 0, explanation: 'La file de gauche serre à gauche, les autres à droite.' },
    { visualId: 'M9_RUSH_HOUR_LANE_01', question: 'Une flèche verte au-dessus d’une bande l’ouvre-t-elle ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Elle autorise l’utilisation de la bande.' },
    { visualId: 'M9_WRONG_WAY_01', question: 'Face à un contresens, faut-il ralentir et serrer à droite ?', options: ['Oui', 'Non'], correct: 0, explanation: 'C’est la réaction protectrice.' },
    { visualId: 'M9_MOTORWAY_EXIT_01', question: 'Un demi-tour est-il permis pour récupérer une sortie ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Il est strictement interdit.' },
  ], nextLessonLabel: 'Suivant : panne & sécurisation →',
}
