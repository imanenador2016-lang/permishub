export type ModuleFourChallengeQuestion = {
  id: string
  visualId: string
  topic: string
  question: string
  options: string[]
  correct: number
  explanation: string
}

export const MODULE_FOUR_FINAL_CHALLENGE: ModuleFourChallengeQuestion[] = [
  {
    id: 'M4_FINAL_Q01',
    visualId: 'M4_OVERTAKE_ANALYSIS_01',
    topic: 'Fondamentaux',
    question: 'Quel conducteur adopte un comportement incorrect pendant ce dépassement ?',
    options: [
      'Le conducteur rouge, parce qu’il dépasse par la gauche',
      'Le conducteur bleu, parce qu’il accélère pendant qu’il est dépassé',
      'Aucun des deux',
    ],
    correct: 1,
    explanation: 'Le véhicule dépassé doit garder la même allure et serrer à droite autant que possible. Il ne doit pas accélérer pendant le dépassement.',
  },
  {
    id: 'M4_FINAL_Q02',
    visualId: 'M4_OVERTAKE_ANALYSIS_02',
    topic: 'Fondamentaux',
    question: 'Pourquoi ce dépassement reste-t-il incorrect malgré le passage par la gauche ?',
    options: [
      'La distance latérale est insuffisante',
      'La voiture dépassée reste à droite',
      'Les deux véhicules circulent dans le même sens',
    ],
    correct: 0,
    explanation: 'Dépasser par le bon côté ne suffit pas : une distance latérale suffisante doit aussi être conservée.',
  },
  {
    id: 'M4_FINAL_Q03',
    visualId: 'M4_OVERTAKE_ONCOMING_01',
    topic: 'Sécurité',
    question: 'La voiture rouge peut-elle commencer son dépassement ?',
    options: [
      'Oui, puisque le véhicule devant roule lentement',
      'Non, un véhicule arrive en sens inverse',
      'Oui, si elle active son clignotant',
    ],
    correct: 1,
    explanation: 'Le conducteur ne peut pas commencer une manœuvre qui mettrait en danger le véhicule venant en sens inverse.',
  },
  {
    id: 'M4_FINAL_Q04',
    visualId: 'M4_OVERTAKE_REAR_CHECK_01',
    topic: 'Sécurité',
    question: 'Quel élément impose à la voiture rouge d’attendre ?',
    options: [
      'La route comporte deux sens de circulation',
      'Le véhicule devant roule lentement',
      'Le véhicule derrière a déjà commencé à dépasser',
    ],
    correct: 2,
    explanation: 'Avant de se déporter, le conducteur doit vérifier qu’un véhicule derrière lui n’a pas déjà commencé son dépassement.',
  },
  {
    id: 'M4_FINAL_Q05',
    visualId: 'M4_MARKING_MIXED_LINES_01',
    topic: 'Interdictions',
    question: 'Quelle ligne la voiture rouge doit-elle prendre en considération ?',
    options: [
      'La ligne discontinue située de son côté',
      'La ligne continue située du côté opposé',
      'Toujours les deux lignes comme une interdiction absolue',
    ],
    correct: 0,
    explanation: 'Lorsque les deux lignes sont accolées, le conducteur tient compte de la ligne située de son côté. Les autres conditions de dépassement doivent néanmoins rester remplies.',
  },
  {
    id: 'M4_FINAL_Q06',
    visualId: 'M4_FORBIDDEN_CURVE_01',
    topic: 'Interdictions',
    question: 'Pourquoi ne faut-il pas commencer un dépassement dans cette situation ?',
    options: [
      'Parce que tout virage interdit automatiquement tout dépassement',
      'Parce que le virage masque une partie de la route',
      'Parce que la voiture devant roule trop lentement',
    ],
    correct: 1,
    explanation: 'La visibilité est insuffisante : un véhicule venant en sens inverse peut se trouver dans la partie masquée du virage.',
  },
  {
    id: 'M4_FINAL_Q07',
    visualId: 'M4_OVERTAKE_SIGN_GENERAL_01',
    topic: 'Signalisation',
    question: 'Que signifie ce signal C35 ?',
    options: [
      'La fin d’une interdiction de dépasser',
      'L’interdiction, pour les véhicules à moteur, de dépasser par la gauche un véhicule attelé ou un véhicule à moteur à plus de deux roues',
      'L’interdiction de croiser un véhicule venant en sens inverse',
    ],
    correct: 1,
    explanation: 'Le signal C35 interdit le dépassement par la gauche des véhicules visés par la règle. Il faut encore identifier correctement le véhicule que l’on souhaite dépasser.',
  },
  {
    id: 'M4_FINAL_Q08',
    visualId: 'M4_OVERTAKE_SIGN_END_01',
    topic: 'Signalisation',
    question: 'Que t’indique ce signal C37 ?',
    options: [
      'La fin de l’interdiction de dépasser signalée',
      'Une obligation de dépasser',
      'Une priorité sur les véhicules venant en face',
    ],
    correct: 0,
    explanation: 'Le signal C37 met fin à l’interdiction signalée. Il ne rend toutefois pas le dépassement automatiquement possible ou sûr.',
  },
  {
    id: 'M4_FINAL_Q09',
    visualId: 'M4_CYCLIST_URBAN_01',
    topic: 'Usagers vulnérables',
    question: 'En agglomération, la distance latérale affichée avec ce cycliste est-elle suffisante ?',
    options: ['Oui, le minimum est de 1 m', 'Non, il faut toujours 1,5 m', 'Non, tout dépassement y est interdit'],
    correct: 0,
    explanation: 'En agglomération, il faut laisser au moins 1 m de distance latérale avec un cycliste.',
  },
  {
    id: 'M4_FINAL_Q10',
    visualId: 'M4_CYCLIST_OUTSIDE_01',
    topic: 'Usagers vulnérables',
    question: 'Hors agglomération, la distance de 1 m affichée avec ce cycliste est-elle suffisante ?',
    options: ['Oui', 'Non, il faut au moins 1,5 m', 'Oui, si la voiture roule lentement'],
    correct: 1,
    explanation: 'Hors agglomération, la distance latérale minimale à respecter avec un cycliste est de 1,5 m.',
  },
  {
    id: 'M4_FINAL_Q11',
    visualId: 'M4_CYCLING_ZONE_01',
    topic: 'Usagers vulnérables',
    question: 'La voiture peut-elle dépasser le cycliste dans cette zone cyclable si elle dispose de 1 m ?',
    options: ['Oui, puisque la distance est suffisante', 'Non, le dépassement du cycliste y est interdit', 'Oui, si elle reste sous 30 km/h'],
    correct: 1,
    explanation: 'Dans une zone cyclable, un véhicule à moteur ne peut pas dépasser les cyclistes ou les speed-pédélecs.',
  },
  {
    id: 'M4_FINAL_Q12',
    visualId: 'M4_TRAM_RIGHT_OVERTAKE_01',
    topic: 'Tram',
    question: 'Le passage à droite est libre. De quel côté la voiture dépasse-t-elle normalement le tram ?',
    options: ['Par la droite', 'Toujours par la gauche', 'Du côté de son choix'],
    correct: 0,
    explanation: 'Un véhicule sur rails se dépasse normalement par la droite.',
  },
  {
    id: 'M4_FINAL_Q13',
    visualId: 'M4_TRAM_LEFT_ONCOMING_01',
    topic: 'Tram',
    question: 'La droite du tram est bloquée et un véhicule arrive en face. Quelle décision est correcte ?',
    options: [
      'Passer immédiatement à gauche',
      'Attendre que le passage à gauche puisse se faire sans danger',
      'Forcer le véhicule venant en face à s’arrêter',
    ],
    correct: 1,
    explanation: 'Une exception peut permettre d’envisager la gauche, mais elle ne donne aucune priorité et ne supprime jamais les conditions de sécurité.',
  },
  {
    id: 'M4_FINAL_Q14',
    visualId: 'M4_TURN_CYCLIST_01',
    topic: 'Manœuvres complexes',
    question: 'La voiture veut tourner tandis que le cycliste continue tout droit. Que doit faire le conducteur ?',
    options: [
      'Tenir compte du cycliste et ne pas lui couper la trajectoire',
      'Tourner immédiatement puisque son clignotant est activé',
      'Klaxonner pour obliger le cycliste à ralentir',
    ],
    correct: 0,
    explanation: 'Le clignotant annonce une intention, mais il ne donne pas automatiquement le passage au conducteur.',
  },
  {
    id: 'M4_FINAL_Q15',
    visualId: 'M4_MANEUVER_LEFT_COMPLEX_01',
    topic: 'Manœuvres complexes',
    question: 'La voiture veut tourner à gauche. Quel raisonnement prend en compte toute la situation ?',
    options: [
      'Vérifier uniquement le véhicule venant en face',
      'Tourner dès que le véhicule est passé, sans observer la rue où l’on entre',
      'Tenir compte du véhicule venant en face, puis du piéton avant de terminer le mouvement',
    ],
    correct: 2,
    explanation: 'Une même manœuvre peut exiger plusieurs contrôles successifs : le trafic dont tu coupes la trajectoire, puis la chaussée dans laquelle tu t’engages.',
  },
]
