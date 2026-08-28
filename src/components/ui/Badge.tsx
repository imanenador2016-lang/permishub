import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'
import type { Region } from '@/domain/region'

type Tone = 'brand' | 'neutral' | 'success' | 'warning' | 'danger' | Region

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone
  children: ReactNode
}

const TONE_STYLES: Record<Tone, string> = {
  brand: 'bg-yellow',
  neutral: 'bg-cream',
  success: 'bg-forest text-cream',
  warning: 'bg-yellow',
  danger: 'bg-brick text-cream',
  BE: 'bg-cream',
  WALLONIE: 'bg-region-wallonie text-cream',
  BRUXELLES: 'bg-region-bruxelles text-cream',
  FLANDRE: 'bg-region-flandre text-cream',
}

/** Pastille "panneau" — bordure noire, jamais de dégradé. Rotation légère façon étiquette collée (voir .eyebrow de la référence). */
export function Badge({ tone = 'neutral', className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 border-[3px] border-ink px-2.5 py-1 font-display text-xs uppercase tracking-wide text-ink',
        TONE_STYLES[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
