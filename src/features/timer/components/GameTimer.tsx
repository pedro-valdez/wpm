import { useGameTimer } from '../hooks'

export function GameTimer() {
  const { elapsedTime } = useGameTimer()

  return <div>{Math.floor(elapsedTime / 1000)}</div>
}
