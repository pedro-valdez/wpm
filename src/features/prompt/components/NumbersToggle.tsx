import { useAtom } from 'jotai'
import { numbersAtom } from '../atoms'
import { Toggle } from '@/shared/components'

export function NumbersToggle() {
  const [numbers, setNumbers] = useAtom(numbersAtom)

  return (
    <Toggle labelText="Numbers" checked={numbers} onChange={() => setNumbers((prev) => !prev)} />
  )
}
