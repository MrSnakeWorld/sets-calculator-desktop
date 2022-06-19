import {ReactNode} from 'react';
import {IOnlyButtonType} from '../types/IButtonType';
import {IIconsType} from '../types/IIconsType';
import {IMicroInputType} from '../types/IMicroInputType';

export default interface IButton {
  id: string;
  name: string;
	isImg?: boolean;
	icon?: IIconsType;
  value: string;
  longName?: string;
  longValue?: string;
	longType?: IOnlyButtonType | IMicroInputType;
	reverseLong?: boolean;
  type: IOnlyButtonType | IMicroInputType;
  isDouble?: boolean;
}
