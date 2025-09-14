import { useAtom } from 'jotai'
import { userInputAtom } from '../atoms'
import type { ComponentProps } from 'react'

type UserInputProps = Omit<ComponentProps<'input'>, 'type' | 'value'>

export function UserInput({ onChange, ...props }: UserInputProps) {
  const [userInput, setUserInput] = useAtom(userInputAtom)

  return (
    <input
      type="text"
      value={userInput}
      onChange={(e) => {
        onChange?.(e)

        setUserInput(e.target.value)
      }}
      {...props}
    />
  )
}
