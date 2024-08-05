import React from 'react'
import styled from 'styled-components'
import { HeaderProps } from '../types/types'

//=> 공용헤더
const Header: React.FC<HeaderProps> = ({ headerContent }) => {
    return (
        <>
            <StHeader>{headerContent}</StHeader>
        </>
    )
}

const StHeader = styled.h1`
    text-align: center;
`

export default Header
