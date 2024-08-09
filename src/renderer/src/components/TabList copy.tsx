import { useState, useRef } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCircle } from '@fortawesome/free-solid-svg-icons'

interface TabListProps {
    files: any[]
    activeItem: string
    unSaveItems: any[]
    clickItem: (id: string) => void
    closeItem: (id: string) => void
}

const TabList = ({ files, activeItem, unSaveItems, clickItem, closeItem }: TabListProps) => {
    return (
        <TabDiv>
            { files.map(item => {
                let isUnSave = unSaveItems.includes(item.id)
                return (
                    <TabItem $isActive={activeItem === item.id} key={item.id}>
                        <TabItemA href="#" onClick={(e: any) => { e.preventDefault(); clickItem(item.id) }}>
                            { item.title }
                            <TabItemSpan onClick={(e: any) => { e.stopPropagation(); closeItem(item.id) }}>
                                <FontAwesomeIcon className='icon' icon={faTimes} />
                            </TabItemSpan>
                            { isUnSave && <TabItemSpan $unSave={isUnSave}><FontAwesomeIcon className='icon1' icon={faCircle} /></TabItemSpan>}
                        </TabItemA>
                    </TabItem>
                )
            }) }
        </TabDiv>
    )
}

export default TabList
// 样式组件
const TabDiv = styled.div`
    width: 100%;
    height: 50px;
    display: flex;

`
const TabItem = styled.div<{ $isActive?: boolean }>`
    min-width: 100px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: bold;
    font-family: '楷体';
    cursor: pointer;
    user-select: none;
    background-color: ${props => props.$isActive ? '#0078d4' : 'white'};
    color: ${props => props.$isActive ? 'white' : '#0078d4'};
`
const TabItemA = styled.a`
    cursor: pointer;
`
const TabItemSpan = styled.span<{ $unSave?: boolean }>`
    display: inline-block;
    &:hover .icon1{
       display: none;
    }
    .icon {
        margin-left: 15px;
        font-size: 18px;
        &:hover {
            color: red;
            scale: 1.4;
            transition: all 0.3s;

        }
    }
    .icon1 {
        margin-left: -15px;
        font-size: 18px;
        color: ${props => props.$unSave ? 'red' : '#0078d4'};
        // &:hover {
        //     display: none;
        // }
    }
`