export type ModuleSixChallengeQuestion = {
  id: string
  visualId: string
  topic: string
  question: string
  options: string[]
  correct: number
  explanation: string
}

export const MODULE_SIX_FINAL_CHALLENGE: ModuleSixChallengeQuestion[] = [
  { id: 'M6_FINAL_Q01', visualId: 'M6_LIMIT_STANDARD_01', topic: 'Limites', question: 'Ce conducteur ordinaire présente 0,22 mg/l d’air expiré. Est-il en infraction ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Le seuil général punissable commence à 0,22 mg/l.' },
  { id: 'M6_FINAL_Q02', visualId: 'M6_LIMIT_PRO_01', topic: 'Limites', question: 'Un chauffeur professionnel présente 0,10 mg/l. Est-il au-dessus de son seuil spécifique ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Le seuil applicable aux conducteurs professionnels commence à 0,09 mg/l.' },
  { id: 'M6_FINAL_Q03', visualId: 'M6_RESULT_A_01', topic: 'Contrôle', question: 'L’analyse indique 0,30 mg/l. Quelle lettre correspond à cette tranche ?', options: ['S', 'A', 'P'], correct: 1, explanation: 'La catégorie A couvre les valeurs de 0,22 à moins de 0,35 mg/l.' },
  { id: 'M6_FINAL_Q04', visualId: 'M6_RESULT_P_01', topic: 'Contrôle', question: 'À 0,35 mg/l, quelle mesure majeure est appliquée depuis 2026 ?', options: ['Aucune si le conducteur se sent bien', 'Retrait immédiat du permis pendant 15 jours', 'Simple avertissement'], correct: 1, explanation: 'Le seuil du retrait immédiat de 15 jours a été abaissé à 0,35 mg/l en février 2026.' },
  { id: 'M6_FINAL_Q05', visualId: 'M6_REFUSAL_01', topic: 'Contrôle', question: 'Refuser le test sans motif légitime évite-t-il les conséquences ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Le refus est punissable et ne neutralise pas la procédure.' },
  { id: 'M6_FINAL_Q06', visualId: 'M6_ALCOLOCK_01', topic: 'Sanctions', question: 'Un juge peut-il imposer un éthylotest antidémarrage dans certains cas graves ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Cette mesure peut être imposée, notamment en fonction du taux et de la récidive.' },
  { id: 'M6_FINAL_Q07', visualId: 'M6_DRUG_TEST_01', topic: 'Drogues', question: 'Des indices objectifs de consommation peuvent-ils conduire à un test salivaire ?', options: ['Oui', 'Non'], correct: 0, explanation: 'La procédure de dépistage peut être déclenchée sur la base de tels indices.' },
  { id: 'M6_FINAL_Q08', visualId: 'M6_MEDICINE_WARNING_01', topic: 'Médicaments', question: 'La notice avertit d’une forte somnolence. Quelle décision faut-il prendre ?', options: ['Conduire lentement', 'Ne pas conduire et demander conseil', 'Boire un café'], correct: 1, explanation: 'Une vigilance altérée est incompatible avec une conduite sûre.' },
  { id: 'M6_FINAL_Q09', visualId: 'M6_TRIANGLE_ROAD_01', topic: 'Sécurisation', question: 'À quelle distance place-t-on normalement le triangle sur une route ordinaire ?', options: ['10 m', '30 m', '100 m'], correct: 1, explanation: 'Le triangle se place à au moins 30 m si la configuration le permet.' },
  { id: 'M6_FINAL_Q10', visualId: 'M6_TRIANGLE_MOTORWAY_01', topic: 'Sécurisation', question: 'À quelle distance place-t-on le triangle sur autoroute ?', options: ['30 m', '50 m', '100 m'], correct: 2, explanation: 'La distance minimale est de 100 m sur autoroute.' },
  { id: 'M6_FINAL_Q11', visualId: 'M6_MINOR_ACCIDENT_01', topic: 'Constat', question: 'Accident matériel sans blessé, documents en ordre et accord sur les faits : la police est-elle toujours obligatoire ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Les parties peuvent remplir le constat européen sans intervention systématique de la police.' },
  { id: 'M6_FINAL_Q12', visualId: 'M6_INJURY_112_01', topic: 'Blessés', question: 'Une personne est blessée. Quelle est la bonne réaction ?', options: ['Appeler le 112 et la police', 'Remplir seulement le constat'], correct: 0, explanation: 'Avec un blessé, il faut alerter les secours et la police.' },
  { id: 'M6_FINAL_Q13', visualId: 'M6_CONSTAT_FRONT_01', topic: 'Constat', question: 'Peut-on modifier unilatéralement le recto après sa signature par les deux parties ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Le recto signé devient définitif.' },
  { id: 'M6_FINAL_Q14', visualId: 'M6_HELMET_01', topic: 'Secours', question: 'Le motard blessé respire normalement. Faut-il lui retirer le casque ?', options: ['Oui', 'Non'], correct: 1, explanation: 'On ne retire pas inutilement le casque, afin de ne pas aggraver une éventuelle lésion.' },
  { id: 'M6_FINAL_Q15', visualId: 'M6_HIT_AND_RUN_01', topic: 'Délit de fuite', question: 'Le conducteur doute d’avoir causé un dégât et part pour éviter les constatations. Le doute l’excuse-t-il ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Quitter volontairement les lieux pour éviter les constatations peut constituer un délit de fuite.' },
]
