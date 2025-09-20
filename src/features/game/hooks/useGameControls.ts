import { userInputAtom } from '@/features/prompt/atoms'
import { useLoadPrompt } from '@/features/prompt/hooks'
import { useGameTimerControls } from '@/features/timer/hooks'
import { useSetAtom } from 'jotai'

export function useGameControls() {
  const setUserInput = useSetAtom(userInputAtom)
  const loadPrompt = useLoadPrompt()
  const { resetTimer } = useGameTimerControls()

  const resetGame = () => {
    setUserInput('')
    loadPrompt()
    resetTimer()
  }

  return { resetGame }
}
