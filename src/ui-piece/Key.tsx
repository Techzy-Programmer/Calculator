import CalcContext from '../logics/CalcContext'
import React, { useContext } from 'react'
import './Key.css'

interface KeyProp {
    char: string;
    type?: string;
}

function Key(prop: KeyProp) {
    const { doCalc } = useContext(CalcContext);
    const onKeyClick = (e: React.MouseEvent<HTMLButtonElement>) => doCalc(e.currentTarget.innerText);
    return (<button className={('board-key' + (prop.type ? " " + prop.type : ""))} onClick={onKeyClick}>{prop.char}</button>)
}

export default Key