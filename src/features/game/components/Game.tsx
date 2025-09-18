import { GameTimer } from '@/features/timer/components'
import { GamePrompt } from './Prompt'
import { GameResetButton } from './ResetButton'
import { ThemeDropdown } from '@/features/theme'
import { PunctuationToggle } from '@/features/prompt/components'

export function Game() {
  return (
    <>
      <GamePrompt />

      <div className="absolute top-4 left-4 flex items-center gap-x-4">
        <ThemeDropdown />
        <PunctuationToggle />
      </div>

      <div className="absolute top-4 right-4 flex items-center gap-x-4">
        <GameResetButton />
        <GameTimer />
      </div>
    </>
  )
}
