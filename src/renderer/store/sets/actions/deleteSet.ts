import * as types from '../constants';

export interface IDeleteSetPayload {
  name: string;
}

export const deleteSet = (name: string) => ({
	type: types.DELETE_SET,
	payload: {name},
});
