import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faSearch } from '@fortawesome/free-solid-svg-icons'

const SearchFile = ({ title, onSearch }) => {
    const [ searchActive, setSearchActive ] = useState(false)
    const [ value, setValue ] = useState('')
    // 获取输入框实例
    const inputRef = useRef<HTMLInputElement>(null)

    // 关闭搜索框
    const closeSearch = () => {
        setSearchActive(false)
        setValue('')
    }
   
    // 监听键盘事件
    useEffect(() => {
        const ListenKeyWord = (e) => {
            const { keyCode } = e
            if ( keyCode === 13 && searchActive ) {
                onSearch(value)
            }
            if ( keyCode === 27 && searchActive ) {
                closeSearch()
            }
        }
        document.addEventListener('keyup', ListenKeyWord)
        // 组件加载时获取焦点
        return () => { // 组件卸载时移除监听事件
            document.removeEventListener('keyup', ListenKeyWord)
        }
    }, [searchActive, value, onSearch])
    // 实现输入框聚焦
    useEffect(() => {
        if (searchActive && inputRef.current) {
            inputRef.current.focus()
        }
    }, [searchActive])
    return (
        <>
            {/* 默认文字显示 */}
            { !searchActive && (
                <SearchDiv>
                    <Span>{ title }</Span>
                    <Span onClick={()=> { setSearchActive(true) }}>
                        <FontAwesomeIcon icon={faSearch} />
                    </Span>
                </SearchDiv>

            )}
            {/* 点击文字则显示搜索框 */}
            { searchActive && (
                <SearchDiv>
                    <Input value={value} ref={inputRef} onChange={(e)=> {
                        setValue(e.target.value)
                    }} />
                    <Span onClick={closeSearch}>
                        <FontAwesomeIcon icon={faTimes} />
                    </Span>
                </SearchDiv>
            )}
        </>
    )
}

export default SearchFile
// 样式组件
const SearchDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #fff;
`
const Span = styled.span`
    color: #fff;
    padding: 5px 15px;
    font: normal 16px/40px '微软雅黑';
    cursor: pointer;
    user-select: none;
`
const Input = styled.input.attrs({
    type: 'text',
    placeholder: '搜索文件'
})`
    width: 100%;
    height: 25px;
    border: none;
    outline: none;
    border-radius: 1px;
    margin-left: 10px;
`