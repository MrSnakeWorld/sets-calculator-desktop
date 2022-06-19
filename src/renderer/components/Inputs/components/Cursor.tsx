import React from 'react';
import {useGlobalCtx} from '../../../tools/utils/context/GlobalCtx';

const Cursor = () => {
	const {refCursor} = useGlobalCtx();

	return (
		<span className="cursor" ref={refCursor}>|</span>
	);
};

export default Cursor;