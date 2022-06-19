import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import inputsReducer from './inputs/reducers';
import keyboardReducer from './keyboard/reducers';
import setsReducer from './sets/reducers';

const rootReducer = combineReducers({
	sets: setsReducer,
	keyboard: keyboardReducer,
	inputs: inputsReducer,
});

export const store = configureStore({reducer: rootReducer});

export type IState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;