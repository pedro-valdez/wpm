import { useAtomValue } from 'jotai'
import {
  elapsedTimeAtom,
  isTimerFinishedAtom,
  isTimerRunningAtom,
  timerDurationAtom,
} from '../atoms'

export function useGameTimer() {
  const elapsedTime = useAtomValue(elapsedTimeAtom)
  const timerDuration = useAtomValue(timerDurationAtom)
  const isTimerRunning = useAtomValue(isTimerRunningAtom)
  const isTimerFinished = useAtomValue(isTimerFinishedAtom)

  return { elapsedTime, timerDuration, isTimerRunning, isTimerFinished }
}
