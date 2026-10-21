import type { LearningLesson } from './types'

export const LESSON_64: LearningLesson = {
  id: 'zones-et-voies-speciales', moduleId: 'motorway-special-roads', title: 'Zones & voies spéciales',
  description: 'Zone résidentielle, rue de jeu, rue scolaire, chemin réservé et site spécial franchissable.', xp: 25,
  steps: [
    { type: 'scenario', visualId: 'M9_RESIDENTIAL_ZONE_01', title: 'Zone résidentielle ou de rencontre', body: 'Le signal F12a annonce cette zone.', question: 'Quelle est la vitesse maximale ?', options: ['20 km/h', '30 km/h', '50 km/h'], correct: 0, explanation: 'La vitesse maximale y est de 20 km/h.' },
    { type: 'scenario', visualId: 'M9_RESIDENTIAL_ZONE_01', title: 'Place des piétons', body: 'Des piétons occupent toute la largeur et des enfants jouent.', question: 'Est-ce autorisé ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Les piétons peuvent utiliser toute la largeur et les jeux sont autorisés. Les conducteurs doivent être extrêmement prudents.' },
    { type: 'scenario', visualId: 'M9_PLAY_STREET_01', title: 'Rue réservée au jeu', body: 'Un véhicule autorisé traverse la rue pendant la période active.', question: 'À quelle allure doit-il circuler ?', options: ['À l’allure du pas', 'À 20 km/h', 'À 30 km/h'], correct: 0, explanation: 'Les véhicules admis circulent à l’allure du pas et cèdent le passage aux joueurs.' },
    { type: 'scenario', visualId: 'M9_SCHOOL_STREET_01', title: 'Rue scolaire active', body: 'La barrière ferme l’entrée pendant l’arrivée des élèves. Un riverain en voiture veut entrer chez lui.', question: 'Peut-il entrer ?', options: ['Oui, au pas', 'Non'], correct: 1, explanation: 'Pendant l’activation, les riverains peuvent sortir mais ne peuvent pas entrer en voiture.' },
    { type: 'scenario', visualId: 'M9_RESERVED_PATH_01', title: 'Chemin réservé', body: 'Le signal représente les catégories d’usagers admises sur le chemin.', question: 'Une voiture ordinaire peut-elle y circuler pour gagner du temps ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Seuls les usagers indiqués sont admis, sauf accès local prévu par la règle et avec une prudence renforcée.' },
    { type: 'scenario', visualId: 'M9_SSF_CROSSING_01', title: 'Site spécial franchissable', body: 'Une voiture traverse le site perpendiculairement pour rejoindre une rue latérale, sans gêner le tram.', question: 'Ce franchissement peut-il être autorisé ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Une voiture peut notamment traverser le site pour changer de direction ou accéder à une propriété, mais ne peut pas y circuler normalement.' },
    { type: 'summary', visualId: 'M9_SSF_01', title: 'À retenir', items: ['Zone résidentielle : 20 km/h, piétons sur toute la largeur.', 'Stationnement seulement aux emplacements autorisés dans la zone.', 'Rue de jeu : véhicules admis à l’allure du pas.', 'Rue scolaire active : pas d’entrée automobile ordinaire.', 'Chemin réservé : seulement les usagers représentés.', 'SSF : transports en commun ; la voiture ne fait que le franchir ou l’emprunte dans les exceptions prévues.'] },
  ],
  quiz: [
    { visualId: 'M9_RESIDENTIAL_ZONE_01', question: 'Vitesse maximale en zone résidentielle ?', options: ['20 km/h', '30 km/h', '50 km/h'], correct: 0, explanation: 'La limite est 20 km/h.' },
    { visualId: 'M9_RESIDENTIAL_ZONE_01', question: 'Peut-on stationner partout le long du bord dans cette zone ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Uniquement aux emplacements délimités ou signalés.' },
    { visualId: 'M9_PLAY_STREET_01', question: 'Un véhicule autorisé dans une rue de jeu roule-t-il à l’allure du pas ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Il doit protéger les joueurs et leur céder le passage.' },
    { visualId: 'M9_SCHOOL_STREET_01', question: 'Pendant la fermeture, un riverain peut-il entrer en voiture dans la rue scolaire ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Il peut en sortir mais pas y entrer pendant l’activation.' },
    { visualId: 'M9_SSF_01', question: 'Une voiture peut-elle circuler normalement sur un site spécial franchissable libre ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Le site reste réservé aux véhicules autorisés ; une voiture ne l’utilise que dans les cas d’exception.' },
  ], nextLessonLabel: 'Passer au défi final →',
}
