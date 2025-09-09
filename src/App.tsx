import { atom, useAtom, useAtomValue } from 'jotai'
import { generate } from 'random-words'

const promptAtom = atom(generate(100) as string[])
const userInputAtom = atom('')

function App() {
  const prompt = useAtomValue(promptAtom)
  const [userInput, setUserInput] = useAtom(userInputAtom)

  return (
    <>
      <p className="w-full max-w-full space-x-[1ch]">
        {prompt.map((word, i) => (
          <span key={i} className="inline-block">
            {word}
          </span>
        ))}
      </p>

      <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} />
    </>
  )
}

export default App
