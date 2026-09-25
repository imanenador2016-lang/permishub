import type { LearningLesson } from './types'

export const LESSON_1: LearningLesson = {
  id: 'qui-commande-sur-la-route',
  moduleId: 'signalisation',
  title: 'Qui commande sur la route ?',
  description: 'Apprends quelle indication suivre quand plusieurs règles se contredisent.',
  xp: 20,
  steps: [
    { type: 'scenario', title: 'Qui dois-tu écouter en premier ?', body: "Sur la route, tu peux recevoir plusieurs indications : un agent, un feu, un panneau ou une règle de priorité. Elles n'ont pas toutes la même importance.", question: 'Ton feu est vert, mais un agent te demande de t’arrêter. Que fais-tu ?', options: ['Je passe, mon feu est vert', 'Je m’arrête'], correct: 1, explanation: "L'ordre de l'agent passe avant le feu." },
    { type: 'hierarchy', title: 'La hiérarchie à retenir', body: 'Plus tu montes dans cette liste, plus l’indication est prioritaire.', items: ['Agent qualifié', 'Feux de circulation', 'Panneaux de priorité', 'Priorité de droite'], memory: 'A → F → P → D' },
    { type: 'text', title: "L'agent passe avant le reste", body: "Lorsqu'un agent règle la circulation, ses injonctions passent avant les autres indications. Même si ton feu est vert, tu respectes l'ordre de l'agent.", callout: 'Piège d’examen : « Mais mon feu était vert ! » Ce raisonnement est faux si l’agent t’impose l’arrêt.' },
    { type: 'compare', title: 'Face ou dos : arrêt', body: 'Tu vois le torse ou le dos de l’agent ? Dans les deux cas, tu t’arrêtes.', items: [{ label: 'Face', result: 'ARRÊT' }, { label: 'Dos', result: 'ARRÊT' }] },
    { type: 'scenario', title: "Et s'il est de profil ?", body: 'Un agent de profil laisse la circulation passer dans les directions perpendiculaires à son torse.', question: "L'agent est de profil. Que fais-tu ?", options: ['Je m’arrête obligatoirement', 'Je peux avancer', 'Je fais demi-tour'], correct: 1, explanation: 'De profil, le passage est autorisé si rien d’autre ne l’interdit.' },
    { type: 'compare', title: 'Le bras levé', body: 'Le signal du bras levé concerne les usagers qui ne sont pas encore engagés.', items: [{ label: 'Voiture avant le carrefour', result: 'STOP' }, { label: 'Voiture déjà dans le carrefour', result: 'DÉGAGE LE CARREFOUR' }] },
    { type: 'scenario', title: 'Question piège', body: "Ton feu est vert. L'agent est face à toi.", question: 'Que fais-tu ?', options: ['Je passe', 'Je ralentis', 'Je m’arrête'], correct: 2, explanation: 'Agent > Feu : tu respectes l’agent et tu t’arrêtes.' },
    { type: 'text', title: 'Véhicule prioritaire', body: 'Police, ambulance et pompiers avec avertisseur sonore spécial : cède le passage et, si nécessaire, arrête-toi pour les laisser passer.', callout: 'Ne bloque jamais leur trajectoire.' },
    { type: 'summary', title: 'À retenir', items: ['Agent avant tout', 'Feu avant panneau de priorité', 'Panneau de priorité avant priorité de droite', 'Face ou dos = arrêt', 'Profil = passage autorisé', 'Bras levé = arrêt ; si déjà engagé, dégage le carrefour'] },
  ],
  quiz: [
    { question: 'Feu vert + agent de dos. Que fais-tu ?', options: ['Je m’arrête', 'Je passe'], correct: 0, explanation: 'Le dos de l’agent impose l’arrêt.' },
    { question: 'Pas d’agent, pas de feu, mais un panneau de priorité. Dois-tu appliquer directement la priorité de droite ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Le panneau de priorité est supérieur à la règle de droite.' },
    { question: 'Agent de profil.', options: ['Passage autorisé', 'Arrêt obligatoire'], correct: 0, explanation: 'De profil, il autorise le passage dans cette direction.' },
    { question: 'Tu es déjà au milieu du carrefour lorsque l’agent lève le bras.', options: ['Je m’arrête sur place', 'Je dégage le carrefour'], correct: 1, explanation: 'Un usager déjà engagé doit dégager le carrefour.' },
    { question: 'Feu vert + panneau de priorité + agent face à toi.', options: ['Je passe', 'Je respecte l’agent et je m’arrête'], correct: 1, explanation: 'Agent > Feu > Panneau.' },
  ],
}

