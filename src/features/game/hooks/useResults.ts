import { userInputAtom, userWordsAtom } from '@/features/prompt/atoms'
import { useGrade } from '@/features/prompt/hooks'
import { useGameTimer } from '@/features/timer/hooks'
import { useAtomValue } from 'jotai'

export function useResults() {
  const userInput = useAtomValue(userInputAtom)
  const userWords = useAtomValue(userWordsAtom)
  const grades = useGrade()
  const { elapsedTime } = useGameTimer()

  const rawWpm = elapsedTime !== 0 ? userInput.length / (5 * (elapsedTime / 60_000)) : 0
  const correctCharacterCount = grades.reduce(
    (acc, cur) => acc + cur.filter((v) => v.grade).length,
    0
  )
  const characterCount = userWords.reduce((acc, cur) => acc + cur.length, 0)
  const accuracy = characterCount !== 0 ? correctCharacterCount / characterCount : 0
  const wpm = Math.round(rawWpm * accuracy)

  return { rawWpm, correctCharacterCount, characterCount, accuracy, wpm }
}
