import { generate } from 'random-words'

function App() {
  const prompt = generate(100) as string[]

  return (
    <p className="w-full max-w-full space-x-[1ch]">
      {prompt.map((word, i) => (
        <span key={i} className="inline-block">
          {word}
        </span>
      ))}
    </p>
  )
}

export default App
