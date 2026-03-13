import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface AppState {
  aside: boolean
  theme: boolean
  toggleTheme: () => void
  setAside: () => void
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        aside: false,
        theme: false,
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
