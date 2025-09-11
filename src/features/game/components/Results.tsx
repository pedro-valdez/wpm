import { userInputAtom, userWordsAtom } from '@/features/prompt/atoms'
import { useGrade } from '@/features/prompt/hooks'
import { useGameTimer } from '@/features/timer/hooks'
import { useAtomValue } from 'jotai'

export function GameResults() {
  const userInput = useAtomValue(userInputAtom)
  const userWords = useAtomValue(userWordsAtom)
  const grades = useGrade()
  const { elapsedTime } = useGameTimer()

  /*
   * NOTE: The character counts DO NOT include spcaes.
   * `rawWpm`, however, does. The character counts are used to calcualte
   * accuracy, and spaces factor out of the accuracy calculation.
   */
  const rawWpm = elapsedTime !== 0 ? userInput.length / (5 * (elapsedTime / 60_000)) : 0
  const correctCharacterCount = grades.reduce(
    (acc, cur) => acc + cur.filter((v) => v.grade).length,
    0
  )
  const characterCount = userWords.reduce((acc, cur) => acc + cur.length, 0)
  const accuracy = characterCount !== 0 ? correctCharacterCount / characterCount : 0

  return (
    <div>
      <p>Raw wpm: {Math.round(rawWpm)}</p>
      <p>Accuracy: {accuracy}</p>
      <p>WPM: {Math.round(rawWpm * accuracy)}</p>
    </div>
  )
}
