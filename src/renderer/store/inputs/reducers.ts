import {createReducer} from '@reduxjs/toolkit';
import IInput, {IMicroInputsState} from '../../tools/interfaces/IInput';
import {IMicroInput} from '../../tools/interfaces/IMicroInput';
import {ISetInput} from '../../tools/interfaces/ISetInput';
import {IOnlyButtonType} from '../../tools/types/IButtonType';
import {IIconsType} from '../../tools/types/IIconsType';
import {IInputType} from '../../tools/types/IInputType';
import {IMicroInputType} from '../../tools/types/IMicroInputType';
import genId from '../../tools/utils/genId';
import {ParseSets} from '../../tools/utils/parseFunctions/parseSets';
import {ParseValues} from '../../tools/utils/parseFunctions/parseValues';
import {
	IChangeMicroInputPayload,
	ICreateMicroInputPayload,
	ISelectInputPayload,
} from './actions';
import * as types from './constants';

export interface IOperations extends IInput {
	id: string;
	isValid?: boolean;
	isShown?: boolean;
}

export interface IInputsState {
  byId: {
    [id: string]: ISetInput;
  };
  allIds: string[];
  operations: IOperations;
  selectedInput: string;
  selectedType: IInputType;
  selectedMicroInput: string;
	answer?: string;
	isShownAnswer: boolean;
}

const getInitialMicroInput = (
	id: string,
	parentId: string,
	parentType: IInputType,
	maxLength?: number,
): IMicroInputsState => ({
	byId: {
		[id]: {
			id,
			parentId,
			parentType,
			type: parentType === IInputType.SET_VALUE 
				? IMicroInputType.VALUE
				: IMicroInputType.NAME,
			maxLength,
			value: '',
		},
	},
	allIds: [id],
});


const createInputs = (id: string) => {
	const setNameId = genId(), setValueId = genId();

	return {
		input: {
			[id]: {
				id,
				setName: {
					microInputs: getInitialMicroInput(
						setNameId,
						id,
						IInputType.SET_NAME,
						3,
					),
					maxLength: 1,
				},
				setValue: {
					microInputs: {
						...getInitialMicroInput(setValueId, id, IInputType.SET_VALUE),
					},
				},
				isValid: false
			},
		},
		ids: {
			setNameId,
			setValueId,
		},
	};
};

const getInitialState = (): IInputsState => {
	const inputId = genId(),
		operationsId = genId();
	const {ids, input} = createInputs(inputId);

	return {
		byId: input,
		operations: {
			id: genId(),
			microInputs: getInitialMicroInput(
				genId(),
				operationsId,
				IInputType.OPERATIONS,
			),
			maxLength: 1,
		},
		allIds: [inputId],
		selectedInput: inputId,
		selectedType: IInputType.SET_NAME,
		selectedMicroInput: ids.setNameId,
		isShownAnswer: false
	};
};

const deleteMicroInput = (state: IInputsState) => {
	const id = state.selectedMicroInput;
	const input = getInput(state);
	const microInputs = input.microInputs;

	const microInputIndex = microInputs.allIds.findIndex(item => item === id);

	if (microInputIndex >= 1) {
		state.selectedMicroInput = microInputs.allIds[microInputIndex - 1];
	} else {
		state.selectedMicroInput = microInputs.allIds[1];
	}
	delete microInputs.byId[id];
	microInputs.allIds = microInputs.allIds.filter(val => val !== id);
};

const handleClear = (state: IInputsState) => {
	const input = getInput(state);
	const newId = input.microInputs.allIds[0];

	const parentId = state.selectedInput;
	const parentType = state.selectedType;

	state.selectedMicroInput = newId;
	input.microInputs = getInitialMicroInput(newId, parentId, parentType);
	input.value = '';
};

