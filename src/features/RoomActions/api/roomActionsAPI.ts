import { instance } from 'shared/config/axios/axiosConfig';
import { Room } from 'entities/Channels';
import { createRoomProps } from 'features/RoomActions';

export const roomActionsAPI = {
    createNewRoom(newRoom: createRoomProps) {
        return (
            instance.post<Room>('room', newRoom)
        );
    },
};
