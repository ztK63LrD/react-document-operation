import styled, { createGlobalStyle } from "styled-components";
// 导入公共组件
import SearchFile from "./components/SearchFile";

const App = () => {
    return (
        <>
            <GlobalStyle />
            <Container>
                <LeftDiv>
                    <SearchFile title={'我的文档'} onSearch={(value)=> {
                        console.log(value)
                    }}></SearchFile>
                </LeftDiv>
                <RightDiv>右侧</RightDiv>
            </Container>
        </>
    );
}

export default App;
// 设置全局样式
const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        font-family: sans-serif;
    }
`
// 样式组件
const Container = styled.div` // 初始容器
    width: 100%;
    height: 100vh;
    display: flex;
`;
const LeftDiv = styled.div` // 左边容器
    width: 30%;
    height: 100%;
    background-color: #008c8c;
`
const RightDiv = styled.div` // 右边容器
    width: 70%;
    height: 100%;
    background-color: #fff;
`