const handleDelete = (state: IInputsState) => {
	const input = getInput(state);
	const microInputs = input.microInputs;

	const microInputId = state.selectedMicroInput;
	const inputId = state.selectedInput;
	const type = state.selectedType;
	if (!input.value?.length) {
		if (inputId && state.allIds.includes(inputId) && type !== IInputType.OPERATIONS) {
			switch (type) {
			case IInputType.SET_NAME: {
				if (state.allIds.length > 1) {
					const index = getInputIndex(state);

					if (index >= 1) {
						state.selectedInput = state.allIds[index - 1];
					} else {
						state.selectedInput = state.allIds[1];
					}

					delete state.byId[inputId];
					state.allIds = state.allIds.filter(val => val !== inputId);
					state.selectedType = IInputType.SET_VALUE;

					const newMicroInputs = getInput(state).microInputs;

					state.selectedMicroInput = newMicroInputs.allIds[newMicroInputs.allIds.length - 1];
				}
				break;
			}
			case IInputType.SET_VALUE: {
				state.byId[inputId][type].microInputs.byId[microInputId].type = IMicroInputType.VALUE;
				const setNameMicroInputs = state.byId[inputId].setName.microInputs;
				state.selectedType = IInputType.SET_NAME;
				state.selectedMicroInput = setNameMicroInputs.byId[setNameMicroInputs.allIds[0]].id;
			}
			}
		}
	} else if (microInputs.allIds.includes(microInputId)) {
		const microInputValue = microInputs.byId[microInputId].value;
		const microInputType = microInputs.byId[microInputId].type;

		switch (type) {
		case IInputType.SET_NAME:
		case IInputType.SET_VALUE: {
			switch (microInputType) {
			case IMicroInputType.START_BRACKET:
			case IMicroInputType.END_BRACKET:
			case IMicroInputType.START_ADD_BRACKET:
			case IMicroInputType.END_ADD_BRACKET:
			case IMicroInputType.DEGREE:
			case IMicroInputType.SEPARATOR: {
				if (microInputs.allIds.length > 1) {
					deleteMicroInput(state);
				}
				break;
			}
			default: {
				if (!microInputValue?.length) {
					deleteMicroInput(state);
				}
			}
			}
			break;
		}

		case IInputType.OPERATIONS: {
			if (microInputs.allIds.length > 1) {
				deleteMicroInput(state);
			}
		}
		}
	}
};

const getChangedMicroInputValue = (
	state: IInputsState,
	microInput: IMicroInput,
	payload: IChangeMicroInputPayload,
): [string, IMicroInputType, IIconsType | undefined | null] => {
	let value = microInput.value || '',
		type = microInput.type,
		icon: IIconsType | undefined | null = undefined;

	const input = getInput(state);
	const inputType = state.selectedType;
	const [microInputs] = getMicroInputs(state, input);

	switch (inputType) {
	case IInputType.SET_NAME: {
		switch (payload.type) {
		case IMicroInputType.NAME: {
			if (
				(microInput.maxLength && microInput.maxLength > value?.length) ||
				(microInput.value && !microInput.maxLength)
			) {
				value += payload.value;
			}
			break;
		}
		case IOnlyButtonType.DELETE: {
			if (state.allIds.length > 1 && !value) {
				handleDelete(state);
			} else {
				value = value.slice(0, -1);
			}
			break;
		}
		}
		break;
	}

	case IInputType.SET_VALUE: {
		switch (payload.type) {
		case IOnlyButtonType.CLEAR: {
			handleClear(state);
			break;
		}
		case IOnlyButtonType.CHANGE_SIGN: {
			if (
				type === IMicroInputType.VALUE ||
				type === IMicroInputType.START_BRACKET ||
				type === IMicroInputType.START_ADD_BRACKET
			) {
				if (value[0] === '-') {
					value = value.slice(1);
				} else {
					value = '-'.concat(value);
				}
			}
			break;
		}
		case IOnlyButtonType.DELETE: {
			if (
				(type === IMicroInputType.START_BRACKET || 
					type === IMicroInputType.END_BRACKET || 
					type === IMicroInputType.START_ADD_BRACKET || 
					type === IMicroInputType.END_ADD_BRACKET) 
					&& microInputs.allIds.length > 1 ||
					type === IMicroInputType.SEPARATOR ||
					type === IMicroInputType.DEGREE ||
					value.length === 0
			) {
				handleDelete(state);
			} else {
				value = value.slice(0, -1);
				icon = null;
			}
			break;
		}
		case IMicroInputType.START_BRACKET:
		case IMicroInputType.START_ADD_BRACKET:
		case IMicroInputType.END_BRACKET:
		case IMicroInputType.END_ADD_BRACKET: {
			value = payload.value;
			type = payload.type;
			break;
		}
		case IMicroInputType.OPERATION:
		case IMicroInputType.SEPARATOR: {
			value = payload.value;
			icon = payload.icon;
			break;
		}
		case IMicroInputType.VALUE: {
			let zeroValue = payload.value;
			if (zeroValue === '.') {
				zeroValue = '0.';
			}
			if (value === '0' || value === '') {
				value = zeroValue;
			} else if (value === '-0') {
				value = '-'.concat(zeroValue);
			} else {
				value += payload.value;
			}
			type = payload.type;
		}
		}
		break;
	}

	case IInputType.OPERATIONS: {
		switch (payload.type) {
		case IMicroInputType.NAME: {
			value = payload.value;
			type = payload.type;
			break;
		}
		case IMicroInputType.OPERATION: {
			value = payload.value;
			break;
		}
		case IMicroInputType.START_BRACKET:
		case IMicroInputType.START_ADD_BRACKET:
		case IMicroInputType.END_BRACKET:
		case IMicroInputType.END_ADD_BRACKET: {
			value = payload.value;
			type = payload.type;
			break;
		}
		case IOnlyButtonType.CLEAR: {
			handleClear(state);
			break;
		}
		case IOnlyButtonType.DELETE: {
			if (microInputs.allIds.length > 1) {
				handleDelete(state);
			} else {
				value = value.slice(0, -1);
			}
			break;
		}
		}
		break;
	}
	}
	return [value, type, icon];
};

