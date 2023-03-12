import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { userReducer } from 'entities/User';
import { loginReducer } from 'features/Auth';
import { registerReducer } from 'features/Register';
import { channelsReducer } from 'entities/Channels';
import { roomActionsReducer } from 'features/RoomActions';
import { webSocketsReducer } from 'processes/model/webSockets';
import { StateSchema } from './StateSchema';

export function createReduxStore(initialState?: StateSchema) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        user: userReducer,
        loginForm: loginReducer,
        registerForm: registerReducer,
        channels: channelsReducer,
        room: roomActionsReducer,
        webSockets: webSocketsReducer,
    };

    return configureStore<StateSchema>({
        reducer: rootReducers,
        devTools: __IS_DEV__,
        preloadedState: initialState,
    });
}
