import type { LearningLesson } from './types'

export const LESSON_33: LearningLesson = {
  id: 'stationnement-interdit',
  moduleId: 'stopping-parking',
  title: 'Stationnement interdit',
  description: 'Distinguer les interdictions qui ne concernent que le stationnement.',
  xp: 25,
  steps: [
    { type: 'text', visualId: 'M5_PARK_ONLY_OVERVIEW_01', title: 'Attention au mot utilisé', body: 'Certaines règles interdisent uniquement le stationnement. Un arrêt peut alors rester possible s’il respecte sa définition et ne crée aucun danger ni gêne.', callout: 'STATIONNEMENT INTERDIT ≠ ARRÊT TOUJOURS INTERDIT.' },
    { type: 'scenario', visualId: 'M5_BUS_STOP_15M_01', title: 'Autour d’un arrêt de bus ou de tram', body: 'La voiture veut rester garée à dix mètres du panneau d’arrêt.', question: 'Le stationnement est-il autorisé ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Le stationnement est interdit à moins de 15 m de part et d’autre du panneau indiquant l’arrêt.' },
    { type: 'scenario', visualId: 'M5_GARAGE_ACCESS_01', title: 'Devant un accès carrossable', body: 'La voiture bloque une entrée de garage. Sa plaque n’est pas reproduite lisiblement sur cet accès.', question: 'Peut-elle stationner ici ?', options: ['Oui si le garage semble vide', 'Non'], correct: 1, explanation: 'Le stationnement est interdit devant un accès carrossable, sauf pour le véhicule dont la plaque est reproduite lisiblement sur cet accès.' },
    { type: 'scenario', visualId: 'M5_FREE_WIDTH_3M_01', title: 'Le passage restant', body: 'Après le stationnement, il ne resterait que 2,6 m de passage libre sur la chaussée.', question: 'Le stationnement est-il autorisé ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Le stationnement est interdit lorsque la largeur du passage libre serait réduite à moins de 3 m.' },
    { type: 'scenario', visualId: 'M5_YELLOW_DASHED_01', title: 'Ligne jaune discontinue', body: 'Une ligne jaune discontinue longe le bord réel de la chaussée.', question: 'Que t’interdit-elle ?', options: ['Le stationnement', 'Uniquement la circulation', 'Rien'], correct: 0, explanation: 'Le stationnement est interdit sur la chaussée le long de cette ligne jaune discontinue.' },
    { type: 'scenario', visualId: 'M5_OPPOSITE_PARKING_01', title: 'Face à un autre véhicule', body: 'Sur cette chaussée à double sens, une voiture est déjà stationnée en face. En te garant, le croisement de deux véhicules deviendrait difficile.', question: 'Peux-tu stationner en face ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Le stationnement est interdit du côté opposé si le croisement de deux autres véhicules devient malaisé.' },
    { type: 'scenario', visualId: 'M5_ONE_METRE_GAP_01', title: 'Bloquer un autre véhicule', body: 'La voiture serait placée à moins d’un mètre d’un véhicule déjà stationné et empêcherait son dégagement.', question: 'Le stationnement est-il correct ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Il faut au moins 1 m devant et derrière et ne pas empêcher l’accès ou le dégagement d’un autre véhicule.' },
    { type: 'summary', title: 'À retenir', items: ['Arrêt de bus ou de tram : pas de stationnement à moins de 15 m de part et d’autre du panneau.', 'Accès carrossable : stationnement interdit, sauf exception liée à la plaque reproduite.', 'Toujours laisser au moins 3 m de passage libre sur la chaussée.', 'Ligne jaune discontinue au bord : stationnement interdit.', 'Ne bloque jamais l’accès ou le dégagement d’un autre véhicule.'] },
  ],
  quiz: [
    { question: 'Peux-tu stationner à 10 m d’un panneau d’arrêt de bus ?', options: ['Oui', 'Non'], correct: 1, explanation: 'L’interdiction s’étend sur 15 m de part et d’autre du panneau.' },
    { question: 'Quelle largeur minimale doit rester libre sur la chaussée ?', options: ['2 m', '2,5 m', '3 m'], correct: 2, explanation: 'Le passage libre ne peut pas être réduit à moins de 3 m.' },
    { question: 'Une ligne jaune discontinue le long du bord interdit…', options: ['L’arrêt et le stationnement', 'Le stationnement', 'Le dépassement'], correct: 1, explanation: 'Elle interdit le stationnement.' },
    { question: 'Peux-tu stationner devant n’importe quel garage si tu restes dans la voiture ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Rester dans le véhicule ne transforme pas l’attente en arrêt.' },
    { question: 'Peux-tu enfermer une voiture entre deux véhicules sans lui laisser la possibilité de sortir ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Tu ne peux pas empêcher son dégagement.' },
  ],
}
