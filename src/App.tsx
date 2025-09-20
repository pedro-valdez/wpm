import { useAtomValue } from 'jotai'
import { GamePage } from './features/game'
import { themeAtom } from './features/settings/atoms'

function App() {
  const theme = useAtomValue(themeAtom)

  return (
    <main data-theme={theme}>
      <GamePage />
    </main>
  )
}

export default App
