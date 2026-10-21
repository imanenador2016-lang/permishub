import type { LearningLesson } from './types'

export const LESSON_36: LearningLesson = {
  id: 'emplacements-reserves-et-cas-complexes',
  moduleId: 'stopping-parking',
  title: 'Emplacements réservés & cas complexes',
  description: 'Analyser les places réservées, les zones particulières et les pièges combinés.',
  xp: 25,
  steps: [
    { type: 'scenario', visualId: 'M5_DISABLED_SPACE_01', title: 'Place réservée aux personnes handicapées', body: 'La place porte le symbole réglementaire. Le conducteur ne possède pas la carte spéciale requise.', question: 'Peut-il y stationner quelques minutes ?', options: ['Oui', 'Non'], correct: 1, explanation: 'La place est réservée aux véhicules utilisés par les titulaires de la carte spéciale, qui doit être apposée de manière visible.' },
    { type: 'scenario', visualId: 'M5_DISABLED_SPACE_01', title: 'La carte doit être visible', body: 'Une personne titulaire de la carte utilise le véhicule, mais la carte reste dans un sac.', question: 'La condition d’utilisation de la place est-elle remplie ?', options: ['Oui', 'Non'], correct: 1, explanation: 'La carte doit être apposée sur la face interne du pare-brise ou, à défaut, à l’avant du véhicule.' },
    { type: 'scenario', visualId: 'M5_ELECTRIC_CHARGING_01', title: 'Place de recharge', body: 'La place est réservée aux véhicules électriques ou hybrides électriques et possède une infrastructure publique de recharge.', question: 'Le véhicule concerné doit-il être connecté à l’infrastructure ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Sur un emplacement ainsi équipé, le véhicule électrique ou hybride électrique doit être connecté.' },
    { type: 'scenario', visualId: 'M5_RESIDENTIAL_ZONE_01', title: 'Zone résidentielle ou de rencontre', body: 'Aucun marquage de stationnement ni panneau n’autorise la place choisie.', question: 'Peux-tu y stationner ?', options: ['Oui, le long du trottoir', 'Non'], correct: 1, explanation: 'Dans une zone résidentielle ou de rencontre, le stationnement n’est autorisé qu’aux emplacements délimités ou signalés.' },
    { type: 'scenario', visualId: 'M5_MOTORWAY_STOP_01', title: 'Sur l’autoroute', body: 'Le conducteur veut s’arrêter sur la bande d’arrêt d’urgence pour consulter son téléphone.', question: 'Est-ce autorisé ?', options: ['Oui, avec les feux de détresse', 'Non'], correct: 1, explanation: 'Sur autoroute, l’arrêt et le stationnement sont interdits hors des aires signalées ; la bande d’arrêt d’urgence n’est pas une place de pause.' },
    { type: 'scenario', visualId: 'M5_COMPLEX_PARKING_01', title: 'Plusieurs informations', body: 'Une place semble libre, mais elle se situe trois mètres avant un passage pour piétons.', question: 'Le panneau de stationnement situé plus loin suffit-il à autoriser cette place ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Il faut analyser l’emplacement exact. L’interdiction générale à moins de 5 m en deçà du passage reste déterminante.' },
    { type: 'text', title: 'La méthode PermisHub', body: 'Identifie d’abord la nature de l’immobilisation. Vérifie ensuite l’endroit, les interdictions générales, les panneaux et marquages, puis les éventuelles conditions de la place réservée.', callout: 'NATURE → ENDROIT → PANNEAU → CONDITION PARTICULIÈRE.' },
    { type: 'summary', title: 'À retenir', items: ['Une place réservée exige le droit et, lorsqu’elle est requise, la carte visible.', 'Sur une place électrique équipée, le véhicule concerné doit être connecté.', 'En zone résidentielle ou de rencontre, gare-toi uniquement aux emplacements autorisés.', 'La bande d’arrêt d’urgence n’est pas une aire de pause.', 'Une autorisation apparente n’efface pas les autres interdictions applicables à l’emplacement exact.'] },
  ],
  quiz: [
    { question: 'Une personne non titulaire peut-elle utiliser une place réservée avec les feux de détresse ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Les feux de détresse n’accordent aucun droit de stationnement.' },
    { question: 'Sur une place de recharge publique réservée, le véhicule électrique doit-il être connecté ?', options: ['Oui', 'Non'], correct: 0, explanation: 'La connexion est requise sur cet emplacement équipé.' },
    { question: 'En zone résidentielle, peux-tu stationner partout le long du trottoir ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Le stationnement est limité aux emplacements autorisés.' },
    { question: 'Peux-tu utiliser la bande d’arrêt d’urgence pour téléphoner ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Ce n’est pas une aire de pause.' },
    { question: 'Avant de stationner, quelle méthode est la plus complète ?', options: ['Regarder seulement s’il y a un panneau', 'Vérifier la nature, l’endroit, la signalisation et les conditions particulières'], correct: 1, explanation: 'Toutes ces informations peuvent changer la décision.' },
  ],
  nextLessonLabel: 'Commencer le défi final →',
}
