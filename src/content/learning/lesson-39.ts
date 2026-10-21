import type { LearningLesson } from './types'

export const LESSON_39: LearningLesson = {
  id: 'refus-recidive-et-antidemarrage', moduleId: 'safety-behaviour', title: 'Refus, récidive & antidémarrage',
  description: 'Éviter les pièges liés au refus de souffler et aux sanctions aggravées.', xp: 20,
  steps: [
    { type: 'scenario', visualId: 'M6_REFUSAL_01', title: 'Refuser de souffler', body: 'Le conducteur refuse le test sans motif légitime.', question: 'Évite-t-il ainsi les conséquences du contrôle ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Le refus est punissable et est traité comme un résultat positif pour la procédure immédiate.' },
    { type: 'text', visualId: 'M6_REFUSAL_01', title: 'Pas de délai automatique', body: 'Depuis mai 2024, le conducteur ne peut plus exiger un délai de quinze minutes avant de souffler.', callout: 'REFUSER OU RETARDER N’EFFACE PAS LE CONTRÔLE.' },
    { type: 'scenario', visualId: 'M6_ALCOLOCK_01', title: 'Éthylotest antidémarrage', body: 'Un juge examine une conduite avec un taux d’alcool très élevé ou une récidive.', question: 'Peut-il imposer un éthylotest antidémarrage ?', options: ['Oui', 'Non'], correct: 0, explanation: 'L’éthylotest antidémarrage fait partie des mesures possibles et devient obligatoire dans certains cas graves prévus par la loi.' },
    { type: 'compare', visualId: 'M6_ALCOLOCK_01', title: 'Retenir les niveaux graves', body: 'Ces taux sont exprimés dans le sang.', items: [{ label: 'Dès 0,8 ‰', result: 'Antidémarrage possible selon le cas' }, { label: 'Dès 1,8 ‰', result: 'En principe obligatoire, sauf décision motivée' }] },
    { type: 'scenario', visualId: 'M6_DESIGNATED_DRIVER_01', title: 'Prévenir avant la soirée', body: 'Le groupe désigne une personne qui ne boit pas et garde les clés.', question: 'Est-ce la stratégie la plus fiable ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Organiser un conducteur sobre avant de boire évite d’avoir à estimer un taux ensuite.' },
    { type: 'text', visualId: 'M6_ALCOLOCK_01', title: 'La récidive aggrave la situation', body: 'Des faits répétés dans la période prévue par la loi peuvent entraîner des mesures plus sévères. Il ne faut jamais raisonner comme si chaque contrôle repartait de zéro.', callout: 'RÉCIDIVE = CONSÉQUENCES AGGRAVÉES.' },
    { type: 'summary', title: 'À retenir', items: ['Refuser le test sans motif légitime est punissable.', 'Le refus n’offre aucune échappatoire à la procédure.', 'Le délai de quinze minutes ne peut plus être exigé.', 'La récidive et les taux élevés aggravent les conséquences.', 'Prévoir un conducteur sobre reste la meilleure prévention.'] },
  ],
  quiz: [
    { question: 'Refuser le test permet-il d’éviter une sanction ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Le refus est lui-même punissable.' },
    { question: 'Peut-on encore exiger quinze minutes avant le test ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Cette possibilité a été supprimée en mai 2024.' },
    { question: 'Un juge peut-il imposer un antidémarrage ?', options: ['Oui', 'Non'], correct: 0, explanation: 'La mesure existe pour certains taux et récidives.' },
    { question: 'Un antidémarrage remplace-t-il toutes les autres sanctions ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Il peut s’ajouter aux autres conséquences prévues.' },
    { question: 'Quelle solution est la plus sûre avant une fête ?', options: ['Décider après avoir bu', 'Désigner à l’avance un conducteur sobre'], correct: 1, explanation: 'La décision anticipée évite une estimation dangereuse.' },
  ], nextLessonLabel: 'Suivant : drogues et médicaments →',
}
