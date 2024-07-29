import { ChangeEvent, useState } from 'react'

export default function useProfileUpdate() {
    const [newNickname, setNewNickname] = useState<string>('')
    const [avatarFile, setAvatarFile] = useState<File | null>(null)

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setAvatarFile(event.target.files[0])
        }
    }

    const handleNicknameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewNickname(event.target.value)
    }

    return {
        newNickname,
        avatarFile,

        setNewNickname,
        handleFileChange,
        handleNicknameChange,
    }
}
