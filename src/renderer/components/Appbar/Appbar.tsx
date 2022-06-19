import {useCallback} from 'react';
import {CgClose} from 'react-icons/cg';
import {HiMinus} from 'react-icons/hi';
import './Appbar.scss';

const Appbar = () => {
	const handleClose = useCallback(() => window.api.closeWindow(), []);

	const handleHide = useCallback(() => window.api.hideWindow(), []);

	return (
		<>
			<div className="appbar-buttons">
				<div
					className="appbar-button appbar-hide"
					onClick={handleHide}
				>
					<HiMinus />
				</div>
				<div
					className="appbar-button appbar-close"
					onClick={handleClose}
				>
					<CgClose />
				</div>
			</div>
			<div className="appbar settings-main-text">Калькулятор множеств</div>
		</>
	);
};

export default Appbar;
