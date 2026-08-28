/**
 * Régions belges gérées par PermisHub.
 *
 * Certaines règles du code de la route diffèrent selon la région
 * (ex. vitesse max hors agglomération : 90 km/h en Wallonie contre 70 km/h
 * à Bruxelles et en Flandre). Le contenu doit donc pouvoir être décliné
 * par région plutôt que traité comme uniforme au niveau belge.
 *
 * `BE` représente les règles fédérales, valables partout, quand il n'y a
 * pas de divergence régionale.
 */
export const REGIONS = ['BE', 'WALLONIE', 'BRUXELLES', 'FLANDRE'] as const

export type Region = (typeof REGIONS)[number]

export const REGION_LABELS: Record<Region, { fr: string; nl: string }> = {
  BE: { fr: 'Belgique (règle fédérale)', nl: 'België (federale regel)' },
  WALLONIE: { fr: 'Wallonie', nl: 'Wallonië' },
  BRUXELLES: { fr: 'Bruxelles', nl: 'Brussel' },
  FLANDRE: { fr: 'Flandre', nl: 'Vlaanderen' },
}

export function isRegion(value: string): value is Region {
  return (REGIONS as readonly string[]).includes(value)
}
