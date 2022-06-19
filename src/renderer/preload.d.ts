import api from 'main/api';
import { Channels } from 'main/preload';

declare global {
  interface Window {
    api: typeof api
  }
}

export {};
