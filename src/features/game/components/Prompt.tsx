import { GameUserInput } from './UserInput'
import { useCallback, useEffect, useRef } from 'react'
import { cn } from '@/util'
import { Prompt } from '@/features/prompt/components'
import { useAtomValue } from 'jotai'
import { promptAtom } from '@/features/prompt/atoms'

export function GamePrompt() {
  const prompt = useAtomValue(promptAtom)
  const userInputRef = useRef<HTMLInputElement>(null)
  const wordRef = useRef<HTMLSpanElement>(null)
  const containerRef = useRef<HTMLParagraphElement>(null)

  const carriageReturn = useCallback(() => {
    if (wordRef.current && containerRef.current) {
      const translation = `-${wordRef.current?.offsetTop}px`
      containerRef.current.style = `transform: translateY(${translation})`
    }
  }, [])

  useEffect(() => {
    window.addEventListener('resize', carriageReturn)

    return () => window.removeEventListener('resize', carriageReturn)
  }, [carriageReturn])

  useEffect(() => carriageReturn(), [prompt, carriageReturn])

  return (
    <div className="group relative bg-base-100 h-dvh w-full overflow-y-hidden">
      <div
        className={cn(
          'absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2',
          'w-[36ch] max-w-full border-b border-b-primary',
          'text-xl h-7 px-2',
          'sm:text-4xl sm:h-10 sm:px-8',
          'md:text-5xl md:h-12 md:px-10',
          'lg:text-6xl lg:h-15 lg:px-12',
          'xl:text-7xl xl:h-18 xl:px-14',
          '2xl:text-8xl 2xl:h-24 2xl:px-16'
        )}
      >
        <Prompt
          onClick={() => {
            userInputRef.current?.focus()
          }}
          ref={containerRef}
          currentWordRef={wordRef}
          onNextWord={() => carriageReturn()}
          className={cn('space-y-[1ch]')}
        />
      </div>
      <GameUserInput
        ref={userInputRef}
        className={cn(
          'absolute top-0 left-0 -z-10 caret-transparent',
          'w-px h-px p-0 -m-px border-0 overflow-hidden [clip:rect(0,0,0,0)]'
        )}
      />
    </div>
  )
}
