import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
import { zip } from 'lodash'
import { generate } from 'random-words'
import { cn } from './util'
import { useCallback, useEffect, useRef, useState } from 'react'

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

function useTimer() {
  const [elapsedTime, setElapsedTime] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [isTimerFinished, setIsTimerFinished] = useState(false)

  const startTimeRef = useRef<number | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const delay = 16
  const endTime = 2_000

  const startTimer = useCallback(() => {
    if (isTimerRunning || elapsedTime !== 0) return

    setIsTimerRunning(true)
    startTimeRef.current = performance.now()

    intervalRef.current = setInterval(() => {
      if (startTimeRef.current !== null) {
        const elapsed = performance.now() - startTimeRef.current

        if (elapsed >= endTime) {
          setElapsedTime(endTime)
          stopTimer()
        } else {
          setElapsedTime(elapsed)
        }
      }
    }, delay)
  }, [isTimerRunning, elapsedTime])

  const stopTimer = useCallback(() => {
    setIsTimerRunning(false)
    setIsTimerFinished(true)

    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    if (startTimeRef.current !== null) {
      startTimeRef.current = null
    }
  }, [])

  const resetTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    startTimeRef.current = null
    setElapsedTime(0)
    setIsTimerRunning(false)
    setIsTimerFinished(false)
  }, [])

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  return { elapsedTime, isTimerRunning, isTimerFinished, startTimer, stopTimer, resetTimer }
}

function App() {
  const [userInput, setUserInput] = useAtom(userInputAtom)
  const setPrompt = useSetAtom(promptAtom)
  const grades = useGrade()
  const { currentWordIndex, currentLetterIndex } = useAtomValue(currentIndices)
  const { elapsedTime, startTimer, resetTimer, isTimerRunning, isTimerFinished } = useTimer()

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

      <input
        type="text"
        value={userInput}
        onChange={(e) => {
          if (!isTimerRunning) {
            startTimer()
          }
          setUserInput(e.target.value)
        }}
        disabled={isTimerFinished}
      />

      <div>{Math.floor(elapsedTime / 1000)}</div>
      <div>
        <button
          onClick={() => {
            setUserInput('')
            setPrompt(generate(100) as string[])
            resetTimer()
          }}
        >
          Reset
        </button>
      </div>
    </>
  )
}

export default App
