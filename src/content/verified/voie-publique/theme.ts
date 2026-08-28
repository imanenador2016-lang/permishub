import type { Theme } from '@/domain/content'

export const VOIE_PUBLIQUE_THEME: Theme = {
  slug: 'voie-publique',
  title: { fr: 'La voie publique et la chaussée', nl: 'De openbare weg en de rijbaan' },
  description: {
    fr: 'Voie publique, terrains public/non-public, chaussée, chaussée à voie centrale : les bases avant tout le reste.',
    nl: 'Openbare weg, openbaar/niet-openbaar terrein, rijbaan, rijbaan met middenbaan: de basis vóór al de rest.',
  },
  icon: 'Route',
  order: 1,
  regionalVariants: ['WALLONIE', 'BRUXELLES', 'FLANDRE'],
}
