// TODO переписать работу с сокетами на middleWare

// export { createRoomProps } from 'features/RoomActions/model/services/createRoom/createRoom';
//
// export { CreateRoomModal } from './ui/CreateRoomModal/CreateRoomModal';
// export { CreateRoomForm } from 'features/RoomActions/ui/CreateRoomForm/CreateRoomForm';
//
export { webSocketSchema, WebSocket, SendMessage } from './types/webSocket';
export { webSocketsReducer, webSocketsActions } from './slice/webSocketsSlice';
