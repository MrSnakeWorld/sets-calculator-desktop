import {createSelector} from 'reselect';
import {IState} from '..';
import IButton from '../../tools/interfaces/IButton';
import {ISet} from '../../tools/interfaces/ISet';
import {IMicroInputType} from '../../tools/types/IMicroInputType';
import genId from '../../tools/utils/genId';

export const extractSetsData = createSelector(
	(state: IState) => state.sets,
	data => data,
);

export const extractSetsAsArray = createSelector(extractSetsData, 
	data => data.allIds.map(id => ({...data.byId[id]})),
);

export const extractSetsAnswer = createSelector(extractSetsData, 
	data => data.answer
);

export const extractSetsAsButtons = createSelector(extractSetsAsArray, sets => {
	const setButtons = sets.map((set: ISet): IButton => ({
		id: genId(),
		name: set.name,
		type: IMicroInputType.NAME,
		value: set.name,
	}));

	const buttons: IButton[][] = [];
	const size = 10;

	for (let i = 0; Math.ceil(sets.length / size) > i; i++) {
		buttons.push(setButtons.slice((i * size), (i * size) + size));
	}
	return buttons;
});