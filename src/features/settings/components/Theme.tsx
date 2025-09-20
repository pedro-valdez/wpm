import { useAtom } from 'jotai'
import { memo, useRef } from 'react'
import { FaPalette } from 'react-icons/fa'
import { themeAtom } from '../atoms'
import { ThemeColor } from './Color'

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

export const ThemeSettings = memo(function () {
  const [theme, setTheme] = useAtom(themeAtom)
  const themeModal = useRef<HTMLDialogElement>(null)

  return (
    <>
      <button className="btn btn-soft btn-circle" onClick={() => themeModal.current?.showModal()}>
        <FaPalette />
      </button>
      <dialog ref={themeModal} className="modal">
        <div className="modal-box h-2/3 flex flex-col gap-y-4">
          <h2 className="text-lg font-bold">Themes</h2>

          <ul className="overflow-y-scroll no-scrollbar grid grid-cols-1 gap-2 md:grid-cols-2">
            {themes.map((t) => (
              <li key={t}>
                <div className="rounded-box overflow-hidden">
                  <label data-theme={t} className="block px-4 py-1">
                    <div className="space-x-1 inline-block">
                      <ThemeColor className="bg-accent" />
                      <ThemeColor className="bg-secondary" />
                      <ThemeColor className="bg-primary" />
                    </div>
                    <span className="capitalize ml-2">{t}</span>
                    <input
                      type="radio"
                      name="theme"
                      checked={theme === t}
                      onChange={() => setTheme(t)}
                      className="hidden"
                    />
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  )
})
