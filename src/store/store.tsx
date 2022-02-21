import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { loginReducer } from './rootReducer';

const store = createStore(loginReducer, applyMiddleware(thunk));

export default store;