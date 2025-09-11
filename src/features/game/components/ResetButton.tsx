import { useGameControls } from '../hooks'

export function GameResetButton() {
  const { resetGame } = useGameControls()

  return (
    <div>
      <button onClick={() => resetGame()}>Reset</button>
    </div>
  )
}
