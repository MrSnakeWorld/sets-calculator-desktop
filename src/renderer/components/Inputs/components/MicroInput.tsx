import React from 'react';
import classNames from 'classnames';
import {selectInput} from '../../../store/inputs/actions';
import {extractSelectedInputType, extractSelectedMicroInputId} from '../../../store/inputs/selectors';
import {IMicroInput} from '../../../tools/interfaces/IMicroInput';
import useAppDispatch from '../../../tools/utils/hooks/useAppDispatch';
import useAppSelector from '../../../tools/utils/hooks/useAppSelector';
import useChangeKeyboard from '../../../tools/utils/hooks/useChangeKeyboard';
import Cursor from './Cursor';
import {icons} from '../../../tools/types/IIconsType';

interface IMicroInputProps {
	microInput: IMicroInput;
}

const MicroInput = ({
	microInput: {
		id, parentId, parentType, maxLength, value, type, icon
	}
}: IMicroInputProps) => {
	const dispatch = useAppDispatch();
	
	const selected = useAppSelector(extractSelectedMicroInputId);
	const selectedType = useAppSelector(extractSelectedInputType);
	const changeKeyboard = useChangeKeyboard(parentType);

	const handleClick = () => {
		dispatch(selectInput(parentId, parentType, id));
		if (selectedType !== parentType) {
			changeKeyboard();
		}
	};

	const isShown = selected === id && (maxLength && value ? maxLength > value.length : true);

	return (
		<span
			className={classNames('microinput__text', value, type, icon, {empty: !value, icon, isShown})}
			onClick={handleClick}
		>
			{icon ? (icons[icon]) : (value)}
			{isShown && <Cursor />}
		</span>
	);
};

export default MicroInput;