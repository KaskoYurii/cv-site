import { createContext, useContext } from 'react'
import en from './locales/en.json'
import ua from './locales/ua.json'

export type Lang = 'en' | 'ua'

const strings: Record<Lang, typeof en> = { en, ua }

export const initialLang = (): Lang =>
  (localStorage.getItem('lang') as Lang | null) ?? (navigator.language.startsWith('uk') ? 'ua' : 'en')

export const LangContext = createContext<[Lang, (lang: Lang) => void]>(['en', () => {}])

export function useLang() {
  const [lang, setLang] = useContext(LangContext)
  return { lang, setLang, t: strings[lang] }
}
