import { useAtomValue } from 'jotai'
import { isTimerFinishedAtom, isTimerRunningAtom, timerDurationAtom } from '../atoms'

export function useGameTimer() {
  const timerDuration = useAtomValue(timerDurationAtom)
  const isTimerRunning = useAtomValue(isTimerRunningAtom)
  const isTimerFinished = useAtomValue(isTimerFinishedAtom)

  return { timerDuration, isTimerRunning, isTimerFinished }
}
