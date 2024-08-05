import React from 'react'
import { UserProps } from '../../types/types'
import styled from 'styled-components'

const MyPageAbout: React.FC<UserProps> = ({ user }) => {
    return (
        <StContainer>
            <StHeader>My Profile</StHeader>
            <StInfoContainer>
                <StInfoItem>
                    <strong>아이디:</strong> {user.id}
                </StInfoItem>
                <StInfoItem>
                    <strong>닉네임:</strong> {user.nickname}
                </StInfoItem>
                <StAvatarWrapper>
                    {user.avatar ? <StAvatar src={user.avatar} alt="아바타" /> : '아바타가 없습니다.'}
                </StAvatarWrapper>
            </StInfoContainer>
        </StContainer>
    )
}

const StContainer = styled.div``

const StHeader = styled.h4``

const StInfoContainer = styled.div``

const StInfoItem = styled.p``

const StAvatarWrapper = styled.div``

const StAvatar = styled.img`
    width: 200px;
    height: 200px;
`

export default MyPageAbout
