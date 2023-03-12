// TODO переписать работу с сокетами на middleWare

export { initWebSocketConnection } from 'processes/model/webSockets/services/initWebSocketConnection';

export { webSocketSchema, WebSocket, SendMessage } from './types/webSocket';
export { webSocketsReducer, webSocketsActions } from './slice/webSocketsSlice';
