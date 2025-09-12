import { GameTimer } from '@/features/timer'
import { GamePrompt } from './Prompt'
import { GameResetButton } from './ResetButton'
import { useGameTimer } from '@/features/timer/hooks'

export function Game() {
  const { isTimerFinished } = useGameTimer()

  return !isTimerFinished ? (
    <>
      <GamePrompt />

      <div className="absolute top-4 right-4 flex items-center gap-x-4">
        <GameResetButton />
        <GameTimer />
      </div>
    </>
  ) : undefined
}
