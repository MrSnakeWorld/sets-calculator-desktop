import IButton from '../interfaces/IButton';
import {IButtonType} from '../types/IButtonType';
import {IIconsType} from '../types/IIconsType';
import genId from '../utils/genId';

export const operationsButtonsMap: IButton[][] = [
	[
		{
			id: genId(),
			name: 'c',
			value: '',
			type: IButtonType.IOnlyButtonType.CLEAR,
		},
		{
			id: genId(),
			name: 'back',
			isImg: true,
			icon: IIconsType.BACK,
			value: '',
			type: IButtonType.IOnlyButtonType.DELETE,
		},
	], 
	[
		{
			id: genId(),
			name: '(',
			value: '(',
			type: IButtonType.IMicroInputType.START_BRACKET,
			longName: '[',
			longValue: '[',
			longType: IButtonType.IMicroInputType.START_ADD_BRACKET,
			reverseLong: true,
		},
		{
			id: genId(),
			name: ')',
			value: ')',
			type: IButtonType.IMicroInputType.END_BRACKET,
			longName: ']',
			longValue: ']',
			longType: IButtonType.IMicroInputType.END_ADD_BRACKET,
		},
	],
	[
		{
			id: genId(),
			name: 'union',
			value: '&',
			isImg: true,
			icon: IIconsType.UNION,
			type: IButtonType.IMicroInputType.OPERATION,
		},
		{
			id: genId(),
			name: 'intersection',
			isImg: true,
			icon: IIconsType.INTERSECTION,
			value: '|',
			type: IButtonType.IMicroInputType.OPERATION,
		},
	],
	[
		{
			id: genId(),
			name: 'difference',
			value: '/',
			isImg: true,
			icon: IIconsType.DIVISION,
			type: IButtonType.IMicroInputType.OPERATION,
		},
		{
			id: genId(),
			name: 'symmetricDifference',
			value: '-',
			isImg: true,
			icon: IIconsType.SUBTRACTION,
			type: IButtonType.IMicroInputType.OPERATION,
		},
	],
	[
		{
			id: genId(),
			name: 'enter',
			icon: IIconsType.ENTER,
			isImg: true,
			value: '',
			isDouble: true,
			type: IButtonType.IOnlyButtonType.ENTER,
		},
	]
];
