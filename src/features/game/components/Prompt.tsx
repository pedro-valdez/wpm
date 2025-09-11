import { Prompt } from '@/features/prompt/components/Prompt'
import { GameUserInput } from './UserInput'
import { useRef } from 'react'

export function GamePrompt() {
  const userInputRef = useRef<HTMLInputElement | null>(null)

  return (
    <div className="px-16 py-4 relative bg-base-100">
      <Prompt
        onClick={() => {
          userInputRef.current?.focus()
        }}
      />
      <GameUserInput ref={userInputRef} className="absolute top-0 left-0 -z-10" />
    </div>
  )
}
