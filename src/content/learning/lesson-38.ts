import type { LearningLesson } from './types'

export const LESSON_38: LearningLesson = {
  id: 'controle-alcoolemie-s-a-p', moduleId: 'safety-behaviour', title: 'Contrôle d’alcoolémie : S, A ou P',
  description: 'Lire le résultat d’un contrôle et connaître ses conséquences immédiates.', xp: 25,
  steps: [
    { type: 'text', visualId: 'M6_BREATH_CONTROL_01', title: 'Du prétest à l’analyse', body: 'La police peut soumettre une personne qui conduit ou s’apprête à conduire à un contrôle. Le test rapide indique S, A ou P. Un résultat A ou P est suivi d’une analyse qui mesure précisément le taux.', callout: 'S = SAFE · A = ALARME · P = POSITIF.' },
    { type: 'scenario', visualId: 'M6_RESULT_S_01', title: 'Résultat S', body: 'L’appareil indique S et aucun autre motif légal ne s’y oppose.', question: 'Le conducteur peut-il normalement repartir ?', options: ['Oui', 'Non'], correct: 0, explanation: 'S correspond à un résultat inférieur à 0,22 mg/l pour le seuil général.' },
    { type: 'scenario', visualId: 'M6_RESULT_A_01', title: 'Résultat A', body: 'L’analyse confirme un taux compris entre 0,22 et moins de 0,35 mg/l.', question: 'Quelle conséquence immédiate faut-il retenir ?', options: ['Interdiction de conduire pendant 3 heures', 'Aucune conséquence', 'Interdiction automatique à vie'], correct: 0, explanation: 'Cette tranche entraîne notamment une interdiction temporaire de conduire pendant 3 heures et une sanction financière.' },
    { type: 'scenario', visualId: 'M6_RESULT_P_01', title: 'Résultat P', body: 'L’analyse atteint 0,35 mg/l d’air expiré.', question: 'Depuis 2026, quelle mesure importante est appliquée à ce seuil ?', options: ['Retrait immédiat du permis pendant 15 jours', 'Simple avertissement oral'], correct: 0, explanation: 'Depuis février 2026, le seuil du retrait immédiat de 15 jours a été abaissé à 0,35 mg/l.' },
    { type: 'hierarchy', visualId: 'M6_SAP_SCALE_01', title: 'L’échelle à mémoriser', body: 'Lis toujours la valeur précise, pas seulement la lettre.', items: ['S : moins de 0,22 mg/l', 'A : de 0,22 à moins de 0,35 mg/l', 'P : dès 0,35 mg/l'], memory: '0,22 → A · 0,35 → P' },
    { type: 'scenario', visualId: 'M6_RESULT_A_01', title: 'Après un résultat A', body: 'Le conducteur attend une heure puis veut reprendre sa voiture.', question: 'Est-ce suffisant si l’interdiction temporaire est de trois heures ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Il ne peut pas conduire avant la fin de la période imposée et doit respecter les instructions reçues.' },
    { type: 'summary', title: 'À retenir', items: ['S : sous 0,22 mg/l pour la limite générale.', 'A : de 0,22 à moins de 0,35 mg/l.', 'P : à partir de 0,35 mg/l.', 'A ou P mène à une analyse précise.', 'Depuis 2026, 0,35 mg/l déclenche le retrait immédiat appliqué pendant 15 jours.'] },
  ],
  quiz: [
    { visualId: 'M6_RESULT_S_01', question: 'Que signifie S ?', options: ['Safe', 'Sanction'], correct: 0, explanation: 'S signifie Safe.' },
    { visualId: 'M6_RESULT_A_01', question: '0,30 mg/l appartient à quelle catégorie ?', options: ['S', 'A', 'P'], correct: 1, explanation: '0,30 se situe entre 0,22 et 0,35 mg/l.' },
    { visualId: 'M6_RESULT_P_01', question: '0,35 mg/l appartient à quelle catégorie ?', options: ['A', 'P'], correct: 1, explanation: 'P commence dès 0,35 mg/l.' },
    { question: 'Un résultat A permet-il de repartir immédiatement au volant ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Une interdiction temporaire de conduire s’applique.' },
    { question: 'À partir de quel seuil le retrait immédiat de 15 jours est-il appliqué depuis 2026 ?', options: ['0,22 mg/l', '0,35 mg/l', '0,50 mg/l'], correct: 1, explanation: 'Le seuil a été abaissé à 0,35 mg/l.' },
  ], nextLessonLabel: 'Suivant : refus et antidémarrage →',
}
