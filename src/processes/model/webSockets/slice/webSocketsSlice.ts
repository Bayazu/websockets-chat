import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Socket } from 'socket.io-client';
import { SendMessage, webSocketSchema } from 'processes/model/webSockets';
import { initWebSocketConnection } from 'processes/model/webSockets/services/initWebSocketConnection';

const initialState: webSocketSchema = {
    webSocket: null,
    isConnected: false,
};

export const webSocketsSlice = createSlice({
    name: 'channels',
    initialState,
    reducers: {
        setWebsocket: (state, action : PayloadAction<Socket>) => {
            // @ts-ignore возможно косяк самой либы, immerJs + webSockets могут конфликтовать
            state.webSocket = action.payload;
        },
        sendNewMessage: (state, action : PayloadAction<SendMessage>) => {
            state.webSocket.emit('message', action.payload);
        },
        joinToNewRoom: (state, action: PayloadAction<string>) => {
            state.webSocket.emit('room:join', { customId: action.payload });
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(initWebSocketConnection.pending, (state) => {
                state.error = undefined;
            })
            .addCase(initWebSocketConnection.fulfilled, (state) => {
                state.isConnected = true;
            })
            .addCase(initWebSocketConnection.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { actions: webSocketsActions } = webSocketsSlice;
export const { reducer: webSocketsReducer } = webSocketsSlice;
