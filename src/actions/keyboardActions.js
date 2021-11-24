import { ADD_KEY_TO_GROUP, TOGGLE_TO_CREATE_GROUP } from "../types/types";

export const addKey = (key) => ({
    type: ADD_KEY_TO_GROUP,
    payload: key.id
});

export const toggleCreateGroup = () => ({
    type: TOGGLE_TO_CREATE_GROUP,
});
