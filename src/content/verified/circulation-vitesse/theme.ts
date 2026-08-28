import type { Theme } from '@/domain/content'

export const CIRCULATION_VITESSE_THEME: Theme = {
  slug: 'circulation-vitesse',
  title: { fr: 'Circulation, vitesse et dépassement', nl: 'Verkeer, snelheid en inhalen' },
  description: {
    fr: 'Autoroute, route pour automobiles, distance de sécurité, croisement, dépassement, manœuvres : tout ce qui fait rouler vite en toute sécurité.',
    nl: 'Snelweg, autoweg, veiligheidsafstand, kruisen, inhalen, manoeuvres: alles om snel én veilig te rijden.',
  },
  icon: 'Gauge',
  order: 2,
  regionalVariants: ['WALLONIE', 'BRUXELLES', 'FLANDRE'],
}
