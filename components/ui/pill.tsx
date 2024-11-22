'use client'

import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { X } from 'lucide-react'
import * as React from 'react'

const pillVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        destructive: 'bg-destructive text-destructive-foreground',
        outline: 'border border-input hover:bg-accent',
        ghost: 'hover:bg-accent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface PillProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pillVariants> {
  onRemove?: () => void
}

const Pill = React.forwardRef<HTMLDivElement, PillProps>(
  ({ className, variant, onRemove, children, ...props }, ref) => {
    const handleRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation()
      onRemove?.()
    }

    return (
      <div
        ref={ref}
        className={cn(pillVariants({ variant }), className)}
        role="listitem"
        {...props}
      >
        <span className="truncate">{children}</span>
        {onRemove && (
          <button
            type="button"
            className="inline-flex h-auto -mr-1.5 rounded-full p-0.5 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            onClick={handleRemove}
            aria-label="Remove"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    )
  },
)
Pill.displayName = 'Pill'

export { Pill, pillVariants }