export { LESSON_2 } from './lesson-2'
export { LESSON_3 } from './lesson-3'
export { LESSON_4 } from './lesson-4'
export { LESSON_5 } from './lesson-5'
export { LESSON_6 } from './lesson-6'
export { LESSON_7 } from './lesson-7'
export { LESSON_8 } from './lesson-8'
export { LESSON_9 } from './lesson-9'
export { LESSON_10 } from './lesson-10'
export { LESSON_11 } from './lesson-11'
export { LESSON_12 } from './lesson-12'
export { LESSON_13 } from './lesson-13'
export { LESSON_14 } from './lesson-14'
export { LESSON_15 } from './lesson-15'
export { LESSON_16 } from './lesson-16'
export { LESSON_17 } from './lesson-17'
export { LESSON_18 } from './lesson-18'
export { LESSON_19 } from './lesson-19'
export { LESSON_20 } from './lesson-20'
export { LESSON_21 } from './lesson-21'
export { LESSON_22 } from './lesson-22'
export { LESSON_23 } from './lesson-23'
export { LESSON_24 } from './lesson-24'
export { LESSON_25 } from './lesson-25'
export { LESSON_26 } from './lesson-26'
export { LESSON_27 } from './lesson-27'
export { LESSON_28 } from './lesson-28'
export { LESSON_29 } from './lesson-29'
import { LESSON_2 } from './lesson-2'
import { LESSON_3 } from './lesson-3'
import { LESSON_4 } from './lesson-4'
import { LESSON_5 } from './lesson-5'
import { LESSON_6 } from './lesson-6'
import { LESSON_7 } from './lesson-7'
import { LESSON_8 } from './lesson-8'
import { LESSON_9 } from './lesson-9'
import { LESSON_10 } from './lesson-10'
import { LESSON_11 } from './lesson-11'
import { LESSON_12 } from './lesson-12'
import { LESSON_13 } from './lesson-13'
import { LESSON_14 } from './lesson-14'
import { LESSON_15 } from './lesson-15'
import { LESSON_16 } from './lesson-16'
import { LESSON_17 } from './lesson-17'
import { LESSON_18 } from './lesson-18'
import { LESSON_19 } from './lesson-19'
import { LESSON_20 } from './lesson-20'
import { LESSON_21 } from './lesson-21'
import { LESSON_22 } from './lesson-22'
import { LESSON_23 } from './lesson-23'
import { LESSON_24 } from './lesson-24'
import { LESSON_25 } from './lesson-25'
import { LESSON_26 } from './lesson-26'
import { LESSON_27 } from './lesson-27'
import { LESSON_28 } from './lesson-28'
import { LESSON_29 } from './lesson-29'

export const LEARNING_LESSONS = [LESSON_1, LESSON_2, LESSON_3, LESSON_4, LESSON_5, LESSON_6, LESSON_7, LESSON_8, LESSON_9, LESSON_10, LESSON_11, LESSON_12, LESSON_13, LESSON_14, LESSON_15, LESSON_16, LESSON_17, LESSON_18, LESSON_19, LESSON_20, LESSON_21, LESSON_22, LESSON_23, LESSON_24, LESSON_25, LESSON_26, LESSON_27, LESSON_28, LESSON_29]


















