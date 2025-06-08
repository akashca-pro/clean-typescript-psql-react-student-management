import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AuthState {
  user: string | null
  isAuthenticated: boolean
  login: (email: string) => void
  logout: () => void
  checkAuth: () => void
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: (email: string) => {
        set({ user: email, isAuthenticated: true })
      },
      logout: () => {
        set({ user: null, isAuthenticated: false })
      },
      checkAuth: () => {
        // This function can be used to check authentication status on app load
        const state = get()
        if (state.user) {
          set({ isAuthenticated: true })
        }
      },
    }),
    {
      name: "auth-storage",
    },
  ),
)
