import classNames from 'classnames';
import React from 'react';
import {useGlobalCtx} from '../../tools/utils/context/GlobalCtx';

interface IMenuProps {
	active: boolean;
}

const Menu = ({active}: IMenuProps) => {
	const {theme} = useGlobalCtx();

	return (
		<svg className={classNames({active}, theme, 'menu')} width="28" height="28" viewBox="0 0 28 18" fill="none" xmlns="http://www.w3.org/2000/svg">
			<line className={classNames({active}, 'menu__line1')} x1="1" y1="1" x2="27" y2="1" stroke="inherit" strokeWidth="2" strokeLinecap="round"/>
			<line className={classNames({active}, 'menu__line2')} x1="1" y1="8" x2="27" y2="8" stroke="inherit" strokeWidth="2" strokeLinecap="round"/>
			<line className={classNames({active}, 'menu__line3')} x1="1" y1="15" x2="27" y2="15" stroke="inherit" strokeWidth="2" strokeLinecap="round"/>
		</svg>
	);
};

export default Menu;