export type ModuleEightChallengeQuestion = {
  id: string
  visualId: string
  topic: string
  question: string
  options: string[]
  correct: number
  explanation: string
}

export const MODULE_EIGHT_FINAL_CHALLENGE: ModuleEightChallengeQuestion[] = [
  { id: 'M8_FINAL_Q01', visualId: 'M8_PUSHING_BICYCLE_01', topic: 'Statut', question: 'Cette personne qui pousse son vélo sur le passage est-elle un piéton ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Une personne qui pousse son vélo à pied est considérée comme piétonne.' },
  { id: 'M8_FINAL_Q02', visualId: 'M8_CYCLIST_ZEBRA_01', topic: 'Statut', question: 'Ce cycliste en selle bénéficie-t-il automatiquement de la priorité du piéton ?', options: ['Oui', 'Non'], correct: 1, explanation: 'En restant en selle, il demeure conducteur et n’obtient pas la priorité liée au passage piéton.' },
  { id: 'M8_FINAL_Q03', visualId: 'M8_PEDESTRIAN_WAITING_01', topic: 'Piétons', question: 'La piétonne prête à s’engager sur le passage doit-elle pouvoir traverser ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Le conducteur cède le passage au piéton engagé ou sur le point de s’engager.' },
  { id: 'M8_FINAL_Q04', visualId: 'M8_PEDESTRIAN_NO_CROSSWALK_01', topic: 'Piétons', question: 'Hors passage, cette piétonne possède-t-elle la priorité ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Hors passage, le piéton doit céder le passage et traverser prudemment.' },
  { id: 'M8_FINAL_Q05', visualId: 'M8_CROSSWALK_OCCLUDED_01', topic: 'Piétons', question: 'Le passage est masqué. Faut-il réduire sa vitesse avant d’y arriver ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Il faut pouvoir s’arrêter si un piéton apparaît derrière le véhicule.' },
  { id: 'M8_FINAL_Q06', visualId: 'M8_CYCLE_CROSSING_01', topic: 'Cyclistes', question: 'Avant de s’engager sur ce passage cycliste, la cycliste doit-elle céder le passage ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Le passage cycliste ne lui donne pas priorité avant l’engagement.' },
  { id: 'M8_FINAL_Q07', visualId: 'M8_CYCLE_PATH_01', topic: 'Cyclistes', question: 'Une voiture peut-elle s’arrêter sur cette piste pour déposer un passager ?', options: ['Oui', 'Non'], correct: 1, explanation: 'L’arrêt et le stationnement sont interdits sur une piste cyclable.' },
  { id: 'M8_FINAL_Q08', visualId: 'M8_SCHOOL_TRANSPORT_01', topic: 'Usagers fragiles', question: 'Les indicateurs du transport scolaire fonctionnent. Faut-il ralentir et s’arrêter si nécessaire ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Des enfants peuvent monter ou descendre.' },
  { id: 'M8_FINAL_Q09', visualId: 'M8_PEDESTRIAN_ZONE_01', topic: 'Usagers fragiles', question: 'Un véhicule autorisé dans cette zone doit-il rouler à l’allure du pas ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Il doit aussi céder le passage aux piétons et ne pas les gêner.' },
  { id: 'M8_FINAL_Q10', visualId: 'M8_PREGNANT_SEATBELT_01', topic: 'Ceinture', question: 'La grossesse dispense-t-elle du port de la ceinture ?', options: ['Oui', 'Non'], correct: 1, explanation: 'La ceinture reste obligatoire et doit être correctement positionnée.' },
  { id: 'M8_FINAL_Q11', visualId: 'M8_SEATS_OCCUPANTS_01', topic: 'Ceinture', question: 'Chaque occupant doit-il disposer de sa propre place et de sa retenue ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Une ceinture ne se partage pas entre deux personnes.' },
  { id: 'M8_FINAL_Q12', visualId: 'M8_CHILD_SEAT_01', topic: 'Enfants', question: 'Un enfant de 1,20 m peut-il voyager avec la ceinture seule dans une situation ordinaire ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Sous 1,35 m et avant 18 ans, il faut un dispositif adapté.' },
  { id: 'M8_FINAL_Q13', visualId: 'M8_REAR_FACING_AIRBAG_01', topic: 'Enfants', question: 'Pour ce siège dos à la route placé à l’avant, l’airbag frontal doit-il être désactivé ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Un airbag frontal actif représente un danger majeur pour un siège dos à la route.' },
  { id: 'M8_FINAL_Q14', visualId: 'M8_TRUCK_BLIND_SPOT_01', topic: 'Angles morts', question: 'Le cycliste peut-il être invisible pour le conducteur du camion ?', options: ['Oui', 'Non'], correct: 0, explanation: 'La zone proche du flanc droit d’un poids lourd est un angle mort critique.' },
  { id: 'M8_FINAL_Q15', visualId: 'M8_BLIND_SPOT_WARNING_01', topic: 'Angles morts', question: 'Le voyant allumé autorise-t-il un changement de bande immédiat ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Il signale qu’un usager occupe la zone. Attends et contrôle visuellement.' },
]
