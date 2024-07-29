import React from 'react'
import useGotoPage from '../../hooks/useGotoPage'
import useUserInfo from '../../hooks/useUserInfo'
import useAuthStore from '../../store/useAuthStore'
import styled from 'styled-components'

const LoginForm: React.FC = () => {
    const { id, nickname, password, onChangeUserId, onChangeUserNickName, onChangeUserPassword, onReset } =
        useUserInfo()
    const { navigate } = useGotoPage()

    const loginHandler = async (event: React.FormEvent) => {
        event.preventDefault()

        try {
            const response = await fetch(`${import.meta.env.VITE_JWT_SERVER_URL}/login`, {
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

            if (data.accessToken) {
                useAuthStore.getState().setToken(data.accessToken) // Zustand를 사용하여 토큰 설정
                navigate('/mypage')
            } else {
                alert(data.message || 'An unknown error occurred')
            }
        } catch (error) {
            console.error('login failed', error)
            alert('로그인 실패하였습니다.')
        }
    }
    return (
        <>
            <form onSubmit={loginHandler}>
                <label>
                    아이디:
                    <StInputIdea
                        type="text"
                        value={id}
                        onChange={onChangeUserId}
                        required
                        placeholder="아이디를 입력해주세요"
                    />
                </label>
                <br></br>

                <label>
                    비밀번호:
                    <StInputPassword
                        type="text"
                        value={password}
                        onChange={onChangeUserPassword}
                        required
                        placeholder="비밀번호를 입력해주세요"
                    />
                </label>
                <br></br>
                <label>
                    닉네임:
                    <StInputNickName
                        type="text"
                        value={nickname}
                        onChange={onChangeUserNickName}
                        required
                        placeholder="닉네임을 입력해주세요 "
                    />
                </label>
                <br></br>
                <StLoginButton type="submit">로그인</StLoginButton>
            </form>
        </>
    )
}

const StInputIdea = styled.input`
    margin: 4px;
    padding: 5px;
`
const StInputPassword = styled.input`
    margin: 4px;
    padding: 5px;
`
const StInputNickName = styled.input`
    margin: 4px;
    padding: 5px;
`

const StLoginButton = styled.button`
    padding: 10px 10px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-left: 300px;
    &:hover {
        background-color: #0056b3;
    }
`

export default LoginForm
