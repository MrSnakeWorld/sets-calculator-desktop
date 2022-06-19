import classNames from 'classnames';
import React from 'react';
import {extractSetInputs} from '../../store/inputs/selectors';
import {extractSetsData} from '../../store/sets/selectors';
import useAppSelector from '../../tools/utils/hooks/useAppSelector';
import {useGlobalCtx} from '../../tools/utils/context/GlobalCtx';
import SetInput from '../Inputs/SetInput';
import './Creation.scss';

const Creation = () => {
	const {theme} = useGlobalCtx();
	const inputs = useAppSelector(extractSetInputs);
	const {answer, isShownAnswer} = useAppSelector(extractSetsData);

	return (
		<div
			className={classNames('creation', 'main-text', theme)}
		>
			<div className="creation__set-inputs">
				{inputs.map(elem => (
					<SetInput
						key={elem.id}
						setName={elem.setName}
						setValue={elem.setValue}
						isValid={elem.isValid}
						value={elem.parsedValue}
						name={elem.name}
						prevName={elem.prevName}
					/>
				))}
			</div>
			{isShownAnswer && (
				<div className="creation__answer">
					<div className="creation__answer-brackets">{'{'}</div>
					<div className="creation__answer-content">
						{answer && answer.length
							? (answer.map(item => ` ${item};`))
							: (<div>0</div>)}
					</div>
					<div className="creation__answer-brackets">{' }'}</div>
				</div>
			)}
		</div>
	);
};

export default Creation;