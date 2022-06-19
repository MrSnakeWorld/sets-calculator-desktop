import { createRoot } from 'react-dom/client';
import React from 'react';
import './style/global.scss';
import App from './App';
import GlobalProvider from './tools/utils/context/GlobalProvider';
import {Provider} from 'react-redux';
import {store} from './store';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(<App />);

root.render(
	<React.StrictMode>
		<GlobalProvider>
			<Provider store={store}>
				<App />
			</Provider>
		</GlobalProvider>
	</React.StrictMode>
);
