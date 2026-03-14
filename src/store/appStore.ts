import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface AppState {
  aside: boolean
  theme: boolean
  toggleTheme: () => void
  setAside: () => void
}

// true = light, false = dark
// На SSR возвращаем false; на клиенте без сохранённого значения берём системную тему
const getDefaultTheme = (): boolean => {
  if (typeof window === 'undefined') return false
  return !window.matchMedia('(prefers-color-scheme: dark)').matches
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        aside: false,
        theme: getDefaultTheme(),
        toggleTheme: () => set((state) => ({ theme: !state.theme })),
        setAside: () => set((state) => ({ aside: !state.aside })),
      }),
      {
        name: 'app',
        partialize: (state) => ({ theme: state.theme })
      }
    )
  )
)
