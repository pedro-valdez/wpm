import { useAtom } from 'jotai'
import { capitalizationAtom } from '../atoms'

export function CapitalizationToggle() {
  const [capitalization, setCapitalization] = useAtom(capitalizationAtom)

  return (
    <label className="label space-x-1">
      <span>Capitalization</span>
      <input
        type="checkbox"
        checked={capitalization}
        onChange={() => setCapitalization((prev) => !prev)}
        className="toggle"
      />
    </label>
  )
}
