import { cn } from '@/util'
import type { ComponentProps } from 'react'

type ThemeInputProps = {
  value: string
} & Omit<ComponentProps<'input'>, 'type' | 'name' | 'aria-label' | 'value'>

export function ThemeInput({ value, className, ...props }: ThemeInputProps) {
  return (
    <input
      type="radio"
      name="theme-dropdown"
      className={cn(
        'theme-controller btn btn-sm btn-block btn-ghost justify-start capitalize',
        className
      )}
      aria-label={value}
      value={value}
      {...props}
    />
  )
}
