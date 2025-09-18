import { useAtom } from 'jotai'
import { numbersAtom } from '../atoms'

export function NumbersToggle() {
  const [numbers, setNumbers] = useAtom(numbersAtom)

  return (
    <label className="label space-x-1">
      <span>Numbers</span>
      <input
        type="checkbox"
        checked={numbers}
        onChange={() => setNumbers((prev) => !prev)}
        className="toggle"
      />
    </label>
  )
}
