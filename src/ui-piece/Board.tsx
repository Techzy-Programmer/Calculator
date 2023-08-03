import './Board.css'
import Key from './Key'

function Board() {
  return (
        <div id='board'>
            <div className="row">
                <Key char='7'/>
                <Key char='8'/>
                <Key char='9'/>
                <Key char='+'/>
            </div>
            <div className="row">
                <Key char='4'/>
                <Key char='5'/>
                <Key char='6'/>
                <Key char='-'/>
            </div>
            <div className="row">
                <Key char='1'/>
                <Key char='2'/>
                <Key char='3'/>
                <Key char='x'/>
            </div>
            <div className="row">
                <Key char='.'/>
                <Key char='0'/>
                <Key char='%'/>
                <Key char='/'/>
            </div>
            <div className="row">
                <Key char='CLR' type='clr'/>
                <Key char='DEL'type='del'/>
                <Key char='=' type='eql'/>
            </div>
        </div>
    )
}

export default Board
