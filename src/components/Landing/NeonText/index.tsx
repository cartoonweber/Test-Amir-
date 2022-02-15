import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Box } from '@material-ui/core'
import style from './style.module.css';

interface Props {
    shadow: string,
    fontSize: string,
    color: string,
    textAlign?: string
}
const NeonText: React.FC<Props> = ({ shadow, children, fontSize, color, textAlign }) => {

    return (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <StyledText shadow={shadow} fontSize={fontSize} color={color} textAlign={textAlign}>
            {children}
        </StyledText>
    )
}

const StyledText = styled(Box) <{ shadow: any, fontSize: string, color: string, textAlign : string }>`
    color : ${({ color }) => color};
    font-size : ${({ fontSize }) => fontSize};
    font-family : MontserratExtraBold;
    text-shadow: ${({ fontSize, shadow }) => `0px 0px calc(${fontSize} / 80 * 30) ${shadow}`};
    line-height : ${({ fontSize }) => `calc(${fontSize} / 80 * 90)`};
    font-size : ${({ textAlign }) => textAlign};
`;
export default NeonText