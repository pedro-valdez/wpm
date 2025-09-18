import { useAtom, useSetAtom } from 'jotai'
import { createRef, useCallback, useEffect } from 'react'
import {
  elapsedTimeAtom,
  isTimerFinishedAtom,
  isTimerRunningAtom,
  timerDurationAtom,
} from '../atoms'

const startTimeRef = createRef<number | null>()
const intervalRef = createRef<ReturnType<typeof setInterval> | null>()

export function useGameTimerControls() {
  const [elapsedTime, setElapsedTime] = useAtom(elapsedTimeAtom)
  const [isTimerRunning, setIsTimerRunning] = useAtom(isTimerRunningAtom)
  const setIsTimerFinished = useSetAtom(isTimerFinishedAtom)
  const [timerDuration, setTimerDuration] = useAtom(timerDurationAtom)

  const delay = 16

  const stopTimer = useCallback(() => {
    setIsTimerRunning(false)
    setIsTimerFinished(true)

    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    if (startTimeRef.current !== null) {
      startTimeRef.current = null
    }
  }, [setIsTimerFinished, setIsTimerRunning])

  const startTimer = useCallback(() => {
    if (isTimerRunning || elapsedTime !== 0) return

    setIsTimerRunning(true)
    startTimeRef.current = performance.now()

    intervalRef.current = setInterval(() => {
      if (startTimeRef.current !== null) {
        const elapsed = performance.now() - startTimeRef.current

        if (elapsed >= timerDuration) {
          setElapsedTime(timerDuration)
          stopTimer()
        } else {
          setElapsedTime(elapsed)
        }
      }
    }, delay)
  }, [isTimerRunning, elapsedTime, timerDuration, setElapsedTime, setIsTimerRunning, stopTimer])

  const resetTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    startTimeRef.current = null
    setElapsedTime(0)
    setIsTimerRunning(false)
    setIsTimerFinished(false)
  }, [setElapsedTime, setIsTimerRunning, setIsTimerFinished])

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  return { startTimer, stopTimer, resetTimer, setTimerDuration }
}
