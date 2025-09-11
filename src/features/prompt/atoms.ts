import { atom } from 'jotai'
import { generate } from 'random-words'

export const promptAtom = atom(generate(100) as string[])
export const userInputAtom = atom('')
export const userWordsAtom = atom((get) => {
  const userInput = get(userInputAtom)
  return userInput.split(' ')
})
export const currentIndicesAtom = atom((get) => {
  const userWords = get(userWordsAtom)
  const currentWordIndex = userWords.length - 1
  const currentLetterIndex = userWords[currentWordIndex].length

  return { currentWordIndex, currentLetterIndex }
})
