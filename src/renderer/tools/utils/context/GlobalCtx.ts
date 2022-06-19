import React, {Context, createContext, Dispatch, SetStateAction, useContext} from 'react';

export enum THEME {
	DARK = 'dark',
	LIGHT = 'light'
}

export enum LANGUAGE {
	RUSSIAN = 'RUSSIAN',
	ENGLISH = 'ENGLISH',
	UKRAINIAN = 'UKRAINIAN',
	TATAR = 'TATAR'
}

export interface IGlobalCtx {
	theme: THEME;
	language: LANGUAGE;
	isAutoTheme: boolean;
	refCursor?: React.RefObject<HTMLSpanElement>;
	changeLanguage: Dispatch<SetStateAction<LANGUAGE>>;
	changeAutoTheme: Dispatch<SetStateAction<boolean>>;
	changeTheme: Dispatch<SetStateAction<THEME>>;
}

export const GlobalCtx = createContext<IGlobalCtx>({
	theme: THEME.LIGHT,
	language: LANGUAGE.RUSSIAN,
	isAutoTheme: true,
	refCursor: undefined,
	changeAutoTheme: () => null,
	changeTheme: () => null,
	changeLanguage: () => null
});

export const useGlobalCtx = () => useContext<IGlobalCtx>(GlobalCtx as Context<IGlobalCtx>);