import classNames from 'classnames';
import React, {useState} from 'react';
import Hide from '../../style/assets/Hide';
import './List.scss';

interface IListProps {
	title: React.ReactNode;
	hasIcon?: boolean;
	children: React.ReactNode;
	isShown?: boolean;
}

const List = ({
	title, children, hasIcon = true, isShown = false
}: IListProps) => {
	const [isHidden, setHidden] = useState(isShown);

	const handleHide = () => {
		setHidden(s => !s);
	};

	return (
		<div className="list">
			<div className="list__header" onClick={handleHide}>
				{title}
				{hasIcon && (<Hide isHidden={isHidden} />)}
			</div>
			<div className={classNames('list__body', {hidden: isHidden})}>
				{children}
			</div>
		</div>
	);
};

export default List;