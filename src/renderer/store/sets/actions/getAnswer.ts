import * as types from '../constants';

export interface IGetAnswerPayload {
  answer?: string;
	isShownAnswer?: boolean;
}

export const getAnswer = (answer?: string, isShownAnswer?: boolean) => ({
	type: types.GET_ANSWER,
	payload: {answer, isShownAnswer} as IGetAnswerPayload,
});
