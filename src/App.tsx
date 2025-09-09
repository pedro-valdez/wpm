import { atom, useAtom, useAtomValue } from 'jotai'
import { zip } from 'lodash'
import { generate } from 'random-words'
import { cn } from './util'

const promptAtom = atom(generate(100) as string[])
const userInputAtom = atom('')

function useGrade() {
  const prompt = useAtomValue(promptAtom)
  const userInput = useAtomValue(userInputAtom)

  const userWords = userInput.split(' ')
  const wordPairs = zip(prompt, userWords)
  const currentWordIndex = userWords.length - 1
  const letterPairs = wordPairs.map(([targetWord, userWord]) =>
    zip((targetWord ?? '').split(''), (userWord ?? '').split(''))
  )
  const gradedLetters = letterPairs.map((wordPair, wordIndex) =>
    wordPair.map(([promptLetter, userLetter], letterIndex) => {
      const shouldGrade =
        wordIndex < currentWordIndex ||
        (wordIndex === currentWordIndex && letterIndex < (wordPairs[wordIndex][1]?.length ?? 0))

      return {
        target: promptLetter,
        value: userLetter,
        grade: shouldGrade ? promptLetter === userLetter : undefined,
      }
    })
  )

  return gradedLetters
}

function App() {
  const [userInput, setUserInput] = useAtom(userInputAtom)
  const grades = useGrade()

  return (
    <>
      <p className="w-full max-w-full space-x-[1ch]">
        {grades.map((word, i) => (
          <span key={i} className="inline-block">
            {word.map((letter, j) => (
              <span
                key={j}
                className={cn(
                  letter.grade === false && 'text-red-500',
                  letter.grade === undefined && 'opacity-60'
                )}
              >
                {letter.target}
              </span>
            ))}
          </span>
        ))}
      </p>

      <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} />
    </>
  )
}

export default App
