import * as types from '../../constants';
import {IMicroInputType} from '../../../../tools/types/IMicroInputType';
import {IOnlyButtonType} from '../../../../tools/types/IButtonType';
import {IIconsType} from '../../../../tools/types/IIconsType';

export interface ICreateMicroInputPayload {
  type: IMicroInputType | IOnlyButtonType.ENTER;
  value: string;
  maxLength?: number;
	icon?: IIconsType;
}

export const createMicroInput = (
	type: IMicroInputType | IOnlyButtonType.ENTER,
	value: string,
	maxLength?: number,
	icon?: IIconsType
) => ({
	type: types.CREATE_MICRO_INPUT,
	payload: {type, maxLength, value, icon} as ICreateMicroInputPayload,
});
