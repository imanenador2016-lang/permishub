import type { LearningLesson } from './types'

export const LESSON_68: LearningLesson = {
  id: 'depasser-et-croiser-un-tram', moduleId: 'public-transport-level-crossings', title: 'Dépasser & croiser un tram',
  description: 'Choisir le bon côté et renoncer dès que la visibilité ou l’espace manque.', xp: 25,
  steps: [
    { type: 'scenario', visualId: 'M10_TRAM_PASS_RIGHT_01', title: 'Règle générale', body: 'La bande à droite du tram est libre et assez large.', question: 'De quel côté dépasses-tu le tram ?', options: ['Par la droite', 'Par la gauche'], correct: 0, explanation: 'Un tram se dépasse en principe par la droite.' },
    { type: 'scenario', visualId: 'M10_TRAM_PASS_LEFT_01', title: 'Exception par la gauche', body: 'Le passage à droite est impraticable à cause d’un obstacle fixe et la voie opposée est entièrement libre.', question: 'Le dépassement par la gauche peut-il être admis ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Il peut être admis si le passage à droite est impossible et si la gauche est libre et sûre.' },
    { type: 'scenario', visualId: 'M10_TRAM_WAIT_01', title: 'Un véhicule arrive en face', body: 'Le côté droit est obstrué et une voiture arrive en sens inverse à gauche.', question: 'Que fais-tu ?', options: ['Je dépasse rapidement', 'J’attends derrière le tram'], correct: 1, explanation: 'L’exception ne vaut que si la gauche est libre. Ici, il faut attendre.' },
    { type: 'scenario', visualId: 'M10_TRAM_BOARDING_01', title: 'Voyageurs sur la chaussée', body: 'Le tram s’arrête sans refuge et des voyageurs traversent la chaussée pour embarquer.', question: 'Peux-tu les contourner ?', options: ['Oui', 'Non, je m’arrête'], correct: 1, explanation: 'Tu dois t’arrêter pour laisser les voyageurs rejoindre ou quitter le tram en sécurité.' },
    { type: 'text', visualId: 'M10_TRAM_WAIT_01', title: 'Les rails demandent de la marge', body: 'Ne te rabats jamais trop tôt et évite de rester sur les rails. Vérifie aussi le gabarit du tram dans les courbes : sa caisse peut déborder de l’alignement des rails.', callout: 'SI LE PASSAGE N’EST PAS CLAIREMENT SÛR, ATTENDS.' },
    { type: 'compare', visualId: 'M10_TRAM_PASS_RIGHT_01', title: 'Choisir le côté', body: 'La règle et son exception se résument ainsi.', items: [{ label: 'Droite libre et suffisante', result: 'Dépassement par la droite' }, { label: 'Droite impossible, gauche libre', result: 'Gauche possible avec prudence' }, { label: 'Trafic en face ou doute', result: 'Attendre' }] },
    { type: 'summary', title: 'À retenir', items: ['Le tram se dépasse normalement par la droite.', 'La gauche n’est possible que si la droite est impraticable et la voie opposée libre.', 'Ne gêne jamais les voyageurs qui embarquent ou descendent.', 'Respecte le gabarit, les rails et la distance de sécurité.'] },
  ],
  quiz: [
    { visualId: 'M10_TRAM_PASS_RIGHT_01', question: 'Quel est le côté normal pour dépasser ce tram ?', options: ['Droite', 'Gauche'], correct: 0, explanation: 'Le dépassement se fait en principe par la droite.' },
    { visualId: 'M10_TRAM_PASS_LEFT_01', question: 'La droite est impossible et la gauche libre. Le dépassement à gauche peut-il être permis ?', options: ['Oui', 'Non'], correct: 0, explanation: 'C’est l’exception prévue.' },
    { visualId: 'M10_TRAM_WAIT_01', question: 'Une voiture arrive en face. Dois-tu attendre ?', options: ['Oui', 'Non'], correct: 0, explanation: 'La voie opposée n’est pas libre.' },
    { visualId: 'M10_TRAM_BOARDING_01', question: 'Sans refuge, peux-tu passer pendant que les voyageurs traversent ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Tu dois t’arrêter et les laisser passer.' },
    { visualId: 'M10_TRAM_WAIT_01', question: 'En cas de doute sur l’espace disponible, faut-il renoncer au dépassement ?', options: ['Oui', 'Non'], correct: 0, explanation: 'La sécurité prime.' },
  ], nextLessonLabel: 'Suivant : bandes bus & sites réservés →',
}
