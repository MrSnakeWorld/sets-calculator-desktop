import {createReducer} from '@reduxjs/toolkit';
import {ISet} from '../../tools/interfaces/ISet';
import {
	IUpdateSetsPayload,
	IDeleteSetPayload,
	IGetAnswerPayload,
} from './actions';
import * as types from './constants';

export interface ISetsState {
  byId: {
    [id: string]: ISet;
  };
  allIds: string[];
	answer?: string[];
	isShownAnswer?: boolean;
}

const getInitialState = (): ISetsState => ({
	byId: {},
	allIds: [],
});

const setsReducer = createReducer<ISetsState>(getInitialState(), {
	[types.UPDATE_SETS]: (state, {payload}: {payload: IUpdateSetsPayload}) => {
		const {name, prevName, value} = payload;

		if (prevName && state.allIds.includes(prevName)) {
			state.allIds = state.allIds.map(
				id => id === prevName ? name : id
			);
			delete state.byId[prevName];
		} else if (!state.allIds.includes(name)) {
			state.allIds.push(name);
		}
		state.byId[name] = {name, value};
	},
	[types.DELETE_SET]: (state, {payload}: {payload: IDeleteSetPayload}) => {
		if (state.allIds.includes(payload.name)) {
			state.allIds = state.allIds.filter(name => payload.name !== name);
			delete state.byId[payload.name];
		}
	},
	[types.GET_ANSWER]: (state, {payload}: {payload: IGetAnswerPayload}) => {
		if (payload.answer) {
			state.answer = Array.from(JSON.parse(payload.answer));
		}
		state.isShownAnswer = payload.isShownAnswer;
	}
});

export default setsReducer;
