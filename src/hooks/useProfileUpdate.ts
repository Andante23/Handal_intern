import { ChangeEvent, useState } from 'react'

export default function useProfileUpdate() {
    const [newNickname, setNewNickname] = useState<string>('')
    const [avatarFile, setAvatarFile] = useState<File | null>(null)


    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) { //=> 해당하는 파일이면서 1개이상이여야함
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
