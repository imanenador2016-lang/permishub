export type ModuleFiveChallengeQuestion = {
  id: string
  visualId: string
  topic: string
  question: string
  options: string[]
  correct: number
  explanation: string
}

export const MODULE_FIVE_FINAL_CHALLENGE: ModuleFiveChallengeQuestion[] = [
  { id: 'M5_FINAL_Q01', visualId: 'M5_WAITING_PARK_01', topic: 'Définitions', question: 'Le conducteur reste dans la voiture en attendant une personne absente. Quelle est la situation ?', options: ['Un arrêt', 'Un stationnement', 'Une immobilisation imposée'], correct: 1, explanation: 'Attendre une personne qui n’embarque pas immédiatement constitue un stationnement.' },
  { id: 'M5_FINAL_Q02', visualId: 'M5_PASSENGER_STOP_01', topic: 'Définitions', question: 'Le passager descend immédiatement et la voiture repart. Quelle est la situation ?', options: ['Un arrêt', 'Un stationnement', 'Une panne'], correct: 0, explanation: 'Le débarquement pendant le temps nécessaire correspond à un arrêt.' },
  { id: 'M5_FINAL_Q03', visualId: 'M5_PARK_RIGHT_01', topic: 'Placement', question: 'Sur cette chaussée à double sens, de quel côté faut-il normalement ranger la voiture ?', options: ['À droite par rapport au sens de marche', 'À gauche face au trafic', 'Au choix'], correct: 0, explanation: 'La règle générale impose le côté droit sur une chaussée à double sens.' },
  { id: 'M5_FINAL_Q04', visualId: 'M5_PEDESTRIAN_CLEARANCE_01', topic: 'Placement', question: 'Quelle largeur praticable minimale faut-il laisser aux piétons sur cet accotement ?', options: ['1 m', '1,5 m', '2 m'], correct: 1, explanation: 'Il faut conserver une bande praticable d’au moins 1,5 m.' },
  { id: 'M5_FINAL_Q05', visualId: 'M5_CROSSWALK_5M_01', topic: 'Interdictions générales', question: 'La voiture peut-elle s’arrêter trois mètres avant ce passage pour piétons ?', options: ['Oui', 'Non'], correct: 1, explanation: 'L’arrêt et le stationnement sont interdits sur la chaussée à moins de 5 m en deçà du passage.' },
  { id: 'M5_FINAL_Q06', visualId: 'M5_INTERSECTION_5M_01', topic: 'Interdictions générales', question: 'Sans réglementation locale différente, la voiture peut-elle s’arrêter à trois mètres du carrefour ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Il faut conserver au moins 5 m par rapport au prolongement du bord le plus rapproché de la chaussée transversale.' },
  { id: 'M5_FINAL_Q07', visualId: 'M5_BUS_STOP_15M_01', topic: 'Stationnement interdit', question: 'La voiture peut-elle rester stationnée à dix mètres du panneau d’arrêt de bus ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Le stationnement est interdit à moins de 15 m de part et d’autre du panneau.' },
  { id: 'M5_FINAL_Q08', visualId: 'M5_FREE_WIDTH_3M_01', topic: 'Stationnement interdit', question: 'Le stationnement ne laisserait que 2,6 m de passage libre. Est-il autorisé ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Il faut laisser au moins 3 m de passage libre sur la chaussée.' },
  { id: 'M5_FINAL_Q09', visualId: 'M5_SIGN_E1_01', topic: 'Signalisation', question: 'Que signifie le signal E1 présenté ?', options: ['Stationnement interdit', 'Arrêt et stationnement interdits', 'Stationnement autorisé'], correct: 0, explanation: 'E1 interdit le stationnement.' },
  { id: 'M5_FINAL_Q10', visualId: 'M5_SIGN_E3_01', topic: 'Signalisation', question: 'Peux-tu t’arrêter volontairement après ce signal E3 ?', options: ['Oui', 'Non'], correct: 1, explanation: 'E3 interdit l’arrêt et le stationnement.' },
  { id: 'M5_FINAL_Q11', visualId: 'M5_SIGN_EFFECT_01', topic: 'Signalisation', question: 'De quel côté de la voie ce signal produit-il normalement ses effets ?', options: ['Du côté où il est placé', 'Toujours des deux côtés'], correct: 0, explanation: 'Il agit du côté de la voie où il est placé.' },
  { id: 'M5_FINAL_Q12', visualId: 'M5_DISC_TIME_01', topic: 'Zone bleue', question: 'Tu arrives à 10 h 10. Quelle heure indiques-tu sur le disque ?', options: ['10 h', '10 h 30', '11 h'], correct: 1, explanation: 'La flèche doit être positionnée sur le trait qui suit le moment d’arrivée.' },
  { id: 'M5_FINAL_Q13', visualId: 'M5_DISABLED_SPACE_01', topic: 'Places réservées', question: 'Sans carte spéciale, peux-tu utiliser cette place pendant cinq minutes ?', options: ['Oui', 'Non'], correct: 1, explanation: 'La durée courte ne supprime pas la réservation de l’emplacement.' },
  { id: 'M5_FINAL_Q14', visualId: 'M5_ELECTRIC_CHARGING_01', topic: 'Places réservées', question: 'Le véhicule électrique stationné sur cette place équipée doit-il être connecté ?', options: ['Oui', 'Non'], correct: 0, explanation: 'La connexion à l’infrastructure publique est requise.' },
  { id: 'M5_FINAL_Q15', visualId: 'M5_COMPLEX_PARKING_01', topic: 'Analyse complète', question: 'Quel raisonnement faut-il appliquer avant de se garer ?', options: ['Vérifier uniquement le panneau le plus proche', 'Vérifier la nature de l’immobilisation, l’endroit, la signalisation et les conditions particulières', 'Se fier aux autres voitures stationnées'], correct: 1, explanation: 'Une décision correcte exige l’analyse complète de la situation.' },
]
