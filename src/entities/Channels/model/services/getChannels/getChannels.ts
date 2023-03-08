import { createAsyncThunk } from '@reduxjs/toolkit';
import { channelsAction, Room } from 'entities/Channels';
import { channelsAPI } from 'entities/Channels/api/roomActionsAPI';

interface getChannelsProps {}

export const getChannels = createAsyncThunk<Room[], getChannelsProps, { rejectValue: string }>(
    'channels/getData',
    async (authData, thunkAPI) => {
        try {
            const response = await channelsAPI.getAllChannels();

            if (!response.data) {
                throw new Error();
            }

            thunkAPI.dispatch(channelsAction.setChannelsData(response.data));

            return response.data;
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log(e);
            return thunkAPI.rejectWithValue('error');
        }
    },
);
