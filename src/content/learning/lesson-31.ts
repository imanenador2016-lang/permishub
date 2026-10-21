import type { LearningLesson } from './types'

export const LESSON_31: LearningLesson = {
  id: 'bien-ranger-son-vehicule',
  moduleId: 'stopping-parking',
  title: 'Bien ranger son véhicule',
  description: 'Choisir le bon côté et conserver l’espace nécessaire aux autres usagers.',
  xp: 20,
  steps: [
    { type: 'scenario', visualId: 'M5_PARK_RIGHT_01', title: 'Sur une chaussée à double sens', body: 'Tu souhaites ranger la voiture le long de la chaussée.', question: 'De quel côté dois-tu normalement la ranger par rapport à ton sens de marche ?', options: ['À droite', 'À gauche', 'Du côté le plus proche'], correct: 0, explanation: 'Sur une chaussée à double sens, le véhicule est rangé à droite par rapport à son sens de marche.' },
    { type: 'scenario', visualId: 'M5_ONEWAY_BOTH_SIDES_01', title: 'Dans une rue à sens unique', body: 'La signalisation confirme que la chaussée est à sens unique.', question: 'Peux-tu ranger la voiture à gauche ?', options: ['Oui, si aucune autre règle ne l’interdit', 'Non, jamais'], correct: 0, explanation: 'Sur une chaussée à sens unique, un véhicule peut être rangé de l’un ou de l’autre côté.' },
    { type: 'text', visualId: 'M5_SHOULDER_PARK_01', title: 'Cherche d’abord l’accotement', body: 'Le véhicule doit être rangé hors de la chaussée sur l’accotement de plain-pied ou, hors agglomération, sur tout accotement praticable. Si l’espace manque, la règle prévoit un rangement partiel puis, à défaut, sur la chaussée.', callout: 'ACCOTEMENT PRATICABLE D’ABORD, CHAUSSÉE À DÉFAUT.' },
    { type: 'scenario', visualId: 'M5_PEDESTRIAN_CLEARANCE_01', title: 'Laisser passer les piétons', body: 'Les piétons doivent emprunter cet accotement.', question: 'Quelle largeur praticable faut-il leur laisser du côté extérieur de la voie publique ?', options: ['Au moins 1 m', 'Au moins 1,5 m', 'Au moins 2 m'], correct: 1, explanation: 'Une bande praticable d’au moins 1,5 m doit rester disponible pour les piétons.' },
    { type: 'scenario', visualId: 'M5_PARALLEL_SINGLE_ROW_01', title: 'Sur la chaussée', body: 'Aucun accotement praticable n’est disponible et le stationnement n’est pas interdit.', question: 'Comment ranger la voiture ?', options: ['Parallèlement au bord, en une seule file et loin de l’axe', 'En diagonale, même sans aménagement', 'Au plus près de l’axe'], correct: 0, explanation: 'Sur la chaussée, le véhicule se place le plus loin possible de l’axe, parallèlement au bord et en une seule file, sauf aménagement particulier.' },
    { type: 'scenario', visualId: 'M5_MOTORCYCLE_PARK_01', title: 'Motocyclette sans side-car', body: 'Une place de stationnement est délimitée au sol.', question: 'La moto peut-elle être rangée perpendiculairement au bord ?', options: ['Oui, si elle ne dépasse pas le marquage', 'Non, jamais'], correct: 0, explanation: 'Une motocyclette sans side-car ou remorque peut stationner perpendiculairement si elle reste dans le marquage.' },
    { type: 'compare', title: 'Deux sens ou sens unique', body: 'Commence toujours par identifier le sens de circulation.', items: [{ label: 'Chaussée à double sens', result: 'Rangement à droite' }, { label: 'Chaussée à sens unique', result: 'Rangement possible des deux côtés' }] },
    { type: 'summary', title: 'À retenir', items: ['Double sens : range-toi à droite.', 'Sens unique : les deux côtés sont possibles.', 'Utilise d’abord l’accotement praticable lorsque la règle le prévoit.', 'Laisse au moins 1,5 m aux piétons sur l’accotement qu’ils doivent emprunter.', 'Sur la chaussée : parallèle, une seule file et loin de l’axe.'] },
  ],
  quiz: [
    { question: 'Sur une chaussée à double sens, peux-tu normalement stationner à gauche face aux véhicules venant en sens inverse ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Tu dois ranger le véhicule à droite par rapport à ton sens de marche.' },
    { question: 'Sur une chaussée à sens unique, quel côté est autorisé si rien d’autre ne l’interdit ?', options: ['Seulement la droite', 'L’un ou l’autre côté'], correct: 1, explanation: 'La règle autorise les deux côtés sur une chaussée à sens unique.' },
    { question: 'Quelle largeur faut-il laisser aux piétons sur l’accotement qu’ils doivent emprunter ?', options: ['1 m', '1,5 m', '2,5 m'], correct: 1, explanation: 'La largeur minimale praticable est de 1,5 m.' },
    { question: 'Sans aménagement particulier, comment placer une voiture sur la chaussée ?', options: ['En diagonale', 'Parallèlement au bord'], correct: 1, explanation: 'Elle doit être placée parallèlement au bord.' },
    { question: 'Une moto sans side-car peut-elle stationner perpendiculairement dans une place délimitée ?', options: ['Oui, si elle ne dépasse pas le marquage', 'Non'], correct: 0, explanation: 'Cette position est admise dans cette limite.' },
  ],
}
