import type { LearningLesson } from './types'

export const LESSON_48: LearningLesson = {
  id: 'pneus-pression-et-usure', moduleId: 'vehicle-technical-safety', title: 'Pneus : pression & usure',
  description: 'Contrôler le seul contact entre la voiture et la route.', xp: 25,
  steps: [
    { type: 'scenario', visualId: 'M7_TYRE_TREAD_01', title: 'Profondeur légale', body: 'Les rainures principales atteignent 1,6 mm sur la zone réglementaire.', question: 'Le pneu atteint-il encore le minimum légal ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Le minimum légal est de 1,6 mm, même si remplacer plus tôt améliore la sécurité sous la pluie.' },
    { type: 'text', visualId: 'M7_TYRE_TREAD_01', title: 'Le témoin d’usure', body: 'Les témoins placés dans les rainures aident à repérer la limite. Contrôle toute la bande utile : une usure irrégulière peut rendre un pneu dangereux avant que toutes les zones soient au minimum.', callout: '1,6 MM = LIMITE LÉGALE, PAS OBJECTIF DE SÉCURITÉ.' },
    { type: 'scenario', visualId: 'M7_TYRE_PRESSURE_01', title: 'Mesurer la pression', body: 'La voiture a roulé longtemps et les pneus sont chauds.', question: 'Est-ce le meilleur moment pour comparer la pression à la valeur à froid du constructeur ?', options: ['Oui', 'Non'], correct: 1, explanation: 'La pression de référence se contrôle à froid selon les indications du constructeur.' },
    { type: 'compare', visualId: 'M7_TYRE_WEAR_01', title: 'Lire l’usure', body: 'Une mauvaise pression laisse souvent une signature visible.', items: [{ label: 'Usure sur les deux épaules', result: 'Sous-gonflage probable' }, { label: 'Usure surtout au centre', result: 'Surgonflage probable' }] },
    { type: 'scenario', visualId: 'M7_TYRE_PRESSURE_01', title: 'Charge importante', body: 'La voiture part pour un long trajet très chargée.', question: 'Faut-il vérifier et adapter la pression selon les indications du constructeur ?', options: ['Oui', 'Non'], correct: 0, explanation: 'La pression dépend de la charge et doit suivre les valeurs prescrites pour le véhicule.' },
    { type: 'text', visualId: 'M7_TYRE_WEAR_01', title: 'Un pneu raconte un problème', body: 'Coupure, hernie, objet planté, vibration ou usure anormale exigent un contrôle. Vérifie aussi que les dimensions, indices et caractéristiques correspondent aux prescriptions applicables.', callout: 'NE ROULE PAS SUR UN PNEU ENDOMMAGÉ.' },
    { type: 'summary', title: 'À retenir', items: ['Rainures principales : minimum légal 1,6 mm.', 'Contrôle la pression à froid.', 'Suis la valeur du constructeur selon la charge.', 'Sous-gonflage et surgonflage accélèrent l’usure.', 'Inspecte régulièrement flancs, bande de roulement et témoins.'] },
  ],
  quiz: [
    { visualId: 'M7_TYRE_TREAD_01', question: 'Quelle profondeur minimale retenir ?', options: ['1 mm', '1,6 mm', '3 mm'], correct: 1, explanation: 'Le minimum légal des rainures principales est 1,6 mm.' },
    { visualId: 'M7_TYRE_PRESSURE_01', question: 'La pression de référence se contrôle de préférence…', options: ['À froid', 'Après une longue autoroute'], correct: 0, explanation: 'La chaleur modifie la mesure.' },
    { visualId: 'M7_TYRE_WEAR_01', question: 'Une usure sur les deux bords évoque souvent…', options: ['Un sous-gonflage', 'Un surgonflage'], correct: 0, explanation: 'Un pneu sous-gonflé travaille davantage sur ses épaules.' },
    { visualId: 'M7_TYRE_WEAR_01', question: 'Une hernie sur le flanc est-elle à faire contrôler immédiatement ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Elle peut annoncer une défaillance grave.' },
    { visualId: 'M7_TYRE_PRESSURE_01', question: 'La valeur du constructeur doit-elle primer sur une estimation personnelle ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Elle est adaptée au véhicule et à sa charge.' },
  ], nextLessonLabel: 'Suivant : freins & adhérence →',
}
