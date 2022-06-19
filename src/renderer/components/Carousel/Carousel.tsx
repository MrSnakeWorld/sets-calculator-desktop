import classNames from 'classnames';
import React, {ReactNode, useEffect, useState} from 'react';
import {useGlobalCtx} from '../../tools/utils/context/GlobalCtx';
import './Carousel.scss';

interface ICarouselProps {
	children: ReactNode[];
}

const Carousel = ({children}: ICarouselProps) => {
	const [index, setIndex] = useState(0);
	const [length, setLength] = useState(children.length);
	const [dots, setDots] = useState(Array(children.length).fill(''));
	const [touchPosition, setTouchPosition] = useState<number | undefined>(undefined);

	const {theme} = useGlobalCtx();

	useEffect(() => {
		setLength(children.length);
		setDots(Array(children.length).fill(''));
	}, [children]);

	const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
		setTouchPosition(e.touches[0].clientX);
	};

	const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
		if (touchPosition === undefined) {
			return;
		}

		const currentTouchPosition = e.touches[0].clientX;
		const diff = touchPosition - currentTouchPosition;

		if (diff > 5) {
			next();
		} else if (diff < -5) {
			prev();
		}

		setTouchPosition(undefined);
	};

	const next = () => {
		if (index < (length - 1)) {
			setIndex(state => state + 1);
		}
	};

	const prev = () => {
		if (index > 0) {
			setIndex(state => state - 1);
		}
	};

	return (
		<div className="carousel">
			<div className="carousel__container">
				<div
					className="carousel__container-wrapper"
					onTouchStart={handleTouchStart}
					onTouchMove={handleTouchMove}
				>
					<div
						className="carousel__container-wrapper__content"
						style={{ transform: `translateX(-${index * 100}%)` }}
					>
						{children}
					</div>
				</div>
			</div>
			<div className="carousel__dots">
				{dots.map((dot, i) => (
					<div
						key={i}
						className={classNames(
							'carousel__dots-dot', theme, {active: index === i}
						)}
					/>
				))}
			</div>
		</div>
	);
};

export default Carousel;