import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  children: ReactNode
}

const VARIANT_STYLES: Record<Variant, string> = {
  primary: 'btn-comic',
  secondary:
    'inline-flex items-center justify-center gap-2 border-[3px] border-ink bg-cream font-display text-ink shadow-hard-xs transition-all duration-150 ease-out hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-sm active:translate-x-0 active:translate-y-0 active:shadow-none sm:border-4 sm:shadow-hard-sm sm:hover:shadow-hard',
  ghost: 'inline-flex items-center justify-center gap-2 font-display text-ink underline decoration-2 underline-offset-4 hover:text-brick',
}

const SIZE_STYLES: Record<Size, string> = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-4 text-base sm:text-lg',
}

export function Button({ variant = 'primary', size = 'md', className, children, ...props }: ButtonProps) {
  const isGhost = variant === 'ghost'
  return (
    <button
      className={cn(VARIANT_STYLES[variant], !isGhost && SIZE_STYLES[size], 'disabled:cursor-not-allowed disabled:opacity-60', className)}
      {...props}
    >
      {children}
    </button>
  )
}
