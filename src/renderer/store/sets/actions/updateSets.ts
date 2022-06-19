import * as types from '../constants';

export interface IUpdateSetsPayload {
  name: string;
	prevName?: string;
  value: number[];
}

export const updateSets = (name: string, prevName?: string, value?: number[]) => ({
	type: types.UPDATE_SETS,
	payload: {name, prevName, value},
});
