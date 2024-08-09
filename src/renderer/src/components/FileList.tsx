import { useState, useRef } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt, faEdit, faTrashAlt, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useKeyHandler } from '@renderer/hooks/useKeyHandler'

// props数据类型
interface propsTypes {
    files: Array<{ id: string, title: string, body: string, createTime: string }>;
    editFile: (id: string) => void;
    saveFile: (id: string, value: string) => void;
    deteleFile: (id: string) => void;
}

const FileList = ({ files, editFile, saveFile, deteleFile }: propsTypes) => {
    const inputRef = useRef<HTMLInputElement>(null) // 获取输入框实例
    const [ editItem, setEditItem ] = useState<string>('') // 是否是编辑菜单项状态
    const [ value, setValue ] = useState<string>('') // 菜单项名称
    const enterPressed = useKeyHandler(13) // 回车键
    const escPressed = useKeyHandler(27) // 取消键
    
    // 监听键盘事件
    if (enterPressed && !!editItem) {
        saveFile(editItem, value)
        setEditItem('')
    }
    if (escPressed && !!editItem) {
        setEditItem('')
    }
    return (
        <GroupMenu>
            { files.map(item => {
                return (
                    <MenuItem key={item.id}>
                        { item.id !== editItem ? (
                            <>
                                <FontAwesomeIcon className='icon1' icon={faFileAlt} />
                                <span onClick={() => { editFile(item.id) }}>{ item.title }</span>
                                <FontAwesomeIcon className='icon2' icon={faTrashAlt} onClick={() => deteleFile(item.id) } />
                                <FontAwesomeIcon className='icon3' icon={faEdit} onClick={() => {
                                    setValue('') // 清空输入框
                                    setEditItem(item.id)  // 打开编辑菜单项
                                }} />
                            </>
                        ) : (
                            <>
                                <FontAwesomeIcon className='icon1' icon={faFileAlt} />
                                <MenuInput value={value} ref={inputRef} onChange={(e: any) => setValue(e.target.value)} />
                                <FontAwesomeIcon className='icon3' icon={faTimes} onClick={() => setEditItem('') } />
                            </>
                        ) }
        
                    </MenuItem>
                )
            }) }
        </GroupMenu>
    )
    
}

export default FileList
// 样式组件
const GroupMenu = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
`

const MenuItem = styled.div`
    widht: 100%;
    height: 45px;
    display: flex;
    align-items: center;
    padding: 0 45px;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    font-family: '楷体';
    cursor: pointer;
    user-select: none;
    span {
        white-space: nowrap;  /* 禁用换行 */
        overflow: hidden;     /* 隐藏超出部分 */
        text-overflow: ellipsis; /* 超出部分用省略号代替 */
    }
    &:hover {
        background-color: #354052;
        font-size: 20px;
        padding: 0 50px;
        color: #0f0f;
        transition: all .4s;
    }
    .icon1, .icon2, .icon3 {
        position: absolute;
        font-size: 14px;
        &:hover {
            transform: scale(1.5);
            color: red;
            transition: all .4s;
        }
    }
    .icon1 {
        left: 20px;
    }
    .icon2 {
        right: 50px;
    }
    .icon3 {
        right: 20px;
    }
`

const MenuInput = styled.input`
    height: 25px;
    border: none;
    outline: none;
`