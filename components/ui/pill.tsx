import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import React from 'react'

interface PillProps {
  label: string
  onRemove: () => void
  className?: string
}

export function Pill({ label, onRemove, className }: PillProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center bg-primary text-primary-foreground rounded-full px-3 py-1 text-sm font-medium',
        className,
      )}
    >
      <span>{label}</span>
      <Button
        variant="ghost"
        size="icon"
        className="ml-1 h-5 w-5 rounded-full hover:bg-primary-foreground hover:text-primary"
        onClick={onRemove}
        aria-label={`Remove ${label}`}
      >
        <X className="h-3 w-3" />
      </Button>
    </div>
  )
}
