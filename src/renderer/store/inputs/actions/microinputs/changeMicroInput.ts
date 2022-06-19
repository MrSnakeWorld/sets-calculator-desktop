import {IOnlyButtonType} from '../../../../tools/types/IButtonType';
import {IIconsType} from '../../../../tools/types/IIconsType';
import {IMicroInputType} from '../../../../tools/types/IMicroInputType';
import * as types from '../../constants';

export interface IChangeMicroInputPayload {
  value: string;
  type: IOnlyButtonType | IMicroInputType;
	icon?: IIconsType;
}

export const changeMicroInput = (
	type: IOnlyButtonType | IMicroInputType,
	value: string,
	icon?: IIconsType
) => ({
	type: types.CHANGE_MICRO_INPUT,
	payload: {value, type, icon} as IChangeMicroInputPayload,
});
