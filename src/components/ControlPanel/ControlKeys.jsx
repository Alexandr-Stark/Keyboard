import React from "react";
import "./styles/ControlPanel.scss";
import { useDispatch, useSelector } from "react-redux";
import { toggleCreateGroup } from "../../actions/keyboardActions";
import { addGroup } from "../../actions/controlPanelActions";

let clickCounter = 0;

function ControlKey(props) {
  const dispatch = useDispatch();
  const { isGroupCreate } = useSelector((state) => state.keyboard);
  const { keyGroup } = useSelector((state) => state.keyboard);
  const { keyGroups } = useSelector((state) => state.controlPanel);

  const handleClickToggleGroup = () => {
    if (clickCounter === 0) {
      dispatch(toggleCreateGroup());
      //console.log(clickCounter);
      clickCounter++;
      return;
    }
    if (clickCounter === 1) {
      //console.log(clickCounter);
      if(keyGroup.keys.length){
         dispatch(addGroup(keyGroup));
      }
    }
    dispatch(toggleCreateGroup());
    clickCounter = 0;
  };

  return (
    <div className='footer-control-panel-wrapper__group'>
      <ul>
        {
        keyGroups.map( (element, index) => 
          {
            if(index !== 0){
              return ( <li>Group {index}</li>);
            }
          }
        )
        }
      </ul>
      <button onClick={handleClickToggleGroup}>
        {isGroupCreate ? "Готово" : "Створити групу"}
      </button>
    </div>
  );
}

export default ControlKey;
