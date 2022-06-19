import {createSelector} from 'reselect';
import {IState} from '..';
import IInput from '../../tools/interfaces/IInput';
import {IInputType} from '../../tools/types/IInputType';
import {IOperations} from './reducers';

export const extractSelectedInputId = createSelector(
	(state: IState) => state.inputs.selectedInput,
	inputId => inputId,
);

export const extractSelectedInputType = createSelector(
	(state: IState) => state.inputs.selectedType,
	inputType => inputType,
);

export const extractSelectedMicroInputId = createSelector(
	(state: IState) => state.inputs.selectedMicroInput,
	microInputId => microInputId,
);

export const extractInputsData = createSelector(
	(state: IState) => state.inputs,
	data => data,
);

export const extractOperations = createSelector(
	(state: IState) => state.inputs.operations,
	operations => {
		const microInputs = operations.microInputs;
		const operationsArr = microInputs.allIds.map(
			(val) => microInputs.byId[val]
		);
		return {
			...operations,
			microInputs: operationsArr
		};
	}
);

export const extractSetInputs = createSelector(extractInputsData, data =>
	data.allIds.map(id => {
		const nameMicroInputs = data.byId[id].setName.microInputs;
		const valueMicroInputs = data.byId[id].setValue.microInputs;

		const nameArr = nameMicroInputs.allIds.map(
			val => nameMicroInputs.byId[val],
		);
		const valueArr = valueMicroInputs.allIds.map(
			val => valueMicroInputs.byId[val],
		);
		return {
			...data.byId[id],
			setName: {
				...data.byId[id].setName,
				microInputs: nameArr,
			},
			setValue: {
				...data.byId[id].setValue,
				microInputs: valueArr,
			},
		};
	}),
);

export const extractInputsAsArray = createSelector(extractInputsData, data => {
	const arr: IInput[] = [];
	data.allIds.forEach(id => {
		arr.push(data.byId[id].setName, data.byId[id].setValue);
	});
	return arr;
});

export const extractSelectedSetInput = createSelector(extractInputsData, data => 
	data.byId[data.selectedInput]
);

export const extractSelectedInput = createSelector(extractInputsData, data => {
	const id = data.selectedInput;
	const type = data.selectedType;
	let input: IInput | IOperations;

	switch (type) {
	case IInputType.SET_NAME:
	case IInputType.SET_VALUE: {
		input = data.byId[id][type];
		break;
	}
	case IInputType.OPERATIONS:
	default: {
		input = data.operations;
	}
	}

	return input;
});

export const extractSelectedMicroInput = createSelector(
	extractInputsData,
	extractSelectedInput,
	(data, input) => {
		const id = data.selectedMicroInput;
		return input.microInputs.byId[id];
	},
);

export const extractMicroInputs = createSelector(
	extractSelectedInput,
	input => {
		return input.microInputs.allIds.map(id => input.microInputs.byId[id]);
	},
);
