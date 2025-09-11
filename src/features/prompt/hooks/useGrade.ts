import { useAtomValue } from 'jotai'
import { zip } from 'lodash'
import { currentIndicesAtom, promptAtom, userWordsAtom } from '../atoms'

export function useGrade() {
  const prompt = useAtomValue(promptAtom)
  const userWords = useAtomValue(userWordsAtom)
  const { currentWordIndex, currentLetterIndex } = useAtomValue(currentIndicesAtom)

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
