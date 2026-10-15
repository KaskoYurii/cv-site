import { useSyncExternalStore } from 'react'
import en from './locales/en.json'
import ua from './locales/ua.json'

export type Lang = 'en' | 'ua'

const strings: Record<Lang, typeof en> = { en, ua }
const listeners = new Set<() => void>()
let current: Lang | null = null

const getLang = () =>
  (current ??= (localStorage.getItem('lang') as Lang | null) ?? (navigator.language.startsWith('uk') ? 'ua' : 'en'))

function setLang(lang: Lang) {
  current = lang
  localStorage.setItem('lang', lang)
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

// The prerendered HTML is English (server snapshot); after hydration the saved or
// browser language takes over.
export function useLang() {
  const lang = useSyncExternalStore(subscribe, getLang, () => 'en' as const)
  return { lang, setLang, t: strings[lang] }
}
