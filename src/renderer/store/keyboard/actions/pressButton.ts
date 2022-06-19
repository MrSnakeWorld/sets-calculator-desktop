import * as types from '../constants';

export interface IPressButtonPayload {
  id: string;
}

export const pressButton = (id: string) => ({
	type: types.PRESS_BUTTON,
	payload: {id},
});
