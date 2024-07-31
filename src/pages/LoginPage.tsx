import React from 'react'


import styled from 'styled-components'
import LoginForm from '../components/login/LoginForm'
import Header from '../common/Header'

const Login: React.FC = () => {

    return (
        <StContainer>
        <Header headerContent='로그인'/>
        <LoginForm />
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





export default Login
