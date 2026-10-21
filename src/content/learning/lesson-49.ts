import type { LearningLesson } from './types'

export const LESSON_49: LearningLesson = {
  id: 'freins-abs-et-adherence', moduleId: 'vehicle-technical-safety', title: 'Freins, ABS & adhérence',
  description: 'Freiner correctement et réagir sans aggraver un dérapage.', xp: 25,
  steps: [
    { type: 'text', visualId: 'M7_BRAKE_ABS_01', title: 'Le rôle de l’ABS', body: 'Lors d’un freinage appuyé, l’ABS limite le blocage des roues afin de conserver davantage de capacité à diriger le véhicule. Il ne supprime ni les lois de la physique ni la nécessité d’une distance de sécurité.', callout: 'ABS = ROUES DIRIGEABLES, PAS DISTANCE MAGIQUE.' },
    { type: 'scenario', visualId: 'M7_BRAKE_ABS_01', title: 'Freinage d’urgence avec ABS', body: 'Un obstacle surgit devant une voiture équipée d’ABS.', question: 'Faut-il appuyer fermement sur le frein et garder la direction utile ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Avec l’ABS, maintiens une forte pression de freinage et dirige le véhicule vers l’échappatoire sûre.' },
    { type: 'scenario', visualId: 'M7_SKID_01', title: 'L’arrière décroche', body: 'Dans un virage glissant, l’arrière de la voiture part vers la droite.', question: 'Faut-il contre-braquer progressivement vers la droite sans geste brusque ?', options: ['Oui', 'Non'], correct: 0, explanation: 'On regarde la direction voulue, on lâche l’accélérateur et on corrige dans le sens du dérapage.' },
    { type: 'scenario', visualId: 'M7_AQUAPLANING_01', title: 'Aquaplaning', body: 'Les pneus flottent sur une pellicule d’eau et la direction devient légère.', question: 'Faut-il freiner brutalement ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Relâche progressivement l’accélérateur, tiens le volant sans geste brusque et évite le freinage brutal.' },
    { type: 'text', visualId: 'M7_BRAKE_CHECK_01', title: 'Signaux à ne pas ignorer', body: 'Voyant de frein, niveau anormal, pédale inhabituelle, bruit métallique ou voiture qui tire d’un côté : fais contrôler le système. Un voyant ABS persistant annonce une anomalie du dispositif.', callout: 'UN FREINAGE ANORMAL = CONTRÔLE SANS ATTENDRE.' },
    { type: 'scenario', visualId: 'M7_CURVE_BRAKING_01', title: 'Avant le virage', body: 'La chaussée est humide et le virage serré.', question: 'Le ralentissement principal doit-il être réalisé avant d’entrer dans le virage ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Ralentir avant préserve l’adhérence disponible pour tourner.' },
    { type: 'summary', title: 'À retenir', items: ['L’ABS aide à conserver le contrôle directionnel.', 'Il ne garantit pas une distance de freinage plus courte.', 'Ralentis avant le virage.', 'Survirage : regarde où aller et corrige sans geste brusque.', 'Aquaplaning : relâche l’accélérateur et évite le freinage brutal.'] },
  ],
  quiz: [
    { visualId: 'M7_BRAKE_ABS_01', question: 'L’ABS empêche principalement…', options: ['Le blocage des roues', 'Toute collision'], correct: 0, explanation: 'Il permet de mieux conserver la direction lors d’un freinage appuyé.' },
    { visualId: 'M7_BRAKE_ABS_01', question: 'L’ABS raccourcit-il toujours la distance de freinage ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Son avantage principal est la maîtrise directionnelle.' },
    { visualId: 'M7_SKID_01', question: 'Si l’arrière part à droite, dans quel sens corriger ?', options: ['Vers la droite', 'Vers la gauche'], correct: 0, explanation: 'On contre-braque dans le sens du dérapage.' },
    { visualId: 'M7_AQUAPLANING_01', question: 'En aquaplaning, faut-il freiner brutalement ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Il faut éviter les actions brusques.' },
    { visualId: 'M7_CURVE_BRAKING_01', question: 'Quand faut-il surtout réduire sa vitesse pour un virage ?', options: ['Avant le virage', 'Au milieu du virage'], correct: 0, explanation: 'La voiture garde ainsi plus d’adhérence pour changer de direction.' },
  ], nextLessonLabel: 'Suivant : feux & klaxon →',
}
