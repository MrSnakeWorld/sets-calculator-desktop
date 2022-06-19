import classNames from 'classnames';
import React from 'react';
import {useState} from 'react';
import {LANGUAGE, useGlobalCtx} from '../../../tools/utils/context/GlobalCtx';
import List from '../../List/List';
import RadioButton from '../../RadioButton/RadioButton';
import './Block.scss';

const getText = (language: LANGUAGE) => {
	switch (language) {
	case LANGUAGE.RUSSIAN: 
		return {
			title: 'Выбор языка',
			russian: 'Русский',
			english: 'English',
			tatar: 'Татар',
			ukranian: 'Український'
		};
	case LANGUAGE.ENGLISH:
		return {
			title: 'Select language',
			russian: 'Русский',
			english: 'English',
			tatar: 'Татар',
			ukranian: 'Український'
		};
	case LANGUAGE.TATAR:
		return {
			title: 'Телне сайлау',
			russian: 'Русский',
			english: 'English',
			tatar: 'Татар',
			ukranian: 'Український'
		};
	case LANGUAGE.UKRAINIAN:
		return {
			title: 'Вибір мови',
			russian: 'Русский',
			english: 'English',
			tatar: 'Татар',
			ukranian: 'Український'
		};
	}
};

const LanguageBlock = () => {
	const {theme, language, changeLanguage} = useGlobalCtx();

	const [isRussian, setRussian] = useState(language === LANGUAGE.RUSSIAN);
	const [isEnglish, setEnglish] = useState(language === LANGUAGE.ENGLISH);
	const [isUkrainian, setUkrainian] = useState(language === LANGUAGE.UKRAINIAN);
	const [isTatar, setTatar] = useState(language === LANGUAGE.TATAR);

	const text = getText(language);

	const handleRussian = () => {
		changeLanguage(LANGUAGE.RUSSIAN);
		setRussian(true);
		setEnglish(false);
		setUkrainian(false);
		setTatar(false);
	};

	const handleEnglish = () => {
		changeLanguage(LANGUAGE.ENGLISH);
		setRussian(false);
		setEnglish(true);
		setUkrainian(false);
		setTatar(false);
	};

	const handleUkrainian = () => {
		changeLanguage(LANGUAGE.UKRAINIAN);
		setRussian(false);
		setEnglish(false);
		setUkrainian(true);
		setTatar(false);
	};

	const handleTatar = () => {
		changeLanguage(LANGUAGE.TATAR);
		setRussian(false);
		setEnglish(false);
		setUkrainian(false);
		setTatar(true);
	};

	return (
		<div className="block">
			<List title={
				<div className={classNames('settings-header-text', 'block__header', theme)}>
					{text.title}
				</div>
			}>
				<div className="block__content">
					<div className="block__content-el" onClick={handleRussian}>
						<span className={classNames('settings-main-text', theme)}>{text.russian}</span>
						<RadioButton active={isRussian} />
					</div>
					<div className="block__content-el"  onClick={handleEnglish}>
						<span className={classNames('settings-main-text', theme)}>{text.english}</span>
						<RadioButton active={isEnglish} />
					</div>
					<div className="block__content-el" onClick={handleTatar}>
						<span className={classNames('settings-main-text', theme)}>{text.tatar}</span>
						<RadioButton active={isTatar} />
					</div>
					<div className="block__content-el" onClick={handleUkrainian}>
						<span className={classNames('settings-main-text', theme)}>{text.ukranian}</span>
						<RadioButton active={isUkrainian} />
					</div>
				</div>
			</List>
		</div>
	);
};

export default LanguageBlock;