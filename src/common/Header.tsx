import React from "react"
import styled from "styled-components"
import { HeaderProps } from "../types/types"




const HeaderPage: React.FC<HeaderProps> = ({headerContent}) => {

    return(
        <>
                 <StHeader>{headerContent}</StHeader>
        </>
    )

}


const StHeader = styled.h1`
    text-align: center;
    color: #333;
    margin-bottom: 20px;
`


export default HeaderPage;