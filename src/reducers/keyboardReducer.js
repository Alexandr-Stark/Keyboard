import { nanoid } from "nanoid";
import { ADD_KEY_TO_GROUP, TOGGLE_TO_CREATE_GROUP } from "../types/types";
import {KEYS_STORE} from "../components/Keyboard/constants";

const preloadState = {
  isGroupCreate: false,
  keyGroup: {
    id: null,
    keys: [],
  },
  keys: KEYS_STORE,
};

function keyboardReducer(state = preloadState, action) {
  switch (action.type) {
    case TOGGLE_TO_CREATE_GROUP: {
      if (state.isGroupCreate) {
        if (state.keyGroup.keys.length){
          const updatedKeys = state.keys.map((row) =>
            row.map((key) =>
              state.keyGroup.keys.some((keyId) => keyId === key.id)
                ? { ...key, active: false, group: state.keyGroup.id }
                : key
            )
          );
          return {
            ...state,
            isGroupCreate: false,
            keyGroup:{keys: []},
            keys: updatedKeys
          };
        }
      }
      return {
        ...state,
        isGroupCreate: true,
        keyGroup:{id: nanoid()},
      };
    }
    case ADD_KEY_TO_GROUP: {
      if (!state.isGroupCreate) {
        //console.log(state);
        return state;
      }
      const keyId = action.payload;

      const updatedKeys = state.keys.map((row) =>
        row.map((key) =>
          key.id === keyId ? { ...key, active: !key.active } : key
        )
      );

      const group = new Set(state.keyGroup.keys);

      if (group.has(keyId)) {
        group.delete(keyId);
      } else {
        group.add(keyId);
      }
      
      console.log(group);

      return {
        ...state,
        keyGroup:{
          id: state.keyGroup.id, 
          keys: Array.from(group)
        },
        keys: updatedKeys
      };
    }
    default:
      return state;
  }
}

export default keyboardReducer;