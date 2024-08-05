import React from 'react'
import useGotoPage from '../../hooks/useGotoPage'
import useUserInfo from '../../hooks/useUserInfo'
import useAuthStore from '../../store/useAuthStore'
import styled from 'styled-components'
import useCheckBox from '../../hooks/useCheckBox'

const LoginForm: React.FC = () => {
    const { id, nickname, password, onChangeUserId, onChangeUserNickName, onChangeUserPassword, onReset } =
        useUserInfo()
    const { navigate, gotoPageRegist } = useGotoPage()

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
                alert(data.message || '알수 없는 에러가 발생하였습니다.')
            }
        } catch (error) {
            console.error('login failed', error)
            alert('아이디 혹은 비밀번호가 올바르지 않습니다.')
        }
    }

    const { checked, handleCheckboxChange } = useCheckBox()

    return (
        <>
            <StForm onSubmit={loginHandler}>
                <StLabel>
                    아이디
                    <StInput type="text" value={id} onChange={onChangeUserId} required placeholder="아이디" />
                </StLabel>
                <StLabel>
                    비밀번호
                    <StInput
                        type={checked ? 'password' : 'text'}
                        value={password}
                        onChange={onChangeUserPassword}
                        required
                        placeholder="비밀번호"
                    />
                </StLabel>
                {/* 비밀번호 보이게 하기 = 71 ~ 74 번째줄
                   
                       * 사용자가 비밀번호 보기 체크박스를 클릭합니다.  ->  비밀번호 숨기기로 바뀜니다.
                   
                       * 사용자가 비밀번호 보기 체크박스를 재클릭합니다. -> 비밀번호 보이기로 바뀝니다.
                        
                   */}
                <StCheckContainer>
                    <input type="checkbox" checked={checked} onChange={handleCheckboxChange} />{' '}
                    <small>{checked ? '비밀번호 보이기' : '비밀번호 숨기기'}</small>
                </StCheckContainer>
                <StLabel>
                    닉네임
                    <StInput
                        type="text"
                        value={nickname}
                        onChange={onChangeUserNickName}
                        required
                        placeholder="닉네임"
                    />
                </StLabel>
                <StLoginButton type="submit">로그인</StLoginButton>

                <StOptionContainer>
                    <StOptionParam onClick={gotoPageRegist}>회원가입</StOptionParam>
                </StOptionContainer>
            </StForm>
        </>
    )
}

const StForm = styled.form`
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
`

const StLabel = styled.label`
    display: flex;
    flex-direction: column;
    padding: 15px;
    align-items: flex-start;
    font-weight: bold;
    color: #5c667b;
`

const StInput = styled.input`
    width: 360px;
    height: 48px;
    margin: 5px;
`

const StCheckContainer = styled.div`
    margin-left: 250px;
`

const StLoginButton = styled.button`
    width: 360px;
    height: 48px;
    border: 1px solid #4876ef;
    background-color: #4876ef;
    color: #fff;
    border-radius: 4px;
    &:hover {
        font-weight: bold;
        cursor: pointer;
    }
`

const StOptionContainer = styled.div`
    margin: 4px;
    color: #5c667b;
`

const StOptionParam = styled.span`
    cursor: pointer;
    padding: 15px;
`

export default LoginForm
