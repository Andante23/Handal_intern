import React from 'react'
import useGotoPage from '../../hooks/useGotoPage'
import useUserInfo from '../../hooks/useUserInfo'
import styled from 'styled-components'
import useCheckBox from '../../hooks/useCheckBox'

const RegisterForm: React.FC = () => {
    const { gotoPageLogin } = useGotoPage()
    const { id, nickname, password, onChangeUserId, onChangeUserNickName, onChangeUserPassword, registSubmitHandler } =
        useUserInfo()

    const { checked, handleCheckboxChange } = useCheckBox()

    return (
        <StForm onSubmit={registSubmitHandler}>
            <StLabel>
                아이디
                <StInput type="text" value={id} onChange={onChangeUserId} required placeholder="아이디" />
            </StLabel>
            <StLabel>
                비밀번호
                <StInput
                    type={checked === false ? 'password' : 'text'}
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
                <small>{checked === false ? '비밀번호 보이기' : '비밀번호 숨기기'}</small>
            </StCheckContainer>
            <StLabel>
                닉네임
                <StInput type="text" value={nickname} onChange={onChangeUserNickName} required placeholder="닉네임" />
            </StLabel>
            <StLoginButton type="submit">회원가입</StLoginButton>

            <StOptionContainer>
                <StOptionParam onClick={gotoPageLogin}>로그인</StOptionParam>
            </StOptionContainer>
        </StForm>
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

export default RegisterForm
