import React from 'react';
import classNames from 'classnames';
import {extractOperations} from '../../store/inputs/selectors';
import useAppSelector from '../../tools/utils/hooks/useAppSelector';
import {LANGUAGE, useGlobalCtx} from '../../tools/utils/context/GlobalCtx';
import Input from './Input';
import useChangeKeyboard from '../../tools/utils/hooks/useChangeKeyboard';
import {IInputType} from '../../tools/types/IInputType';
import useAppDispatch from '../../tools/utils/hooks/useAppDispatch';
import {selectOperations} from '../../store/inputs/actions/inputs/selectOperations';

interface IOperationsProps {
	isVisible: boolean;
	isCarouselVisible: boolean;
}

const getText = (language: LANGUAGE) => {
	switch (language) {
	case LANGUAGE.RUSSIAN:
		return {
			placeholder: 'Перейти к вычислениям'
		};
	case LANGUAGE.ENGLISH:
		return {
			placeholder: 'Go to сalculations'
		};
	case LANGUAGE.TATAR:
		return {
			placeholder: 'Исәпләүләргә күчү'
		};
	case LANGUAGE.UKRAINIAN:
		return {
			placeholder: 'Перейти до обчислень'
		};
	}
};

const Operations = ({isVisible, isCarouselVisible}: IOperationsProps) => {
	const {theme, language} = useGlobalCtx();
	const text = getText(language);

	const dispatch = useAppDispatch();
	const {microInputs, isShown, isValid, value} = useAppSelector(extractOperations);
	const changeKeyboard = useChangeKeyboard(IInputType.OPERATIONS);

	const handleClick = () => {
		dispatch(selectOperations());
		changeKeyboard();
	};

	return isVisible ? (
		<div className={classNames(theme, 'operations')}>
			{isCarouselVisible || isShown ? (
				<div className={classNames('operations__input', theme, 'main-text', {error: !isValid})}>
					<Input microInputs={microInputs} value={value} isFlex/>
				</div>
			) : (
				<div
					className={classNames('operations__placeholder', theme, 'oper-text')}
					onClick={handleClick}
				>
					{text.placeholder}
				</div>
			)}
		</div>
	) : null;
};

export default Operations;