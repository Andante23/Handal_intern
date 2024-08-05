import create from 'zustand'
import { AuthState } from '../types/types'

const useAuthStore = create<AuthState>((set) => ({
    token: localStorage.getItem('token') || null,
    setToken: (token: string) => {
        localStorage.setItem('token', token)
        set({ token })
    },
    clearToken: () => {
        localStorage.removeItem('token')
        set({ token: null })
    },
}))

export default useAuthStore
