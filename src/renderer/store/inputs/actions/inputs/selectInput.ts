import {IInputType} from '../../../../tools/types/IInputType';
import * as types from '../../constants';

export interface ISelectInputPayload {
  id: string;
  type: IInputType;
	microInputId: string;
}

export const selectInput = (id: string, type: IInputType, microInputId: string) => ({
	type: types.SELECT_INPUT,
	payload: {id, type, microInputId} as ISelectInputPayload,
});
