// store.ts
import {applyMiddleware, createStore} from 'redux';
import {appReducer} from './reducers';
import thunk from "redux-thunk";


const store = createStore(appReducer, applyMiddleware(thunk));

export default store;