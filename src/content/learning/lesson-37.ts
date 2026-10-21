import type { LearningLesson } from './types'

export const LESSON_37: LearningLesson = {
  id: 'alcool-limites-et-risques', moduleId: 'safety-behaviour', title: 'Alcool : limites & risques',
  description: 'Connaître les limites belges et comprendre pourquoi aucun verre ne garantit un taux précis.', xp: 20,
  steps: [
    { type: 'text', visualId: 'M6_SOBER_DRIVER_01', title: 'La seule valeur vraiment sûre', body: 'Le taux dépend notamment du poids, du sexe, du repas, de la vitesse de consommation et du temps écoulé. Compter les verres ne permet donc jamais de connaître précisément son taux.', callout: 'POUR CONDUIRE SANS RISQUE : ZÉRO ALCOOL.' },
    { type: 'scenario', visualId: 'M6_LIMIT_STANDARD_01', title: 'Limite générale en Belgique', body: 'Un conducteur non professionnel présente 0,22 mg/l d’air alvéolaire expiré.', question: 'Est-il en infraction ?', options: ['Oui', 'Non'], correct: 0, explanation: 'La conduite est punissable dès 0,22 mg/l, soit environ 0,5 ‰ dans le sang.' },
    { type: 'scenario', visualId: 'M6_LIMIT_PRO_01', title: 'Conducteur professionnel', body: 'Un chauffeur professionnel présente 0,10 mg/l d’air expiré.', question: 'Est-il au-dessus de sa limite spécifique ?', options: ['Oui', 'Non'], correct: 0, explanation: 'La limite professionnelle est plus basse : l’infraction commence à 0,09 mg/l.' },
    { type: 'compare', visualId: 'M6_LIMIT_PRO_01', title: 'Deux seuils à distinguer', body: 'La catégorie du conducteur peut modifier le seuil applicable.', items: [{ label: 'Conducteur ordinaire', result: 'Infraction dès 0,22 mg/l' }, { label: 'Conducteur professionnel', result: 'Infraction dès 0,09 mg/l' }] },
    { type: 'scenario', visualId: 'M6_SOBER_DRIVER_01', title: 'Le conducteur désigné', body: 'Une personne doit reprendre le volant après une soirée.', question: 'Quelle décision est la plus sûre ?', options: ['Boire lentement puis conduire', 'Ne pas boire d’alcool', 'Boire du café avant de partir'], correct: 1, explanation: 'Ni le café ni la vitesse de consommation ne garantissent un taux légal. Le choix sûr est de rester sobre.' },
    { type: 'scenario', visualId: 'M6_LIMIT_STANDARD_01', title: 'Jeune conducteur', body: 'La personne a obtenu son permis définitif récemment.', question: 'La limite générale de 0,22 mg/l devient-elle automatiquement plus élevée ou plus basse ?', options: ['Oui', 'Non'], correct: 1, explanation: 'La limite générale est la même pour un conducteur jeune ou inexpérimenté ; la prudence recommande néanmoins zéro alcool.' },
    { type: 'summary', title: 'À retenir', items: ['Limite générale : infraction dès 0,22 mg/l d’air expiré.', 'Conducteurs professionnels : seuil spécifique dès 0,09 mg/l.', 'Le nombre de verres ne permet pas de calculer sûrement son taux.', 'Le café, une douche ou un repas n’éliminent pas rapidement l’alcool.', 'La stratégie la plus sûre reste zéro alcool avant de conduire.'] },
  ],
  quiz: [
    { question: 'Un conducteur ordinaire est punissable à partir de…', options: ['0,09 mg/l', '0,22 mg/l', '0,50 mg/l'], correct: 1, explanation: 'Le seuil général est 0,22 mg/l d’air expiré.' },
    { question: 'La limite générale est-elle différente pour un jeune conducteur ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Le seuil général s’applique aussi aux conducteurs jeunes ou inexpérimentés.' },
    { question: 'Le café fait-il disparaître rapidement l’alcool ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Seul le temps permet à l’organisme d’éliminer l’alcool.' },
    { question: 'Peut-on déduire précisément son taux uniquement avec le nombre de verres ?', options: ['Oui', 'Non'], correct: 1, explanation: 'De nombreux facteurs individuels influencent le taux.' },
    { question: 'Quelle règle personnelle évite le mieux le risque ?', options: ['Zéro alcool si je conduis', 'Deux verres maximum pour tous'], correct: 0, explanation: 'Zéro alcool supprime l’incertitude liée au taux.' },
  ], nextLessonLabel: 'Suivant : contrôle S, A ou P →',
}
