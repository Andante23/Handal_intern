import React from 'react'
import IsNotFound from '../../common/IsNotFound'
import { UserProps } from '../../types/types'
import styled from 'styled-components'

const MyPageAbout: React.FC<UserProps> = ({ user }) => {
    return (
        <StContainer>
            <StHeader>나의 정보</StHeader>
            <StInfoContainer>
                <StInfoItem>
                    <strong>아이디:</strong> {user.id}
                </StInfoItem>
                <StInfoItem>
                    <strong>닉네임:</strong> {user.nickname}
                </StInfoItem>
                <StAvatarWrapper>
                    {user.avatar ? <StAvatar src={user.avatar} alt="아바타" /> : <IsNotFound />}
                </StAvatarWrapper>
            </StInfoContainer>
        </StContainer>
    )
}

const StContainer = styled.div`
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`

const StHeader = styled.h4`
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
    text-align: center;
`

const StInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const StInfoItem = styled.p`
    font-size: 18px;
    color: #555;
    margin: 8px 0;
`

const StAvatarWrapper = styled.div`
    margin-top: 20px;
`

const StAvatar = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 2px solid #ddd;
    object-fit: cover;
`

export default MyPageAbout
