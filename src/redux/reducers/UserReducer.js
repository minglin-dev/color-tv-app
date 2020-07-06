import { SET_USERS, SET_STATE } from '../types';

export const initialState  = {
    users: [],
    state: 'loaded'
}

export const UserReducer = (states = initialState, action) => {
    switch (action.type) {
        case SET_STATE:
            return {
                ...states,
                state: action.payload
            }

        case SET_USERS:
            return {
                ...states,
                users: action.payload,
                state: 'loaded'
            }
        
        default:
            return states;
    }
};