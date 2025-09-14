import { useGameTimer } from '@/features/timer/hooks'
import { Game, GameResults } from '../components'

export function GamePage() {
  const { isTimerFinished } = useGameTimer()

  return isTimerFinished ? <GameResults /> : <Game />
}
