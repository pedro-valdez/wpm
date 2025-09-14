import { useGameTimer } from '@/features/timer/hooks'
import { GameResetButton } from './ResetButton'
import { useResults } from '../hooks'

export function GameResults() {
  const { rawWpm, characterCount, correctCharacterCount, accuracy, wpm } = useResults()
  const { isTimerFinished } = useGameTimer()

  /*
   * NOTE: The character counts DO NOT include spcaes.
   * `rawWpm`, however, does. The character counts are used to calcualte
   * accuracy, and spaces factor out of the accuracy calculation.
   */

  return isTimerFinished ? (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="container px-4 sm:px-6 md:px-8 md:max-w-3xl">
        <h1 className="text-xl font-bold underline mb-2">Results</h1>

        <div className="stats stats-vertical w-full sm:stats-horizontal">
          <div className="stat">
            <div className="stat-title">WPM</div>
            <div className="stat-value text-accent">{wpm}</div>
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
