import type { LocalizedText } from '@/domain/content'

export interface ClientReview {
  name: string
  stars: number
  quote: LocalizedText
}

/**
 * Avis clients fournis par l'utilisateur (conversation du 2026-08-31,
 * collés à la main — pas de widget Trustpilot officiel connecté, l'accès
 * au compte n'a pas été donné). Corrections légères d'orthographe/accents
 * uniquement, jamais le sens ou les résultats annoncés — voir
 * ReviewsPanel.tsx pour l'affichage. `stars` non précisé pour Alexandra
 * dans le texte fourni : mis à 5 par cohérence avec le ton du témoignage,
 * à corriger si ce n'est pas exact.
 */
export const CLIENT_REVIEWS: ClientReview[] = [
  {
    name: 'Alexis',
    stars: 5,
    quote: {
      fr: "Examen pratique réussi grâce à PermisHub, j'ai eu le même parcours, circuit 3 sur Anderlecht. Je recommande.",
      nl: 'Praktijkexamen geslaagd dankzij PermisHub, ik kreeg exact hetzelfde parcours, circuit 3 in Anderlecht. Een aanrader.',
    },
  },
  {
    name: 'Mounia',
    stars: 5,
    quote: {
      fr: "J'ai pris le résumé de PermisHub, ça vaut vraiment le coup, réussite 45/50.",
      nl: 'Ik nam de samenvatting van PermisHub, echt de moeite waard, geslaagd met 45/50.',
    },
  },
  {
    name: 'Alexandra',
    stars: 5,
    quote: {
      fr: "Après 4 échecs à l'examen théorique, j'ai enfin réussi en m'entraînant sur le site.",
      nl: 'Na 4 mislukte pogingen voor het theorie-examen ben ik eindelijk geslaagd door te oefenen op de site.',
    },
  },
  {
    name: 'Badr',
    stars: 5,
    quote: {
      fr: "Aujourd'hui j'ai réussi mon permis pratique grâce aux circuits de PermisHub, un grand merci à toute l'équipe. Je me suis entraîné 1 mois sur leurs circuits pour 9 €, c'est vraiment donné.",
      nl: 'Vandaag ben ik geslaagd voor mijn praktijkexamen dankzij de circuits van PermisHub, een grote dank aan het hele team. Ik oefende een maand lang op hun circuits voor 9 €, echt een koopje.',
    },
  },
]
