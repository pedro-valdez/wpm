import { useAtomValue } from 'jotai'
import { elapsedTimeAtom, isTimerFinishedAtom, isTimerRunningAtom } from '../atoms'

export function useGameTimer() {
  const elapsedTime = useAtomValue(elapsedTimeAtom)
  const isTimerRunning = useAtomValue(isTimerRunningAtom)
  const isTimerFinished = useAtomValue(isTimerFinishedAtom)

  return { elapsedTime, isTimerRunning, isTimerFinished }
}
