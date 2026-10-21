import type { LearningLesson } from './types'

export const LESSON_35: LearningLesson = {
  id: 'zone-bleue-et-stationnement-payant',
  moduleId: 'stopping-parking',
  title: 'Zone bleue & stationnement payant',
  description: 'Utiliser correctement le disque et respecter les modalités affichées.',
  xp: 20,
  steps: [
    { type: 'scenario', visualId: 'M5_BLUE_ZONE_01', title: 'Entrer dans une zone bleue', body: 'La signalisation impose l’usage du disque de stationnement.', question: 'Où faut-il placer le disque ?', options: ['De manière visible derrière le pare-brise ou à l’avant du véhicule', 'Dans le coffre', 'Sous le siège'], correct: 0, explanation: 'Le disque doit être visible sur la face interne du pare-brise ou, à défaut, à l’avant du véhicule.' },
    { type: 'scenario', visualId: 'M5_DISC_TIME_01', title: 'Régler l’heure', body: 'Tu arrives à 10 h 10.', question: 'Sur quel repère règles-tu la flèche du disque ?', options: ['10 h', '10 h 30', '11 h'], correct: 1, explanation: 'La flèche se place sur le trait qui suit le moment de l’arrivée.' },
    { type: 'text', visualId: 'M5_BLUE_ZONE_01', title: 'Règle générale de la zone bleue', body: 'Sauf modalités particulières indiquées sur place, le disque est obligatoire les jours ouvrables de 9 h à 18 h et la durée maximale est de deux heures.', callout: 'TOUJOURS VÉRIFIER LA SIGNALISATION LOCALE.' },
    { type: 'scenario', visualId: 'M5_DISC_TIME_01', title: 'Ne pas déplacer la flèche', body: 'Le temps autorisé touche à sa fin, mais la voiture n’a pas quitté la place.', question: 'Peux-tu modifier l’heure indiquée sur le disque ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Les indications du disque ne peuvent pas être modifiées avant que le véhicule ait quitté l’emplacement.' },
    { type: 'scenario', visualId: 'M5_PAID_PARKING_01', title: 'Stationnement payant', body: 'Un horodateur régit l’emplacement.', question: 'Quelle règle dois-tu suivre ?', options: ['Les modalités indiquées sur l’appareil ou la signalisation', 'Toujours deux heures gratuites', 'Uniquement la règle de la zone bleue'], correct: 0, explanation: 'Le stationnement payant est régi par les modalités et conditions portées à la connaissance des usagers.' },
    { type: 'scenario', visualId: 'M5_BROKEN_METER_01', title: 'Horodateur hors d’usage', body: 'L’horodateur est manifestement hors service.', question: 'Quel dispositif dois-tu employer selon la règle générale ?', options: ['Le disque de stationnement', 'Les feux de détresse', 'Aucun dispositif'], correct: 0, explanation: 'Lorsque l’horodateur est hors d’usage, le disque doit être employé selon les règles de la zone bleue.' },
    { type: 'text', title: 'Contrôle électronique', body: 'Une commune peut utiliser un système basé sur la plaque d’immatriculation. Dans ce cas, suis les modalités d’enregistrement indiquées sur place ; aucun document papier supplémentaire n’est nécessaire si le système remplace la carte.', callout: 'PLAQUE ENREGISTRÉE = CONTRÔLE ÉLECTRONIQUE.' },
    { type: 'summary', title: 'À retenir', items: ['Règle le disque sur le trait suivant l’heure d’arrivée.', 'Règle générale : jours ouvrables, 9 h–18 h, maximum deux heures.', 'Ne modifie pas le disque sans quitter la place.', 'En stationnement payant, suis les conditions affichées.', 'Horodateur hors service : utilise le disque selon la règle générale.'] },
  ],
  quiz: [
    { question: 'Arrivée à 14 h 05 : quelle heure indiquer ?', options: ['14 h', '14 h 30', '15 h'], correct: 1, explanation: 'Il faut choisir le trait qui suit l’heure d’arrivée.' },
    { question: 'Sans modalité différente, quelle est la durée maximale en zone bleue ?', options: ['Une heure', 'Deux heures', 'Toute la journée'], correct: 1, explanation: 'La règle générale prévoit deux heures.' },
    { question: 'Peux-tu avancer l’heure du disque sans déplacer le véhicule ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Le disque ne peut être modifié avant le départ du véhicule.' },
    { question: 'L’horodateur est hors service. Que fais-tu selon la règle générale ?', options: ['J’utilise le disque', 'Je ne mets rien'], correct: 0, explanation: 'Le disque remplace alors l’horodateur.' },
    { question: 'Une indication locale peut-elle modifier les horaires généraux ?', options: ['Oui', 'Non'], correct: 0, explanation: 'La signalisation locale doit toujours être lue.' },
  ],
}
