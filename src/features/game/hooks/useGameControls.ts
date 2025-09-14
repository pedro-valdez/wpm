import { promptAtom, userInputAtom } from '@/features/prompt/atoms'
import { useGameTimerControls } from '@/features/timer/hooks'
import { useSetAtom } from 'jotai'
import { generate } from 'random-words'

export function useGameControls() {
  const setUserInput = useSetAtom(userInputAtom)
  const setPrompt = useSetAtom(promptAtom)
  const { resetTimer } = useGameTimerControls()

  const resetGame = () => {
    setUserInput('')
    setPrompt(generate(100) as string[])
    resetTimer()
  }

  return { resetGame }
}
