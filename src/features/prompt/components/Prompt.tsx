import { cn } from '@/util'
import { useGrade } from '../hooks'
import { currentIndicesAtom } from '../atoms'
import { useAtomValue } from 'jotai'
import type { ComponentProps } from 'react'

type PromptProps = ComponentProps<'p'>

export function Prompt({ className, ...props }: PromptProps) {
  const { currentWordIndex, currentLetterIndex } = useAtomValue(currentIndicesAtom)
  const grades = useGrade()

  return (
    <p className={cn('w-full max-w-full space-x-[1ch]', className)} {...props}>
      {grades.map((word, i) => (
        <span key={i} className="inline-block">
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
