import {ipcRenderer} from 'electron';

export const hideWindow = () => {
	ipcRenderer.send('hideWindow');
};

export const setFullscreen = () => {
	ipcRenderer.send('setFullscreen');
};

export const closeWindow = () => {
	ipcRenderer.send('closeWindow');
};
