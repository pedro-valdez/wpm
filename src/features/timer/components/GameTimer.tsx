import type { ComponentProps } from 'react'
import { useGameTimer } from '../hooks'
import { cn } from '@/util'
import { TimerDurationDropdown } from './TimerDurationDropdown'

type GameTimerProps = Omit<ComponentProps<'div'>, 'role' | 'style'>

export function GameTimer({ className, ...props }: GameTimerProps) {
  const { elapsedTime, timerDuration } = useGameTimer()

  return (
    <TimerDurationDropdown className="dropdown-end">
      <div
        className={cn(
          'radial-progress [--size:2rem] sm:[--size:2.5rem]',
          'lg:[--size:3rem] xl:[--size:3.5rem] 2xl:[--size:4rem]',
          className
        )}
        style={
          {
            '--value': (elapsedTime / timerDuration) * 100,
          } as React.CSSProperties
        }
        role="progressbar"
        {...props}
      >
        {Math.floor((timerDuration - elapsedTime) / 1000)}
      </div>
    </TimerDurationDropdown>
  )
}
