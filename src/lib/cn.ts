import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combine des classes Tailwind en résolvant les conflits (ex. un `bg-*`
 * passé en `className` doit gagner sur le `bg-*` par défaut d'un
 * composant). `clsx` seul ne le garantit pas : deux utilitaires
 * concurrents ont la même spécificité CSS, donc c'est l'ordre dans la
 * feuille de style générée — pas l'ordre dans la chaîne de classes — qui
 * l'emporte. `twMerge` corrige ça en ne gardant que la dernière classe
 * d'un même groupe (couleur de fond, padding, etc).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
