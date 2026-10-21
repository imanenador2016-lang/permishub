export type ModuleNineChallengeQuestion = {
  id: string
  visualId: string
  topic: string
  question: string
  options: string[]
  correct: number
  explanation: string
}

export const MODULE_NINE_FINAL_CHALLENGE: ModuleNineChallengeQuestion[] = [
  { id: 'M9_FINAL_Q01', visualId: 'M9_MOTORWAY_SPEED_01', topic: 'Accès & vitesses', question: 'Sans autre signalisation et si les conditions sont bonnes, quelle est la vitesse maximale d’une voiture sur autoroute belge ?', options: ['90 km/h', '120 km/h', '130 km/h'], correct: 1, explanation: 'La limite générale est de 120 km/h.' },
  { id: 'M9_FINAL_Q02', visualId: 'M9_FORBIDDEN_VEHICLES_01', topic: 'Accès & vitesses', question: 'Un cyclomoteur peut-il emprunter l’autoroute ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Les cyclomoteurs sont interdits sur autoroute.' },
  { id: 'M9_FINAL_Q03', visualId: 'M9_MOTORWAY_ENTRY_01', topic: 'Insertion & sortie', question: 'En entrant sur l’autoroute, dois-tu céder le passage aux véhicules qui y circulent déjà ?', options: ['Oui', 'Non'], correct: 0, explanation: 'L’insertion est une manœuvre ; le trafic présent est prioritaire.' },
  { id: 'M9_FINAL_Q04', visualId: 'M9_MOTORWAY_EXIT_01', topic: 'Insertion & sortie', question: 'Après avoir manqué cette sortie, peux-tu reculer ?', options: ['Oui', 'Non'], correct: 1, explanation: 'La marche arrière est interdite. Il faut continuer jusqu’à la prochaine sortie.' },
  { id: 'M9_FINAL_Q05', visualId: 'M9_KEEP_RIGHT_01', topic: 'Placement', question: 'La bande de droite est libre. Peux-tu rester au milieu ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Il faut circuler le plus à droite possible.' },
  { id: 'M9_FINAL_Q06', visualId: 'M9_MOTORCYCLE_FILTERING_01', topic: 'Placement', question: 'Une moto qui remonte ces files peut-elle rouler à 60 km/h ?', options: ['Oui', 'Non'], correct: 1, explanation: 'La remontée des files est limitée à 50 km/h et à 20 km/h d’écart.' },
  { id: 'M9_FINAL_Q07', visualId: 'M9_EMERGENCY_CORRIDOR_TWO_01', topic: 'Circulation dense', question: 'Sur cette chaussée à deux bandes, le couloir de secours se forme-t-il entre les files ?', options: ['Oui', 'Non'], correct: 0, explanation: 'La file gauche serre à gauche et la file droite serre à droite.' },
  { id: 'M9_FINAL_Q08', visualId: 'M9_EMERGENCY_CORRIDOR_THREE_01', topic: 'Circulation dense', question: 'Sur trois bandes, seules les voitures de la bande la plus à gauche serrent-elles à gauche ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Toutes les autres files serrent à droite.' },
  { id: 'M9_FINAL_Q09', visualId: 'M9_WRONG_WAY_01', topic: 'Dangers', question: 'Face à ce véhicule à contresens, faut-il ralentir et serrer à droite ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Il faut réduire la vitesse, se mettre à droite et alerter le 112 dès que possible.' },
  { id: 'M9_FINAL_Q10', visualId: 'M9_MOTORWAY_BREAKDOWN_01', topic: 'Panne', question: 'Le triangle se place-t-il au moins 100 m avant le véhicule sur autoroute, si cela peut se faire sans danger ?', options: ['Oui', 'Non'], correct: 0, explanation: 'La distance minimale est de 100 m sur autoroute.' },
  { id: 'M9_FINAL_Q11', visualId: 'M9_MOTORWAY_BREAKDOWN_01', topic: 'Panne', question: 'Les occupants doivent-ils attendre derrière la glissière ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Ils doivent s’éloigner du trafic et du véhicule immobilisé.' },
  { id: 'M9_FINAL_Q12', visualId: 'M9_MOTOR_ROAD_INTERSECTION_01', topic: 'Route pour automobiles', question: 'Une route pour automobiles peut-elle comporter des feux de circulation ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Oui, contrairement à une autoroute.' },
  { id: 'M9_FINAL_Q13', visualId: 'M9_MOTOR_ROAD_WALLONIA_01', topic: 'Route pour automobiles', question: 'En Wallonie, hors agglomération, sans berme centrale et sans panneau différent, quelle limite générale ?', options: ['70 km/h', '90 km/h', '120 km/h'], correct: 1, explanation: 'Dans cette configuration, la limite est 90 km/h en Région wallonne.' },
  { id: 'M9_FINAL_Q14', visualId: 'M9_RESIDENTIAL_ZONE_01', topic: 'Zones spéciales', question: 'Dans une zone résidentielle, la vitesse maximale est-elle de 20 km/h ?', options: ['Oui', 'Non'], correct: 0, explanation: 'La limite est 20 km/h et les piétons peuvent utiliser toute la largeur.' },
  { id: 'M9_FINAL_Q15', visualId: 'M9_SSF_CROSSING_01', topic: 'Voies spéciales', question: 'Une voiture peut-elle franchir ce site pour rejoindre la rue latérale sans y circuler normalement ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Le franchissement est permis dans les cas prévus, sans gêner les véhicules autorisés.' },
]
