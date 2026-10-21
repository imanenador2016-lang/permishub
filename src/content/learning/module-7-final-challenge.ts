export type ModuleSevenChallengeQuestion = {
  id: string
  visualId: string
  topic: string
  question: string
  options: string[]
  correct: number
  explanation: string
}

export const MODULE_SEVEN_FINAL_CHALLENGE: ModuleSevenChallengeQuestion[] = [
  { id: 'M7_FINAL_Q01', visualId: 'M7_MASS_WEIGHBRIDGE_01', topic: 'Masses', question: 'La valeur mesurée maintenant sur cette balance est-elle la MEC ?', options: ['Oui', 'Non'], correct: 0, explanation: 'La MEC est la masse réelle du véhicule au moment de la mesure.' },
  { id: 'M7_FINAL_Q02', visualId: 'M7_PERMIT_VEHICLES_01', topic: 'Masses', question: 'Le permis B permet-il une automobile dont la MMA atteint 3 500 kg ?', options: ['Oui', 'Non'], correct: 0, explanation: 'La catégorie B couvre l’automobile jusqu’à 3 500 kg de MMA.' },
  { id: 'M7_FINAL_Q03', visualId: 'M7_LOAD_DIMENSIONS_01', topic: 'Chargement', question: 'La hauteur totale ordinaire peut-elle dépasser 4 m ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Au-delà de 4 m, le véhicule relève d’un régime exceptionnel.' },
  { id: 'M7_FINAL_Q04', visualId: 'M7_LONG_LOAD_01', topic: 'Chargement', question: 'Une charge peut-elle dépasser l’avant de la carrosserie ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Le dépassement à l’avant est interdit.' },
  { id: 'M7_FINAL_Q05', visualId: 'M7_TRAILER_01', topic: 'Remorque', question: 'Un titulaire du permis B provisoire peut-il tracter cette petite remorque ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Aucune remorque avec un permis B provisoire.' },
  { id: 'M7_FINAL_Q06', visualId: 'M7_BIKE_RACK_01', topic: 'Remorque', question: 'Les vélos peuvent-ils masquer la plaque et les feux sans répétiteur ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Plaque et signalisation doivent rester visibles.' },
  { id: 'M7_FINAL_Q07', visualId: 'M7_EQUIPMENT_01', topic: 'Équipement', question: 'Le triangle, la trousse, l’extincteur et le gilet font-ils partie de l’équipement obligatoire ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Ces quatre équipements doivent se trouver dans la voiture.' },
  { id: 'M7_FINAL_Q08', visualId: 'M7_EXTINGUISHER_01', topic: 'Équipement', question: 'Un extincteur inaccessible sous les bagages est-il correctement rangé ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Il doit être rapidement accessible au conducteur.' },
  { id: 'M7_FINAL_Q09', visualId: 'M7_TYRE_TREAD_01', topic: 'Pneus', question: 'Quelle profondeur minimale faut-il retenir pour les rainures principales ?', options: ['1 mm', '1,6 mm', '3 mm'], correct: 1, explanation: 'La profondeur légale minimale est de 1,6 mm.' },
  { id: 'M7_FINAL_Q10', visualId: 'M7_TYRE_PRESSURE_01', topic: 'Pneus', question: 'La pression se contrôle-t-elle de préférence à froid ?', options: ['Oui', 'Non'], correct: 0, explanation: 'La valeur de référence du constructeur est une pression à froid.' },
  { id: 'M7_FINAL_Q11', visualId: 'M7_BRAKE_ABS_01', topic: 'Freinage', question: 'L’ABS aide-t-il à conserver la capacité de diriger pendant un freinage appuyé ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Il limite le blocage des roues.' },
  { id: 'M7_FINAL_Q12', visualId: 'M7_AQUAPLANING_01', topic: 'Adhérence', question: 'En aquaplaning, faut-il freiner brutalement ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Il faut éviter les actions brusques et relâcher progressivement l’accélérateur.' },
  { id: 'M7_FINAL_Q13', visualId: 'M7_HIGH_BEAM_01', topic: 'Éclairage', question: 'Peux-tu garder les feux de route si tu risques d’éblouir le conducteur en face ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Il faut utiliser les feux de croisement.' },
  { id: 'M7_FINAL_Q14', visualId: 'M7_HAZARD_01', topic: 'Éclairage', question: 'Les feux de détresse rendent-ils légal un arrêt en double file ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Ils signalent un danger mais ne légalisent aucune infraction.' },
  { id: 'M7_FINAL_Q15', visualId: 'M7_HORN_01', topic: 'Klaxon', question: 'Le klaxon peut-il servir à saluer un ami en ville ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Ce n’est pas un avertissement nécessaire pour éviter un accident.' },
]
