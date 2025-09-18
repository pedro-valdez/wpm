import { useAtom } from 'jotai'
import { ThemeInput } from './Input'
import { themeAtom } from '../atoms'

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

export function ThemeDropdown() {
  const [theme, setTheme] = useAtom(themeAtom)

  return (
    <details className="dropdown">
      <summary className="btn btn-soft mb-2.5">Theme</summary>

      <ul className="menu dropdown-content bg-base-300 rounded-box">
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
}
