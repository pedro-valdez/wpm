import { UserInput } from '@/features/prompt/components/UserInput'
import { useGameTimer, useGameTimerControls } from '@/features/timer/hooks'
import type { ComponentProps } from 'react'

type GameUserInputProps = Omit<ComponentProps<typeof UserInput>, 'onChange' | 'disabled'>

export function GameUserInput(props: GameUserInputProps) {
  const { startTimer } = useGameTimerControls()
  const { isTimerRunning, isTimerFinished } = useGameTimer()

  return (
    <UserInput
      onChange={() => {
        if (!isTimerRunning) {
          startTimer()
        }
      }}
      disabled={isTimerFinished}
      {...props}
    />
  )
}
