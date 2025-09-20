import { cn } from '@/util'
import type { ComponentProps } from 'react'

type ThemeColorProps = ComponentProps<'span'>

export function ThemeColor({ className, ...props }: ThemeColorProps) {
  return (
    <span
      className={cn('inline-block aspect-square w-[1ch] rounded-full', className)}
      {...props}
    ></span>
  )
}
