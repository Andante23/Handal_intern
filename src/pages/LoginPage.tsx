import React from 'react'

import styled from 'styled-components'
import LoginForm from '../components/login/LoginForm'
import Header from '../common/Header'

const Login: React.FC = () => {
    return (
        <>
            <Header headerContent="로그인" />
            <StContainer>
                <LoginForm />
            </StContainer>
        </>
    )
}

// stContainer를 깜싸고 있는 부분을 수평 - 수직 정렬한 것
const StContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`

export default Login
