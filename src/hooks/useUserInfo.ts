
import { useState } from 'react'
import useAuthStore from '../store/useAuthStore'
import { useNavigate } from 'react-router-dom'

export default function useUserInfo() {
    const [id, setId] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [nickname, setNickName] = useState<string>('')
    const navigate = useNavigate();

    const onChangeUserId = (event: React.ChangeEvent<HTMLInputElement>) => {
        setId(event.target.value)
    }
    const onChangeUserPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }
    const onChangeUserNickName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNickName(event.target.value)
    }

    const onReset = () => {
        setId('')
        setPassword('')
        setNickName('')
    }

    const registSubmitHandler = async (event: React.FormEvent) => {
        event.preventDefault()

        const response = await fetch(`${import.meta.env.VITE_JWT_SERVER_URL}/register`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, password, nickname }),
        })

        if (id.trim() === '' && password.trim() === '' && nickname.trim() === '') {
            alert('모든 칸을 채워주세요')
            onReset()
            return
        }

        const data = await response.json()
        alert(data.message)
    }


    
    const logOutHandler = () => {
        useAuthStore.getState().clearToken() // Zustand를 사용하여 토큰 제거
        navigate('/login')
    }

    return {
        id,
        password,
        nickname,
        logOutHandler,
        onReset,
        registSubmitHandler,
        onChangeUserId,
        onChangeUserPassword,
        onChangeUserNickName,
    }
}
