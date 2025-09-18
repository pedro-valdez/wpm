import { useAtom } from 'jotai'
import { capitalizationAtom } from '../atoms'
import { Toggle } from '@/shared/components'

export function CapitalizationToggle() {
  const [capitalization, setCapitalization] = useAtom(capitalizationAtom)

  return (
    <Toggle
      labelText="Capitalization"
      checked={capitalization}
      onChange={() => setCapitalization((prev) => !prev)}
    />
  )
}
