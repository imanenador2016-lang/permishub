import type { LearningLesson } from './types'

export const LESSON_52: LearningLesson = {
  id: 'pietons-passages-et-traversee', moduleId: 'vulnerable-users-passengers', title: 'Piétons : passages & traversée',
  description: 'Anticiper, céder le passage et garder une visibilité suffisante.', xp: 25,
  steps: [
    { type: 'text', visualId: 'M8_PEDESTRIAN_WAITING_01', title: 'Prêt à traverser', body: 'À un passage sans feux, le conducteur doit céder le passage au piéton engagé ou sur le point de s’engager. Approche à vitesse modérée et sois prêt à t’arrêter.', callout: 'L’INTENTION VISIBLE DU PIÉTON COMPTE.' },
    { type: 'scenario', visualId: 'M8_PEDESTRIAN_WAITING_01', title: 'Au bord du passage', body: 'La piétonne attend au bord du passage et regarde la circulation pour traverser.', question: 'Le conducteur doit-il lui céder le passage ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Elle est clairement sur le point de s’engager sur le passage.' },
    { type: 'scenario', visualId: 'M8_PEDESTRIAN_NO_CROSSWALK_01', title: 'Hors passage', body: 'Aucun passage pour piétons ne se trouve à proximité et une personne traverse ailleurs.', question: 'Le piéton est-il prioritaire ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Hors passage, le piéton doit céder le passage. Il traverse perpendiculairement et sans s’attarder.' },
    { type: 'text', visualId: 'M8_PEDESTRIAN_WAITING_01', title: 'La règle des 20 mètres', body: 'Lorsqu’un passage pour piétons se trouve à moins de 20 mètres, le piéton est tenu de l’utiliser. Cette distance remplace l’ancienne règle souvent mémorisée à tort à 30 mètres.', callout: 'PASSAGE À MOINS DE 20 M = OBLIGATOIRE.' },
    { type: 'scenario', visualId: 'M8_CROSSWALK_OCCLUDED_01', title: 'Passage masqué', body: 'Une camionnette stationnée masque une partie du passage. Des jambes apparaissent derrière le véhicule.', question: 'Quelle réaction est correcte ?', options: ['Maintenir sa vitesse', 'Ralentir pour pouvoir s’arrêter', 'Dépasser rapidement la camionnette'], correct: 1, explanation: 'Un obstacle qui masque le passage impose d’anticiper la présence d’un piéton.' },
    { type: 'scenario', visualId: 'M8_TURNING_PEDESTRIAN_01', title: 'Tu changes de direction', body: 'En tournant, tu coupes la trajectoire d’un piéton qui traverse la chaussée dans laquelle tu t’engages.', question: 'Qui doit attendre ?', options: ['Le piéton', 'Le conducteur qui tourne'], correct: 1, explanation: 'Le conducteur qui change de direction cède le passage au piéton qui traverse la chaussée qu’il va emprunter.' },
    { type: 'summary', title: 'À retenir', items: ['Piéton engagé ou prêt à s’engager sur un passage : cède le passage.', 'Hors passage : le piéton n’est pas prioritaire.', 'Passage à moins de 20 m : le piéton doit l’utiliser.', 'Passage masqué : ralentis pour pouvoir t’arrêter.', 'Ne dépasse jamais un véhicule qui ralentit ou s’arrête devant un passage.', 'Arrêt et stationnement interdits sur le passage et sur la chaussée dans les 5 m avant.'] },
  ],
  quiz: [
    { visualId: 'M8_PEDESTRIAN_WAITING_01', question: 'Le piéton manifeste son intention de traverser. Dois-tu céder le passage ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Il est sur le point de s’engager.' },
    { visualId: 'M8_PEDESTRIAN_NO_CROSSWALK_01', question: 'Hors passage, qui doit céder le passage ?', options: ['Le piéton', 'Toujours la voiture'], correct: 0, explanation: 'Hors passage, le piéton n’a pas priorité.' },
    { visualId: 'M8_CROSSWALK_OCCLUDED_01', question: 'Un véhicule masque le passage. Quelle attitude adopter ?', options: ['Accélérer', 'Ralentir et se préparer à stopper'], correct: 1, explanation: 'Il faut pouvoir s’arrêter si un piéton apparaît.' },
    { visualId: 'M8_TURNING_PEDESTRIAN_01', question: 'En tournant, peux-tu couper la trajectoire du piéton ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Tu dois lui céder le passage.' },
    { visualId: 'M8_PEDESTRIAN_WAITING_01', question: 'À quelle distance un passage devient-il obligatoire pour le piéton ?', options: ['Moins de 20 m', 'Moins de 50 m'], correct: 0, explanation: 'La distance à retenir est 20 mètres.' },
  ], nextLessonLabel: 'Suivant : cyclistes & passages →',
}
