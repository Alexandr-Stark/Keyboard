import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addKey} from "../../actions/keyboardActions";

import "./styles/Keyboard.scss";

import Key from "./Key";

const getReservedGroupKey = (group, keyId) => {
  const g = group.find((group) => group.keys.includes(keyId));
  return !!g;
} 

function Keyboard(props) {
  const dispatch = useDispatch();
  const { keys } = useSelector((state) => state.keyboard);
  const { isGroupCreate }  = useSelector((state) => state.keyboard);
  const { keyGroups } = useSelector((state) => state.controlPanel)

  function groupKeys(array, startIndex, inGroupQuantity, hasCondition) {
    const group = [];
    for (let i = startIndex; i < array.length; i++) {
      if (!hasCondition) {
        group.push(array[i]);
        if (group.length === inGroupQuantity) {
          return group;
        }
      } else {
        if (i > 0) {
          group.push(array[i]);
          if (group.length === inGroupQuantity) {
            return group;
          }
        } else if (i === 0) {
          group.push(array[i]);
          return group;
        }
      }
    }
    return group;
  }

  function renderGroupedKeysRow(
    row,
    inGroupQuantity,
    className,
    hasCondition,
    isSimpleRender
  ) {
    const keys = [];
    if (isSimpleRender) {
      keys.push(
        <div className={className}>
          {row.map((item) => {
            const reservesKey = getReservedGroupKey(keyGroups, item.id);
            return(
            <Key
              key={item.id}
              type={item.type}
              active={item.active}
              disabled={isGroupCreate}
              reserved={isGroupCreate && reservesKey}
              onClick={() => handleClickKey(item)}
            >
              {item.label}
            </Key>);
          })}
        </div>
      );
    } else {
      for (let i = 0; i < row.length; i += inGroupQuantity) {
        keys.push(
          <div className={className}>
            {groupKeys(row, i, inGroupQuantity, hasCondition).map((item) => {
              const reservesKey = getReservedGroupKey(keyGroups, item.id);
              return(
              <Key
                key={item.id}
                type={item.type}
                active={item.active}
                disabled={isGroupCreate}
                reserved={isGroupCreate && reservesKey}
                onClick={() => handleClickKey(item)}
              >
                {item.label}
              </Key>);
            })}
          </div>
        );
        if (hasCondition) i === 0 && (i -= inGroupQuantity - 1);
      }
    }
    return keys;
  }

  const classDefClassName =
    "row-block-body-keyboard-control-panel-wrapper__section";
  const classDefClassName2 =
    "row-block-2-body-keyboard-control-panel-wrapper__section";

  const handleClickKey = (key) => {
    dispatch(addKey(key));
  };

  return (
    <div className='control-panel-wrapper__keyboard keyboard-control-panel-wrapper'>
      <div className='keyboard-control-panel-wrapper__body body-keyboard-control-panel-wrapper'>
        <div className='body-keyboard-control-panel-wrapper__block block-body-keyboard-control-panel-wrapper'>
          {keys.slice(0, 6).map((row, index) =>
            index === 0 ? (
              <div className='block-body-keyboard-control-panel-wrapper__row row-block-body-keyboard-control-panel-wrapper'>
                {renderGroupedKeysRow(row, 4, classDefClassName, true, false)}
              </div>
            ) : (
              <div
                className={`block-body-keyboard-control-panel-wrapper__row row-block-body-keyboard-control-panel-wrapper ${
                  index === 1 && "mt-15"
                }`}
              >
                {renderGroupedKeysRow(row, 0, classDefClassName, false, true)}
              </div>
            )
          )}
        </div>
        <div className='body-keyboard-control-panel-wrapper__block-2 block-2-body-keyboard-control-panel-wrapper'>
          {keys.slice(6).map((row, index) => {
            if (index === 1) {
              return (
                <div className='block-2-body-keyboard-control-panel-wrapper__row row-block-2-body-keyboard-control-panel-wrapper mt-15'>
                  {renderGroupedKeysRow(row, 3, classDefClassName2, false, false)}
                </div>
              );
            }
            if (index === 2) {
              return (
                <>
                  <div className='block-2-body-keyboard-control-panel-wrapper__row row-block-2-body-keyboard-control-panel-wrapper mt-15'>
                    <div className='row-block-2-body-keyboard-control-panel-wrapper__section'>
                      <p className='keyboard-logo'>STARK</p>
                    </div>
                  </div>
                  <div className='block-2-body-keyboard-control-panel-wrapper__row row-block-2-body-keyboard-control-panel-wrapper mt-15'>
                    {renderGroupedKeysRow(row, 3, classDefClassName2, true, false)}
                  </div>
                </>
              );
            }
            return (
              <div 
                className={`block-2-body-keyboard-control-panel-wrapper__row row-block-2-body-keyboard-control-panel-wrapper`}
              >
                {renderGroupedKeysRow(row, 0, classDefClassName2, false, true)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Keyboard;
