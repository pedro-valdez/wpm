import { useAtom } from 'jotai'
import { ThemeInput } from './Input'
import { themeAtom } from '../atoms'
import { memo } from 'react'

const themes = [
  'light',
  'dark',
  'cupcake',
  'bumblebee',
  'emerald',
  'corporate',
  'synthwave',
  'retro',
  'cyberpunk',
  'valentine',
  'halloween',
  'garden',
  'forest',
  'aqua',
  'lofi',
  'pastel',
  'fantasy',
  'wireframe',
  'black',
  'luxury',
  'dracula',
  'cmyk',
  'autumn',
  'business',
  'acid',
  'lemonade',
  'night',
  'coffee',
  'winter',
  'dim',
  'nord',
  'sunset',
  'caramellatte',
  'abyss',
  'silk',
] as const

/*
 * NOTE: Why memo?
 * This component has a sibling `GameTimer` which is updated
 * every few milliseconds. The siblings of `GameTimer` are
 * committed to a re-render if unstable. React doesn't
 * directly know about Jotai, so every commit this component
 * is considered for a re-render. Memo prevents this.
 */
export const ThemeDropdown = memo(function () {
  const [theme, setTheme] = useAtom(themeAtom)

  return (
    <details className="dropdown">
      <summary className="btn btn-soft">Theme</summary>

      <ul className="menu dropdown-content bg-base-300 rounded-box mt-2.5">
        <div className="h-32 overflow-y-scroll">
          {themes.map((val) => (
            <li key={val}>
              <ThemeInput
                value={val}
                onClick={() => setTheme(val)}
                defaultChecked={val === theme}
              />
            </li>
          ))}
        </div>
      </ul>
    </details>
  )
})
