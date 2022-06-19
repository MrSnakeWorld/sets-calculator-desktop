import React, {useEffect, useRef, useState} from 'react';
import {IGlobalCtx, THEME, GlobalCtx, LANGUAGE} from './GlobalCtx';

interface IGlobalProvider {
	children?: React.ReactNode;
}

const getLanguage = (): LANGUAGE => {
	const language = window.localStorage.getItem('language');

	if (!!language && LANGUAGE[language as LANGUAGE]) {
		return language as LANGUAGE;
	} else {
		return LANGUAGE.RUSSIAN;
	}
};

const getAutoTheme = (): boolean => {
	const isAutoTheme = window.localStorage.getItem('autoTheme');
	switch (isAutoTheme) {
	case 'false': {
		return false;
	}
	case 'true':
	default: {
		return true;
	}
	}
};

const getTheme = (isAutoTheme: boolean) => {
	const theme = window.localStorage.getItem('theme');

	if (isAutoTheme) {
		const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
		
		if (userMedia.matches) return THEME.DARK;
		return THEME.LIGHT;
	} else {
		switch (theme) {
		case THEME.DARK: {
			return THEME.DARK;
		}
		case THEME.LIGHT:
		default: {
			return THEME.LIGHT;
		}
		}
	}
};

const GlobalProvider = ({children}: IGlobalProvider) => {
	const [isAutoTheme, changeAutoTheme] = useState(getAutoTheme());
	const [language, changeLanguage] = useState(getLanguage());
	const [theme, changeTheme] = useState(getTheme(isAutoTheme));
	const refCursor = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		if (isAutoTheme) {
			changeTheme(getTheme(isAutoTheme));
		}
	}, [isAutoTheme]);

	useEffect(() => {
		localStorage.setItem('theme', theme);
		localStorage.setItem('autoTheme', String(isAutoTheme));
		localStorage.setItem('language', language);
	}, [theme, isAutoTheme, language]);

	const ctxValue: IGlobalCtx = {
		isAutoTheme,
		theme,
		language,
		changeAutoTheme,
		changeTheme,
		changeLanguage,
		refCursor,
	};

	return (
		<GlobalCtx.Provider value={ctxValue}>{children}</GlobalCtx.Provider>
	);
};

export default GlobalProvider;