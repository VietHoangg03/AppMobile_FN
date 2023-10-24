import {io} from 'socket.io-client';
import {SERVER_URL} from './ip';

export const socket = io(SERVER_URL, {
  transports: ['websocket'],
  jsonp: false,
});
