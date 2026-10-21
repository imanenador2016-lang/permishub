import type { LearningLesson } from './types'

export const LESSON_43: LearningLesson = {
  id: 'porter-secours-et-rester-sur-place', moduleId: 'safety-behaviour', title: 'Porter secours & rester sur place',
  description: 'Aider sans aggraver les blessures et éviter le délit de fuite.', xp: 25,
  steps: [
    { type: 'scenario', visualId: 'M6_VICTIM_SAFE_01', title: 'Déplacer une victime', body: 'Une victime est consciente et aucun danger immédiat comme un incendie ne la menace.', question: 'Dois-tu la déplacer ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Un déplacement inutile peut aggraver une blessure. Attends les secours sauf danger immédiat.' },
    { type: 'scenario', visualId: 'M6_HELMET_01', title: 'Casque du motard', body: 'Un motard blessé respire normalement.', question: 'Faut-il lui retirer le casque ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Ne retire pas le casque sans nécessité : un mauvais mouvement peut aggraver une lésion cervicale.' },
    { type: 'scenario', visualId: 'M6_VICTIM_SAFE_01', title: 'Boire ou manger', body: 'La victime demande de l’eau en attendant les secours.', question: 'Dois-tu lui en donner ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Ne donne ni boisson ni nourriture à une victime d’accident.' },
    { type: 'text', visualId: 'M6_EMERGENCY_CALL_01', title: 'L’appel au 112', body: 'Indique le lieu précis, le nombre de victimes, leur état apparent et les dangers encore présents. Ne raccroche pas avant que l’opérateur te le demande.', callout: 'LOCALISER · DÉCRIRE · ÉCOUTER.' },
    { type: 'scenario', visualId: 'M6_HIT_AND_RUN_01', title: 'Rester sur place', body: 'Un conducteur pense avoir légèrement touché un véhicule, mais part pour éviter les constatations.', question: 'Le doute écarte-t-il le délit de fuite ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Quitter volontairement les lieux pour échapper aux constatations peut constituer un délit de fuite, même si le conducteur doute de son implication.' },
    { type: 'text', visualId: 'M6_EMERGENCY_CALL_01', title: 'Suis les instructions du 112', body: 'L’opérateur peut te guider jusqu’à l’arrivée des secours. Réponds précisément et n’effectue pas un geste que tu ne maîtrises pas sans instruction.', callout: 'GARDE TON CALME ET RESTE DISPONIBLE.' },
    { type: 'summary', title: 'À retenir', items: ['Ne déplace pas une victime sans danger immédiat.', 'Ne retire pas le casque si la respiration est normale.', 'Ne donne rien à boire ou à manger.', 'Appelle le 112 avec des informations précises.', 'Toute personne impliquée doit rester pour les constatations.'] },
  ],
  quiz: [
    { question: 'Peut-on déplacer une victime sans danger immédiat ?', options: ['Oui', 'Non'], correct: 1, explanation: 'On évite tout déplacement inutile.' },
    { question: 'Retires-tu le casque si le motard respire normalement ?', options: ['Oui', 'Non'], correct: 1, explanation: 'On le laisse en place.' },
    { question: 'Peux-tu donner de l’eau à la victime ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Ni boisson ni nourriture.' },
    { question: 'Quel numéro appelles-tu pour les secours ?', options: ['112', '101 uniquement'], correct: 0, explanation: 'Le 112 est le numéro d’urgence européen.' },
    { question: 'Partir pour éviter les constatations peut-il être un délit de fuite ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Le doute sur son implication n’autorise pas à partir.' },
  ], nextLessonLabel: 'Commencer le défi final →',
}
