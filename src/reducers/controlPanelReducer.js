import { ADD_GROUP } from "../types/types";
const preloadState = {
    keyGroups: [
        {
            id: null,
            label: '',
            keys: []
        }
    ]
};

function controlPanelReducer(state = preloadState, action) {
    switch (action.type) {
        case ADD_GROUP: {
           console.log(state.keyGroups);
            return {
                ...state,
                keyGroups: [
                    ...state.keyGroups,
                    {
                        id: action.payload.id,
                        label: action.payload.label,
                        keys: action.payload.keys
                    }
                ]
            };
        }  
        default:
            return state;
    }
}

export default controlPanelReducer;