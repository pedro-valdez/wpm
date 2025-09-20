import { cn } from '@/util'
import { useGrade, useLoadPrompt } from '../hooks'
import { currentIndicesAtom, promptAtom } from '../atoms'
import { useAtomValue } from 'jotai'
import { useEffect, type ComponentProps, type RefObject } from 'react'
import { isEmpty } from 'lodash'

type PromptProps = ComponentProps<'p'> & {
  currentWordRef?: RefObject<HTMLSpanElement | null>
  onNextWord?: () => void
}

export function Prompt({ className, currentWordRef, onNextWord, ...props }: PromptProps) {
  const prompt = useAtomValue(promptAtom)
  const loadPrompt = useLoadPrompt()
  const { currentWordIndex, currentLetterIndex } = useAtomValue(currentIndicesAtom)
  const grades = useGrade()

  useEffect(() => {
    if (isEmpty(prompt)) {
      loadPrompt()
    }
  }, [prompt, loadPrompt])

  useEffect(() => {
    onNextWord?.()
  }, [currentWordIndex, onNextWord])

  return (
    <p className={cn('w-full max-w-full space-x-[1ch]', className)} {...props}>
      {grades.map((word, i) => (
        <span
          key={i}
          className="inline-block"
          ref={currentWordIndex === i ? currentWordRef : undefined}
        >
          {word.map((letter, j) => {
            return (
              <span
                key={j}
                className={cn(
                  letter.grade === false && 'text-error',
                  letter.grade === undefined && 'text-base-content/60',
                  currentWordIndex === i &&
                    currentLetterIndex === j && [
                      'bg-secondary text-secondary-content',
                      'group-has-[input:not(:focus)]:animate-pulse',
                      'group-has-[input:not(:focus)]:bg-secondary/60',
                    ]
                )}
              >
                {letter.overflow ? letter.value : letter.target}
              </span>
            )
          })}
        </span>
      ))}
    </p>
  )
}
