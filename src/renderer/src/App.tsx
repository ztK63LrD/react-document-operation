import { useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import styled, { createGlobalStyle } from "styled-components";
import { faFileImport, faPlus } from '@fortawesome/free-solid-svg-icons'
// 导入公共组件
import SearchFile from "./components/SearchFile";
import FileList from "./components/FileList";
import ButtonItem from "./components/ButtonItem";
import TabList from "./components/TabList";
import img from "./assets/bg.gif";

interface filesTypes {
    id: string;
    title: string;
    body: string;
    createTime: string;
}

// 模拟文件数据
const initFiles = [
    { id: "1", title: "文件000000000222123333321", body: "文件内容1", createTime: "12345678" },
    { id: "2", title: "文件2", body: "文件内容2", createTime: "12345678" },
    { id: "3", title: "文件3222", body: "文件内容3", createTime: "12345678" },
]

const App = () => { 
    const [files, setFiles] = useState<filesTypes[]>(initFiles); // 文件列表
    const [activeId, setActiveId] = useState<string>(""); // 当前激活的tab
    const [openIds, setOpenIds] = useState<string[]>([]); // 打开的tab
    const [unSaveIds, setUnSaveIds] = useState<string[]>([]); // 未保存的tab
    const [searchFiles, setSearchFiles] = useState<filesTypes[]>(); // 左侧展示搜索列表于默认列表进行区分

    // 计算已打开的所有文件信息
    const getOpenFiles = openIds.map((id) => files.find((file) => file.id === id))
    // 计算正在编辑的文件信息
    const activeFile = files.find((file) => file.id === activeId);
    // 计算左侧列表需要展示什么样信息
    const fileList = (searchFiles && searchFiles.length > 0) ? searchFiles : files;
    
    // 点击左侧文件显示编辑页面
    const openItem = (id: string) => {
        setActiveId(id); // 激活tab
        // 判断是否已经打开
        if (!openIds.includes(id)) {
            setOpenIds([...openIds, id]);
        }
    };
    // 点击某个tab选项时切换当前状态
    const changeActive = (id: string) => setActiveId(id)
    // 关闭某个tab
    const closeFile = (id: string) => {
        const retOpens = openIds.filter((item) => item !== id); // 过滤掉该tab
        setOpenIds(retOpens); // 过滤掉该tab
        if (retOpens.length > 0) {
            setActiveId(retOpens[0]); // 激活第一个tab
        } else {
            setActiveId(""); // 如果没有tab了，则清空激活状态
        }
    };
    // 文件内容更新
    const changeFile = (id: string, value: string) => {
        if (!unSaveIds.includes(id)) {
            setUnSaveIds([...unSaveIds, id]); // 添加未保存的tab
        }
        // 某个内容更新后，更新文件列表
        const newFiles = files.map((file) => {
            if (id === file.id) {
                return {...file, body: value}; // 更新文件内容
            } else {
                return file;
            }
        });
        setFiles(newFiles); // 更新文件列表
    };
    // 删除某个文件项
    const deleteItem = (id: string) => {
        const newFiles = files.filter(item => item.id !== id);
        setFiles(newFiles);
        // 删除后，关闭可能正在打开的tab
        closeFile(id);
    }
    // 依据关键字搜索文件
    const searchFile = (keyword: string) => {
        const newFiles = files.filter(item => item.title.includes(keyword));
        setSearchFiles(newFiles);
    }
    // 重命名文件名称
    const renameFile = (id: string, newTitle: string) => {
        const newFiles = files.map((file) => {
            if (id === file.id) {
                return {...file, title: newTitle}; // 更新文件内容
            } else {
                return file;
            }
        });
        setFiles(newFiles); // 更新文件列表
    }
    // 新建文件
    const createNewFile = () => {
        const newFile = {id: uuidv4(), title: "新建文件", body: "", createTime: Date.now().toString()};
        setFiles([...files, newFile]); // 更新文件列表
        openItem(newFile.id); // 打开新创建的文件
    }
    return (
        <>
            <GlobalStyle />
            <Container>
                <LeftDiv>
                    <SearchFile title={'我的文档'} onSearch={searchFile}></SearchFile>
                    <FileList 
                        files={fileList} 
                        editFile={openItem}
                        saveFile={renameFile}
                        deteleFile={deleteItem}
                    ></FileList>
                    {/* 按钮容器 */}
                    <ContainerBtn>
                        <ButtonItem title={'新建'} icon={faPlus} btnClick={createNewFile} />
                        <ButtonItem title={'导入'} icon={faFileImport} btnClick={()=> {}} />
                    </ContainerBtn>
                </LeftDiv>
                <RightDiv>
                    { activeFile ? (
                        <>
                            <TabList 
                                files={getOpenFiles}   
                                activeItem={activeId} 
                                unSaveItems={unSaveIds} 
                                clickItem={changeActive}
                                closeItem={closeFile}
                            />
                            <SimpleMDE
                                key={activeFile && activeFile.id}
                                value={activeFile.body}
                                onChange={(value: string) => { changeFile(activeFile.id, value) }}
                                options={{
                                    autofocus: true, // 自动获得焦点
                                    spellChecker: false, // 拼写检查
                                    status: true, // 状态栏
                                    minHeight: "470px", // 最小高度
                                }}
                            />
                        </>
                    ) : (
                        <AdvertisementDiv>
                            <AdvertisementImgs src={img} title="csdn博主 '亦世凡华、'" onClick={()=> {
                                window.open("https://blog.csdn.net/qq_53123067?spm=1000.2115.3001.5343")
                            }} />
                            <AdvertisementTitle>当前暂无数据<br/>(PS: 点击上方图片，求一波关注)</AdvertisementTitle>
                        </AdvertisementDiv>
                    ) }

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
const AdvertisementDiv = styled.div` // 广告容器(没有数据情况下)
    width: 100%;
    height: 100%;
    background-color: #191a2e;
    opacity: 0.9;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const AdvertisementImgs = styled.img` // 广告图片
    width: 500px;
    cursor: pointer;
    transition: transform 1s;
    &:hover {
        transform: scale(1.2) translateY(-40px);
    }
`
const AdvertisementTitle = styled.div` // 广告标题
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    font-size: 20px;
    font-weight: 600;
    cursor: pointer;
    user-select: none;
    font-family: "楷体";
    &:hover {
        color: #008c8c;
    }
`