import React from 'react'
import RegisterForm from '../components/register/RegisterForm'
import styled from 'styled-components'
import Header from '../common/Header'

const RegisterPage: React.FC = () => {
    return (
        <>
            <Header headerContent="회원가입" />
            <StContainer>
                <RegisterForm />
            </StContainer>
        </>
    )
}

const StContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`
export default RegisterPage
