import { GameTimer } from '@/features/timer/components'
import { GamePrompt } from './Prompt'
import { GameResetButton } from './ResetButton'
import { PromptSettings, ThemeSettings } from '@/features/settings'

export function Game() {
  return (
    <>
      <GamePrompt />

      <div className="absolute top-4 left-4 flex items-center gap-x-4">
        <ThemeSettings />
        <PromptSettings />
      </div>

      <div className="absolute top-4 right-4 flex items-center gap-x-4">
        <GameResetButton />
        <GameTimer />
      </div>
    </>
  )
}
