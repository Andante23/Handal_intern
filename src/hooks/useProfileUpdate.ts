import { ChangeEvent, FormEvent, useState } from 'react'
import { User } from '../types/types'
import useAuthStore from '../store/useAuthStore'
export default function useProfileUpdate() {
    const [newNickname, setNewNickname] = useState<string>('')
    const [avatarFile, setAvatarFile] = useState<File | null>(null)
    const [updateError, setUpdateError] = useState<string | null>(null)
    const [updateSuccess, setUpdateSuccess] = useState<string | null>(null)
    const [user, setUser] = useState<User | null>(null)
    const { token } = useAuthStore((state) => state)

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) { //=> 해당하는 파일이면서 1개이상이여야함
            setAvatarFile(event.target.files[0])
        }
    }


    const handleNicknameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewNickname(event.target.value)
    }

    const handleProfileUpdate = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!token) {
            setUpdateError('토큰이 발견되지 않았어요.')
            return
        }

        const formData = new FormData()
        if (avatarFile) formData.append('avatar', avatarFile)
        formData.append('nickname', newNickname)

        // 79~103: try - catch를 이용하여 프로필 업데이트 성공 및 실패 여부 판단하는 로직
        try {
            const response = await fetch(`${import.meta.env.VITE_JWT_SERVER_URL}/profile`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            })

            const data = await response.json()

            if (data.success) {
                setUser({
                    ...user!,
                    avatar: data.avatar,
                    nickname: data.nickname,
                })
                setUpdateSuccess('프로필이 업데이트되었습니다.')
            } else {
                setUpdateError(data.message || '프로필 업데이트에 실패했습니다.')
            }
        } catch (error) {
            console.error('프로필 업데이트에 실패했습니다:', error)
            setUpdateError('프로필 업데이트에 실패했습니다.')
        }
    }

    return {
        setUser,
        user,
        token,
        updateError,
        updateSuccess,
        newNickname,
        avatarFile,
        setNewNickname,
        handleFileChange,
        handleNicknameChange,
        handleProfileUpdate
    }
}