const getChangedInputValue = (input: IInput) => {
	const microInputs = input.microInputs;
	return microInputs.allIds
		.map(id => String(microInputs.byId[id].value))
		.join('');
};

const getInput = (state: IInputsState): IInput => {
	const id = state.selectedInput;
	const type = state.selectedType;

	let input: IInput;
	switch (type) {
	case IInputType.SET_NAME:
	case IInputType.SET_VALUE: {
		input = state.byId[id][type];
		break;
	}
	case IInputType.OPERATIONS:
	default: {
		input = state.operations;
	}
	}
	return input;
};

const getInputIndex = (state: IInputsState) =>
	state.allIds.findIndex(item => item === state.selectedInput);

const getMicroInputs = (state: IInputsState, input: IInput): [IMicroInputsState, number] => {
	const prevId = state.selectedMicroInput;
	const microInputs = input.microInputs;
	const index = microInputs.allIds.findIndex(item => item === prevId);

	return [microInputs, index];
};

const checkSetValidation = (state: IInputsState) => {
	const allSetInputs = state.allIds.map(id => state.byId[id]);
	allSetInputs.forEach(setInput => {
		const setNameInput = setInput.setName;
		const setValueInput = setInput.setValue;

		const setNameMicroInput = setNameInput.microInputs.byId[setNameInput.microInputs.allIds[0]];

		const SetValueMicroInputs = setValueInput.microInputs;
		const SetValueLastMicroInput = SetValueMicroInputs.byId[SetValueMicroInputs.allIds[SetValueMicroInputs.allIds.length - 1]];

		const allSetValueMicroInputs = SetValueMicroInputs.allIds.map(id => SetValueMicroInputs.byId[id]);
		
		let isValid = true;
		const amount = allSetInputs.filter(val => val.setName.value === setInput.setName.value);

		let brackets = 0, addBrackets = 0;
		allSetValueMicroInputs.forEach(val => {
			switch (val.type) {
			case IMicroInputType.START_BRACKET: {
				++brackets;
				break;
			}
			case IMicroInputType.END_BRACKET: {
				--brackets;
				break;
			}
			case IMicroInputType.START_ADD_BRACKET: {
				++addBrackets;
				break;
			}
			case IMicroInputType.END_ADD_BRACKET: {
				--addBrackets;
			}
			}
		});

		allSetValueMicroInputs.reduce((acc, val) => {
			if (acc.type === val.type && (
				val.type === IMicroInputType.VALUE ||
				val.type === IMicroInputType.OPERATION ||
				val.type === IMicroInputType.SEPARATOR
			)) {
				isValid = false;
			}
			if (val.value === '' || val.value === undefined) {
				isValid = false;
			}
			if (
				acc.type === IMicroInputType.START_BRACKET && val.type === IMicroInputType.END_BRACKET ||
				acc.type === IMicroInputType.START_ADD_BRACKET && val.type === IMicroInputType.END_ADD_BRACKET
			) {
				isValid = false;
			}
			return val;
		});
	
		if (setNameMicroInput.type !== IMicroInputType.NAME) {
			isValid = false;
		}

		if (brackets !== 0 || addBrackets !== 0) {
			isValid = false;
		}

		if (
			SetValueLastMicroInput.type !== IMicroInputType.VALUE &&
			SetValueLastMicroInput.type !== IMicroInputType.SEPARATOR &&
			SetValueLastMicroInput.type !== IMicroInputType.END_BRACKET &&
			SetValueLastMicroInput.type !== IMicroInputType.END_ADD_BRACKET
		) {
			isValid = false;
		}
	
		if (!setInput.setName.value || !setInput.value) {
			isValid = false;
		}

		if (amount.length > 1) {
			isValid = false;
		}

		let answers: Set<number> = new Set();
		try {
			const parseValues = new ParseValues();
			answers = parseValues.eval(allSetValueMicroInputs);
		} catch (error) {
			isValid = false;
		}

		state.byId[setInput.id].isValid = isValid;
		if (isValid) {
			state.byId[setInput.id].parsedValue = Array.from(answers);
			state.byId[setInput.id].prevName = state.byId[setInput.id].name;
			state.byId[setInput.id].name = setInput.setName.value;
		}
	});
};

