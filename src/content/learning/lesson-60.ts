import type { LearningLesson } from './types'

export const LESSON_60: LearningLesson = {
  id: 'autoroute-placement-et-depassement', moduleId: 'motorway-special-roads', title: 'Autoroute : placement & dépassement',
  description: 'Rester à droite, dépasser correctement et comprendre les files ralenties.', xp: 25,
  steps: [
    { type: 'scenario', visualId: 'M9_KEEP_RIGHT_01', title: 'Position normale', body: 'Les trois bandes sont libres devant toi.', question: 'Sur quelle bande dois-tu circuler normalement ?', options: ['La plus à droite', 'Celle du milieu', 'La plus à gauche'], correct: 0, explanation: 'Tu roules aussi près que possible du bord droit, sauf nécessité de dépasser ou règle particulière.' },
    { type: 'scenario', visualId: 'M9_KEEP_RIGHT_01', title: 'Dépassement', body: 'Tu veux dépasser une voiture plus lente.', question: 'De quel côté la dépasses-tu ?', options: ['Par la gauche', 'Par la droite'], correct: 0, explanation: 'Sur autoroute, le dépassement s’effectue par la gauche.' },
    { type: 'text', visualId: 'M9_KEEP_RIGHT_01', title: 'Après le dépassement', body: 'Reviens à droite dès que tu peux le faire sans gêner le véhicule dépassé. Rester inutilement au milieu ou à gauche est une infraction.', callout: 'DÉPASSER, PUIS SE RABATTRE SANS COUPER.' },
    { type: 'scenario', visualId: 'M9_MOTORCYCLE_FILTERING_01', title: 'Files parallèles ralenties', body: 'Dans un embouteillage, la file de droite avance momentanément plus vite que celle de gauche.', question: 'Est-ce automatiquement un dépassement interdit par la droite ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Quand les files avancent parallèlement en circulation dense, le mouvement relatif d’une file n’est pas considéré comme un dépassement.' },
    { type: 'scenario', visualId: 'M9_MOTORCYCLE_FILTERING_01', title: 'Remontée des files', body: 'Un motocycliste remonte un embouteillage entre les deux files les plus à gauche.', question: 'Peut-il dépasser 50 km/h pendant cette remontée ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Il ne peut pas dépasser 50 km/h et son écart avec les véhicules ne peut excéder 20 km/h.' },
    { type: 'scenario', visualId: 'M9_MOTORWAY_BREAKDOWN_01', title: 'Bande d’arrêt d’urgence', body: 'Le trafic est lent et la bande d’arrêt d’urgence est libre.', question: 'Peux-tu l’utiliser pour dépasser la file ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Elle n’est pas une bande de circulation. Elle reste réservée aux situations autorisées, notamment l’urgence ou la panne.' },
    { type: 'summary', title: 'À retenir', items: ['Position normale : le plus à droite possible.', 'Dépassement : par la gauche.', 'Après le dépassement : retour à droite en sécurité.', 'Files denses : une file peut avancer plus vite sans constituer un dépassement.', 'Remontée à moto : entre les deux files de gauche, maximum 50 km/h et écart maximum 20 km/h.'] },
  ],
  quiz: [
    { visualId: 'M9_KEEP_RIGHT_01', question: 'Peux-tu rester sur la bande du milieu lorsque celle de droite est libre ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Il faut reprendre la bande de droite.' },
    { visualId: 'M9_KEEP_RIGHT_01', question: 'Le dépassement ordinaire se fait-il par la gauche ?', options: ['Oui', 'Non'], correct: 0, explanation: 'C’est la règle sur autoroute.' },
    { visualId: 'M9_MOTORCYCLE_FILTERING_01', question: 'En files ralenties, la file de droite qui avance plus vite dépasse-t-elle automatiquement illégalement ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Le déplacement relatif des files parallèles n’est pas un dépassement.' },
    { visualId: 'M9_MOTORCYCLE_FILTERING_01', question: 'Quelle vitesse maximale pour une moto qui remonte les files ?', options: ['30 km/h', '50 km/h', '70 km/h'], correct: 1, explanation: 'Maximum 50 km/h, avec au plus 20 km/h d’écart.' },
    { visualId: 'M9_MOTORWAY_BREAKDOWN_01', question: 'La bande d’arrêt d’urgence peut-elle servir à gagner quelques places ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Ce n’est pas une bande de circulation.' },
  ], nextLessonLabel: 'Suivant : circulation dense & dangers →',
}
