import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const elapsedTimeAtom = atom(0)
export const timerDurationAtom = atomWithStorage('timerDuration', 60_000, undefined, {
  getOnInit: true,
})
export const isTimerRunningAtom = atom(false)
export const isTimerFinishedAtom = atom(false)
