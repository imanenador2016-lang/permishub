import type { LearningLesson } from './types'

export const LESSON_69: LearningLesson = {
  id: 'bandes-bus-et-sites-reserves', moduleId: 'public-transport-level-crossings', title: 'Bandes bus & sites réservés',
  description: 'Distinguer une bande bus d’un site spécial franchissable et connaître les exceptions.', xp: 25,
  steps: [
    { type: 'text', visualId: 'M10_BUS_LANE_01', title: 'Reconnaître la bande bus', body: 'La bande de circulation réservée aux véhicules de services réguliers est séparée par de larges traits blancs discontinus et annoncée par le signal F17.', callout: 'LARGES TRAITS DISCONTINUS = BANDE BUS.' },
    { type: 'scenario', visualId: 'M10_BUS_LANE_01', title: 'Circulation ordinaire', body: 'Tu conduis une voiture et la bande normale est libre.', question: 'Peux-tu utiliser la bande bus pour gagner du temps ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Une voiture ordinaire ne peut pas y circuler normalement.' },
    { type: 'scenario', visualId: 'M10_BUS_LANE_TURN_01', title: 'Tourner à droite', body: 'Tu approches du carrefour où tu dois tourner à droite.', question: 'Peux-tu franchir la bande bus à proximité immédiate du carrefour ?', options: ['Oui, avec prudence', 'Non, jamais'], correct: 0, explanation: 'Tu peux l’emprunter brièvement près du carrefour pour changer de direction, sans gêner les véhicules autorisés.' },
    { type: 'scenario', visualId: 'M10_BUS_LANE_BLOCKED_01', title: 'S’arrêter dans la bande', body: 'Une voiture s’est immobilisée dans la bande bus.', question: 'Cet arrêt est-il normalement autorisé ?', options: ['Oui', 'Non'], correct: 1, explanation: 'L’arrêt et le stationnement y sont interdits, sauf situation imposée par la circulation ou nécessité prévue.' },
    { type: 'text', visualId: 'M10_SSF_01', title: 'Site spécial franchissable', body: 'Le site spécial franchissable est séparé par une ligne blanche continue. Il est réservé notamment aux trams et aux véhicules autorisés par la signalisation.', callout: 'LIGNE CONTINUE = SITE SPÉCIAL FRANCHISSABLE.' },
    { type: 'compare', visualId: 'M10_SSF_01', title: 'Bande bus ou site spécial', body: 'Le marquage permet de les distinguer.', items: [{ label: 'Larges traits discontinus', result: 'Bande bus' }, { label: 'Ligne blanche continue', result: 'Site spécial franchissable' }, { label: 'Voiture ordinaire', result: 'Pas de circulation normale' }] },
    { type: 'summary', title: 'À retenir', items: ['Bande bus : larges traits blancs discontinus et signal F17.', 'SSF : ligne blanche continue.', 'Une voiture ne les utilise pas pour gagner du temps.', 'Franchissement ou bref emprunt seulement dans les exceptions prévues et sans gêner.'] },
  ],
  quiz: [
    { visualId: 'M10_BUS_LANE_01', question: 'Les larges traits discontinus caractérisent-ils une bande bus ?', options: ['Oui', 'Non'], correct: 0, explanation: 'C’est son marquage caractéristique.' },
    { visualId: 'M10_SSF_01', question: 'La ligne continue peut-elle délimiter un site spécial franchissable ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Elle le distingue de la bande bus.' },
    { visualId: 'M10_BUS_LANE_01', question: 'Une voiture peut-elle rouler longtemps dans la bande bus pour dépasser une file ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Ce n’est pas une voie de dépassement.' },
    { visualId: 'M10_BUS_LANE_TURN_01', question: 'Peux-tu entrer brièvement dans la bande près du carrefour pour tourner à droite sans gêner ?', options: ['Oui', 'Non'], correct: 0, explanation: 'C’est une exception prévue.' },
    { visualId: 'M10_BUS_LANE_BLOCKED_01', question: 'Peux-tu t’arrêter volontairement dans une bande bus ?', options: ['Oui', 'Non'], correct: 1, explanation: 'L’arrêt volontaire y est normalement interdit.' },
  ], nextLessonLabel: 'Suivant : arrêts de bus & de tram →',
}