const checkOperationsValidation = (state: IInputsState) => {
	const operations = state.operations;
	const microInputs = operations.microInputs;
	const lastMicroInput = microInputs.byId[microInputs.allIds[microInputs.allIds.length - 1]];
	const allMicroInputs = microInputs.allIds.map(id => microInputs.byId[id]);
	const allSetInputs = state.allIds.map(id => state.byId[id]);

	const allMicroInputsWithNames = allMicroInputs.map(val => {
		const value = allSetInputs.find(setInput => setInput.name === val.value)?.parsedValue;

		return {
			...val,
			value: value ? JSON.stringify(value) : val.value
		};
	});

	let isValid = true;

	isValid = !allMicroInputs.find(microInput =>
		microInput.type === IMicroInputType.NAME && !allSetInputs.find(
			setInput => setInput.name === microInput.value && setInput.isValid
		));

	

	allMicroInputs.reduce((acc, val) => {
		if (acc.type === val.type && (
			val.type === IMicroInputType.VALUE ||
			val.type === IMicroInputType.OPERATION ||
			val.type === IMicroInputType.SEPARATOR
		)) {
			isValid = false;
		}
		if (val.value === '' || val.value === undefined) {
			isValid = false;
		}
		if (
			acc.type === IMicroInputType.START_BRACKET && val.type === IMicroInputType.END_BRACKET ||
			acc.type === IMicroInputType.START_ADD_BRACKET && val.type === IMicroInputType.END_ADD_BRACKET
		) {
			isValid = false;
		}
		return val;
	});

	if (
		lastMicroInput.type !== IMicroInputType.NAME &&
		lastMicroInput.type !== IMicroInputType.VALUE &&
		lastMicroInput.type !== IMicroInputType.SEPARATOR &&
		lastMicroInput.type !== IMicroInputType.START_BRACKET &&
		lastMicroInput.type !== IMicroInputType.END_BRACKET &&
		lastMicroInput.type !== IMicroInputType.START_ADD_BRACKET &&
		lastMicroInput.type !== IMicroInputType.END_ADD_BRACKET
	) {
		isValid = false;
	}

	try {
		const parseSets = new ParseSets();
		const answer = parseSets.eval(allMicroInputsWithNames);
		state.answer = answer;
	} catch (error) {
		isValid = false;
	}

	state.operations.isValid = isValid;
	state.isShownAnswer = isValid 
		? state.isShownAnswer
		: false;
};

