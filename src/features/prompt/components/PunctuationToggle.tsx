import { punctuationAtom } from '../atoms'
import { useAtom } from 'jotai'

export function PunctuationToggle() {
  const [punctuation, setPunctuation] = useAtom(punctuationAtom)

  return (
    <label className="label space-x-1">
      <span>Punctuation</span>
      <input
        type="checkbox"
        checked={punctuation}
        onChange={() => setPunctuation((prev) => !prev)}
        className="toggle"
      />
    </label>
  )
}
