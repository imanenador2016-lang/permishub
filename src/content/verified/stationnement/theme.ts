import type { Theme } from '@/domain/content'

export const STATIONNEMENT_THEME: Theme = {
  slug: 'stationnement',
  title: { fr: 'Arrêt et stationnement', nl: 'Stilstaan en parkeren' },
  description: {
    fr: "Où t'arrêter, où stationner, où c'est carrément interdit : les distances et les cas à connaître par cœur.",
    nl: 'Waar u mag stilstaan, waar parkeren, waar het gewoon verboden is: de afstanden en gevallen die u uit het hoofd moet kennen.',
  },
  icon: 'ParkingCircle',
  order: 4,
  regionalVariants: [],
}
