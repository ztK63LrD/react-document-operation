import { useState, useRef } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface ButtonItemProps {
    title: string,
    btnClick?: () => void,
    icon: any
}

const ButtonItem = ({ title, btnClick, icon }: ButtonItemProps) => {
    return (
        <BtnDiv>
            <FontAwesomeIcon style={{ marginRight: '10px' }} icon={icon} />
            { title }
        </BtnDiv>
    )
}

export default ButtonItem
// 样式组件
const BtnDiv = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    cursor: pointer;
    font-size: 18px;
    user-select: none;
    &:hover {
        background-color: #15ad7a;
        border-radius: 5px 5px 5px 5px;
    }
    &:active {
        background-color: #00fc17;
    }
`