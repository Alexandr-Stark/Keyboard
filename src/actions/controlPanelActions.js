import { ADD_GROUP } from "../types/types";

export const addGroup = (group) => ({
    type: ADD_GROUP,
    payload: group
});