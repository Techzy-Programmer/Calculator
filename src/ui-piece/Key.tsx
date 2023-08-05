import CalcContext from '../logics/CalcContext'
import React, { useContext } from 'react'
import './Key.css'

interface KeyProp {
    char: string;
    type?: string;
}

function Key(prop: KeyProp) {
    const { calculate, animType } = useContext(CalcContext);
    const anim: string = (animType.toUpperCase() === prop.char) ? "anim" : "";
    const onKeyClick = (e: React.MouseEvent<HTMLButtonElement>) => calculate(e.currentTarget.innerText);
    return (<button className={(`${anim} board-key ${prop.type ?? ""}`)} onClick={onKeyClick}>{prop.char}</button>);
}

export default Key;
