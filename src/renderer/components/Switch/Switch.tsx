import classNames from 'classnames';
import React from 'react';
import {useGlobalCtx} from '../../tools/utils/context/GlobalCtx';
import './Switch.scss';

interface ISwitchProps {
	active: boolean;
	onClick?: () => void;
}

const Switch = ({active, onClick}: ISwitchProps) => {
	const {theme} = useGlobalCtx();

	return (
		<svg onClick={onClick} className={classNames('switch', theme, {active})} width="41" height="24" viewBox="0 0 41 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path className={classNames('switch__body', theme, {active})} fillRule="evenodd" clipRule="evenodd" d="M37 12C37 15.9 33.9 19 30 19H10C6.1 19 3 15.9 3 12V12C3 8.1 6.1 5 10 5H30C33.9 5 37 8.1 37 12V12V12Z"/>
			<path filter='url(#switch-filter)' className={classNames('switch__circle', theme, {active})} fillRule="evenodd" clipRule="evenodd" d="M30 22C35.5228 22 40 17.5228 40 12C40 6.47715 35.5228 2 30 2C24.4772 2 20 6.47715 20 12C20 17.5228 24.4772 22 30 22Z"/>
			<defs>
				<filter id="switch-filter" x="19" y="1" width="22" height="23" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
					<feFlood floodOpacity="0" result="BackgroundImageFix"/>
					<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
					<feOffset dy="1"/>
					<feGaussianBlur stdDeviation="0.5"/>
					<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.237602 0"/>
					<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_551_1040"/>
					<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
					<feOffset/>
					<feGaussianBlur stdDeviation="0.5"/>
					<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"/>
					<feBlend mode="normal" in2="effect1_dropShadow_551_1040" result="effect2_dropShadow_551_1040"/>
					<feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_551_1040" result="shape"/>
				</filter>
				<linearGradient id="paint0_linear_551_1040" x1="20.0979" y1="2" x2="20.0979" y2="21.8043" gradientUnits="userSpaceOnUse">
					<stop stopOpacity="0.01"/>
					<stop offset="0.8" stopOpacity="0.02"/>
					<stop offset="1" stopOpacity="0.04"/>
				</linearGradient>
				<linearGradient id="paint1_linear_551_1040" x1="20" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
					<stop stopColor="white" stopOpacity="0.12"/>
					<stop offset="0.2" stopColor="white" stopOpacity="0.06"/>
					<stop offset="1" stopColor="white" stopOpacity="0.01"/>
				</linearGradient>
			</defs>
		</svg>
	);
};

export default Switch;