import type { LearningLesson } from './types'

export const LESSON_50: LearningLesson = {
  id: 'feux-visibilite-et-klaxon', moduleId: 'vehicle-technical-safety', title: 'Feux, visibilité & klaxon',
  description: 'Voir, être vu et avertir uniquement quand la règle le permet.', xp: 25,
  steps: [
    { type: 'text', visualId: 'M7_LIGHTS_NIGHT_01', title: 'Voir sans éblouir', body: 'De la tombée au lever du jour, utilise les feux adaptés. En journée, allume les feux de croisement ou de route lorsque la visibilité n’atteint plus environ 200 m.', callout: 'VOIR · ÊTRE VU · NE PAS ÉBLOUIR.' },
    { type: 'scenario', visualId: 'M7_HIGH_BEAM_01', title: 'Feux de route', body: 'Un véhicule arrive en sens inverse sur une route non éclairée.', question: 'Peux-tu maintenir les feux de route s’ils risquent de l’éblouir ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Passe aux feux de croisement dès que les feux de route peuvent éblouir.' },
    { type: 'scenario', visualId: 'M7_HIGH_BEAM_01', title: 'Véhicule suivi', body: 'Tu suis une voiture à moins de 50 m sans intention immédiate de la dépasser.', question: 'Les feux de route sont-ils permis ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Ils sont interdits dans cette situation pour ne pas éblouir par les rétroviseurs.' },
    { type: 'scenario', visualId: 'M7_FOG_01', title: 'Antibrouillard arrière', body: 'Une forte pluie réduit la visibilité, mais il ne fait pas nuit.', question: 'Le feu antibrouillard arrière doit-il être allumé ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Il est obligatoire en cas de forte pluie ; en brouillard ou neige, il l’est lorsque la visibilité est inférieure à environ 100 m.' },
    { type: 'scenario', visualId: 'M7_HAZARD_01', title: 'Feux de détresse', body: 'Le trafic ralentit brutalement et un risque de collision apparaît derrière.', question: 'Peux-tu utiliser les quatre indicateurs pour avertir du danger imminent ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Les feux de détresse peuvent signaler un risque d’accident imminent.' },
    { type: 'scenario', visualId: 'M7_HORN_01', title: 'Klaxon', body: 'En ville, le conducteur veut saluer un ami sur le trottoir.', question: 'Peut-il klaxonner ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Le klaxon sert à donner un avertissement nécessaire pour éviter un accident, pas à saluer ou manifester son impatience.' },
    { type: 'summary', title: 'À retenir', items: ['Éclairage obligatoire la nuit et lorsque la visibilité est inférieure à environ 200 m.', 'Feux de route interdits s’ils éblouissent.', 'Antibrouillard arrière obligatoire sous forte pluie.', 'Warnings pour panne ou danger imminent, pas pour justifier un mauvais stationnement.', 'Klaxon bref et seulement dans les cas autorisés.'] },
  ],
  quiz: [
    { visualId: 'M7_LIGHTS_NIGHT_01', question: 'Sous 200 m de visibilité en journée, faut-il un éclairage adapté ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Il faut voir et être vu.' },
    { visualId: 'M7_HIGH_BEAM_01', question: 'Peut-on éblouir un usager venant en sens inverse ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Il faut repasser aux feux de croisement.' },
    { visualId: 'M7_FOG_01', question: 'Le feu antibrouillard arrière est-il obligatoire sous forte pluie ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Oui, même en journée.' },
    { visualId: 'M7_HAZARD_01', question: 'Les warnings rendent-ils légal un stationnement interdit ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Ils ne modifient pas les règles d’arrêt et de stationnement.' },
    { visualId: 'M7_HORN_01', question: 'Peut-on klaxonner brièvement pour éviter un accident ?', options: ['Oui', 'Non'], correct: 0, explanation: 'C’est son usage principal autorisé.' },
  ], nextLessonLabel: 'Commencer le défi final →',
}
