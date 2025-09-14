import { GameTimer } from '@/features/timer/components'
import { GamePrompt } from './Prompt'
import { GameResetButton } from './ResetButton'

export function Game() {
  return (
    <>
      <GamePrompt />

      <div className="absolute top-4 right-4 flex items-center gap-x-4">
        <GameResetButton />
        <GameTimer />
      </div>
    </>
  )
}
