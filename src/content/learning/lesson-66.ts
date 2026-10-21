import type { LearningLesson } from './types'

export const LESSON_66: LearningLesson = {
  id: 'passages-a-niveau-comportement', moduleId: 'public-transport-level-crossings', title: 'Passages à niveau : le bon comportement',
  description: 'S’engager seulement si la sortie est libre et réagir correctement en cas d’urgence.', xp: 25,
  steps: [
    { type: 'scenario', visualId: 'M10_LEVEL_QUEUE_01', title: 'Sortie encombrée', body: 'La circulation est arrêtée juste après les rails.', question: 'Peux-tu t’engager parce que les barrières sont ouvertes ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Tu ne peux t’engager que si tu peux libérer complètement le passage sans t’immobiliser sur les voies.' },
    { type: 'scenario', visualId: 'M10_LEVEL_QUEUE_01', title: 'Arrêt sur les rails', body: 'Le véhicule devant n’avance plus.', question: 'Peux-tu attendre quelques secondes sur les voies ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Il ne faut jamais s’arrêter ni stationner sur un passage à niveau.' },
    { type: 'scenario', visualId: 'M10_LEVEL_OVERTAKE_01', title: 'Dépassement risqué', body: 'Le passage sans barrières n’est pas protégé par un feu blanc lunaire clignotant.', question: 'Peux-tu dépasser le tracteur sur le passage ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Le dépassement y est interdit dans cette configuration.' },
    { type: 'scenario', visualId: 'M10_LEVEL_EMERGENCY_01', title: 'Véhicule immobilisé', body: 'Ta voiture tombe en panne sur les voies.', question: 'Quelle est la priorité immédiate ?', options: ['Rester dans la voiture', 'Évacuer tout le monde et s’éloigner', 'Téléphoner depuis la voiture'], correct: 1, explanation: 'Fais sortir immédiatement tous les occupants et éloigne-les des voies avant d’alerter les secours.' },
    { type: 'text', visualId: 'M10_LEVEL_EMERGENCY_01', title: 'Alerter avec précision', body: 'Appelle le 112 dès que tu es en sécurité. Donne le lieu exact et, s’il existe, les informations inscrites sur l’autocollant d’identification du passage à niveau.', callout: 'D’ABORD ÉVACUER, ENSUITE ALERTER.' },
    { type: 'hierarchy', visualId: 'M10_LEVEL_PASSIVE_01', title: 'La séquence sûre', body: 'Une seule méthode évite le piège de la file bloquée.', items: ['Ralentir et observer', 'Vérifier que la sortie est libre', 'Traverser sans s’arrêter', 'Rester attentif jusqu’au dégagement complet'], memory: 'VOIR — LIBRE — TRAVERSER — DÉGAGER' },
    { type: 'summary', title: 'À retenir', items: ['Ne jamais entrer sans espace libre après les rails.', 'Arrêt et stationnement interdits sur le passage.', 'Dépassement interdit sur un passage non gardé sans feu blanc lunaire.', 'En panne : évacuer, s’éloigner puis appeler le 112.'] },
  ],
  quiz: [
    { visualId: 'M10_LEVEL_QUEUE_01', question: 'La sortie est bouchée. Peux-tu attendre sur les rails ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Tu dois rester avant le passage.' },
    { visualId: 'M10_LEVEL_OVERTAKE_01', question: 'Peux-tu dépasser sur ce passage non protégé ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Le dépassement y est interdit.' },
    { visualId: 'M10_LEVEL_EMERGENCY_01', question: 'En panne sur les voies, faut-il d’abord évacuer les occupants ?', options: ['Oui', 'Non'], correct: 0, explanation: 'La vie des occupants passe avant le véhicule.' },
    { visualId: 'M10_LEVEL_EMERGENCY_01', question: 'Après t’être éloigné, quel numéro appelles-tu ?', options: ['101 uniquement', '112', 'Aucun'], correct: 1, explanation: 'Le 112 permet d’alerter les services d’urgence.' },
    { visualId: 'M10_LEVEL_QUEUE_01', question: 'Des barrières ouvertes suffisent-elles si la sortie n’est pas libre ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Il faut pouvoir dégager entièrement les voies.' },
  ], nextLessonLabel: 'Suivant : priorité du tram →',
}
