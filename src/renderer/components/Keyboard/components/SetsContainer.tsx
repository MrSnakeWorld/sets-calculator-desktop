import React from 'react';
import IButton from '../../../tools/interfaces/IButton';
import {IOnlyButtonType} from '../../../tools/types/IButtonType';
import {IIconsType} from '../../../tools/types/IIconsType';
import {IMicroInputType} from '../../../tools/types/IMicroInputType';
import KeyboardButtons from './KeyboardButtons';

interface ISetsContainerProps {
	onClick: (
		id: string,
		value: string,
		type: IOnlyButtonType | IMicroInputType,
		icon?: IIconsType
	) => void;
	buttons: IButton[];
}

const SetsContainer = ({onClick, buttons}: ISetsContainerProps) => {
	return (
		<div className="sets-container">
			{buttons.map(button => (
				<KeyboardButtons
					button={button}
					onClick={onClick}
					key={button.id}
				/>
			))}
		</div>
	);
};

export default SetsContainer;