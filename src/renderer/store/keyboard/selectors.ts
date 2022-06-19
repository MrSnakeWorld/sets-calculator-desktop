import {createSelector} from 'reselect';
import {IState} from '..';

export const extractKeyboardData = createSelector(
	(state: IState) => state.keyboard,
	data => data,
);
