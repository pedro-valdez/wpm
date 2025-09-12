import { GamePrompt, GameResetButton, GameResults } from './features/game'
import { GameTimer } from './features/timer'

function App() {
  return (
    <>
      <GamePrompt />

      <GameTimer className="absolute top-4 right-4" />

      <GameResults />
      <GameResetButton />
    </>
  )
}

export default App
