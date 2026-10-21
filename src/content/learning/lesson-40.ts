import type { LearningLesson } from './types'

export const LESSON_40: LearningLesson = {
  id: 'drogues-medicaments-et-conduite', moduleId: 'safety-behaviour', title: 'Drogues, médicaments & conduite',
  description: 'Reconnaître les situations où la capacité de conduire est altérée.', xp: 20,
  steps: [
    { type: 'scenario', visualId: 'M6_DRUG_TEST_01', title: 'Test salivaire', body: 'La police relève des signes objectifs faisant soupçonner une consommation de stupéfiants.', question: 'Peut-elle effectuer un test salivaire ?', options: ['Oui', 'Non'], correct: 0, explanation: 'La procédure peut être déclenchée sur la base d’indices objectifs prévus par la réglementation.' },
    { type: 'scenario', visualId: 'M6_DRUG_POSITIVE_01', title: 'Résultat positif', body: 'Le test salivaire est positif.', question: 'Le conducteur peut-il reprendre immédiatement la route ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Une interdiction de conduire s’applique, notamment pendant 12 heures dans la procédure de rétention.' },
    { type: 'text', visualId: 'M6_MEDICINE_WARNING_01', title: 'Médicaments', body: 'Certains médicaments diminuent la vigilance, ralentissent les réactions ou provoquent de la somnolence. Lis la notice et demande conseil au médecin ou au pharmacien.', callout: 'UN MÉDICAMENT LÉGAL PEUT AUSSI RENDRE LA CONDUITE DANGEREUSE.' },
    { type: 'scenario', visualId: 'M6_MEDICINE_WARNING_01', title: 'Pictogramme ou avertissement', body: 'La notice annonce une somnolence importante et déconseille de conduire.', question: 'Que dois-tu faire ?', options: ['Conduire plus lentement', 'Ne pas conduire et demander conseil', 'Boire du café'], correct: 1, explanation: 'Une vitesse réduite ou du café ne compensent pas une vigilance altérée.' },
    { type: 'compare', visualId: 'M6_REACTION_TIME_01', title: 'Temps de réaction', body: 'Les substances augmentent la distance parcourue avant même le début du freinage.', items: [{ label: 'Conducteur attentif', result: 'Réaction plus rapide' }, { label: 'Sous influence', result: 'Réaction retardée et risque accru' }] },
    { type: 'scenario', visualId: 'M6_MEDICINE_WARNING_01', title: 'Mélanger les substances', body: 'La notice précise que l’alcool renforce l’effet sédatif du médicament.', question: 'Le mélange peut-il encore augmenter le danger ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Les effets peuvent se renforcer et rendre la conduite encore plus dangereuse.' },
    { type: 'summary', title: 'À retenir', items: ['Les stupéfiants altèrent la perception, la décision et les réactions.', 'Un test salivaire peut être imposé sur la base d’indices objectifs.', 'Un résultat positif interdit de reprendre immédiatement la route.', 'Certains médicaments rendent aussi la conduite dangereuse.', 'En cas de doute, ne conduis pas et demande un avis professionnel.'] },
  ],
  quiz: [
    { question: 'Un test salivaire peut-il suivre des indices objectifs de consommation ?', options: ['Oui', 'Non'], correct: 0, explanation: 'C’est un déclencheur prévu de la procédure.' },
    { question: 'Après un test positif, peut-on reprendre immédiatement le volant ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Une interdiction de conduire s’applique.' },
    { question: 'Un médicament prescrit est-il toujours compatible avec la conduite ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Certains médicaments altèrent fortement la vigilance.' },
    { question: 'Le café neutralise-t-il les effets d’un stupéfiant ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Il ne restaure pas la capacité de conduire.' },
    { question: 'Que faire si la notice déconseille la conduite ?', options: ['Ne pas conduire', 'Conduire seulement en ville'], correct: 0, explanation: 'La recommandation doit être respectée.' },
  ], nextLessonLabel: 'Suivant : sécuriser un accident →',
}
