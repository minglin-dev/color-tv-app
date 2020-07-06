import { SET_USERS, SET_STATE } from '../types';

export const setUsers = (users) => ({
    type: SET_USERS,
    payload: users
});

export const setState = (state) => ({
    type: SET_STATE,
    payload: state
});


