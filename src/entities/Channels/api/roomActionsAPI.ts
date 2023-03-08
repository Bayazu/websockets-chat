import { instance } from 'shared/config/axios/axiosConfig';
import { Room } from 'entities/Channels';

export const channelsAPI = {
    getAllChannels() {
        return (
            instance.get<Room[]>('room/list')
        );
    },
};
