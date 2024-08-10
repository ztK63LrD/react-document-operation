import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faSearch } from '@fortawesome/free-solid-svg-icons'
import { useKeyHandler } from '@renderer/hooks/useKeyHandler'

const SearchFile = ({ title, onSearch }: { title: string; onSearch: (value: string) => void }) => {
    const [ searchActive, setSearchActive ] = useState<boolean>(false) // 是否显示搜索框
    const [ value, setValue ] = useState<string>('') // 搜索框的值
    const inputRef = useRef<HTMLInputElement>(null) // 获取输入框实例
    const enterPressed = useKeyHandler(13) // 回车键
    const escPressed = useKeyHandler(27) // 取消键

    // 关闭搜索框
    const closeSearch = () => {
        setSearchActive(false)
        setValue('')
        // 当关闭搜索功能时，提供空字符满足没有数据显示情况
        onSearch('')
    }
    // 监听键盘事件
    useEffect(()=> {
        // 监听键盘事件
        if (enterPressed && searchActive) {
            onSearch(value)
        }
        if (escPressed && searchActive) {
            closeSearch()
        }
    })

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