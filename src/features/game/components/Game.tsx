import { GameTimer } from '@/features/timer/components'
import { GamePrompt } from './Prompt'
import { GameResetButton } from './ResetButton'
import {
  CapitalizationToggle,
  NumbersToggle,
  PunctuationToggle,
} from '@/features/prompt/components'
import { ThemeMenu } from '@/features/theme'

export function Game() {
  return (
    <>
      <GamePrompt />

      <div className="absolute top-4 left-4 flex items-center gap-x-4">
        <ThemeMenu />
        <PunctuationToggle />
        <CapitalizationToggle />
        <NumbersToggle />
      </div>

      <div className="absolute top-4 right-4 flex items-center gap-x-4">
        <GameResetButton />
        <GameTimer />
      </div>
    </>
  )
}
