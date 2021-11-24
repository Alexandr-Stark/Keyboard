import React from 'react';
import Keyboard from '../Keyboard/Keyboard';
import './styles/ControlPanel.scss'
import ControlKey from './ControlKeys';

function ControlPanel(props) {
    return(
        <div className='wrapper__control-panel control-panel-wrapper'>
            <div className='control-panel-wrapper__header'></div>
                <Keyboard/>
            <div className='control-panel-wrapper__footer'>
                <ControlKey/>
            </div>
        </div>
    );
}

export default ControlPanel;