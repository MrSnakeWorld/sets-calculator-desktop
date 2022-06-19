import classNames from 'classnames';
import React, {useEffect} from 'react';
import {changeMicroInput, createMicroInput, showAnswer, switchInput} from '../../store/inputs/actions';
import {extractInputsData, extractSelectedInput, extractSelectedMicroInput} from '../../store/inputs/selectors';
import {pressButton} from '../../store/keyboard/actions';
import {IOnlyButtonType} from '../../tools/types/IButtonType';
import {IMicroInputType} from '../../tools/types/IMicroInputType';
import useAppDispatch from '../../tools/utils/hooks/useAppDispatch';
import useAppSelector from '../../tools/utils/hooks/useAppSelector';
import useChangeKeyboard from '../../tools/utils/hooks/useChangeKeyboard';
import {useGlobalCtx} from '../../tools/utils/context/GlobalCtx';
import KeyboardButtons from './components/KeyboardButtons';
import './Keyboard.scss';
import IButton from '../../tools/interfaces/IButton';
import {IInputType} from '../../tools/types/IInputType';
import {IIconsType} from '../../tools/types/IIconsType';
import Carousel from '../Carousel/Carousel';
import {getAnswer} from '../../store/sets/actions';

interface IKeyboardProps {
	setButtons: IButton[][];
	buttons: IButton[][];
	isVisible: boolean;
	isCarouselVisible: boolean;
}

const Keyboard = ({
	setButtons, buttons, isVisible = true, isCarouselVisible = false
}: IKeyboardProps) => {
	const microInput = useAppSelector(extractSelectedMicroInput);
	const inputData = useAppSelector(extractInputsData);

	const microInputType = microInput.type;
	const inputType = microInput.parentType;
	const microInputValue = microInput.value;
	const {value: inputValue} = useAppSelector(extractSelectedInput);

	const dispatch = useAppDispatch();
	const {theme, refCursor} = useGlobalCtx();
	const changeKeyboard = useChangeKeyboard(inputType, true);

	useEffect(() => {
		dispatch(getAnswer(inputData.answer, inputData.isShownAnswer));
	}, [inputData]);

	const handleClick = (
		id: string,
		value: string,
		type: IOnlyButtonType | IMicroInputType,
		icon?: IIconsType
	) => {
		dispatch(pressButton(id));
		switch (type) {
		case IMicroInputType.START_BRACKET:
		case IMicroInputType.START_ADD_BRACKET:
		case IMicroInputType.END_BRACKET:
		case IMicroInputType.END_ADD_BRACKET: {
			if (!microInputValue) {
				dispatch(changeMicroInput(type, value));
			} else {
				dispatch(createMicroInput(type, value));
			}
			break;
		}
		case microInputType:
		case IOnlyButtonType.CLEAR: {
			dispatch(changeMicroInput(type, value, icon));
			break;
		}
		case IOnlyButtonType.CHANGE_SIGN: {
			if (microInputType === IMicroInputType.OPERATION) {
				dispatch(createMicroInput(IMicroInputType.VALUE, '0'));
			}
			dispatch(changeMicroInput(type, value, icon));
			break;
		}
		case IOnlyButtonType.DELETE: {
			dispatch(changeMicroInput(type, value));
			if (!inputValue && (inputData.allIds.length > 1 || inputType === IInputType.SET_VALUE)) {
				changeKeyboard();
			}
			break;
		}
		case IOnlyButtonType.ENTER: {
			if (inputType !== IInputType.OPERATIONS) {
				if (!inputValue) {
					dispatch(changeMicroInput(IMicroInputType.VALUE, '0'));
				}

				dispatch(switchInput());
				changeKeyboard();	
			} else {
				dispatch(showAnswer());
			}
			break;
		}
		case IMicroInputType.OPERATION: {
			if (
				microInputType === IMicroInputType.VALUE && !microInputValue
			) {
				dispatch(changeMicroInput(IMicroInputType.VALUE, '0'));
			}
			if (
				(microInputType === IMicroInputType.START_BRACKET || microInputType === IMicroInputType.START_ADD_BRACKET ||
				microInputType === IMicroInputType.SEPARATOR) &&
				inputType !== IInputType.OPERATIONS
			) {
				dispatch(createMicroInput(IMicroInputType.VALUE, '0'));
			}

			dispatch(createMicroInput(type, value, undefined, icon));
			break;
		}
		case IMicroInputType.DEGREE: {
			if (!microInputValue) {
				dispatch(changeMicroInput(IMicroInputType.VALUE, '0'));
			}
			dispatch(createMicroInput(type, '^'));
			dispatch(createMicroInput(IMicroInputType.VALUE, value));
			break;
		}
		case IMicroInputType.SEPARATOR: {
			if (!microInputValue) {
				dispatch(changeMicroInput(IMicroInputType.VALUE, '0'));
			} else if (microInputType === IMicroInputType.START_BRACKET) {
				dispatch(createMicroInput(IMicroInputType.VALUE, '0'));
				dispatch(createMicroInput(IMicroInputType.END_BRACKET, ')'));
			} else if (microInputType === IMicroInputType.START_ADD_BRACKET) {
				dispatch(createMicroInput(IMicroInputType.VALUE, '0'));
				dispatch(createMicroInput(IMicroInputType.END_ADD_BRACKET, ']'));
			} else if (
				microInputType !== IMicroInputType.VALUE &&
				microInputType !== IMicroInputType.END_ADD_BRACKET &&
				microInputType !== IMicroInputType.END_BRACKET
			) {
				dispatch(createMicroInput(IMicroInputType.VALUE, '0'));
			}
			dispatch(createMicroInput(type, value));
			break;
		}
		default: {
			if (
				!!microInput &&
				microInput.type === IMicroInputType.OPERATION &&
				type !== IMicroInputType.VALUE &&
				inputType !== IInputType.OPERATIONS
			) {
				dispatch(createMicroInput(IMicroInputType.VALUE, '0'));			
			}

			if (
				!inputValue || 
				(!microInputValue && (microInputType === IMicroInputType.VALUE || microInputType === IMicroInputType.NAME))
			) {
				dispatch(changeMicroInput(type, value));
			} else {
				dispatch(createMicroInput(type, value));
			}
		}
		}

		if (refCursor?.current) {
			const cursor = refCursor.current;

			cursor.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
				inline: 'start'
			});
		}
	};

	return (
		<div className={classNames('keyboard', theme, {
			visible: isVisible, carousel: isCarouselVisible
		})}>
			{isCarouselVisible && (
				<div className='keyboard__pages'>
					<Carousel>
						{setButtons.map((page, i) => (
							<div className="keyboard__pages-sets" key={i}>
								{page.map(button => (
									<KeyboardButtons
										button={button}
										onClick={handleClick}
										key={button.id}
									/>
								))}
							</div>
						))}
					</Carousel>
				</div>
			)}
			<div className="keyboard__body">
				{buttons.map((row, i) => (
					<div className="keyboard__row" key={i}>
						{row.map(button => (
							<KeyboardButtons
								button={button}
								onClick={handleClick}
								key={button.id}
							/>
						))}
					</div>
				))}
			</div>
		</div>
	);
};

export default Keyboard;