import { GameResetButton, GameResults, GameUserInput } from './features/game'
import { Prompt } from './features/prompt'
import { GameTimer } from './features/timer'

function App() {
  return (
    <>
      <Prompt />
      <GameUserInput />

      <GameTimer />

      <GameResults />
      <GameResetButton />
    </>
  )
}

export default App
