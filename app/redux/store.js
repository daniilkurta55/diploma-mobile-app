import thunkMiddleware from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import reducer from './reducers';

let createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
let store = createStoreWithMiddleware(reducer);

export default store;