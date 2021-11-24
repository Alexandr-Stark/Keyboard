import { combineReducers } from "redux";
import keyboardReducer  from "./keyboardReducer";
import controlPanelReducer from "./controlPanelReducer";


export const rootReducer = combineReducers({
    keyboard: keyboardReducer,
    controlPanel: controlPanelReducer,
});