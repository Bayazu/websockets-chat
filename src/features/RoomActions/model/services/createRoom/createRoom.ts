import { createAsyncThunk } from '@reduxjs/toolkit';
import { channelsAction, Room } from 'entities/Channels';
import { roomActionsAPI } from 'features/RoomActions/api/roomActionsAPI';

export interface createRoomProps {
    title : string,
    customId : string,
    imageId : number,

}

export const createRoom = createAsyncThunk<Room, createRoomProps, { rejectValue: string }>(
    'room/create',
    async (newRoom, thunkAPI) => {
        try {
            const response = await roomActionsAPI.createNewRoom(newRoom);

            if (!response.data) {
                throw new Error();
            }

            thunkAPI.dispatch(channelsAction.addOneRoomToChannels(response.data));

            return response.data;
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log(e);
            return thunkAPI.rejectWithValue('error');
        }
    },
);
