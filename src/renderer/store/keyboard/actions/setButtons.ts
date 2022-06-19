import IButton from '../../../tools/interfaces/IButton';
import * as types from '../constants';

export interface ISetButtonsPayload {
  buttons: IButton[][];
}

export const setButtons = (buttons: IButton[][]) => ({
	type: types.SET_BUTTONS,
	payload: {buttons} as ISetButtonsPayload,
});
