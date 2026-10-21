import type { LearningLesson } from './types'

export const LESSON_44: LearningLesson = {
  id: 'masses-mma-mec-et-permis-b', moduleId: 'vehicle-technical-safety', title: 'Masses : MMA, MEC & permis B',
  description: 'Distinguer la limite administrative du poids réel du véhicule.', xp: 20,
  steps: [
    { type: 'text', visualId: 'M7_MASS_WEIGHBRIDGE_01', title: 'Deux masses, deux questions', body: 'La masse maximale autorisée (MMA) est fixée par le constructeur. La masse en charge (MEC) est le poids réel du véhicule, de ses occupants et de son chargement à un moment précis.', callout: 'MMA = LIMITE SUR PAPIER · MEC = POIDS RÉEL.' },
    { type: 'compare', visualId: 'M7_MASS_WEIGHBRIDGE_01', title: 'MMA ou MEC ?', body: 'Le mot utilisé dans la question change la réponse.', items: [{ label: 'MMA', result: 'Valeur maximale autorisée par construction' }, { label: 'MEC', result: 'Valeur réellement mesurée maintenant' }] },
    { type: 'scenario', visualId: 'M7_PERMIT_VEHICLES_01', title: 'Catégorie B', body: 'Une camionnette possède une MMA de 3 500 kg et comporte au maximum huit places passagers, en plus du conducteur.', question: 'Le permis B suffit-il pour la conduire ?', options: ['Oui', 'Non'], correct: 0, explanation: 'La catégorie B couvre les automobiles dont la MMA ne dépasse pas 3 500 kg et qui ont au maximum huit places passagers.' },
    { type: 'scenario', visualId: 'M7_MASS_DOCUMENT_01', title: 'La valeur qui ne change pas avec les bagages', body: 'Après avoir vidé le coffre, le véhicule est beaucoup plus léger.', question: 'Sa MMA a-t-elle diminué ?', options: ['Oui', 'Non'], correct: 1, explanation: 'La MMA est une caractéristique administrative fixée pour le véhicule. C’est la MEC qui diminue.' },
    { type: 'scenario', visualId: 'M7_MASS_WEIGHBRIDGE_01', title: 'Surcharge', body: 'La balance indique une masse réelle supérieure à la MMA du véhicule.', question: 'Le véhicule peut-il circuler ainsi ?', options: ['Oui', 'Non'], correct: 1, explanation: 'La masse en charge ne peut pas dépasser la masse maximale autorisée.' },
    { type: 'text', visualId: 'M7_MASS_DOCUMENT_01', title: 'Où vérifier ?', body: 'Les données de masse se vérifient sur les documents officiels du véhicule et les plaques réglementaires. Ne te fie pas à la taille apparente de la voiture.', callout: 'À L’EXAMEN, LIS TOUJOURS MMA OU MEC.' },
    { type: 'summary', title: 'À retenir', items: ['MMA : maximum fixé pour le véhicule.', 'MEC : poids réel à un moment donné.', 'Permis B : automobile de maximum 3 500 kg de MMA.', 'Vider le véhicule change sa MEC, pas sa MMA.', 'Une MEC supérieure à la MMA signifie surcharge.'] },
  ],
  quiz: [
    { visualId: 'M7_MASS_WEIGHBRIDGE_01', question: 'Quelle masse une balance mesure-t-elle ?', options: ['La MMA', 'La MEC'], correct: 1, explanation: 'La balance donne le poids réel du moment.' },
    { visualId: 'M7_MASS_DOCUMENT_01', question: 'Qui fixe la MMA du véhicule ?', options: ['Le constructeur', 'Le conducteur à chaque trajet'], correct: 0, explanation: 'La MMA est une donnée définie pour le véhicule.' },
    { visualId: 'M7_PERMIT_VEHICLES_01', question: 'Avec le permis B, la MMA de l’automobile peut-elle dépasser 3 500 kg ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Au-delà, une autre catégorie de permis est nécessaire.' },
    { visualId: 'M7_MASS_WEIGHBRIDGE_01', question: 'La MEC peut-elle légalement dépasser la MMA ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Ce serait une surcharge.' },
    { visualId: 'M7_MASS_DOCUMENT_01', question: 'Ajouter des passagers augmente surtout…', options: ['La MEC', 'La MMA'], correct: 0, explanation: 'Le poids réel augmente, pas la limite administrative.' },
  ], nextLessonLabel: 'Suivant : chargement & stabilité →',
}
