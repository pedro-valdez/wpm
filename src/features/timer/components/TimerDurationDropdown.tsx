import type { ComponentProps, ReactNode } from 'react'
import { useGameTimer, useGameTimerControls } from '../hooks'
import { cn } from '@/util'

type TimerDurationDropdownProps = {
  children?: ReactNode
} & ComponentProps<'div'>

const TIMER_DURATIONS = [10_000, 30_000, 60_000, 120_000, 180_000, 300_000]

export function TimerDurationDropdown({
  children,
  className,
  ...props
}: TimerDurationDropdownProps) {
  const { isTimerRunning } = useGameTimer()
  const { setTimerDuration } = useGameTimerControls()

  return (
    <div className={cn('dropdown hover:cursor-pointer', className)} {...props}>
      <div tabIndex={0} role="button" className="mb-2">
        {children}
      </div>

      <ul className="dropdown-content menu bg-base-300 rounded-box">
        {TIMER_DURATIONS.map((duration) => (
          <li key={duration}>
            <input
              type="radio"
              name="timer-duration"
              className="btn btn-block btn-ghost justify-start"
              aria-label={duration.toString()}
              value={duration}
              onClick={() => setTimerDuration(duration)}
              disabled={isTimerRunning}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
