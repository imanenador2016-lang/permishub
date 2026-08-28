import type { Theme } from '@/domain/content'

export const VEHICULE_TECHNIQUE_THEME: Theme = {
  slug: 'vehicule-technique',
  title: { fr: 'Véhicule, charge et technique', nl: 'Voertuig, lading en techniek' },
  description: {
    fr: "Masse autorisée, chargement, pneus, freins, consommation : ce qu'il faut savoir sur ta voiture elle-même, pas seulement sur la route.",
    nl: 'Toegelaten massa, lading, banden, remmen, verbruik: wat u moet weten over uw auto zelf, niet enkel over de weg.',
  },
  icon: 'Wrench',
  order: 5,
  regionalVariants: ['WALLONIE', 'FLANDRE'],
}
