import { useEffect, useState } from 'react'

import useGotoPage from '../hooks/useGotoPage'
import styled from 'styled-components'

import useUserInfo from '../hooks/useUserInfo'
import LoadingBar from '../common/LoadingBar'
import useProfileUpdate from '../hooks/useProfileUpdate'

import MyPageAbout from '../components/my/MyPageAbout'
import ErrorComponent from '../common/ErrorComponent'

const MyPage: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false)

    const { gotoPageTodo, navigate } = useGotoPage()
    const { logOutHandler } = useUserInfo()

    const {
        token,
        setUser,
        user,
        handleProfileUpdate,
        updateError,
        updateSuccess,
        handleFileChange,
        handleNicknameChange,
        newNickname,
        setNewNickname,
    } = useProfileUpdate()

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

    const formOpenChange = (): void => {
        setIsFormOpen(true)
    }

    const formCloseHandler = (): void => {
        setIsFormOpen(false)
    }

    if (loading) return <LoadingBar />
    if (error) return <ErrorComponent error={error} />

    return (
        <StContainer>
            <StHeader>
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
                <MyPageAbout user={user} />
            </StProfileSection>

            {/* 

               *** 사용자 정보 변경 폼 모달 ***

                - 기본 상태는  140 ~ 142 번째 줄처럼 버튼이 보입니다.
                - 140 ~ 142 번째 버튼 클릭시 113 ~ 138번처럼 폼이 나옴니다.
            
            */}
            {isFormOpen === true ? (
                <>
                    <div>
                        <StForm onSubmit={handleProfileUpdate}>
                            <button onClick={formCloseHandler}>X</button>

                            <StFormGroup>
                                <label htmlFor="nickname">닉네임:</label>
                                <StInput
                                    type="text"
                                    id="nickname"
                                    value={newNickname}
                                    onChange={handleNicknameChange}
                                    required
                                />
                            </StFormGroup>
                            <StFormGroup>
                                <label htmlFor="avatar">아바타 이미지:</label>
                                <StInput
                                    type="file"
                                    id="avatar"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    required
                                />
                            </StFormGroup>
                            <StSubmitButton type="submit">프로필 업데이트</StSubmitButton>
                        </StForm>
                    </div>
                </>
            ) : (
                <>
                    <button onClick={formOpenChange}>정보 변경시 이용해주세요</button>
                </>
            )}

            {updateSuccess && <StSuccessMessage>{updateSuccess}</StSuccessMessage>}
            {updateError && <StErrorMessage>{updateError}</StErrorMessage>}
        </StContainer>
    )
}

const StContainer = styled.div``

const StHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const StNav = styled.ul`
    display: flex;
    list-style-type: none;
`

const StNavItem = styled.li`
    padding: 4px;
`

const StButton = styled.span`
    border-style: none;

    &:hover {
        cursor: pointer;
        color: black;
        font-weight: bold;
    }
`

const StLink = styled.a``

const StProfileSection = styled.section``

const StForm = styled.form``

const StFormGroup = styled.div``

const StInput = styled.input``

const StSubmitButton = styled.button``

const StSuccessMessage = styled.p``

const StErrorMessage = styled.p``

export default MyPage
