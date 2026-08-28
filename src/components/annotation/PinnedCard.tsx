import type { CSSProperties, ReactNode } from 'react'
import { cn } from '@/lib/cn'

/**
 * Technique d'annotation — élément signature du système "ligne claire" (voir
 * reference-design-hero.html) : une carte de contenu "punaisée" sur une
 * illustration par une punaise + une flèche pointue, plutôt que juxtaposée
 * sans lien. À réutiliser partout où une illustration accompagne une
 * question ou un contenu pédagogique (cours, examens blancs).
 *
 * S'utilise en enfant absolument positionné d'un conteneur `relative`
 * (typiquement le panneau qui contient l'illustration SVG/`next/image`).
 */
export function PinnedCard({
  children,
  style,
  className,
}: {
  children: ReactNode
  style?: CSSProperties
  className?: string
}) {
  return (
    <div className={cn('panel absolute z-[3] w-[220px] !p-3.5', className)} style={style}>
      <span className="annotation-pin" aria-hidden />
      {children}
      <span className="annotation-tail" aria-hidden />
    </div>
  )
}

/** Cercle pointillé brick qui marque l'élément annoté dans l'illustration — à poser en overlay SVG/absolute au-dessus du point concerné. */
export function AnnotationRing({ style, size = 84 }: { style?: CSSProperties; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 84 84"
      className="pointer-events-none absolute z-[2]"
      style={style}
      aria-hidden
    >
      <circle cx="42" cy="42" r="40" className="annotation-ring" />
    </svg>
  )
}
