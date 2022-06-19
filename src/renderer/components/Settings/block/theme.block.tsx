import classNames from 'classnames';
import React from 'react';
import {useState} from 'react';
import {LANGUAGE, THEME, useGlobalCtx} from '../../../tools/utils/context/GlobalCtx';
import List from '../../List/List';
import RadioButton from '../../RadioButton/RadioButton';
import Switch from '../../Switch/Switch';
import './Block.scss';

const getText = (language: LANGUAGE) => {
	switch (language) {
	case LANGUAGE.RUSSIAN: 
		return {
			title: 'Автоматическая тема',
			dark: 'Темная',
			light: 'Светлая'
		};
	case LANGUAGE.ENGLISH:
		return {
			title: 'Automatic theme',
			dark: 'Dark',
			light: 'Light'
		};
	case LANGUAGE.TATAR:
		return {
			title: 'Автоматик тема',
			dark: 'Кара',
			light: 'Якты'
		};
	case LANGUAGE.UKRAINIAN:
		return {
			title: 'Автоматична тема',
			dark: 'Темна',
			light: 'Світлий'
		};
	}
};

const ThemeBlock = () => {
	const {theme, changeAutoTheme, changeTheme, isAutoTheme, language} = useGlobalCtx();

	const text = getText(language);

	const [isDark, setDark] = useState(theme === THEME.DARK && !isAutoTheme);
	const [isLight, setLight] = useState(theme === THEME.LIGHT && !isAutoTheme);

	const handleDarkTheme = () => {
		changeTheme(THEME.DARK);
		setDark(true);
		setLight(false);
		changeAutoTheme(false);
	};

	const handleLightTheme = () => {
		changeTheme(THEME.LIGHT);
		setLight(true);
		setDark(false);
		changeAutoTheme(false);
	};

	const handleAutoTheme = () => {
		if (!isAutoTheme) {
			setDark(false);
			setLight(false);
			changeAutoTheme(true);
			return;
		}

		changeAutoTheme(false);
		switch (theme) {
		case THEME.LIGHT: {
			handleLightTheme();
			break;
		}
		case THEME.DARK: {
			handleDarkTheme();
			break;
		}
		}
	};

	return (
		<div className="block">
			<List
				hasIcon={false}
				isShown={isAutoTheme}
				title={
					<div
						className="block__header"
						onClick={handleAutoTheme}
					>
						<span className={classNames('settings-header-text', theme)}>{text.title}</span>
						<Switch active={isAutoTheme} />
					</div>
				}
			>
				<div className="block__content">
					<div
						className="block__content-el" 
						onClick={handleDarkTheme}
					>
						<span className={classNames('settings-main-text', theme)}>{text.dark}</span>
						<RadioButton active={isDark} />
					</div>
					<div 
						className="block__content-el"  
						onClick={handleLightTheme}
					>
						<span className={classNames('settings-main-text', theme)}>{text.light}</span>
						<RadioButton active={isLight} />
					</div>
				</div>
			</List>
		</div>
	);
};

export default ThemeBlock;