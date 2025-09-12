import { cn } from '@/util'
import { useGrade } from '../hooks'
import { currentIndicesAtom } from '../atoms'
import { useAtomValue } from 'jotai'
import { useEffect, type ComponentProps, type RefObject } from 'react'

type PromptProps = ComponentProps<'p'> & {
  currentWordRef?: RefObject<HTMLSpanElement | null>
  onNextWord?: () => void
}

export function Prompt({ className, currentWordRef, onNextWord, ...props }: PromptProps) {
  const { currentWordIndex, currentLetterIndex } = useAtomValue(currentIndicesAtom)
  const grades = useGrade()

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
                    currentLetterIndex === j &&
                    'bg-secondary text-secondary-content'
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
