import {IIconsType} from '../types/IIconsType';
import {IInputType} from '../types/IInputType';
import {IMicroInputType} from '../types/IMicroInputType';

export interface IMicroInput {
  id: string;
	icon?: IIconsType;
  value?: string;
  type: IMicroInputType;
  maxLength?: number;
  parentId: string;
  parentType: IInputType;
}
