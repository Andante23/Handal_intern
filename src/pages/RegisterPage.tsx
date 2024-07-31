import React from 'react'
import RegisterForm from '../components/register/RegisterForm'
import styled from 'styled-components'
import Header from '../common/Header'
const RegisterPage: React.FC = () => {
    return (
        <StContainer>
            <Header  headerContent='회원가입' />
            <RegisterForm />
        </StContainer>
    )
}

const StContainer = styled.div`
    max-width: 500px;
    margin: 40px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`



export default RegisterPage
