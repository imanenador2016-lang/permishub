export const LEARNING_SUBSCRIPTION = {
  id: 'learning-weekly',
  priceCents: 799,
  currency: 'eur',
  interval: 'week' as const,
  name: 'Formation théorique PermisHub',
}

export const FREE_LEARNING_SLUGS = new Set([
  'qui-commande-sur-la-route',
  'les-feux-de-circulation',
  'feux-particuliers-et-fleches',
  'comprendre-les-panneaux',
  'les-panneaux-de-danger',
  'interdictions-et-obligations',
  'les-panneaux-d-indication',
  'les-marquages-au-sol',
  'defi-final',
])

export function isFreeLearningPath(pathname: string) {
  const match = pathname.match(/^\/(?:fr|nl)\/apprendre\/([^/?#]+)/)
  return !match || FREE_LEARNING_SLUGS.has(match[1])
}
