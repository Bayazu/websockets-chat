import { UserSchema } from 'entities/User';
import { LoginSchema } from 'features/Auth';
import { RegisterSchema } from 'features/Register';
import { ChannelsSchema } from 'entities/Channels';
import { newRoomSchema } from 'features/RoomActions';
import { webSocketSchema } from 'processes/model/webSockets';

export interface StateSchema {
    user: UserSchema;
    loginForm: LoginSchema;
    registerForm : RegisterSchema;

    channels: ChannelsSchema;

    room : newRoomSchema;

    webSockets : webSocketSchema,
}
