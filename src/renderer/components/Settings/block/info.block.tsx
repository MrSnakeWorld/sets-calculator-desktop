import classNames from 'classnames';
import React from 'react';
import {LANGUAGE, useGlobalCtx} from '../../../tools/utils/context/GlobalCtx';
import List from '../../List/List';
import './Block.scss';

// const getText = (language: LANGUAGE) => {
// 	switch (language) {
// 	case LANGUAGE.RUSSIAN: 
// 		return {
// 			title: 'Информация о разработчиках',
// 			developer: 'Разработчик',
// 			developerName: 'Соболев Артем И.',
// 			disigner: 'Дизайнер',
// 			disignerName: 'Соболев Максим И.'
// 		};
// 	case LANGUAGE.ENGLISH:
// 		return {
// 			title: 'Information about developers',
// 			developer: 'Developer',
// 			developerName: 'Sobolev Artem',
// 			disigner: 'UI/UX Designer',
// 			disignerName: 'Sobolev Maksim'
// 		};
// 	case LANGUAGE.TATAR:
// 		return {
// 			title: 'Эшләүчеләр турында мәгълүмат',
// 			developer: 'Эшләүче',
// 			developerName: 'Соболев Артем И.',
// 			disigner: 'Дизайнчы',
// 			disignerName: 'Соболев Максим И.'
// 		};
// 	case LANGUAGE.UKRAINIAN:
// 		return {
// 			title: 'Інформація про розробників',
// 			developer: 'Розробник',
// 			developerName: 'Соболєв Артем І.',
// 			disigner: 'Дизайнер',
// 			disignerName: 'Соболєв Максим І.'
// 		};
// 	}
// };

const getText = (language: LANGUAGE) => {
	switch (language) {
	case LANGUAGE.RUSSIAN: 
		return {
			title: 'Информация о разработчиках',
			director: 'Директор',
			directorName: 'Соболев Артем И.',
			developer: 'Разработчик',
			developerName: 'Соболев Артем И.',
			disigner: 'Дизайнер',
			disignerName: 'Соболев Артем И.',
		};
	case LANGUAGE.ENGLISH:
		return {
			title: 'Information about developers',
			director: 'Directed by',
			directorName: 'Sobolev Artem',
			developer: 'Developed by',
			developerName: 'Sobolev Artem',
			disigner: 'Designed by',
			disignerName: 'Sobolev Artem'
		};
	case LANGUAGE.TATAR:
		return {
			title: 'Эшләүчеләр турында мәгълүмат',
			director: 'Директор',
			directorName: 'Соболев Артем И.',
			developer: 'Эшләүче',
			developerName: 'Соболев Артем И.',
			disigner: 'Дизайнчы',
			disignerName: 'Соболев Артем И.'
		};
	case LANGUAGE.UKRAINIAN:
		return {
			title: 'Інформація про розробників',
			director: 'Директор',
			directorName: 'Соболев Артем I.',
			developer: 'Розробник',
			developerName: 'Соболєв Артем I.',
			disigner: 'Дизайнер',
			disignerName: 'Соболєв Артем I.'
		};
	}
};

const InfoBlock = () => {
	const {theme, language} = useGlobalCtx();

	const text = getText(language);

	return (
		<div className="block">
			<List title={
				<div className={classNames(
					'block__header',
					'settings-add-text',
					theme
				)}>
					{text.title}
				</div>
			}>
				<div className="block__content">
					<div className={classNames('block__content-el', 'settings-info-text', theme)}>
						<span>{text.director}</span>
						<span>{text.directorName}</span>
					</div>
					<div className={classNames('block__content-el', 'settings-info-text', theme)}>
						<span>{text.developer}</span>
						<span>{text.developerName}</span>
					</div>
					<div className={classNames('block__content-el', 'settings-info-text', theme)}>
						<span>{text.disigner}</span>
						<span>{text.disignerName}</span>
					</div>
					{/* <div className={classNames('block__content-el', 'settings-info-text', theme)}>
						<span>{text.disigner}</span>
						<span>{text.disignerName}</span>
					</div> */}
				</div>
			</List>
		</div>
	);
};

export default InfoBlock;