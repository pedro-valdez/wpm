import { GameTimer } from '@/features/timer/components'
import { Prompt, UserInput } from '@/features/prompt/components'
import { GameResetButton, GameResults } from '@/features/game/components'

function App() {
  return (
    <>
      <Prompt />
      <UserInput />

      <GameTimer />

      <GameResults />
      <GameResetButton />
    </>
  )
}

export default App
