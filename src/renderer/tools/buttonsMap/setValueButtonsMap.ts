import IButton from '../interfaces/IButton';
import {IButtonType} from '../types/IButtonType';
import genId from '../utils/genId';

import {IIconsType} from '../types/IIconsType';

export const setValueButtonsMap: IButton[][] = [
	[
		{
			id: genId(),
			name: 'x',
			longName: '2',
			value: '2',
			type: IButtonType.IMicroInputType.DEGREE,
		},
		{
			id: genId(),
			name: 'x',
			longName: 'y',
			value: '',
			type: IButtonType.IMicroInputType.DEGREE,
		},
		{
			id: genId(),
			name: ';',
			value: ';',
			type: IButtonType.IMicroInputType.SEPARATOR,
		},
		{
			id: genId(),
			name: 'c',
			value: '',
			type: IButtonType.IOnlyButtonType.CLEAR,
		},
		{
			id: genId(),
			name: 'back',
			icon: IIconsType.BACK,
			isImg: true,
			value: '',
			type: IButtonType.IOnlyButtonType.DELETE,
		},
	],
	[
		{
			id: genId(),
			name: '7',
			value: '7',
			type: IButtonType.IMicroInputType.VALUE,
		},
		{
			id: genId(),
			name: '8',
			value: '8',
			type: IButtonType.IMicroInputType.VALUE,
		},
		{
			id: genId(),
			name: '9',
			value: '9',
			type: IButtonType.IMicroInputType.VALUE,
		},
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
			name: '4',
			value: '4',
			type: IButtonType.IMicroInputType.VALUE,
		},
		{
			id: genId(),
			name: '5',
			value: '5',
			type: IButtonType.IMicroInputType.VALUE,
		},
		{
			id: genId(),
			name: '6',
			value: '6',
			type: IButtonType.IMicroInputType.VALUE,
		},
		{
			id: genId(),
			name: 'multiplication',
			isImg: true,
			icon: IIconsType.MULTIPLICATION,
			value: '*',
			type: IButtonType.IMicroInputType.OPERATION,
		},
		{
			id: genId(),
			name: 'addition',
			isImg: true,
			icon: IIconsType.ADDITION,
			value: '+',
			type: IButtonType.IMicroInputType.OPERATION,
		},
	],
	[
		{
			id: genId(),
			name: '1',
			value: '1',
			type: IButtonType.IMicroInputType.VALUE,
		},
		{
			id: genId(),
			name: '2',
			value: '2',
			type: IButtonType.IMicroInputType.VALUE,
		},
		{
			id: genId(),
			name: '3',
			value: '3',
			type: IButtonType.IMicroInputType.VALUE,
		},
		{
			id: genId(),
			name: 'division',
			isImg: true,
			icon: IIconsType.DIVISION,
			value: '/',
			type: IButtonType.IMicroInputType.OPERATION,
		},
		{
			id: genId(),
			name: 'subtraction',
			isImg: true,
			icon: IIconsType.SUBTRACTION,
			value: '-',
			type: IButtonType.IMicroInputType.OPERATION,
		},
	],
	[
		{
			id: genId(),
			name: 'signs',
			icon: IIconsType.SIGNS,
			isImg: true,
			value: '',
			type: IButtonType.IOnlyButtonType.CHANGE_SIGN,
		},
		{
			id: genId(),
			name: '0',
			value: '0',
			type: IButtonType.IMicroInputType.VALUE,
		},
		{
			id: genId(),
			name: '.',
			value: '.',
			type: IButtonType.IMicroInputType.VALUE,
		},
		{
			id: genId(),
			name: 'enter',
			icon: IIconsType.ENTER,
			isImg: true,
			value: '',
			isDouble: true,
			type: IButtonType.IOnlyButtonType.ENTER,
		},
	],
];
