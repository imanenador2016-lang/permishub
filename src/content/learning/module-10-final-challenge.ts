export type ModuleTenChallengeQuestion = {
  id: string
  visualId: string
  topic: string
  question: string
  options: string[]
  correct: number
  explanation: string
}

export const MODULE_TEN_FINAL_CHALLENGE: ModuleTenChallengeQuestion[] = [
  { id: 'M10_FINAL_Q01', visualId: 'M10_LEVEL_OPEN_WHITE_01', topic: 'Signaux ferroviaires', question: 'Le feu blanc lunaire clignote et la sortie est libre. Peux-tu traverser ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Le feu blanc lunaire autorise le franchissement avec prudence.' },
  { id: 'M10_FINAL_Q02', visualId: 'M10_LEVEL_RED_CLOSED_01', topic: 'Signaux ferroviaires', question: 'Le train vient de passer mais les feux rouges clignotent encore. Peux-tu repartir ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Il faut attendre la fin complète des signaux.' },
  { id: 'M10_FINAL_Q03', visualId: 'M10_LEVEL_QUEUE_01', topic: 'Passage à niveau', question: 'La sortie après les rails est bloquée. Peux-tu t’engager ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Il faut pouvoir dégager entièrement le passage.' },
  { id: 'M10_FINAL_Q04', visualId: 'M10_LEVEL_EMERGENCY_01', topic: 'Passage à niveau', question: 'Ta voiture est immobilisée sur les voies. Quelle est la première action ?', options: ['Évacuer les occupants', 'Chercher la panne', 'Attendre dans la voiture'], correct: 0, explanation: 'Évacue immédiatement puis éloigne-toi avant d’alerter.' },
  { id: 'M10_FINAL_Q05', visualId: 'M10_TRAM_PRIORITY_01', topic: 'Priorité du tram', question: 'Sans feu ni agent, la voiture venant de droite passe-t-elle avant le tram ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Le tram bénéficie d’une priorité particulière.' },
  { id: 'M10_FINAL_Q06', visualId: 'M10_TRAM_RED_LIGHT_01', topic: 'Priorité du tram', question: 'Le tram doit-il respecter ce feu rouge ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Les feux de circulation s’imposent aussi au tram.' },
  { id: 'M10_FINAL_Q07', visualId: 'M10_TRAM_OFFICER_01', topic: 'Priorité du tram', question: 'L’agent peut-il imposer l’arrêt au tram ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Les injonctions de l’agent qualifié priment.' },
  { id: 'M10_FINAL_Q08', visualId: 'M10_TRAM_PASS_RIGHT_01', topic: 'Dépasser un tram', question: 'Le passage à droite est libre. De quel côté dépasses-tu normalement ?', options: ['À droite', 'À gauche'], correct: 0, explanation: 'Le tram se dépasse normalement par la droite.' },
  { id: 'M10_FINAL_Q09', visualId: 'M10_TRAM_WAIT_01', topic: 'Dépasser un tram', question: 'La droite est bloquée et un véhicule arrive en face. Peux-tu passer à gauche ?', options: ['Oui', 'Non'], correct: 1, explanation: 'La gauche n’est pas libre ; il faut attendre.' },
  { id: 'M10_FINAL_Q10', visualId: 'M10_BUS_LANE_01', topic: 'Voies réservées', question: 'Une voiture peut-elle utiliser cette bande bus pour dépasser une file ?', options: ['Oui', 'Non'], correct: 1, explanation: 'La circulation ordinaire y est interdite.' },
  { id: 'M10_FINAL_Q11', visualId: 'M10_BUS_LANE_TURN_01', topic: 'Voies réservées', question: 'Peux-tu franchir brièvement la bande près du carrefour pour tourner à droite sans gêner ?', options: ['Oui', 'Non'], correct: 0, explanation: 'C’est une exception prévue.' },
  { id: 'M10_FINAL_Q12', visualId: 'M10_BUS_STOP_PARKED_01', topic: 'Arrêts', question: 'Sans marquage, le stationnement est-il interdit à moins de 15 m de part et d’autre du poteau ?', options: ['Oui', 'Non'], correct: 0, explanation: 'La protection s’étend à 15 m avant et après le poteau.' },
  { id: 'M10_FINAL_Q13', visualId: 'M10_TRAM_BOARDING_01', topic: 'Arrêts', question: 'Sans refuge, dois-tu t’arrêter pour les voyageurs qui traversent vers le tram ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Tu dois leur permettre d’embarquer sans danger.' },
  { id: 'M10_FINAL_Q14', visualId: 'M10_BUS_LEAVING_URBAN_01', topic: 'Départ du bus', question: 'En agglomération, dois-tu permettre à ce bus de ligne de quitter son arrêt ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Il faut ralentir et s’arrêter si nécessaire.' },
  { id: 'M10_FINAL_Q15', visualId: 'M10_SCHOOL_BUS_01', topic: 'Transport scolaire', question: 'Tous les clignotants du transport scolaire fonctionnent. Quelle attitude adopter ?', options: ['Maintenir la vitesse', 'Ralentir fortement et s’arrêter si nécessaire'], correct: 1, explanation: 'Des enfants peuvent traverser à proximité.' },
]
