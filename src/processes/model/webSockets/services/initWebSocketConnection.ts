import { createAsyncThunk } from '@reduxjs/toolkit';
import { io, Socket } from 'socket.io-client';
import { webSocketsActions } from 'processes/model/webSockets';
import { User } from 'entities/User';
import { channelsAction, IMessage, Room } from 'entities/Channels';

export const initWebSocketConnection = createAsyncThunk<null, User, { rejectValue: string }>(
    'webSocket.ts/init',

    async (user, thunkAPI) => {
        try {
            const socket : Socket = io('ws://localhost:9124', {
                transports: ['websocket'],
            });

            if (user.userId) {
                socket.emit('connection', { userId: user.userId });
            }

            thunkAPI.dispatch(webSocketsActions.setWebsocket(socket));

            socket.on('message:new', (data: IMessage) => {
                thunkAPI.dispatch(channelsAction.addMessageToChannel(data));
            });

            socket.on('room:join:ok', (data : Room) => {
                thunkAPI.dispatch(channelsAction.addOneRoomToChannels(data));
            });

            socket.on('user:join', (data : IMessage) => {
                thunkAPI.dispatch(channelsAction.addMessageToChannel(data));
            });

            let interval : ReturnType<typeof setInterval>;

            let count = 0;

            socket.on('disconnect', () => {
                if (count < 5) {
                    interval = setInterval(() => {
                        socket.emit('connection', { userId: user.userId });
                    }, 3000);
                    count++;
                }
            });

            socket.on('connection:ok', () => {
                clearInterval(interval);
                count = 0;
            });

            socket.on('reconnect:try', () => {
                socket.emit('connection', { userId: user.userId });
            });

            thunkAPI.fulfillWithValue('ok');

            return null;
        } catch (e) {
            return thunkAPI.rejectWithValue('error');
        }
    },
);
