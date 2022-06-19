import React, {useCallback, useRef, useState, TouchEvent} from 'react';

type Event = globalThis.Event | React.MouseEvent | React.TouchEvent;

const isTouchEvent = (event: Event): event is TouchEvent => {
	return 'touches' in event;
};

const preventDefault = (event: Event) => {
	if (!isTouchEvent(event)) return;

	if (event.touches.length < 2 && event.preventDefault) {
		event.preventDefault();
	}
};

export default (
	onClick: () => void,
	onLongPress: () => void,
	{ shouldPreventDefault = false, delay = 300 } = {}
) => {
	const [longPressTriggered, setLongPressTriggered] = useState(false);
	const [isMobile, setMobile] = useState(false);
	const timeout = useRef<NodeJS.Timeout>();
	const target = useRef<EventTarget>();

	const touchStart = useCallback(
		(event: Event) => {
			setMobile(true);
			if (isMobile) {
				start(event);
			}
		},
		[onLongPress, delay, shouldPreventDefault]
	);

	const mouseStart = useCallback(
		(event: Event) => {
			if (!isMobile) {
				start(event);
			}
		},
		[onLongPress, delay, shouldPreventDefault]
	);

	const start = useCallback(
		(event: Event) => {
			if (shouldPreventDefault && event.target) {
				event.target.addEventListener('touchend', preventDefault, {
					passive: false
				});
				target.current = event.target;
			}
			timeout.current = setTimeout(() => {
				onLongPress();
				setLongPressTriggered(true);
			}, delay);
		},
		[onLongPress, delay, shouldPreventDefault]
	);

	const mouseClear = useCallback(
		(event: Event, shouldTriggerClick = true) => {
			if (!isMobile) {
				clear(event, shouldTriggerClick);
			}
		},
		[shouldPreventDefault, onClick, longPressTriggered]
	);

	const touchClear = useCallback(
		(event: Event, shouldTriggerClick = true) => {
			if (isMobile) {
				clear(event, shouldTriggerClick);
			}
		},
		[shouldPreventDefault, onClick, longPressTriggered]
	);

	const clear = useCallback(
		(event: Event, shouldTriggerClick = true) => {
			timeout.current && clearTimeout(timeout.current);
			shouldTriggerClick && !longPressTriggered && onClick();
			setLongPressTriggered(false);
			if (shouldPreventDefault && target.current) {
				target.current.removeEventListener('touchend', preventDefault);
			}
		},
		[shouldPreventDefault, onClick, longPressTriggered]
	);

	return {
		onMouseDown: (e: React.MouseEvent) => mouseStart(e),
		onTouchStart: (e: React.TouchEvent) => touchStart(e),
		onTouchEnd: (e: React.TouchEvent) => touchClear(e),
		onMouseUp: (e: React.MouseEvent) => mouseClear(e),
		onMouseLeave: (e: React.MouseEvent) => mouseClear(e, false),
	};
};