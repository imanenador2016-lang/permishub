import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

export function Container({ children, className, ...props }: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div className={cn('mx-auto w-full max-w-6xl px-5 sm:px-8', className)} {...props}>
      {children}
    </div>
  )
}
