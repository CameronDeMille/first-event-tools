import { cn } from '@/lib/utils'
import * as React from 'react'

const TeamButton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('relative inline-block', className)}
    {...props}
  />
))
TeamButton.displayName = 'TeamButton'

const TeamButtonImage = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement>
>(({ className, alt, children, ...props }, ref) => (
  <>
    <img
      className={cn('block w-full h-auto', className)}
      ref={ref}
      alt={alt}
      {...props}
    />
    <svg className="absolute top-0 left-0">
      <path id="path0" d="M 77 77 A 96 96 0 0 1 211 77" fill="none" />
      <text
        className="text-[0.4in] font-bold tracking-[-2px] font-arial"
        style={{ textAnchor: 'middle' }}
      >
        <textPath id="text0" href="#path0" startOffset="50%">
          {children}
        </textPath>
      </text>
    </svg>
  </>
))
TeamButtonImage.displayName = 'TeamButton'

export { TeamButton, TeamButtonImage }
