import { combineReducers, createStore } from 'redux';
import { UserReducer } from './reducers/UserReducer';

const AppReducers = combineReducers({
    UserReducer,
});

const rootReducer = ((state, action) => {
    return AppReducers(state, action);
});

export default  createStore(rootReducer);