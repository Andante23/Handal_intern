import React from 'react'
import LoginForm from '../components/login/LoginForm'
import useGotoPage from '../hooks/useGotoPage'
import styled from 'styled-components'

const Login: React.FC = () => {
    const { gotoPageRegist } = useGotoPage()
    return (
        <StLoginDashBoard>
            <header>
                <h1>Login</h1>
            </header>
            <LoginForm />

            <StGotoRegisterPage>
                Don't have an account?
                <b>
                    <span onClick={gotoPageRegist}> Register</span>
                </b>
            </StGotoRegisterPage>
        </StLoginDashBoard>
    )
}

// 로그인폼을 깜싸고 있는  article 디자인
const StLoginDashBoard = styled.article`
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #fff;

    /* article 내부의 header 와 h1태그 */
    header {
        text-align: center;
        margin-bottom: 20px;

        h1 {
            font-size: 24px;
            color: #333;
            margin: 0;
        }
    }
`

// Don't have an account? Register 부분 디자인
const StGotoRegisterPage = styled.p`
    text-align: center;
    margin-top: 20px;
    font-size: 14px;
    color: #555;

    b {
        color: #007bff;
        cursor: pointer;
        text-decoration: underline;

        &:hover {
            color: #0056b3;
        }
    }
`

export default Login
