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
                    <TabItem 
                        $isActive={activeItem === item.id}
                        key={item.id} 
                        onClick={(e: any) => { e.preventDefault(); clickItem(item.id) }}
                    >
                        <TabItemName>{ item.title }</TabItemName>
                        <TabItemIcon onClick={(e: any) => { e.stopPropagation(); closeItem(item.id) }}>
                            <FontAwesomeIcon className='close' icon={faTimes} />
                        </TabItemIcon>
                        { isUnSave && (
                            <FontAwesomeIcon className='circle' icon={faCircle} onClick={(e: any) => { e.stopPropagation(); closeItem(item.id) }} />
                        ) }
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
    display: flex;
    border-bottom: 1px dashed #ccc;
`
const TabItem = styled.div<{ $isActive?: boolean }>`
    position: relative;
    height: 50px;
    display: flex;
    cursor: pointer;
    background-color: ${props => props.$isActive ? '#0078d4' : 'white'};
    color: ${props => props.$isActive ? 'white' : '#0078d4'};
    &:hover {
        background-color: ${props => !props.$isActive && 'rgba(0,120,212,.3)'};
    }
    .circle {
        position: absolute;
        top: 15px;
        right: 5px;
        width: 20px;
        height: 20px;
        border-radius: 4px;
        color: red;
        &:hover {
            width: 20px;
            height: 20px;
            border-radius: 4px;
            background-color: rgba(0,0,0,.3);
            color: transparent;            
        }
    }
`

const TabItemName = styled.div`
    max-width: 120px;
    height: 50px;
    line-height: 50px;
    padding: 0px 5px;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    font-family: '楷体';
    white-space: nowrap;  /* 禁用换行 */
    overflow: hidden;     /* 隐藏超出部分 */
    text-overflow: ellipsis; /* 超出部分用省略号代替 */
    user-select: none;
`
const TabItemIcon = styled.div<{ $unSave?: boolean }>`
    width: 20px;
    padding-right: 5px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .close {
        width: 20px;
        height: 20px;
        font-size: 18px;
        &:hover {
            width: 20px;
            height: 20px;
            border-radius: 4px;
            background-color: rgba(0,0,0,.3);
        }
    }
`
