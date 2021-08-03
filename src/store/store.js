import { applyMiddleware, compose, createStore } from "redux";
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from "./rootReducer";

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk,logger),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f 
    )
)

export default store;