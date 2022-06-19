import classNames from 'classnames';
import React from 'react';
import {useGlobalCtx} from '../../tools/utils/context/GlobalCtx';
import './RadioButton.scss';

interface IRadioButtonProps {
	active: boolean;
}

const RadioButton = ({active}: IRadioButtonProps) => {
	const {theme} = useGlobalCtx();

	return (
		<svg className={classNames('radio', theme, {active})} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path className={classNames('radio__circle', theme, {active})} fillRule="evenodd" clipRule="evenodd" d="M12 7C9.2 7 7 9.2 7 12C7 14.8 9.2 17 12 17C14.8 17 17 14.8 17 12C17 9.2 14.8 7 12 7Z"/>
			<path className={classNames('radio__body', theme, {active})} fillRule="evenodd" clipRule="evenodd" d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM12 20C7.6 20 4 16.4 4 12C4 7.6 7.6 4 12 4C16.4 4 20 7.6 20 12C20 16.4 16.4 20 12 20Z"/>
		</svg>
	);
};

export default RadioButton;