import { Toggle } from '@/shared/components'
import { punctuationAtom } from '../atoms'
import { useAtom } from 'jotai'

export function PunctuationToggle() {
  const [punctuation, setPunctuation] = useAtom(punctuationAtom)

  return (
    <Toggle
      labelText="Punctuation"
      checked={punctuation}
      onChange={() => setPunctuation((prev) => !prev)}
    />
  )
}
