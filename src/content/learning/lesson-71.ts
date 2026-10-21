import type { LearningLesson } from './types'

export const LESSON_71: LearningLesson = {
  id: 'bus-quitte-son-arret', moduleId: 'public-transport-level-crossings', title: 'Quand le bus quitte son arrêt',
  description: 'Appliquer la règle en agglomération, hors agglomération et face au transport scolaire.', xp: 25,
  steps: [
    { type: 'scenario', visualId: 'M10_BUS_LEAVING_URBAN_01', title: 'En agglomération', body: 'Un bus de ligne circulant dans ton sens quitte son arrêt et annonce sa manœuvre avec le clignotant gauche.', question: 'Dois-tu lui permettre de repartir ?', options: ['Oui', 'Non'], correct: 0, explanation: 'En agglomération, tu dois ralentir et, si nécessaire, t’arrêter pour laisser le bus quitter son arrêt.' },
    { type: 'scenario', visualId: 'M10_BUS_LEAVING_RURAL_01', title: 'Hors agglomération', body: 'Le même bus veut repartir d’un arrêt situé sur une route rurale.', question: 'Bénéficie-t-il de la même priorité ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Hors agglomération, cette priorité particulière ne s’applique pas ; le bus doit céder le passage.' },
    { type: 'text', visualId: 'M10_BUS_LEAVING_URBAN_01', title: 'Une priorité annoncée', body: 'Le bus doit signaler son intention à temps. Sa priorité ne l’autorise pas à se jeter brusquement devant un véhicule déjà à sa hauteur.', callout: 'CLIGNOTANT À TEMPS, PAS DE MANŒUVRE FORCÉE.' },
    { type: 'scenario', visualId: 'M10_BUS_LEAVING_URBAN_01', title: 'Déjà à côté du bus', body: 'Tu es déjà engagé à hauteur du bus lorsqu’il met son clignotant.', question: 'Le conducteur du bus peut-il te forcer à freiner brutalement ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Il doit annoncer sa manœuvre et ne peut pas créer un danger pour un véhicule déjà engagé.' },
    { type: 'scenario', visualId: 'M10_SCHOOL_BUS_01', title: 'Transport scolaire', body: 'Un car scolaire est arrêté et tous ses indicateurs de direction clignotent pendant l’embarquement des enfants.', question: 'Que fais-tu ?', options: ['Je maintiens ma vitesse', 'Je ralentis fortement et m’arrête si nécessaire'], correct: 1, explanation: 'Les enfants peuvent traverser. Tu dois ralentir fortement et t’arrêter si nécessaire.' },
    { type: 'compare', visualId: 'M10_BUS_LEAVING_RURAL_01', title: 'Trois situations', body: 'Le contexte change la règle.', items: [{ label: 'Bus de ligne en agglomération', result: 'Le laisser quitter l’arrêt' }, { label: 'Bus hors agglomération', result: 'Le bus cède le passage' }, { label: 'Transport scolaire, quatre clignotants', result: 'Ralentir fortement, arrêt si nécessaire' }] },
    { type: 'summary', title: 'À retenir', items: ['En agglomération, laisse repartir le bus de ligne qui signale sa manœuvre.', 'Hors agglomération, il ne bénéficie pas de cette priorité.', 'Le bus ne peut pas forcer sa manœuvre sur un véhicule déjà engagé.', 'Transport scolaire avec tous les clignotants : ralentir fortement et s’arrêter si nécessaire.'] },
  ],
  quiz: [
    { visualId: 'M10_BUS_LEAVING_URBAN_01', question: 'En agglomération, dois-tu laisser repartir ce bus qui met son clignotant ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Ralentis et arrête-toi si nécessaire.' },
    { visualId: 'M10_BUS_LEAVING_RURAL_01', question: 'Hors agglomération, le bus bénéficie-t-il de la même priorité ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Il doit alors céder le passage.' },
    { visualId: 'M10_BUS_LEAVING_URBAN_01', question: 'Le bus doit-il annoncer son départ avec son clignotant ?', options: ['Oui', 'Non'], correct: 0, explanation: 'La manœuvre doit être indiquée à temps.' },
    { visualId: 'M10_BUS_LEAVING_URBAN_01', question: 'Peut-il forcer un véhicule déjà à sa hauteur à freiner brutalement ?', options: ['Oui', 'Non'], correct: 1, explanation: 'La priorité n’autorise pas à créer un danger.' },
    { visualId: 'M10_SCHOOL_BUS_01', question: 'Tous les clignotants d’un transport scolaire fonctionnent. Faut-il ralentir fortement ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Des enfants peuvent embarquer, descendre ou traverser.' },
  ], nextLessonLabel: 'Passer au défi final →',
}
