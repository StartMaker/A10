import {createStore,applyMiddleware} from "redux";
import thunkMiddleware from 'redux-thunk';
import {createLogger} from "redux-logger";

import reducers from './reducers';

const loggerMiddleware = createLogger();
const preLoadState = {
    user: {
        login: false,
        character: null
    }
};

export default function () {
    return createStore(
        reducers,
        preLoadState,
        applyMiddleware(thunkMiddleware,loggerMiddleware)
    )
}