const inputsReducer = createReducer<IInputsState>(getInitialState(), {
	[types.CREATE_MICRO_INPUT]: (
		state,
		{payload}: {payload: ICreateMicroInputPayload},
	) => {
		const id = genId();
		const parentId = state.selectedInput;
		const parentType = state.selectedType;

		const microInput: IMicroInput = {
			id,
			parentId,
			parentType,
			type: payload.type === IOnlyButtonType.ENTER
				? IMicroInputType.VALUE
				: payload.type,
			maxLength: payload.maxLength,
			value: payload.value,
			icon: payload.icon
		};

		switch (parentType) {
		case IInputType.SET_NAME:
		case IInputType.SET_VALUE: {
			const setInput = state.byId[parentId];
			const input = setInput[parentType];
			const [microInputs, index] = getMicroInputs(state, input);

			microInputs.byId[id] = microInput;
			microInputs.allIds.splice(index + 1, 0, id);
	
			state.selectedMicroInput = id;
			
			input.value = getChangedInputValue(input);
			
			if (parentType === IInputType.SET_VALUE) {
				setInput.value = input.value;
			}
			checkSetValidation(state);
			checkOperationsValidation(state);

			break;
		}
		case IInputType.OPERATIONS: {
			const operations = state.operations;
			const [microInputs, index] = getMicroInputs(state, operations);

			microInputs.byId[id] = microInput;
			microInputs.allIds.splice(index + 1, 0, id);

			state.selectedMicroInput = id;
			operations.value = getChangedInputValue(operations);

			checkOperationsValidation(state);
			break;
		}
		}
	},
	[types.CHANGE_MICRO_INPUT]: (
		state,
		{payload}: {payload: IChangeMicroInputPayload},
	) => {
		const id = state.selectedMicroInput;
		const parentId = state.selectedInput;
		const parentType = state.selectedType;
		
		switch (parentType) {
		case IInputType.SET_NAME:
		case IInputType.SET_VALUE: {
			const setInput = state.byId[parentId];
			const input = setInput[parentType];
			const microInputs = input.microInputs;
			const microInput = microInputs.byId[id];

			const [value, type, icon] = getChangedMicroInputValue(state, microInput, payload);
			microInput.value = value;
			microInput.icon = icon !== null 
				? icon || microInput.icon
				: undefined;

			if (type !== microInput.type) {
				microInput.type = type;
			}

			input.value = getChangedInputValue(input);

			if (parentType === IInputType.SET_VALUE) {
				setInput.value = input.value;
			}

			checkSetValidation(state);
			checkOperationsValidation(state);
			break;
		}
		case IInputType.OPERATIONS: {
			const input = state.operations;
			const microInputs = input.microInputs;
			const microInput = microInputs.byId[id];

			const [value, type] = getChangedMicroInputValue(state, microInput, payload);

			microInput.value = value;
			microInput.icon = payload.icon;

			if (type !== microInput.type) {
				microInput.type = type;
			}

			input.value = getChangedInputValue(input);
			input.isShown = input.value ? true : false;

			checkOperationsValidation(state);
			break;
		}
		}
	},
	[types.SWITCH_INPUT]: state => {
		const id = state.selectedInput;
		const type = state.selectedType;

		switch (type) {
		case IInputType.SET_NAME: {
			const microInputs = state.byId[id].setValue.microInputs;
			state.selectedType = IInputType.SET_VALUE;
			state.selectedMicroInput = microInputs.byId[microInputs.allIds[0]].id;
			break;
		}
		case IInputType.SET_VALUE:
		default: {
			let inputId: string, microInputId: string;
			if (state.allIds.findIndex(val => val === id) === state.allIds.length - 1) {
				inputId = genId();
				const {ids, input} = createInputs(inputId);

				microInputId = ids.setNameId;
	
				state.byId = {...state.byId, ...input};
				state.allIds.push(inputId);
			} else {
				const index = getInputIndex(state);

				inputId = state.allIds[index + 1];
				microInputId = state.byId[inputId].setName.microInputs.allIds[0];
			}

			state.selectedType = IInputType.SET_NAME;
			state.selectedInput = inputId;
			state.selectedMicroInput = microInputId;	
		}
		}
	},
	[types.SELECT_INPUT]: (state, {payload}: {payload: ISelectInputPayload}) => {
		const id = state.selectedMicroInput;
		const inputId = state.selectedInput;
		const type = state.selectedType;
		const input = type !== IInputType.OPERATIONS
			? state.byId[inputId][type]
			: state.operations;

		const microInput = input.microInputs.byId[id];
		const microInputType = microInput.type;

		if (!microInput.value && microInputType === IMicroInputType.VALUE && type === IInputType.SET_VALUE) {
			microInput.value = '0';
			input.value = getChangedInputValue(input);
			state.byId[inputId].value = input.value;
			checkSetValidation(state);
		}

		state.selectedInput = payload.id;
		state.selectedType = payload.type;
		state.selectedMicroInput = payload.microInputId;
	},
	[types.SELECT_OPERATIONS]: state => {
		const microInputs = state.operations.microInputs;
		const microInputId = microInputs.byId[microInputs.allIds[0]].id;

		state.selectedMicroInput = microInputId;
		state.selectedInput = state.operations.id;
		state.selectedType = IInputType.OPERATIONS;
	},
	[types.SHOW_ANSWER]: state => {
		state.isShownAnswer = true;
	}
});

export default inputsReducer;
