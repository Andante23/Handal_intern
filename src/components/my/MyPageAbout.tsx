import React from 'react'
import { UserProps } from '../../types/types'
import styled from 'styled-components'

const MyPageAbout: React.FC<UserProps> = ({ user }) => {
    return (
        <StContainer>
            <StInfoContainer>
                {user ? (
                    <>
                        <StAvatarWrapper>
                            {user.avatar ? <StAvatar src={user.avatar} alt="아바타" /> : '아바타가 없습니다.'}
                        </StAvatarWrapper>
                        <StAvatarInfo>
                            <h3>내 정보</h3>
                            <StInfoItem>
                                <strong>아이디:</strong> {user.id}
                            </StInfoItem>
                            <StInfoItem>
                                <strong>닉네임:</strong> {user.nickname}
                            </StInfoItem>
                        </StAvatarInfo>
                    </>
                ) : (
                    <p>사용자 데이터가 없습니다.</p>
                )}
            </StInfoContainer>
        </StContainer>
    )
}

const StContainer = styled.div``

const StInfoContainer = styled.div`
    display: flex;
`

const StInfoItem = styled.p``

const StAvatarWrapper = styled.div``

const StAvatar = styled.img`
    width: 200px;
    height: 200px;
`

const StAvatarInfo = styled.div`
    margin: 10px;
`

export default MyPageAbout
