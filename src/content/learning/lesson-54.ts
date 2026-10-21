import type { LearningLesson } from './types'

export const LESSON_54: LearningLesson = {
  id: 'enfants-ecoles-et-usagers-fragiles', moduleId: 'vulnerable-users-passengers', title: 'Enfants, écoles & usagers fragiles',
  description: 'Redoubler de prudence face aux usagers les moins prévisibles.', xp: 25,
  steps: [
    { type: 'text', visualId: 'M8_SCHOOL_CROSSING_01', title: 'Prévoir l’imprévisible', body: 'À proximité d’enfants, de personnes âgées, aveugles ou à mobilité réduite, le conducteur doit redoubler de prudence : ralentir et, au besoin, s’arrêter.', callout: 'FRAGILITÉ VISIBLE = MARGE DE SÉCURITÉ PLUS GRANDE.' },
    { type: 'scenario', visualId: 'M8_SCHOOL_CROSSING_01', title: 'Devant l’école', body: 'Un groupe d’enfants attend près du passage. Une voiture devant toi s’arrête.', question: 'Peux-tu dépasser cette voiture ?', options: ['Oui, si personne n’est encore engagé', 'Non'], correct: 1, explanation: 'Il est interdit de dépasser un véhicule qui ralentit ou s’arrête devant un passage pour piétons.' },
    { type: 'scenario', visualId: 'M8_SCHOOL_TRANSPORT_01', title: 'Transport scolaire', body: 'Le véhicule de transport scolaire est à l’arrêt et ses indicateurs de direction fonctionnent. Des enfants s’apprêtent à monter.', question: 'Quelle attitude adopter ?', options: ['Accélérer pour passer avant eux', 'Ralentir fortement et s’arrêter si nécessaire'], correct: 1, explanation: 'Les indicateurs signalent que des enfants vont monter ou descendre. Il faut être particulièrement prudent.' },
    { type: 'scenario', visualId: 'M8_SENIOR_PEDESTRIAN_01', title: 'Personne âgée', body: 'Un piéton âgé avec une canne attend près du passage et peut traverser lentement.', question: 'Faut-il prévoir davantage de temps et d’espace ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Il faut ralentir assez tôt et permettre la traversée complète sans pression.' },
    { type: 'scenario', visualId: 'M8_PEDESTRIAN_ZONE_01', title: 'Zone piétonne', body: 'Ton véhicule fait partie des véhicules autorisés à entrer dans cette zone.', question: 'À quelle allure dois-tu circuler ?', options: ['À l’allure du pas', 'À 30 km/h'], correct: 0, explanation: 'Un conducteur autorisé circule à l’allure du pas, cède le passage aux piétons et s’arrête si nécessaire.' },
    { type: 'text', visualId: 'M8_CROSSWALK_OCCLUDED_01', title: 'Visibilité et petite taille', body: 'Un enfant peut être totalement masqué par un véhicule stationné, une haie ou un conteneur. Réduis ta vitesse avant la zone cachée, pas après l’apparition de l’enfant.', callout: 'SI TU NE VOIS PAS, TU ANTICIPES.' },
    { type: 'summary', title: 'À retenir', items: ['Enfants, seniors et personnes handicapées exigent une prudence renforcée.', 'Ralentis tôt et arrête-toi si nécessaire.', 'Ne dépasse pas un véhicule arrêté devant un passage.', 'Transport scolaire avec indicateurs : enfants en mouvement probable.', 'Dans une zone piétonne autorisée : allure du pas et priorité aux piétons.'] },
  ],
  quiz: [
    { visualId: 'M8_SCHOOL_CROSSING_01', question: 'Peux-tu dépasser la voiture arrêtée devant le passage ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Le dépassement est interdit dans cette situation.' },
    { visualId: 'M8_SCHOOL_TRANSPORT_01', question: 'Les indicateurs du transport scolaire fonctionnent. Que prévoir ?', options: ['Des enfants peuvent monter ou descendre', 'Le véhicule va nécessairement dépasser'], correct: 0, explanation: 'Il faut ralentir et s’arrêter si nécessaire.' },
    { visualId: 'M8_SENIOR_PEDESTRIAN_01', question: 'Faut-il laisser au piéton le temps de terminer sa traversée ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Ne le presse jamais et garde une marge suffisante.' },
    { visualId: 'M8_PEDESTRIAN_ZONE_01', question: 'Un véhicule autorisé roule dans une zone piétonne à…', options: ['L’allure du pas', '50 km/h'], correct: 0, explanation: 'La circulation autorisée s’effectue à l’allure du pas.' },
    { visualId: 'M8_CROSSWALK_OCCLUDED_01', question: 'Un obstacle masque un passage près d’une école. Que faire ?', options: ['Ralentir avant la zone cachée', 'Attendre de voir un enfant pour freiner'], correct: 0, explanation: 'L’anticipation doit précéder l’apparition du danger.' },
  ], nextLessonLabel: 'Suivant : ceinture & passagers →',
}
