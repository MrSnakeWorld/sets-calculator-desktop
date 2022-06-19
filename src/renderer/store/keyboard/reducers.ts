import {createReducer} from '@reduxjs/toolkit';
import {operationsButtonsMap} from '../../tools/buttonsMap/operationsButtonsMap';
import {setNameButtonsMap} from '../../tools/buttonsMap/setNameButtonsMap';
import IButton from '../../tools/interfaces/IButton';
import {IPressButtonPayload, ISetButtonsPayload} from './actions';
import * as types from './constants';

export interface IKeyboardState {
  visible: boolean;
  isCarouselVisible: boolean;
  buttons: IButton[][];
  pressedButton?: string;
}

export const getInitialState = (): IKeyboardState => ({
	visible: true,
	buttons: setNameButtonsMap,
	isCarouselVisible: false,
});

const keyboardReducer = createReducer<IKeyboardState>(getInitialState(), {
	[types.CHANGE_VISIBILITY]: state => {
		state.visible = !state.visible;
	},
	[types.OPEN_KEYBOARD]: state => {
		state.visible = true;
	},
	[types.CLOSE_KEYBOARD]: state => {
		state.visible = false;
	},
	[types.SET_BUTTONS]: (state, {payload}: {payload: ISetButtonsPayload}) => {
		state.buttons = payload.buttons;
		state.isCarouselVisible = payload.buttons === operationsButtonsMap 
			? true
			: false;
	},
	[types.PRESS_BUTTON]: (state, {payload}: {payload: IPressButtonPayload}) => {
		state.pressedButton = payload.id;
	},
});

export default keyboardReducer;
