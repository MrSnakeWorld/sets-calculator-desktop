import {closeKeyboard, openKeyboard, setButtons} from '../../../store/keyboard/actions';
import {IInputType} from '../../types/IInputType';
import getButtonsMap from '../getButtonsMap';
import getReverseButtonsMap from '../getReverseButtonsMap';
import useAppDispatch from './useAppDispatch';

export default (type: IInputType, reverse = false, timeout = 200) => {
	const dispatch = useAppDispatch();

	return () => {
		dispatch(closeKeyboard());
		setTimeout(() => {
			if (reverse) {
				dispatch(setButtons(getReverseButtonsMap(type)));
			} else {
				dispatch(setButtons(getButtonsMap(type)));
			}
			dispatch(openKeyboard());
		}, timeout);
	};
};
