import React from 'react'
import useGotoPage from '../../hooks/useGotoPage'
import useUserInfo from '../../hooks/useUserInfo'
import styled from 'styled-components'

const RegisterForm: React.FC = () => {
    const { gotoPageLogin } = useGotoPage()
    const { id, nickname, password, onChangeUserId, onChangeUserNickName, onChangeUserPassword, registSubmitHandler } =
        useUserInfo()


        




    return (
        <StFormContainer>
            <StForm onSubmit={registSubmitHandler}>
                <StFormGroup>
                    <label htmlFor="id">아이디:</label>
                    <StInput
                        type="text"
                        id="id"
                        value={id}
                        onChange={onChangeUserId}
                        required
                        placeholder="아이디를 입력해주세요"
                        
                    />
                </StFormGroup>
                <StFormGroup>
                    <label htmlFor="password">비밀번호:</label>
                    <StInput
                        type="password"
                        id="password"
                        value={password}
                        onChange={onChangeUserPassword}
                        required
                        placeholder="비밀번호를 입력해주세요"
                    />
                </StFormGroup>
                <StFormGroup>
                    <label htmlFor="nickname">닉네임:</label>
                    <StInput
                        type="text"
                        id="nickname"
                        value={nickname}
                        onChange={onChangeUserNickName}
                        required
                        placeholder="닉네임을 입력해주세요"
                    />
                </StFormGroup>
                <StSubmitButton type="submit">회원가입</StSubmitButton>
            </StForm>
            <StLoginLink>
                계정이 있다면
                <b>
                    <StLink onClick={gotoPageLogin}>로그인</StLink>
                </b>
            </StLoginLink>
        </StFormContainer>
    )
}

const StFormContainer = styled.div`
    max-width: 400px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`

const StForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
`

const StFormGroup = styled.div`
    display: flex;
    flex-direction: column;

    label {
        font-size: 16px;
        color: #333;
        margin-bottom: 5px;
    }
`

const StInput = styled.input`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    width: 100%;
    box-sizing: border-box;
`

const StSubmitButton = styled.button`
    padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }
`

const StLoginLink = styled.p`
    text-align: center;
    margin-top: 20px;
`

const StLink = styled.span`
    color: #007bff;
    cursor: pointer;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`

export default RegisterForm
