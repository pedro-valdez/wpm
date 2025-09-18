import { useCallback } from 'react'
import { capitalizationAtom, promptAtom, punctuationAtom } from '../atoms'
import { useSetAtom } from 'jotai'
import { generate } from 'random-words'
import { useAtomValue } from 'jotai'
import { capitalize, some } from 'lodash'

const CAPITALIZE_PUNCTUATIONS = ['.', '!', '?'] as const
const PUNCTUATIONS = [...CAPITALIZE_PUNCTUATIONS, ',', ';'] as const
const PUNCTUATION_DENSITY = 0.2

const CAPITALIZATION_DENSITY = 0.2

export function useLoadPrompt() {
  const punctuation = useAtomValue(punctuationAtom)
  const capitalization = useAtomValue(capitalizationAtom)
  const setPrompt = useSetAtom(promptAtom)

  const loadPrompt = useCallback(() => {
    let words = generate(100) as string[]

    if (punctuation) {
      words = words.map((word) => {
        const pIndex = Math.floor(Math.random() * PUNCTUATIONS.length)
        const isPunctuated = Math.random() <= PUNCTUATION_DENSITY

        return isPunctuated ? word + PUNCTUATIONS[pIndex] : word
      })
    }

    if (capitalization && punctuation) {
      words = words.map((word, index) => {
        if (index === 0) {
          return capitalize(word)
        }
        // NOTE: The check is not necessary, but just in case...
        const previousWord = index === 0 ? '' : words[index - 1]
        const previousIsPunctuation = some(CAPITALIZE_PUNCTUATIONS, (punc) =>
          previousWord.endsWith(punc)
        )

        return previousIsPunctuation ? capitalize(word) : word
      })
    } else if (capitalization) {
      words = words.map((word) =>
        Math.random() <= CAPITALIZATION_DENSITY ? capitalize(word) : word
      )
    }

    setPrompt(words)
  }, [punctuation, capitalization, setPrompt])

  return loadPrompt
}
