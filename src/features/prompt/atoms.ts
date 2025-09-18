import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

// NOTE: is lazily loaded by `Prompt`
export const promptAtom = atom<string[]>([])
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

export const punctuationAtom = atomWithStorage('punctuation', false, undefined, { getOnInit: true })
export const capitalizationAtom = atomWithStorage('capitalization', false, undefined, {
  getOnInit: true,
})
export const numbersAtom = atomWithStorage('numbers', true, undefined, { getOnInit: true })
