import { cn } from '@/util'
import { useGrade } from '../hooks'
import { currentIndicesAtom } from '../atoms'
import { useAtomValue } from 'jotai'

export function Prompt() {
  const { currentWordIndex, currentLetterIndex } = useAtomValue(currentIndicesAtom)
  const grades = useGrade()

  return (
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
  )
}
