import { useAtom } from 'jotai'
import { userInputAtom } from '../atoms'
import { useGameTimer, useGameTimerControls } from '@/features/timer/hooks'

export function UserInput() {
  const [userInput, setUserInput] = useAtom(userInputAtom)
  const { isTimerRunning, isTimerFinished } = useGameTimer()
  const { startTimer } = useGameTimerControls()

  return (
    <input
      type="text"
      value={userInput}
      onChange={(e) => {
        if (!isTimerRunning) {
          startTimer()
        }
        setUserInput(e.target.value)
      }}
      disabled={isTimerFinished}
    />
  )
}
