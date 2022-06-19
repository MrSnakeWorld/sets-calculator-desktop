import classNames from 'classnames';
import React from 'react';
import {useGlobalCtx} from '../../tools/utils/context/GlobalCtx';
import './Hide.scss';

interface IHideProps {
	isHidden: boolean;
}

const Hide = ({isHidden}: IHideProps) => {
	const {theme} = useGlobalCtx();

	return (
		<svg className={classNames(theme, {hidden: isHidden},'hide-icon')} width="14" height="7" viewBox="0 0 14 7" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path fillRule="evenodd" clipRule="evenodd" d="M0 0L7 7L14 0H0Z" fill="inherit"/>
		</svg>
	);
};

export default Hide;