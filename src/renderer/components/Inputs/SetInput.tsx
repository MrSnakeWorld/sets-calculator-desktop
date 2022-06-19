import classNames from 'classnames';
import React, {useEffect} from 'react';
import {deleteSet, updateSets} from '../../store/sets/actions';
import {IFixedInput} from '../../tools/interfaces/IInput';
import useAppDispatch from '../../tools/utils/hooks/useAppDispatch';
import {useGlobalCtx} from '../../tools/utils/context/GlobalCtx';
import Input from './Input';

interface ISetInputProps {
	setName: IFixedInput;
	setValue: IFixedInput;
	isValid?: boolean;
	value?: number[];
	name?: string;
	prevName?: string;
}

const SetInput = ({setName, setValue, isValid, value, name, prevName}: ISetInputProps) => {
	const {theme} = useGlobalCtx();
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (name && value && isValid) {
			dispatch(updateSets(name, prevName, value));
		} else if (name && value && !isValid) {
			dispatch(deleteSet(name));
		}
	}, [isValid, value]);

	const error = isValid !== undefined ? !isValid : false;

	return (
		<div className={classNames('set-input__body', 'main-text', theme, {error})}>
			<div className="set-input__body-elem set-input__body-setname">
				<Input microInputs={setName.microInputs} value={setName.value} />
			</div>
			<div className="set-input__body-elem">
				<p className="set-input__text-left">{'={'}</p>
			</div>
			<div className="set-input__body-elem">
				<Input microInputs={setValue.microInputs} value={setValue.value} />
			</div>
			<div className="set-input__body-elem">
				<p className="set-input__text-right">{'}'}</p>
			</div>
		</div>
	);
};

export default SetInput;