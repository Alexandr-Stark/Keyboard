import React from "react";

const defaultClass = 'keyboard-btn';

function Key({children, type, active, disabled, reserved, onClick = () => {}}) {
    return(
        <button className={`${defaultClass} ${type} ${active ? 'keyboard-btn--active' : ''} ${reserved ? 'keyboard-btn--reserved' : ''} ${disabled ? 'keyboard-btn--disabled' : ''}`} onClick={onClick}>{children}</button>
    );
}

export default Key;