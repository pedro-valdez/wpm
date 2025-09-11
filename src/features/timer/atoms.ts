import { atom } from 'jotai'

export const elapsedTimeAtom = atom(0)
export const timerDurationAtom = atom(10_000)
export const isTimerRunningAtom = atom(false)
export const isTimerFinishedAtom = atom(false)
