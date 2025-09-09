import { atom, useAtom, useAtomValue } from 'jotai'
import { zip } from 'lodash'
import { generate } from 'random-words'
import { cn } from './util'

const promptAtom = atom(generate(100) as string[])
const userInputAtom = atom('')
const userWordsAtom = atom((get) => {
  const userInput = get(userInputAtom)
  return userInput.split(' ')
})
const currentIndices = atom((get) => {
  const userWords = get(userWordsAtom)
  const currentWordIndex = userWords.length - 1
  const currentLetterIndex = userWords[currentWordIndex].length

  return { currentWordIndex, currentLetterIndex }
})

function useGrade() {
  const prompt = useAtomValue(promptAtom)
  const userWords = useAtomValue(userWordsAtom)
  const { currentWordIndex, currentLetterIndex } = useAtomValue(currentIndices)

  const wordPairs = zip(prompt, userWords)
  const letterPairs = wordPairs.map(([targetWord, userWord]) =>
    zip((targetWord ?? '').split(''), (userWord ?? '').split(''))
  )
  const gradedLetters = letterPairs.map((wordPair, wordIndex) =>
    wordPair.map(([promptLetter, userLetter], letterIndex) => {
      const shouldGrade =
        wordIndex < currentWordIndex ||
        (wordIndex === currentWordIndex && letterIndex < currentLetterIndex)

      return {
        target: promptLetter,
        value: userLetter,
        grade: shouldGrade ? promptLetter === userLetter : undefined,
        overflow: promptLetter === undefined,
      }
    })
  )

  return gradedLetters
}

function App() {
  const [userInput, setUserInput] = useAtom(userInputAtom)
  const grades = useGrade()
  const { currentWordIndex, currentLetterIndex } = useAtomValue(currentIndices)

  return (
    <>
      <p className="w-full max-w-full space-x-[1ch]">
        {grades.map((word, i) => (
          <span key={i} className="inline-block">
            {word.map((letter, j) => {
              return (
                <span
                  key={j}
                  className={cn(
                    letter.grade === false && 'text-red-500',
                    letter.grade === undefined && 'opacity-60',
                    currentWordIndex === i && currentLetterIndex === j && 'bg-yellow-600'
                  )}
                >
                  {letter.overflow ? letter.value : letter.target}
                </span>
              )
            })}
          </span>
        ))}
      </p>

      <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} />
    </>
  )
}

export default App
