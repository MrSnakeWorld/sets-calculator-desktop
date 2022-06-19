import React from 'react';
import Addition from '../../style/assets/Addition';
import Back from '../../style/assets/Back';
import Division from '../../style/assets/Division';
import Enter from '../../style/assets/Enter';
import Intersection from '../../style/assets/Intersection';
import LongBack from '../../style/assets/LongBack';
import Multiplication from '../../style/assets/Multiplication';
import Signs from '../../style/assets/Signs';
import Subtraction from '../../style/assets/Subtraction';
import Union from '../../style/assets/Union';

export enum IIconsType {
	ENTER = 'enter',
	LONG_BACK = 'longBack',
	BACK = 'back',
	SIGNS = 'signs',
	MULTIPLICATION = 'multiplication',
	DIVISION = 'division',
	ADDITION = 'addition',
	SUBTRACTION = 'subtraction',
	UNION = 'union',
	INTERSECTION = 'intersection',
}

export const icons: Record<IIconsType, JSX.Element> = {
	enter: <Enter />,
	longBack: <LongBack />,
	back: <Back />,
	signs: <Signs />,
	multiplication: <Multiplication />,
	division: <Division />,
	addition: <Addition />,
	subtraction: <Subtraction />,
	union: <Union />,
	intersection: <Intersection />,
};