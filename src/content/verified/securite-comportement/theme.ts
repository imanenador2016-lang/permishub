import type { Theme } from '@/domain/content'

export const SECURITE_COMPORTEMENT_THEME: Theme = {
  slug: 'securite-comportement',
  title: { fr: 'Sécurité, comportement et accidents', nl: 'Veiligheid, gedrag en ongevallen' },
  description: {
    fr: "Alcool, drogues, réflexes en cas d'accident : les règles qui protègent des vies, pas juste des points sur un permis.",
    nl: 'Alcohol, drugs, reflexen bij een ongeval: de regels die levens beschermen, niet enkel punten op een rijbewijs.',
  },
  icon: 'ShieldAlert',
  order: 6,
  regionalVariants: [],
}
