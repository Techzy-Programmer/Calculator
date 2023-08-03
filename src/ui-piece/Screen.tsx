import './Screen.css';

interface ScreenProps {
    downValue: string;
    topValue: string;
}

function Screen(param: ScreenProps) {
    return (
        <div id='screen'>
            <div className="top">{param.topValue}</div>
            <div className="down">{param.downValue}</div>
        </div>
    )
}

export default Screen
