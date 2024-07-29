import { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import { User } from '../types/types'

import useGotoPage from '../hooks/useGotoPage'
import useAuthStore from '../store/useAuthStore'

const MyPage: React.FC = () => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const [newNickname, setNewNickname] = useState<string>('')
    const [avatarFile, setAvatarFile] = useState<File | null>(null)
    const [updateError, setUpdateError] = useState<string | null>(null)
    const [updateSuccess, setUpdateSuccess] = useState<string | null>(null)

    const { gotoPageTodo, navigate } = useGotoPage()
    const { token } = useAuthStore((state) => state)

    const logOutHandler = () => {
        useAuthStore.getState().clearToken() // Zustand를 사용하여 토큰 제거
        navigate('/login')
    }

    // 15~18: 로그아웃 함수

    // 21~60 :jwt서버로부터  사용자데이터를 가져오는 로직
    useEffect(() => {
        const fetchUserData = async () => {
            if (!token) {
                setError('토큰이 발견되지 않았어요.')
                navigate('/login')
                return
            }

            try {
                const response = await fetch(`${import.meta.env.VITE_JWT_SERVER_URL}/user`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                })

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`)
                }

                const data = await response.json()

                if (data.success) {
                    setUser(data)
                    setNewNickname(data.nickname || '')
                } else {
                    setError('사용자 프로필을 가져오는 데 실패했습니다.')
                }
            } catch (error) {
                console.error('프로필 가져오기에 실패했습니다:', error)
                setError('프로필 가져오기에 실패했습니다.')
            } finally {
                setLoading(false)
            }
        }

        fetchUserData()
    }, [])

    // 63 : 사용자프로필을 업데이트 하는 함수
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

    // 104: 사용자가 파일탐색기에서 선택한 프로필 이미지 파일
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setAvatarFile(event.target.files[0])
        }
    }

    // 111: 사용자의 닉네임을 변경해주는 값을 담은 함수
    const handleNicknameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewNickname(event.target.value)
    }

    // 117 : 로딩중을 반환하는 로직
    // 118 : 실패시 에러를 반환하는 로직
    if (loading) return <p>로딩 중...</p>
    if (error) return <p>{error}</p>

    return (
        <div>
            <header>
                <h1>나의 페이지</h1>
                <ul>
                    <li>
                        <button onClick={logOutHandler}>로그아웃</button>
                    </li>
                    <li>
                        <a onClick={gotoPageTodo}>할일 목록</a>
                    </li>
                </ul>
            </header>

            <div>
                {user ? (
                    <div>
                        <h4>나의 정보</h4>
                        <div>
                            <p>아이디: {user.id}</p>
                            <p>닉네임: {user.nickname}</p>
                            {user.avatar ? <img src={user.avatar} alt="아바타" /> : <p>아바타가 없습니다.</p>}
                        </div>
                    </div>
                ) : (
                    <p>사용자 데이터가 없습니다.</p>
                )}
            </div>

            <form onSubmit={handleProfileUpdate}>
                <div>
                    <label htmlFor="nickname">닉네임:</label>
                    <input type="text" id="nickname" value={newNickname} onChange={handleNicknameChange} required />
                </div>
                <div>
                    <label htmlFor="avatar">아바타 이미지:</label>
                    <input type="file" id="avatar" accept="image/*" onChange={handleFileChange} required />
                </div>
                <button type="submit">프로필 업데이트</button>
            </form>

            {updateSuccess && <p>{updateSuccess}</p>}
            {updateError && <p>{updateError}</p>}
        </div>
    )
}

export default MyPage
