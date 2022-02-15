import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Box } from '@material-ui/core'
import style from './style.module.css';

const JoinButton: React.FC = () => {

    return (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <StyledContainer>
            <StyledButton className={`${style.btn} ${style.btnwhite} ${style.btnanimate}`}>Join the movement</StyledButton>
        </StyledContainer>
    )
}

const StyledContainer = styled(Box)`
    position : relative;
    width : 100%;
    height : calc(100vw / 1440 * 82);
    max-width : calc(100vw / 1440 * 464);
    margin : calc(100vw / 1440 * 50) auto  auto;

    @media screen and (max-width : 700px){
        max-width : 70%;
        height : 50px;
        margin-top : 60px;
        font-size : 20px;
    }
`;
const StyledButton = styled(Box)`
    @media screen and (max-width : 700px){
        font-size : 20px;
    }
    width : 100%;
    height : 100%;
    font-size : calc(100vw / 1440 * 35);
    display : flex;
    justify-content : center;
    align-items : center;
    border-radius : 50px;
    cursor : pointer;
    transition : background-color 0.3s;
`
export default JoinButton