import { HiCog6Tooth } from 'react-icons/hi2'
import { cn } from '@/util'
import { CapitalizationToggle, NumbersToggle, PunctuationToggle } from '@/features/prompt'

export function PromptSettings() {
  return (
    <div tabIndex={0} className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-circle btn-soft">
        <HiCog6Tooth />
      </div>
      <div
        className={cn(
          'dropdown-content bg-base-300 rounded-box px-4 py-2 mt-2',
          'grid grid-cols-[auto_auto] gap-[1ch] *:grid *:col-span-2 *:grid-cols-subgrid',
          '*:space-x-0'
        )}
      >
        <PunctuationToggle />
        <CapitalizationToggle />
        <NumbersToggle />
      </div>
    </div>
  )
}
