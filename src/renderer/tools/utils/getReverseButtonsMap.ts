import {operationsButtonsMap} from '../buttonsMap/operationsButtonsMap';
import {setNameButtonsMap} from '../buttonsMap/setNameButtonsMap';
import {setValueButtonsMap} from '../buttonsMap/setValueButtonsMap';
import {IInputType} from '../types/IInputType';

export default (type: IInputType) => {
	switch (type) {
	case IInputType.SET_NAME:
		return setValueButtonsMap;
	case IInputType.SET_VALUE:
		return setNameButtonsMap;
	default:
		return operationsButtonsMap;
	}
};
