import { createAsyncThunk } from '@reduxjs/toolkit';
import { io, Socket } from 'socket.io-client';
import { webSocketsActions } from 'processes/model/webSockets';
import { User } from 'entities/User';
import { channelsAction, Message } from 'entities/Channels';

export const initWebSocketConnection = createAsyncThunk<null, User, { rejectValue: string }>(
    'webSocket.ts/init',
    // eslint-disable-next-line consistent-return
    async (user, thunkAPI) => {
        try {
            const socket : Socket = io('ws://26.104.131.172:9532', {
                transports: ['websocket'],
            });

            socket.emit('connection', { userId: user.id });

            thunkAPI.dispatch(webSocketsActions.setWebsocket(socket));

            socket.on('message:new', (data: Message) => thunkAPI.dispatch(channelsAction.addMessageToChannel(data)));

            thunkAPI.fulfillWithValue('ok');
        } catch (e) {
            return thunkAPI.rejectWithValue('error');
        }
    },
);
