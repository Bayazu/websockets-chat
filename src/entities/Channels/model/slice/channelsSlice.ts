import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getChannels } from 'entities/Channels/model/services/getChannels/getChannels';
import { ChannelsSchema, IMessage, Room } from '../types/channels';

const initialState: ChannelsSchema = {
    isLoading: false,
    channels: [],
};

export const channelsSlice = createSlice({
    name: 'channels',
    initialState,
    reducers: {
        setChannelsData: (state, action: PayloadAction<Room[]>) => {
            state.channels = action.payload;
        },
        addOneRoomToChannels: (state, action: PayloadAction<Room>) => {
            state.channels.push(action.payload);
        },
        addMessageToChannel: (state, action: PayloadAction<IMessage>) => {
            const foundedRoom = state.channels.find((room) => room.id === action.payload.roomId);
            if (foundedRoom) {
                foundedRoom.messages.push(action.payload);
                foundedRoom.lastMessage = action.payload;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getChannels.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(getChannels.fulfilled, (state, action) => {
                state.isLoading = false;
                state.channels = action.payload;
            })
            .addCase(getChannels.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

// Action creators are generated for each case reducer function
export const { actions: channelsAction } = channelsSlice;
export const { reducer: channelsReducer } = channelsSlice;
