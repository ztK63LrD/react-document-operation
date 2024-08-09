// 自定义监听键盘事件hook函数
import { useState, useEffect } from 'react';

export const useKeyHandler = (code: number) => {
    const [ keyPressed, setKeyPressed ] = useState<boolean>(false);
    
    const keyDownHandler = (e: any) => { if (e.keyCode == code) setKeyPressed(true) }; // 按下键盘
    const keyUpHandler = (e: any) => { if (e.keyCode == code) setKeyPressed(false) } // 抬起键盘
    useEffect(() => {
        document.addEventListener('keydown', keyDownHandler);
        document.addEventListener('keyup', keyUpHandler);
        return () => {
            document.removeEventListener('keydown', keyDownHandler);
            document.removeEventListener('keyup', keyUpHandler);
        }
    });
    return keyPressed;
}