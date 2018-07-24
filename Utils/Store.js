import {createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga';
import RootSaga from "../Utils/RootSaga";
import rootReducer from '../Utils/RootReducer';

const initialState = {};

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(rootReducer, initialState, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(RootSaga);
