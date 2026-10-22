import type { LearningLesson } from './types'

export const LESSON_1: LearningLesson = {
  id: 'qui-commande-sur-la-route',
  moduleId: 'signalisation',
  title: 'Qui commande sur la route ?',
  description: 'Apprends quelle indication suivre quand plusieurs règles se contredisent.',
  xp: 20,
  steps: [
    { type: 'scenario', visualId: 'M1_AGENT_OVERRIDES_LIGHT_01', title: 'Qui dois-tu écouter en premier ?', body: "Sur la route, tu peux recevoir plusieurs indications : un agent, un feu, un panneau ou une règle de priorité. Elles n'ont pas toutes la même importance.", question: 'Ton feu est vert, mais un agent te demande de t’arrêter. Que fais-tu ?', options: ['Je passe, mon feu est vert', 'Je m’arrête'], correct: 1, explanation: "L'ordre de l'agent passe avant le feu." },
    { type: 'hierarchy', title: 'La hiérarchie à retenir', body: 'Plus tu montes dans cette liste, plus l’indication est prioritaire.', items: ['Agent qualifié', 'Feux de circulation', 'Panneaux de priorité', 'Priorité de droite'], memory: 'A → F → P → D' },
    { type: 'text', title: "L'agent passe avant le reste", body: "Lorsqu'un agent règle la circulation, ses injonctions passent avant les autres indications. Même si ton feu est vert, tu respectes l'ordre de l'agent.", callout: 'Piège d’examen : « Mais mon feu était vert ! » Ce raisonnement est faux si l’agent t’impose l’arrêt.' },
    { type: 'compare', title: 'Face ou dos : arrêt', body: 'Tu vois le torse ou le dos de l’agent ? Dans les deux cas, tu t’arrêtes.', items: [{ label: 'Face', result: 'ARRÊT' }, { label: 'Dos', result: 'ARRÊT' }] },
    { type: 'scenario', visualId: 'M1_AGENT_PROFILE_01', title: "Et s'il est de profil ?", body: 'Un agent de profil laisse la circulation passer dans les directions perpendiculaires à son torse.', question: "L'agent est de profil. Que fais-tu ?", options: ['Je m’arrête obligatoirement', 'Je peux avancer', 'Je fais demi-tour'], correct: 1, explanation: 'De profil, le passage est autorisé si rien d’autre ne l’interdit.' },
    { type: 'compare', title: 'Le bras levé', body: 'Le signal du bras levé concerne les usagers qui ne sont pas encore engagés.', items: [{ label: 'Voiture avant le carrefour', result: 'STOP' }, { label: 'Voiture déjà dans le carrefour', result: 'DÉGAGE LE CARREFOUR' }] },
    { type: 'scenario', visualId: 'M1_AGENT_OVERRIDES_LIGHT_01', title: 'Question piège', body: "Ton feu est vert. L'agent t’impose l’arrêt.", question: 'Que fais-tu ?', options: ['Je passe', 'Je ralentis', 'Je m’arrête'], correct: 2, explanation: 'Agent > Feu : tu respectes l’agent et tu t’arrêtes.' },
    { type: 'text', title: 'Véhicule prioritaire', body: 'Police, ambulance et pompiers avec avertisseur sonore spécial : cède le passage et, si nécessaire, arrête-toi pour les laisser passer.', callout: 'Ne bloque jamais leur trajectoire.' },
    { type: 'summary', title: 'À retenir', items: ['Agent avant tout', 'Feu avant panneau de priorité', 'Panneau de priorité avant priorité de droite', 'Face ou dos = arrêt', 'Profil = passage autorisé', 'Bras levé = arrêt ; si déjà engagé, dégage le carrefour'] },
  ],
  quiz: [
    { visualId: 'M1_AGENT_OVERRIDES_LIGHT_01', question: 'Feu vert + agent de dos. Que fais-tu ?', options: ['Je m’arrête', 'Je passe'], correct: 0, explanation: 'Le dos de l’agent impose l’arrêt.' },
    { visualId: 'M2_PRIORITY_ROAD_01', question: 'Pas d’agent, pas de feu, mais un panneau de priorité. Dois-tu appliquer directement la priorité de droite ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Le panneau de priorité est supérieur à la règle de droite.' },
    { visualId: 'M1_AGENT_PROFILE_01', question: 'Agent de profil.', options: ['Passage autorisé', 'Arrêt obligatoire'], correct: 0, explanation: 'De profil, il autorise le passage dans cette direction.' },
    { question: 'Tu es déjà au milieu du carrefour lorsque l’agent lève le bras.', options: ['Je m’arrête sur place', 'Je dégage le carrefour'], correct: 1, explanation: 'Un usager déjà engagé doit dégager le carrefour.' },
    { visualId: 'M1_AGENT_OVERRIDES_LIGHT_01', question: 'Feu vert + panneau de priorité + agent qui t’impose l’arrêt.', options: ['Je passe', 'Je respecte l’agent et je m’arrête'], correct: 1, explanation: 'Agent > Feu > Panneau.' },
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
export { LESSON_30 } from './lesson-30'
export { LESSON_31 } from './lesson-31'
export { LESSON_32 } from './lesson-32'
export { LESSON_33 } from './lesson-33'
export { LESSON_34 } from './lesson-34'
export { LESSON_35 } from './lesson-35'
export { LESSON_36 } from './lesson-36'
export { LESSON_37 } from './lesson-37'
export { LESSON_38 } from './lesson-38'
export { LESSON_39 } from './lesson-39'
export { LESSON_40 } from './lesson-40'
export { LESSON_41 } from './lesson-41'
export { LESSON_42 } from './lesson-42'
export { LESSON_43 } from './lesson-43'
export { LESSON_44 } from './lesson-44'
export { LESSON_45 } from './lesson-45'
export { LESSON_46 } from './lesson-46'
export { LESSON_47 } from './lesson-47'
export { LESSON_48 } from './lesson-48'
export { LESSON_49 } from './lesson-49'
export { LESSON_50 } from './lesson-50'
export { LESSON_51 } from './lesson-51'
export { LESSON_52 } from './lesson-52'
export { LESSON_53 } from './lesson-53'
export { LESSON_54 } from './lesson-54'
export { LESSON_55 } from './lesson-55'
export { LESSON_56 } from './lesson-56'
export { LESSON_57 } from './lesson-57'
export { LESSON_58 } from './lesson-58'
export { LESSON_59 } from './lesson-59'
export { LESSON_60 } from './lesson-60'
export { LESSON_61 } from './lesson-61'
export { LESSON_62 } from './lesson-62'
export { LESSON_63 } from './lesson-63'
export { LESSON_64 } from './lesson-64'
export { LESSON_65 } from './lesson-65'
export { LESSON_66 } from './lesson-66'
export { LESSON_67 } from './lesson-67'
export { LESSON_68 } from './lesson-68'
export { LESSON_69 } from './lesson-69'
export { LESSON_70 } from './lesson-70'
export { LESSON_71 } from './lesson-71'
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
import { LESSON_30 } from './lesson-30'
import { LESSON_31 } from './lesson-31'
import { LESSON_32 } from './lesson-32'
import { LESSON_33 } from './lesson-33'
import { LESSON_34 } from './lesson-34'
import { LESSON_35 } from './lesson-35'
import { LESSON_36 } from './lesson-36'
import { LESSON_37 } from './lesson-37'
import { LESSON_38 } from './lesson-38'
import { LESSON_39 } from './lesson-39'
import { LESSON_40 } from './lesson-40'
import { LESSON_41 } from './lesson-41'
import { LESSON_42 } from './lesson-42'
import { LESSON_43 } from './lesson-43'
import { LESSON_44 } from './lesson-44'
import { LESSON_45 } from './lesson-45'
import { LESSON_46 } from './lesson-46'
import { LESSON_47 } from './lesson-47'
import { LESSON_48 } from './lesson-48'
import { LESSON_49 } from './lesson-49'
import { LESSON_50 } from './lesson-50'
import { LESSON_51 } from './lesson-51'
import { LESSON_52 } from './lesson-52'
import { LESSON_53 } from './lesson-53'
import { LESSON_54 } from './lesson-54'
import { LESSON_55 } from './lesson-55'
import { LESSON_56 } from './lesson-56'
import { LESSON_57 } from './lesson-57'
import { LESSON_58 } from './lesson-58'
import { LESSON_59 } from './lesson-59'
import { LESSON_60 } from './lesson-60'
import { LESSON_61 } from './lesson-61'
import { LESSON_62 } from './lesson-62'
import { LESSON_63 } from './lesson-63'
import { LESSON_64 } from './lesson-64'
import { LESSON_65 } from './lesson-65'
import { LESSON_66 } from './lesson-66'
import { LESSON_67 } from './lesson-67'
import { LESSON_68 } from './lesson-68'
import { LESSON_69 } from './lesson-69'
import { LESSON_70 } from './lesson-70'
import { LESSON_71 } from './lesson-71'

export const LEARNING_LESSONS = [LESSON_1, LESSON_2, LESSON_3, LESSON_4, LESSON_5, LESSON_6, LESSON_7, LESSON_8, LESSON_9, LESSON_10, LESSON_11, LESSON_12, LESSON_13, LESSON_14, LESSON_15, LESSON_16, LESSON_17, LESSON_18, LESSON_19, LESSON_20, LESSON_21, LESSON_22, LESSON_23, LESSON_24, LESSON_25, LESSON_26, LESSON_27, LESSON_28, LESSON_29, LESSON_30, LESSON_31, LESSON_32, LESSON_33, LESSON_34, LESSON_35, LESSON_36, LESSON_37, LESSON_38, LESSON_39, LESSON_40, LESSON_41, LESSON_42, LESSON_43, LESSON_44, LESSON_45, LESSON_46, LESSON_47, LESSON_48, LESSON_49, LESSON_50, LESSON_51, LESSON_52, LESSON_53, LESSON_54, LESSON_55, LESSON_56, LESSON_57, LESSON_58, LESSON_59, LESSON_60, LESSON_61, LESSON_62, LESSON_63, LESSON_64, LESSON_65, LESSON_66, LESSON_67, LESSON_68, LESSON_69, LESSON_70, LESSON_71]


















