import classNames from 'classnames';
import Creation from './components/Creation/Creation';
import Operations from './components/Inputs/Operations';
import Keyboard from './components/Keyboard/Keyboard';
import {extractKeyboardData} from './store/keyboard/selectors';
import {extractSetsAsButtons} from './store/sets/selectors';
import useAppSelector from './tools/utils/hooks/useAppSelector';
import {useGlobalCtx} from './tools/utils/context/GlobalCtx';
import './App.scss';
import './style/fonts.scss';
import Settings from './components/Settings/Settings';
import Appbar from './components/Appbar/Appbar';

function App() {
	const {theme} = useGlobalCtx();

	const {buttons, visible, isCarouselVisible} = useAppSelector(extractKeyboardData);
	const setButtons = useAppSelector(extractSetsAsButtons);

	return (
		<>
			<Appbar />
			<div className={classNames('app', theme)}>
				<Settings />
				<Creation />
				<Operations
					isVisible={!!setButtons.length}
					isCarouselVisible={isCarouselVisible}
				/>
				<Keyboard
					setButtons={setButtons}
					isCarouselVisible={isCarouselVisible}
					buttons={buttons}
					isVisible={visible}
				/>
			</div>

		</>
	);
}

export default App;
