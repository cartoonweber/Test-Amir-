import React from 'react'
import styled from 'styled-components'
import { Box } from '@material-ui/core'
interface Props {
    type: string,
    onClick: any
}
const Button: React.FC<Props> = ({ type, children, onClick }) => {
    return (
        <StyledContainer type={type} onClick={onClick}>
            {children}
        </StyledContainer>
    );
}

const StyledContainer = styled(Box) <{ type: string }>`
    width : 200px;
    height : 65px;
    background-color : ${({ type }) => type === 'primary' ? 'transparent' : 'rgb(253, 136, 19)'};
    border : ${({ type }) => type === 'primary' ? '1px solid rgb(253, 136,19)' : 'none'};
    color : ${({ type }) => type === 'primary' ? 'white' : 'black'};
    display : flex;
    justify-content : center;
    align-items : center;
    border-radius : 100px;
    font-size : 22px;
    font-family : 'Myriad Pro Semibold';
    cursor : pointer;
    transition : all 0.2s;
    :hover{
        box-shadow: 0 4px 8px 0 rgba(253, 136, 19, 0.2), 0 6px 20px 0 rgba(253, 136, 19, 0.19);
    }
    :active{
        opacity : 0.5;
    }
`

export default Button;