import { userInputAtom, userWordsAtom } from '@/features/prompt/atoms'
import { useGrade } from '@/features/prompt/hooks'
import { useGameTimer } from '@/features/timer/hooks'
import { useAtomValue } from 'jotai'
import { GameResetButton } from './ResetButton'

export function GameResults() {
  const userInput = useAtomValue(userInputAtom)
  const userWords = useAtomValue(userWordsAtom)
  const grades = useGrade()
  const { elapsedTime, isTimerFinished } = useGameTimer()

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

  return isTimerFinished ? (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="container px-4 sm:px-6 md:px-8 md:max-w-3xl">
        <h1 className="text-xl font-bold underline mb-2">Results</h1>

        <div className="stats stats-vertical w-full sm:stats-horizontal">
          <div className="stat">
            <div className="stat-title">WPM</div>
            <div className="stat-value text-accent">{Math.round(rawWpm * accuracy)}</div>
            <div className="stat-desc">Words per minute</div>
          </div>

          <div className="stat">
            <div className="stat-title">Accuracy</div>
            <div className="stat-value">{(accuracy * 100).toFixed(2)} %</div>
            <div className="stat-desc">
              {correctCharacterCount} out of {characterCount}
            </div>
          </div>

          <div className="stat">
            <div className="stat-title">Raw WPM</div>
            <div className="stat-value">{Math.round(rawWpm)}</div>
            <div className="stat-desc">WPM not adjusted by accuracy</div>
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <GameResetButton text="Next" className="btn-md" />
        </div>
      </div>
    </div>
  ) : undefined
}
