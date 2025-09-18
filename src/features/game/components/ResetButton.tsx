import type { ComponentProps } from 'react'
import { useGameControls } from '../hooks'
import { cn } from '@/util'

type GameResetButtonProps = ComponentProps<'button'> & {
  text?: string
}

export function GameResetButton({
  text = 'Reset',
  className,
  onClick,
  ...props
}: GameResetButtonProps) {
  const { resetGame } = useGameControls()

  return (
    <button
      className={cn('btn btn-soft', className)}
      onClick={(e) => {
        onClick?.(e)
        resetGame()
      }}
      {...props}
    >
      {text}
    </button>
  )
}
