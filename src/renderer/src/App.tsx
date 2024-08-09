import styled, { createGlobalStyle } from "styled-components";
import { faFileImport, faPlus } from '@fortawesome/free-solid-svg-icons'
// 导入公共组件
import SearchFile from "./components/SearchFile";
import FileList from "./components/FileList";
import ButtonItem from "./components/ButtonItem";
import TabList from "./components/TabList";

// 模拟文件数据
const initFiles = [
    { id: "1", title: "文件000000000222123333321", body: "文件内容1", createTime: "12345678" },
    { id: "2", title: "文件2", body: "文件内容2", createTime: "12345678" },
    { id: "3", title: "文件3222", body: "文件内容3", createTime: "12345678" },
]

const App = () => {
    return (
        <>
            <GlobalStyle />
            <Container>
                <LeftDiv>
                    <SearchFile title={'我的文档'} onSearch={(value: string)=> {
                        console.log(value)
                    }}></SearchFile>
                    <FileList 
                        files={initFiles} 
                        editFile={(id: string)=>{ console.log(id) }}
                        saveFile={(id: string, value: string) => console.log(id, value) }
                        deteleFile={(id: string)=>{ console.log("删除", id) }}
                    ></FileList>
                    {/* 按钮容器 */}
                    <ContainerBtn>
                        <ButtonItem title={'新建'} icon={faPlus} btnClick={()=> {}} />
                        <ButtonItem title={'导入'} icon={faFileImport} btnClick={()=> {}} />
                    </ContainerBtn>
                </LeftDiv>
                <RightDiv>
                    <TabList 
                        files={initFiles}   
                        activeItem={'1'} 
                        unSaveItems={['1', '2']} 
                        clickItem={(id: string)=>{ console.log("点击", id)}}
                        closeItem={(id: string)=>{ console.log("关闭", id)}}
                    />
                </RightDiv>
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
        box-sizing: border-box;
        font-family: sans-serif;
    }
    a {
        text-decoration: none;
        color:inherit;
        cursor:auto;
    }
`
// 样式组件
const Container = styled.div` // 初始容器
    width: 100%;
    height: 100vh;
    display: flex;
`;
const LeftDiv = styled.div` // 左边容器
    position: relative;
    width: 30%;
    height: 100%;
    background-color: #008c8c;
`
const ContainerBtn = styled.div` // 中间容器
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
 background: rgba(63,94,251. 5);
background: radial-gradient(circle, rgba(63,94,251,0.3) 0%, rgba(70,216,252,.3) 100%); 
`
const RightDiv = styled.div` // 右边容器
    width: 70%;
    height: 100%;
    background-color: #fff;
`