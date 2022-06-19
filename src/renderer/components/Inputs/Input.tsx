import classNames from 'classnames';
import React from 'react';
import {IMicroInput} from '../../tools/interfaces/IMicroInput';
import MicroInput from './components/MicroInput';
import './Inputs.scss';

interface IInputProps {
	microInputs: IMicroInput[];
	value?: string;
	isFlex?: boolean;
}

const Input = ({microInputs, value, isFlex = false}: IInputProps) => (
	<div className={classNames('input__body', {empty: !value, flex: isFlex})}>
		{microInputs.map(microInput => (
			<MicroInput microInput={microInput} key={microInput.id}/>
		))}
	</div>
);

export default Input;
