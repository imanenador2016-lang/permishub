import type { Theme } from '@/domain/content'

export const SIGNALISATION_PRIORITES_THEME: Theme = {
  slug: 'signalisation-priorites',
  title: { fr: 'Signalisation et priorités', nl: 'Signalisatie en voorrang' },
  description: {
    fr: 'Feux, klaxon, signaux lumineux, priorité de droite, sens interdits, direction obligatoire : le langage des panneaux et des carrefours.',
    nl: 'Lichten, claxon, verkeerslichten, voorrang van rechts, verboden richtingen, verplichte rijrichting: de taal van borden en kruispunten.',
  },
  icon: 'TriangleAlert',
  order: 3,
  regionalVariants: [],
}
