import React, {useState} from 'react';
import classNames from 'classnames';
import {LANGUAGE, useGlobalCtx} from '../../tools/utils/context/GlobalCtx';
import './Settings.scss';
import Menu from '../../style/assets/Menu';
import Sun from '../../style/assets/Sun';
import ThemeBlock from './block/theme.block';
import LanguageBlock from './block/language.block';
import InfoBlock from './block/info.block';

const getText = (language: LANGUAGE) => {
	switch (language) {
	case LANGUAGE.RUSSIAN: 
		return {
			title: 'Настройки',
			settings: 'Настройка приложения',
		};
	case LANGUAGE.ENGLISH:
		return {
			title: 'Settings',
			settings: 'Application settings',
		};
	case LANGUAGE.TATAR:
		return {
			title: 'Көйләнеш',
			settings: 'Кушымта урнаштыру',
		};
	case LANGUAGE.UKRAINIAN:
		return {
			title: 'Настройка',
			settings: 'Налаштування Програми',
		};
	}
};

const Settings = () => {
	const {theme, language} = useGlobalCtx();
	const [isOpen, setOpen] = useState(false);

	const text = getText(language);

	const handleOpen = () => {
		setOpen(!isOpen);
	};

	return (
		<div className={classNames('settings', {open: isOpen})}>
			<div
				className={classNames('settings__background', {open: isOpen})}
				onClick={handleOpen}
			/>
			<div
				className={classNames(
					'settings__button', {open: isOpen}, theme
				)}
				onClick={handleOpen}
			>
				<Menu active={isOpen} />
			</div>
			<div className={classNames(
				'settings__menu', theme, {open: isOpen}
			)}>
				<div className={classNames(
					'settings__menu-header', 'main-text', {open: isOpen}
				)}>
					{text.title}
				</div>
				<div className={classNames(
					'settings__menu-content', {open: isOpen}
				)}>
					<div className={classNames(
						'settings__menu-content__header', 'settings-add-text', theme
					)}>
						{text.settings}
					</div>
					<ThemeBlock />
					<LanguageBlock />
					<InfoBlock />
				</div>
				<div
					className={classNames(
						'settings__menu-icon', {open: isOpen}
					)}
				>
					<Sun />
				</div>
			</div>
		</div>
	);
};

export default Settings;