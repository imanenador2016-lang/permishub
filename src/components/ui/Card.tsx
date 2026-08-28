import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  interactive?: boolean
}

export function Card({ children, interactive, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'panel p-5 sm:p-6',
        interactive &&
          'transition-all duration-150 ease-out hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-sm sm:hover:shadow-hard-hover',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
