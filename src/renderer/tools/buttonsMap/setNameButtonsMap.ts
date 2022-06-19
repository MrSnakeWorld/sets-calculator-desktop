import IButton from '../interfaces/IButton';
import {IButtonType} from '../types/IButtonType';
import {IIconsType} from '../types/IIconsType';
import genId from '../utils/genId';

export const setNameButtonsMap: IButton[][] = [
	[
		{
			id: genId(),
			name: 'A',
			value: 'A',
			type: IButtonType.IMicroInputType.NAME,
		},
		{
			id: genId(),
			name: 'B',
			value: 'B',
			type: IButtonType.IMicroInputType.NAME,
		},
		{
			id: genId(),
			name: 'C',
			value: 'C',
			type: IButtonType.IMicroInputType.NAME,
		},
		{
			id: genId(),
			name: 'D',
			value: 'D',
			type: IButtonType.IMicroInputType.NAME,
		},
		{
			id: genId(),
			name: 'longback',
			icon: IIconsType.LONG_BACK,
			isImg: true,
			value: '',
			type: IButtonType.IOnlyButtonType.DELETE,
			isDouble: true,
		},
	],
	[
		{
			id: genId(),
			name: 'E',
			value: 'E',
			type: IButtonType.IMicroInputType.NAME,
		},
		{
			id: genId(),
			name: 'F',
			value: 'F',
			type: IButtonType.IMicroInputType.NAME,
		},
		{
			id: genId(),
			name: 'G',
			value: 'G',
			type: IButtonType.IMicroInputType.NAME,
		},
		{
			id: genId(),
			name: 'H',
			value: 'H',
			type: IButtonType.IMicroInputType.NAME,
		},
		{
			id: genId(),
			name: 'I',
			value: 'I',
			type: IButtonType.IMicroInputType.NAME,
		},
		{
			id: genId(),
			name: 'J',
			value: 'J',
			type: IButtonType.IMicroInputType.NAME,
		},
	],
	[
		{
			id: genId(),
			name: 'K',
			value: 'K',
			type: IButtonType.IMicroInputType.NAME,
		},
		{
			id: genId(),
			name: 'L',
			value: 'L',
			type: IButtonType.IMicroInputType.NAME,
		},
		{
			id: genId(),
			name: 'M',
			value: 'M',
			type: IButtonType.IMicroInputType.NAME,
		},
		{
			id: genId(),
			name: 'N',
			value: 'N',
			type: IButtonType.IMicroInputType.NAME,
		},
		{
			id: genId(),
			name: 'O',
			value: 'O',
			type: IButtonType.IMicroInputType.NAME,
		},
		{
			id: genId(),
			name: 'P',
			value: 'P',
			type: IButtonType.IMicroInputType.NAME,
		},
	],
	[
		{
			id: genId(),
			name: 'Q',
			value: 'Q',
			type: IButtonType.IMicroInputType.NAME,
		},
		{
			id: genId(),
			name: 'R',
			value: 'R',
			type: IButtonType.IMicroInputType.NAME,
		},
		{
			id: genId(),
			name: 'S',
			value: 'S',
			type: IButtonType.IMicroInputType.NAME,
		},
		{
			id: genId(),
			name: 'T',
			value: 'T',
			type: IButtonType.IMicroInputType.NAME,
		},
		{
			id: genId(),
			name: 'U',
			value: 'U',
			type: IButtonType.IMicroInputType.NAME,
		},
		{
			id: genId(),
			name: 'V',
			value: 'V',
			type: IButtonType.IMicroInputType.NAME,
		},
	],
	[
		{
			id: genId(),
			name: 'W',
			value: 'W',
			type: IButtonType.IMicroInputType.NAME,
		},
		{
			id: genId(),
			name: 'X',
			value: 'X',
			type: IButtonType.IMicroInputType.NAME,
		},
		{
			id: genId(),
			name: 'Y',
			value: 'Y',
			type: IButtonType.IMicroInputType.NAME,
		},
		{
			id: genId(),
			name: 'Z',
			value: 'Z',
			type: IButtonType.IMicroInputType.NAME,
		},
		{
			id: genId(),
			name: 'enter',
			icon: IIconsType.ENTER,
			isImg: true,
			value: '',
			type: IButtonType.IOnlyButtonType.ENTER,
			isDouble: true,
		},
	],
];
