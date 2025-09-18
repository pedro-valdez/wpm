import { cn } from '@/util'
import type { ComponentProps } from 'react'

type ToggleProps = {
  labelText: string
} & ComponentProps<'input'>

export function Toggle({ labelText, className, ...props }: ToggleProps) {
  return (
    <label className={cn('label space-x-1', className)}>
      <span>{labelText}</span>
      <input type="checkbox" className="toggle" {...props} />
    </label>
  )
}
