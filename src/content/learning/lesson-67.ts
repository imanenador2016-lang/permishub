import type { LearningLesson } from './types'

export const LESSON_67: LearningLesson = {
  id: 'tram-priorite-et-carrefours', moduleId: 'public-transport-level-crossings', title: 'Tram : priorité & carrefours',
  description: 'Comprendre la priorité particulière du tram et les ordres qui la remplacent.', xp: 25,
  steps: [
    { type: 'scenario', visualId: 'M10_TRAM_PRIORITY_01', title: 'Le tram n’est pas un véhicule ordinaire', body: 'À ce carrefour sans feu ni agent, une voiture arrive à droite du tram.', question: 'Qui passe en premier ?', options: ['La voiture venant de droite', 'Le tram'], correct: 1, explanation: 'Le tram bénéficie d’une priorité particulière ; la priorité de droite ne suffit pas à passer devant lui.' },
    { type: 'text', visualId: 'M10_TRAM_AERIAL_01', title: 'Une priorité liée aux rails', body: 'Le tram ne peut pas dévier de sa trajectoire et sa distance d’arrêt est importante. Tu dois donc toujours identifier ses rails et ne jamais lui couper la route.', callout: 'LA PRIORITÉ DE DROITE NE BAT PAS LE TRAM.' },
    { type: 'scenario', visualId: 'M10_TRAM_RED_LIGHT_01', title: 'Le feu rouge prime', body: 'Le tram est face à un feu rouge.', question: 'Sa priorité l’autorise-t-elle à franchir le feu ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Le conducteur du tram doit respecter les feux de circulation.' },
    { type: 'scenario', visualId: 'M10_TRAM_OFFICER_01', title: 'L’agent qualifié', body: 'Un agent présente la paume de la main au tram.', question: 'Le tram doit-il s’arrêter ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Les injonctions d’un agent qualifié priment sur les règles de priorité et sur les signaux.' },
    { type: 'scenario', visualId: 'M10_TRAM_PRIORITY_01', title: 'Tourner devant les rails', body: 'Tu veux tourner à gauche et ta trajectoire coupe celle du tram.', question: 'Dois-tu le laisser passer ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Tu ne peux pas couper la trajectoire du tram ; laisse-le passer avant de tourner.' },
    { type: 'hierarchy', visualId: 'M10_TRAM_OFFICER_01', title: 'Ordre à retenir', body: 'Face à un tram, cherche d’abord une instruction supérieure.', items: ['Ordres de l’agent qualifié', 'Feux de circulation', 'Signaux routiers applicables', 'Règle générale de priorité du tram'], memory: 'AGENT — FEU — SIGNAL — RÈGLE' },
    { type: 'summary', title: 'À retenir', items: ['Le tram est généralement prioritaire, même sur un véhicule venant de sa droite.', 'Il doit respecter les agents qualifiés et les feux.', 'Ne coupe jamais ses rails sans lui céder le passage.', 'Anticipe sa trajectoire fixe et sa grande distance d’arrêt.'] },
  ],
  quiz: [
    { visualId: 'M10_TRAM_PRIORITY_01', question: 'À ce carrefour sans signalisation, la voiture venant de droite passe-t-elle avant le tram ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Le tram reste prioritaire.' },
    { visualId: 'M10_TRAM_RED_LIGHT_01', question: 'Un tram doit-il respecter un feu rouge ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Sa priorité ne l’autorise pas à franchir un feu rouge.' },
    { visualId: 'M10_TRAM_OFFICER_01', question: 'L’ordre d’un agent prime-t-il sur la priorité du tram ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Les injonctions de l’agent qualifié priment.' },
    { visualId: 'M10_TRAM_AERIAL_01', question: 'Peux-tu couper les rails si le tram est assez proche pour devoir freiner ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Tu dois lui céder le passage.' },
    { visualId: 'M10_TRAM_PRIORITY_01', question: 'La priorité de droite s’applique-t-elle contre le tram comme entre deux voitures ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Le tram bénéficie d’une priorité particulière.' },
  ], nextLessonLabel: 'Suivant : dépasser un tram →',
}
