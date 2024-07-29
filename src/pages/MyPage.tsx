import { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import { User } from '../types/types'

import useGotoPage from '../hooks/useGotoPage'
import useAuthStore from '../store/useAuthStore'
import styled from 'styled-components'

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
        <StContainer>
            <StHeader>
                <h1>나의 페이지</h1>
                <StNav>
                    <StNavItem>
                        <StButton onClick={logOutHandler}>로그아웃</StButton>
                    </StNavItem>
                    <StNavItem>
                        <StLink onClick={gotoPageTodo}>할일 목록</StLink>
                    </StNavItem>
                </StNav>
            </StHeader>

            <StProfileSection>
                {user ? (
                    <>
                        <h4>나의 정보</h4>
                        <StUserInfo>
                            <p>
                                <strong>아이디:</strong> {user.id}
                            </p>
                            <p>
                                <strong>닉네임:</strong> {user.nickname}
                            </p>
                            <StAvatarWrapper>
                                {user.avatar ? <StAvatar src={user.avatar} alt="아바타" /> : <p>아바타가 없습니다.</p>}
                            </StAvatarWrapper>
                        </StUserInfo>
                    </>
                ) : (
                    <p>사용자 데이터가 없습니다.</p>
                )}
            </StProfileSection>

            <StForm onSubmit={handleProfileUpdate}>
                <StFormGroup>
                    <label htmlFor="nickname">닉네임:</label>
                    <StInput type="text" id="nickname" value={newNickname} onChange={handleNicknameChange} required />
                </StFormGroup>
                <StFormGroup>
                    <label htmlFor="avatar">아바타 이미지:</label>
                    <StInput type="file" id="avatar" accept="image/*" onChange={handleFileChange} required />
                </StFormGroup>
                <StSubmitButton type="submit">프로필 업데이트</StSubmitButton>
            </StForm>

            {updateSuccess && <StSuccessMessage>{updateSuccess}</StSuccessMessage>}
            {updateError && <StErrorMessage>{updateError}</StErrorMessage>}
        </StContainer>
    )
}

const StContainer = styled.div`
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`

const StHeader = styled.header`
    text-align: center;
    margin-bottom: 20px;
`

const StNav = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    gap: 10px;
`

const StNavItem = styled.li`
    display: inline;
`

const StButton = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }
`

const StLink = styled.a`
    color: #007bff;
    cursor: pointer;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`

const StProfileSection = styled.section`
    margin-bottom: 20px;
`

const StUserInfo = styled.div`
    text-align: center;
`

const StAvatarWrapper = styled.div`
    margin-top: 10px;
`

const StAvatar = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 2px solid #ddd;
    object-fit: cover;
`

const StForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`

const StFormGroup = styled.div`
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 5px;

    label {
        font-size: 16px;
        color: #333;
    }
`

const StInput = styled.input`
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
    box-sizing: border-box;
`

const StSubmitButton = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    background-color: #28a745;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #218838;
    }
`

const StSuccessMessage = styled.p`
    color: #28a745;
    text-align: center;
`

const StErrorMessage = styled.p`
    color: #dc3545;
    text-align: center;
`

export default MyPage
