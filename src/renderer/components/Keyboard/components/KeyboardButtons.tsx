import classNames from 'classnames';
import React from 'react';
import IButton from '../../../tools/interfaces/IButton';
import {IOnlyButtonType} from '../../../tools/types/IButtonType';
import {IMicroInputType} from '../../../tools/types/IMicroInputType';
import useLongPress from '../../../tools/utils/hooks/useLongPress';
import {useGlobalCtx} from '../../../tools/utils/context/GlobalCtx';
import {icons, IIconsType} from '../../../tools/types/IIconsType';

interface IKeyboardButtons {
	button: IButton;
	onClick: (id: string, value: string, type: IOnlyButtonType | IMicroInputType, icon?: IIconsType) => void;
}

const KeyboardButtons = ({
	button: {
		id, name, type, value, isDouble, isImg, longName, longValue = '', longType = IMicroInputType.VALUE, reverseLong, icon
	},
	onClick
}: IKeyboardButtons) => {
	const {theme} = useGlobalCtx();
	const bind = useLongPress(
		() => onClick(id, value, type, icon),
		() => onClick(id, longValue, longType, icon),
	);

	return (
		<div 
			className={classNames('button', 'main-text', theme, {
				double: isDouble,
				reverse: type === IOnlyButtonType.ENTER ||
					type === IOnlyButtonType.DELETE
			})}
			{...bind}
		>
			{
				isImg && icon ? (
					<div className="button__img">
						{icons[icon]}
					</div>
				) : (
					<div className={classNames(
						'button__text',
						theme,
						{center: name === 'c' || name === ';'}
					)}>
						<p className={classNames(
							'button__text-long', 'main-small-text', {reverseLong, bracket: longName === '[' || longName === ']'}
						)}>
							{longName}
						</p>
						{name}
					</div>
				)
			}
		</div>
	);
};

export default KeyboardButtons;