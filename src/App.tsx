import { GamePrompt, GameResetButton, GameResults } from './features/game'
import { GameTimer } from './features/timer'

function App() {
  return (
    <>
      <GamePrompt />

      <GameTimer />

      <GameResults />
      <GameResetButton />
    </>
  )
}

export default App
