import { UserInput } from '@/features/prompt/components/UserInput'
import { useGameTimer, useGameTimerControls } from '@/features/timer/hooks'

export function GameUserInput() {
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
    />
  )
}
