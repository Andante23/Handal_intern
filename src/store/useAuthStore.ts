import create from 'zustand'
import { AuthState } from '../types/types'

const useAuthStore = create<AuthState>((set) => ({
    token: localStorage.getItem('token') || null,

    //=> 로컬스토리지에 로그인시 토큰 생성
    setToken: (token: string) => {
        localStorage.setItem('token', token)
        set({ token })
    },

    //=> 로그아웃시에 호출됩니다.
    clearToken: () => {
        localStorage.removeItem('token')
        set({ token: null })
    },
}))

export default useAuthStore
